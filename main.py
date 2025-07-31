from flask import Flask, render_template, request, jsonify
from deep_translator import GoogleTranslator
import logging

app = Flask(__name__)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/translate', methods=['POST'])
def translate():
    data = request.get_json()
    text = data.get('word', '').strip()
    source_lang = data.get('source', 'auto')
    target_lang = data.get('target', 'ru')

    if not text:
        return jsonify({'translation': ''})

    try:
        translation = GoogleTranslator(source=source_lang, target=target_lang).translate(text)
        logger.info(f"Перевод: '{text}' ({source_lang}->{target_lang}) -> '{translation}'")
        return jsonify({'translation': translation})
    except Exception as e:
        logger.error(f"Ошибка перевода текста '{text}': {str(e)}")
        return jsonify({'translation': 'Ошибка перевода'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)