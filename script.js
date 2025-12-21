// Імпортуємо дані тестів
import testsData from "./testdata.js";

// Отримуємо елементи DOM і зберігаємо їх у змінні
let menu = document.getElementById('menu');
let teststart = document.getElementById('teststart');
let testtitle = document.getElementById('testtitle');
let questionscreen = document.getElementById('questionscreen');
let current_test_name = document.getElementById('current_test_name');
let question_text = document.getElementById('question_text');
let answers_wrap = document.getElementById('answers_wrap');
let statistic = document.getElementById('statistic');
let timerDisplay = document.getElementById('timer');
let starttestbtn = document.getElementById('starttestbtn');
let backtomenu = document.getElementById('backtomenu');
let homebtn = document.getElementById('homebtn');

// Змінні для збереження стану тесту
let selectedTest = null;
let currentQuestionIndex = 0;
let correctAnswers = 0;
let timeLeft = 60;
let timerInterval;

// Функція для отримання випадкового цілого числа в діапазоні [min, max]
function randint(min, max) { return Math.round(Math.random() * (max - min) + min) }

// Масив можливих знаків операцій
let signs = ['+', '-', '*', '/']

// Функція для отримання випадкового знаку операції
function getRandomSign() { return signs[randint(0, 3)] }

// Функція тасування масиву (алгоритм Фішера-Йетса)
function shuffle(arr) { for (let i = arr.length - 1; i > 0; i--) { let j = Math.floor(Math.random() * (i + 1));[arr[i], arr[j]] = [arr[j], arr[i]] } }

// Клас для генерації випадкових математичних питань з проекта квіз
class RandomQuestion {
    constructor() {
        let a = randint(1, 30); let b = randint(1, 30); let s = getRandomSign();
        this.question = `${a} ${s} ${b}`;
        if (s == '+') this.correct = a + b;
        else if (s == '-') this.correct = a - b;
        else if (s == '*') this.correct = a * b;
        else if (s == '/') this.correct = (a / b).toFixed(2);
        this.answers = [
            randint(Math.round(this.correct) - 15, Math.round(this.correct) - 1),
            randint(Math.round(this.correct) - 15, Math.round(this.correct) - 1),
            this.correct,
            randint(Math.round(this.correct) + 1, Math.round(this.correct) + 15),
            randint(Math.round(this.correct) + 1, Math.round(this.correct) + 15)
        ]
        shuffle(this.answers);
    }
}

// Обробка кліку на кнопки вибору тесту
// 1. Отримуємо список усіх кнопок з атрибутом data-test
const allButtons = document.querySelectorAll('.btnmain[data-test]');

// 2. Використовуємо звичайний цикл для перебору кнопок
for (let i = 0; i < allButtons.length; i++) {
    // Створюємо змінну для поточної кнопки, щоб код був зрозумілішим
    let btn = allButtons[i];

    // Призначаємо обробник кліку для кожної кнопки
    btn.onclick = function () {
        // Отримуємо назву тесту
        selectedTest = btn.getAttribute('data-test');

        // 3. Визначаємо заголовок тесту
        if (selectedTest === "math") {
            testtitle.innerText = "Математичний тест";
        } else {
            // Беремо назву з об'єкта testsData
            testtitle.innerText = testsData[selectedTest].title;
        }

        // 4. Перемикаємо екрани
        menu.classList.remove('active');
        teststart.classList.add('active');

        // Очищуємо статистику
        statistic.innerText = "";
    };
}


// Повернення в меню з екрану початку тесту при натисканні кнопки "Повернутися назад"
backtomenu.onclick = function () {
    teststart.classList.remove('active') // Ховаємо екран початку тесту
    menu.classList.add('active') // Показуємо меню
    statistic.innerHTML = ""; // Очищуємо поле результату
}


// Обробка кліку на кнопку "Старт тесту" (за допомогою стрілочної функції)
starttestbtn.onclick = () => {
    // Перемикаємо екрани
    teststart.classList.remove('active');
    questionscreen.classList.add('active');
    current_test_name.innerText = testtitle.innerText;

    // Скидаємо змінні стану тесту
    currentQuestionIndex = 0;
    correctAnswers = 0;
    startTimer();
    loadQuestion();
};

// Функція для запуску таймера на питання
function startTimer() {
    timeLeft = 15; // 15 секунд на питання
    timerDisplay.innerText = timeLeft;
    
    // Обов'язково очищуємо старий інтервал
    clearInterval(timerInterval);
    
    timerInterval = setInterval(function() {
        timeLeft--;
        timerDisplay.innerText = timeLeft;
        
        // Якщо час вийшов — ГРА ЗАКІНЧУЄТЬСЯ
        if (timeLeft <= 0) {
            clearInterval(timerInterval); 
            finishTest(); // Переходимо на екран статистики
        }
    }, 1000);
}

