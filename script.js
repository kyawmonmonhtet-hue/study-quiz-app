const paragraphInput = document.getElementById('paragraph-input');
const convertBtn = document.getElementById('convert-btn');
const noteInput = document.getElementById('note-input');
const generateBtn = document.getElementById('generate-btn');
const notesPreviewArea = document.getElementById('notes-preview-area');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const livesElement = document.getElementById('lives');
const scoreElement = document.getElementById('score');

let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let lives = 3;

// STEP 1: Turn Paragraph into "Word : Definition"
convertBtn.addEventListener('click', () => {
    const text = paragraphInput.value;
    // This looks for "is" or "means" or "are" to find definitions
    const sentences = text.split(/[.!?]/); 
    let autoNotes = "";

    sentences.forEach(sentence => {
        if (sentence.toLowerCase().includes(" is ")) {
            let parts = sentence.split(/ is /i);
            autoNotes += `${parts[0].trim()} : ${parts[1].trim()}\n`;
        } else if (sentence.toLowerCase().includes(" are ")) {
            let parts = sentence.split(/ are /i);
            autoNotes += `${parts[0].trim()} : ${parts[1].trim()}\n`;
        }
    });

    if (autoNotes) {
        noteInput.value = autoNotes;
        notesPreviewArea.classList.remove('hidden');
        alert("Found some definitions! Check them below.");
    } else {
        alert("Try using sentences like: 'A Byte is 8 bits.'");
    }
});

// STEP 2: The Quiz Logic (Same as before)
generateBtn.addEventListener('click', () => {
    const lines = noteInput.value.trim().split('\n');
    questions = lines.map(line => {
        const parts = line.split(':');
        if (parts.length >= 2) {
            return {
                question: `What is ${parts[0].trim()}?`,
                answers: [
                    { text: parts[1].trim(), correct: true },
                    { text: 'A computer brand', correct: false },
                    { text: 'A type of software', correct: false },
                    { text: 'Input data', correct: false }
                ],
                explanation: parts[1].trim()
            };
        }
    }).filter(q => q !== undefined);

    if (questions.length > 0) {
        currentQuestionIndex = 0;
        score = 0;
        lives = 3;
        showQuestion();
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
        button.style.display = "block";
        button.style.width = "100%";
        button.style.margin = "5px 0";
        if (answer.correct) button.dataset.correct = "true";
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const isCorrect = e.target.dataset.correct === "true";
    if (isCorrect) {
        e.target.style.backgroundColor = "#28a745";
        score++;
        scoreElement.innerText = "Score: " + score;
    } else {
        e.target.style.backgroundColor = "#dc3545";
        lives--;
        livesElement.innerText = "❤️".repeat(lives);
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if (lives <= 0) {
            alert("GameOver! Try again.");
            location.reload();
        } else if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            alert("Quiz Complete! Score: " + score);
            location.reload();
        }
    }, 1000);
}
        

