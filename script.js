var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var questionContainerElement = document.getElementById("question-container")
var questionElement = document.getElementById("question")
var answerButtonsElement = document.getElementById("answer-button")
var timer = document.getElementById("txt")
var endButton = document.getElementById("end-btn")
let shuffledQueshions, currentQueshionIndex

var score = 0

var secondsLeft = 30

function setTime() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timer.textContent = secondsLeft + " seconds left till finish Quiz.";
        if (secondsLeft === 0) {
            clearInterval(timerInterval);
        }

    }, 1000);
}

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQueshionIndex++
    setNextQuestion()
})





function startGame() {
    shuffledQueshions = questions.sort(() => Math.random() - .5)
    currentQueshionIndex = 0
    startButton.classList.add("hide")
    questionContainerElement.classList.remove("hide")
    setNextQuestion()
    setTime()



}

function setNextQuestion() {
    resetStates()
    showQuestion(shuffledQueshions[currentQueshionIndex])
        //console.log(currentQueshionIndex)
    if (currentQueshionIndex >= 4) {
        endQuiz()
    }

}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct

        }
        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button)
    })

}

function selectAnswer(e) {
    var selectedButton = e.target
    var correct = selectedButton.dataset.correct
    if (correct) {
        score++
    }

    setStatusClass(document.body, correct)

    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })

    if (shuffledQueshions.length > currentQueshionIndex + 1) {
        //console.log(shuffledQueshions.length)
        //console.log(currentQueshionIndex)
        nextButton.classList.remove("hide")

    } else {
        startButton.classList.remove = ("hide")
        startButton.innerText = "Restart"
            //console.log("My score is " + score)
            //startButton.classList.remove = ("hide")
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")

    } else {
        element.classList.add("wrong")

    }
}

function clearStatusClass(element) {
    element.classList.remove("wrong")
    element.classList.remove("wrong")
    element.classList.remove("correct")
    element.classList.remove("wrong")
}

function resetStates() {
    clearStatusClass(document.body)
    nextButton.classList.add("hide")
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)

    }

}

function endQuiz() {
    endButton.innerText = "Quiz Over. Your score: " + score * 100 / 5 + " %"
    nextButton.classList.add('hide')
    endButton.classList.remove('hide')
        //console.log("The End")

}

var questions = [{
        question: "What is tha capital city of Washington State?",
        answers: [
            { text: "Seattle", correct: false },
            { text: "Redmond", correct: false },
            { text: "Olimpia", correct: true },
            { text: "Renton", correct: false }
        ]
    },
    {
        question: "What is the capital city of Ukraine?",
        answers: [
            { text: "Kiev", correct: true },
            { text: "Shostka", correct: false },
            { text: "Odessa", correct: false },
            { text: "Harkov", correct: false }
        ]

    },
    {
        question: "What is 100/50?",
        answers: [
            { text: "10", correct: false },
            { text: "0", correct: false },
            { text: "2", correct: true },
            { text: "5", correct: false }
        ]

    },
    {
        question: "What is the current President of USA?",
        answers: [
            { text: "George Washington", correct: false },
            { text: "Donald Trump", correct: true },
            { text: "Barack Obama", correct: false },
            { text: "Bill Clinton", correct: false }
        ]
    },
    {
        question: "Who is Michael Jackson ?",
        answers: [
            { text: "Artist", correct: false },
            { text: "Singer", correct: true },
            { text: "President", correct: false },
            { text: "Engineer", correct: false }
        ]


    }

]