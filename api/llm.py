import openai
import re
import dotenv
import os
import groq
import base64

dotenv.load_dotenv()
openai_api_key = os.getenv("OPENAI_API_KEY")

groq_api_key = os.getenv("GROQ_API_KEY")
groq_client = groq.Groq(api_key=groq_api_key)


def parse_python_code(res):
  match = re.search(r"```python([\s\S]*)```", res, re.DOTALL)
  if match:
      code = match.group(1)
      return code
  else:
    return res

class LLM:
  def __init__(self, api_key):
    openai.api_key = api_key

  def create_ppt_code_prompt(self, prompt):
    response = openai.chat.completions.create(
      model="gpt-3.5-turbo",
      messages=[
        {"role": "system", "content": f"You are a powerpoint presentation generator. You will only return python code that creates a powerpoint file. You will be given a script with an overall title indicated by ###, slide titles indicated by lines starting with ##, and points for that slide enclosed by []. Be creative and give each slide different positioning of it's title and jot notes, while maintaining the same color and font. The title should be on its own slide at the start, it has no jot notes tied to it"},
        {"role": "user", "content": f"Return the python code to generate a file named 'res.pptx' using this script: {prompt}. Make sure that every point in the script is in the slides, excluding - signs"}
      ]
    )
    ppt_code = parse_python_code(response.choices[0].message.content)
    print(ppt_code)
    return ppt_code

  def gen_slides_from_script(self, script):
    chat_completion = groq_client.chat.completions.create(
        messages=[
            {
              "role": "system",
              "content": f"You are jot note summarizer. You take scripts and seperate them into titles and jot notes under each title. The overarching title will be marked with a ####, slide titles with ###, and jot notes for that slide with ##"
            },
            {
              "role": "user", 
              "content": f"Return the powerpoint title, slide title + jot notes for each slide, given the following script: {script}"
            }
        ],
        model="llama3-8b-8192",
    )
    return chat_completion.choices[0].message.content
  
  def transcribe(self, filename):
    # Open the audio file
    with open(filename, "rb") as file:
        # Create a transcription of the audio file
        transcription = groq_client.audio.transcriptions.create(
          file=(filename, file.read()), # Required audio file
          model="whisper-large-v3-turbo", # Required model to use for transcription
          prompt="Specify context or spelling",  # Optional
          response_format="json",  # Optional
          language="en",  # Optional
          temperature=0.0  # Optional
        )
        return transcription.text
    
  def describe_image(self, url):
    def encode_image(image_path):
      with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')
      
    try:
      base64_image = encode_image(url)

      completion = groq_client.chat.completions.create(
        model="llama-3.2-11b-vision-preview",
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": "What's in this image?"
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{base64_image}",
                        }
                    }
                ]
            }
        ],
        temperature=1,
        max_completion_tokens=1024,
        top_p=1,
        stream=False,
        stop=None,
      )
    except Exception as e:
      print(e)

    return completion.choices[0].message.content
  
  def create_ppt_bg(self, prompt):
    response = openai.images.generate(
        model="dall-e-2",
        prompt=f"generate an image, {prompt}, minimalistic with no detail and depth",
        size="256x256",
        quality="standard",
        n=1,
    )

    return response.data[0].url

  def generate_variations(self, image_url):
    response = openai.images.create_variation(
      model="dall-e-2",
      image=open(image_url, "rb"),
      n=1,
      size="256x256"
    )
    return response.data[0].url