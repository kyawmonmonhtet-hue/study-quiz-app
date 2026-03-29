const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const livesElement = document.getElementById('lives');
const scoreElement = document.getElementById('score');
const explanationContainer = document.getElementById('explanation-container');
const explanationText = document.getElementById('explanation-text');
const nextButton = document.getElementById('next-btn');
const noteInput = document.getElementById('note-input');
const generateBtn = document.getElementById('generate-btn');

let currentQuestionIndex = 0;
let score = 0;
let lives = 3;
let questions = []; // Starts empty like Gizmo!

// MAGIC FUNCTION: Turns text into Questions
generateBtn.addEventListener('click', () => {
    const text = noteInput.value;
    const lines = text.split('\n');
    
    questions = lines.map(line => {
        const [q, a] = line.split(':');
        if (q && a) {
            return {
                question: `What is ${q.trim()}?`,
                answers: [
                    { text: a.trim(), correct: true },
                    { text: 'A type of software', correct: false },
                    { text: 'A hardware brand', correct: false },
                    { text: 'I don't know', correct: false }
                ],
                explanation: `${q.trim()} is defined as: ${a.trim()}`
            };
        }
    }).filter(item => item !== undefined);

    if (questions.length > 0) {
        alert("Quiz Generated! starting now...");
        startQuiz();
    } else {
        alert("Please use the format: Question : Answer");
    }
});

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

    // Shuffle answers so the correct one isn't always first
    const shuffledAnswers = currentQuestion.answers.sort(() => Math.random() - 0.5);

    shuffledAnswers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        if (answer.correct) button.dataset.correct = answer.correct;
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
        selectedButton.style.backgroundColor = "#28a745";
        score++;
        scoreElement.innerText = "Score: " + score;
    } else {
        selectedButton.style.backgroundColor = "#dc3545";
        lives--;
        livesElement.innerText = "❤️".repeat(lives);
    }

    explanationText.innerText = questions[currentQuestionIndex].explanation;
    explanationContainer.classList.remove('hidden');

    if (lives <= 0) {
        alert("Out of lives! Final Score: " + score);
        location.reload(); 
    }
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        alert("Great job! You finished your custom quiz.");
        location.reload();
    }
});
           

