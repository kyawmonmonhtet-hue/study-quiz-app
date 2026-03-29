const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const livesElement = document.getElementById('lives');
const scoreElement = document.getElementById('score');
const explanationContainer = document.getElementById('explanation-container');
const explanationText = document.getElementById('explanation-text');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;
let lives = 3;

const questions = [
    {
        question: 'Which language is used for web structure?',
        answers: [
            { text: 'Python', correct: false },
            { text: 'HTML', correct: true },
            { text: 'Java', correct: false },
            { text: 'C++', correct: false }
        ],
        explanation: 'HTML (HyperText Markup Language) is the standard language for creating the structure of web pages.'
    },
    {
        question: 'What does "CPU" stand for?',
        answers: [
            { text: 'Central Processing Unit', correct: true },
            { text: 'Computer Personal Unit', correct: false },
            { text: 'Central Print Utility', correct: false },
            { text: 'Control Process Unit', correct: false }
        ],
        explanation: 'The CPU is the primary component of a computer that acts as its "brain," performing calculations and instructions.'
    },
    {
        question: 'In Python, how do you output "Hello World"?',
        answers: [
            { text: 'echo("Hello World")', correct: false },
            { text: 'console.log("Hello World")', correct: false },
            { text: 'print("Hello World")', correct: true },
            { text: 'printf("Hello World")', correct: false }
        ],
        explanation: 'The print() function is used in Python to display text or variables on the screen.'
    }
];

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    lives = 3;
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    explanationContainer.classList.add('hidden');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === "true";
    
    if (isCorrect) {
        selectedButton.classList.add('correct');
        score++;
        scoreElement.innerText = "Score: " + score;
    } else {
        selectedButton.classList.add('wrong');
        lives--;
        livesElement.innerText = "❤️".repeat(lives);
    }

    // Show Explanation
    explanationText.innerText = questions[currentQuestionIndex].explanation;
    explanationContainer.classList.remove('hidden');

    // Check if Game Over
    if (lives <= 0) {
        alert("Game Over! Your final score: " + score);
        startQuiz();
    }
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        alert("Quiz Finished! You got " + score + " out of " + questions.length);
        startQuiz();
    }
});

startQuiz();
