import openai
import re

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
        {"role": "system", "content": f"You are a powerpoint presentation generator. You will only return python code that creates a powerpoint file."},
        {"role": "user", "content": f"Return the python code to generate a file named 'res.pptx' about this prompt: {prompt}"}
      ]
    )
    ppt_code = parse_python_code(response.choices[0].message.content)
    return ppt_code
