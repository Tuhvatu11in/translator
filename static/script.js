
let currentText = '';

function loadText() {
    const text = document.getElementById('user-text').value.trim();
    if (!text) {
        alert('Пожалуйста, введите текст');
        return;
    }

    currentText = text;
    // Используем textContent для безопасности, CSS white-space: pre-wrap сохранит переносы
    document.getElementById('text-container').textContent = text;
    document.getElementById('translation').innerHTML =
        '<span style="color: #7f8c8d;">Выделите текст для перевода</span>';
}

function getSelectedText() {
    const selection = window.getSelection();
    return selection.toString().trim();
}

function translateSelection() {
    const selectedText = getSelectedText();
    if (!selectedText) {
        alert('Пожалуйста, выделите текст для перевода');
        return;
    }
    performTranslation(selectedText);
}

function performTranslation(text) {
    const sourceLang = document.getElementById('source-lang').value;
    const targetLang = document.getElementById('target-lang').value;

    document.getElementById('translation').innerHTML = `
        <span style="color: #7f8c8d;">Идёт перевод...</span>
    `;

    fetch('/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            word: text,
            source: sourceLang,
            target: targetLang
        })
    })
    .then(response => {
        if (!response.ok) throw new Error('Ошибка сети');
        return response.json();
    })
    .then(data => {
        document.getElementById('translation').innerHTML = `
            <span class="lang-label">Исходный текст:</span> <strong>${escapeHtml(text)}</strong><br>
            <span class="lang-label">Перевод:</span> <strong>${escapeHtml(data.translation)}</strong>
        `;
    })
    .catch(error => {
        document.getElementById('translation').innerHTML = `
            <span style="color: #e74c3c;">Ошибка перевода. Пожалуйста, попробуйте позже.</span>
        `;
        console.error('Ошибка перевода:', error);
    });
}

// Обработка нажатия пробела
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && getSelectedText()) {
        event.preventDefault(); // Предотвращаем прокрутку страницы
        translateSelection();
    }
});

// Включаем кнопку когда текст выделен
document.addEventListener('selectionchange', function() {
    const btn = document.getElementById('translate-btn');
    btn.disabled = !getSelectedText();
});

// Утилитарная функция для экранирования HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Функция переключения темы
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);

    // Сохраняем выбор пользователя
    localStorage.setItem('theme', newTheme);

    // Обновляем иконку кнопки
    const toggleBtn = document.getElementById('theme-toggle');
    toggleBtn.textContent = newTheme === 'dark' ? '☀️' : '🌙';
}

// Загружаем сохраненную тему при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const toggleBtn = document.getElementById('theme-toggle');
    toggleBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
});


