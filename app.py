import os
from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS # Import CORS

app = Flask(__name__)
# Initialize CORS. For development, you can allow all origins.
# In production, replace "*" with the specific origins your extension will run from.
CORS(app)

# Configure your Google API Key
GOOGLE_API_KEY = "AIzaSyCijKCTJnI6DJwzeZ-Dc085E1gbMN4A6J8"  # Replace with your actual API key
genai.configure(api_key=GOOGLE_API_KEY)
# genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))

@app.route('/summarize', methods=['POST'])
def summarize_text():
    data = request.get_json()
    text_to_summarize = data.get('text')

    if not text_to_summarize:
        return jsonify({"error": "No text provided for summarization"}), 400

    try:
        model = genai.GenerativeModel('gemini-2.0-flash')
        prompt = f"Please summarize the following text concisely: {text_to_summarize}"
        response = model.generate_content(prompt)

        summary = ""
        if response.candidates:
            for part in response.candidates[0].content.parts:
                if hasattr(part, 'text'):
                    summary += part.text

        return jsonify({"summary": summary.strip()})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)