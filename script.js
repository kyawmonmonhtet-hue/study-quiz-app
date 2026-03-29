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
let questions = [];

// This function makes the quiz start!
generateBtn.addEventListener('click', () => {
    const text = noteInput.value.trim();
    if (!text) {
        alert("Please paste some notes first!");
        return;
    }

    const lines = text.split('\n');
    questions = lines.map(line => {
        const parts = line.split(':');
        if (parts.length >= 2) {
            return {
                question: `What is ${parts[0].trim()}?`,
                answers: [
                    { text: parts[1].trim(), correct: true },
                    { text: 'A type of software', correct: false },
                    { text: 'A hardware component', correct: false },
                    { text: 'None of the above', correct: false }
                ],
                explanation: `${parts[0].trim()} means: ${parts[1].trim()}`
            };
        }
    }).filter(q => q !== undefined);

    if (questions.length > 0) {
        currentQuestionIndex = 0;
        score = 0;
        lives = 3;
        scoreElement.innerText = "Score: 0";
        livesElement.innerText = "❤️❤️❤️";
        showQuestion(); // This removes the "Loading..." text
    } else {
        alert("Use this format -> Word : Definition");
    }
});

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    const shuffledAnswers = [...currentQuestion.answers].sort(() => Math.random() - 0.5);

    shuffledAnswers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.style.margin = "5px";
        button.style.display = "block";
        button.style.width = "100%";
        if (answer.correct) button.dataset.correct = "true";
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
        selectedButton.style.color = "white";
        score++;
        scoreElement.innerText = "Score: " + score;
    } else {
        selectedButton.style.backgroundColor = "#dc3545";
        selectedButton.style.color = "white";
        lives--;
        livesElement.innerText = "❤️".repeat(lives > 0 ? lives : 0);
    }

    explanationText.innerText = questions[currentQuestionIndex].explanation;
    explanationContainer.classList.remove('hidden');

    if (lives <= 0) {
        setTimeout(() => {
            alert("Game Over! Final Score: " + score);
            location.reload();
        }, 500);
    }
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        alert("Quiz Finished! Well done.");
        location.reload();
    }
});
           