// Функція для завантаження питання та відповідей
function loadQuestion() {
    // Запускаємо таймер
    startTimer();
    // Очищаємо попередні відповіді
    answers_wrap.innerHTML = "";
    // Змінна для збереження об'єкта питання
    let qObj;

    // 1. Отримуємо дані питання
    if (selectedTest === "math") {
        qObj = new RandomQuestion();
    } else {
        // Отримуємо дані питання з об'єкта testsData і тасуємо відповіді
        let data = testsData[selectedTest].questions[currentQuestionIndex];
        let shuffledAnswers = data.a.slice();
        shuffle(shuffledAnswers);

        // Створюємо об'єкт питання з потрібною структурою для подальшої роботи
        qObj = {
            question: data.q,
            answers: shuffledAnswers,
            correct: data.correct
        };
    }

    // Встановлюємо текст питання
    question_text.innerText = qObj.question;

    // 2. Створюємо кнопки через звичайний цикл for
    for (let i = 0; i < qObj.answers.length; i++) {
        // Отримуємо текст відповіді та створюємо кнопку (генеруємо за допомогою js),
        // в яку записуємо текст відповіді з об'єкта питання
        let ans = qObj.answers[i];
        let btn = document.createElement('button');

        // Налаштовуємо кнопку відповіді на питання
        btn.className = "btnmain";
        btn.style.background = '#D9D9D9';
        btn.innerText = ans;

        // Обробник кліку на відповідь
        btn.onclick = function () {

            // 2. Зупиняємо таймер
            clearInterval(timerInterval);
            // Перевіряємо правильність
            let isCorrect = String(ans) === String(qObj.correct);

            if (isCorrect) {
                correctAnswers = correctAnswers + 1;
                this.style.background = '#00ff00'; // Зелений
                if (typeof correct_sound !== 'undefined') {
                    correct_sound.currentTime = 0;
                    correct_sound.play();
                }
            } else {
                this.style.background = '#ff0000'; // Червоний
                if (typeof wrong_sound !== 'undefined') {
                    wrong_sound.currentTime = 0;
                    wrong_sound.play();
                }
            }

            // 3. Анімація та перехід до наступного питання
            anime({
                targets: this,
                background: '#D9D9D9',
                duration: 500,
                easing: 'linear',
                delay: 100,
                complete: function () {
                    currentQuestionIndex = currentQuestionIndex + 1;

                    if (selectedTest === "math") {
                        loadQuestion();
                    } else {
                        if (currentQuestionIndex < testsData[selectedTest].questions.length) {
                            loadQuestion();
                        } else {
                            finishTest();
                        }
                    }
                }
            });
        };
        answers_wrap.appendChild(btn);
    }
}

// Функція для перевірки, чи потрібно завантажувати наступне питання або завершувати тест
function finishTest() {
    // 1. Зупиняємо таймер негайно
    clearInterval(timerInterval);

    // 2. Рахуємо точність
    // Якщо користувач не встиг відповісти ні на одне питання, ставимо 0
    let accuracy = 0; // Спочатку ставимо значення 0 за замовчуванням

    if (currentQuestionIndex > 0) {
        // Якщо гравець відповів хоча б на одне питання, рахуємо відсоток
        accuracy = Math.round((correctAnswers / currentQuestionIndex) * 100);
    } else {
        // Якщо відповідей ще не було, точність залишається 0
        accuracy = 0;
    }

    // 3. Формуємо текст статистики
    // Використовуємо currentQuestionIndex, бо в математиці немає ліміту (total)
    statistic.innerHTML = `
        Результат: ${correctAnswers} з ${currentQuestionIndex}<br>
        Точність: ${accuracy}%
    `;

    // 4. Перемикаємо екрани на той, де кнопки "Старт" і "Назад"
    questionscreen.classList.remove('active');
    teststart.classList.add('active');

    // Оновлюємо текст кнопки
    starttestbtn.innerHTML = "Спробувати ще раз";
}

// Коли натискаємо "Завершити" під час тесту
homebtn.onclick = function () {
    // Якщо гра йде (є вибраний тест), викликаємо фінал
    if (selectedTest) {
        finishTest();
    } else {
        // Якщо ми просто на екрані, повертаємо в меню
        questionscreen.classList.remove('active');
        menu.classList.add('active');
    }
};


// Отримуємо всі кнопки в масив-подібний об'єкт
const allTestButtons = document.querySelectorAll('.btnmain[data-test]');

// Використовуємо класичний цикл for
for (let i = 0; i < allTestButtons.length; i++) {
    // Призначаємо обробник кліку для кожної кнопки окремо
    allTestButtons[i].onclick = function () {
        selectedTest = this.getAttribute('data-test');

        if (selectedTest === "math") {
            testtitle.innerText = "Математичний тест";
        } else {
            testtitle.innerText = testsData[selectedTest].title;
        }

        menu.classList.remove('active');
        teststart.classList.add('active');

        statistic.innerHTML = ""; // Очищуємо поле результату
        starttestbtn.innerText = "Старт"; // Повертаємо назву кнопки
    };
}