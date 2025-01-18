from flask import Flask, request, jsonify
from flask_cors import CORS
from llm import LLM
import os
from dotenv import load_dotenv

load_dotenv()
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
llm = LLM(OPENAI_API_KEY)

app = Flask(__name__)
CORS(app)

@app.route("/api/pptx", methods=['POST'])
def pptx():
    try:
        data = request.get_json()
        prompt = data['prompt']

        ppt_code = llm.create_ppt_code_prompt(prompt)
        exec(ppt_code)

        return

    except Exception as e:
        return {"error": f"Failed to create events: {str(e)}"}
    