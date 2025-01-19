import openai
import re
import dotenv
import os
import groq

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