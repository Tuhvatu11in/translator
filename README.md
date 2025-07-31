# Language Learning Web App (Flask)  
# Веб-приложение для изучения языков (Flask)  

## Описание  
Этот сайт, написанный на Flask, предназначен для изучения иностранных языков через чтение текстов.  

### Как это работает?  
1. Вставьте текст в поле ввода и нажмите **"Загрузить текст"**.  
2. Текст появится ниже. Читайте его, как обычно.  
3. Если встретили незнакомое слово или фразу:  
   - Выделите их мышкой.  
   - Нажмите кнопку **"Перевести выделенное"** или клавишу **Пробел**.  
4. Перевод слова или фразы появится в нижней части страницы.  

### Добавление новых языков  
Если нужного языка нет на сайте, вы можете:  
1. Добавить его вручную в файл `templates/index.html` (после строк 25 и 37).  
2. Написать мне в Telegram [@IDETTSI](https://t.me/IDETTSI) — я добавлю язык и обновлю приложение.  

---  

## Description  
This Flask-based website is designed for language learning through reading.  

### How does it work?  
1. Paste your text into the input field and click **"Upload text"**.  
2. The text will appear below. Read it as usual.  
3. If you encounter an unknown word or phrase:  
   - Highlight it with your mouse.  
   - Click the **"Translate selection"** button or press the **Spacebar**.  
4. The translation will appear at the bottom of the page.  

### Adding New Languages  
If your target language is missing, you can:  
1. Manually add it to `templates/index.html` (after lines 25 and 37).  
2. Contact me on Telegram [@IDETTSI](https://t.me/IDETTSI) — I’ll add the language and update the app.  

---  

### Установка / Installation  
```bash
git clone https://github.com/Tuhvatu11in/translator
cd translator
pip install -r requirements.txt
python app.py
```  
