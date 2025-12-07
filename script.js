import testsData from "./testdata";
let menu= document.getElementById('menu')
let testStart= document.getElementById('teststart')
let testTitle = document.getElementById('testtitle')
let startTestBtn = document.getElementById('starttestbtn')
let backToMenu = document.getElementById('backtomenu')
let questionScreen = document.getElementById('questionscreen')
let qtitle = document.getElementById('qtitle')
let currentTestName = document.getElementById('current_test_name')
let questionText = document.getElementById('question_text')
let answersWrap = document.getElementById('answers_wrap')
let startBlock = document.getElementById('start_block')
let statistic = document.getElementById('statistic')
let homeBtn = document.getElementById('homebtn')
function randint(min, max) { return Math.round(Math.random() * (max - min) + min) }
let signs = ['+', '-', '*', '/']
function getRandomSign() { return signs[randint(0, 3)] }
function shuffle(arr) { for (let i = arr.length - 1; i > 0; i--) { let j = Math.floor(Math.random() * (i + 1));[arr[i], arr[j]] = [arr[j], arr[i]] } }
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
