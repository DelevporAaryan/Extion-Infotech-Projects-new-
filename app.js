const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');



const exitBtn = document.querySelector('.exitBtn');
const resultDiv = document.querySelector('.result');


// Make an array of objects that stores question, choices of question and answer
const quiz = [
    {
        question: "Which of the following is not a css box model property?",
        choices: ["margin", "padding", "border-radius", "border-collapse"],
        answer: "border-collapse"
    },
    {
        question: "What does HTML stand for?",

        choices: ["Hyper Text Makeup Language", "Hyper Transfer Markup Language", "Hyper Text Markup Language", "High Text Markup Language"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which CSS property is used to control the spacing between elements?",

        choices: ["margin", "padding", "spacing", "gutter"],
        answer: "margin"
    },
    {
        question: "Which of the following is a server-side scripting language?",

        choices: ["JavaScript", "PHP", "CSS", "HTML"],
        answer: "PHP"
    },
    {
        question: "What is the purpose of JavaScript in web development?",

        choices: ["Styling", "Animation", "Client-side scripting", "Database management"],
        answer: "Client-side scripting"
    },
    {
        question: "What is the purpose of the HTTP protocol in web development?",

        choices: ["Hypertext Transfer Protocol", "Hyperlink and Text Transfer Protocol", "Hypertext and Text Transfer Protocol", "Hyper Transfer and Text Protocol"],
        answer: "Hypertext Transfer Protocol"
    },
    {
        question: "Which of the following is not a valid HTTP status code?",

        choices: ["200 OK", "404 Not Found", "500 Internal Server Error", "303 Page Moved"],
        answer: "303 Page Moved"
    },
    {
        question: "What does AJAX stand for in web development?",

        choices: ["Asynchronous JavaScript and XML", "Advanced JavaScript and XML", "Asynchronous Java and XHTML", "Automated JavaScript and XML"],
        answer: "Asynchronous JavaScript and XML"
    },
    {
        question: "Which of the following is a front-end framework for web development?",

        choices: ["Express.js", "Django", "Angular", "Flask"],
        answer: "Angular"
    },
    {
        question: "What is the purpose of the 'viewport' meta tag in HTML?",

        choices: ["Set the background color of the page", "Control the layout and scaling of the viewport", "Define the page title", "Embed external stylesheets"],
        answer: "Control the layout and scaling of the viewport"
    },
    {
        question: "Which of the following is not a valid HTTP method?",

        choices: ["GET", "POST", "UPDATE", "DELETE"],
        answer: "UPDATE"
    },
    {
        question: "What does CSS stand for in web development?",

        choices: ["Cascading Style Sheet", "Computer Style Sheet", "Creative Style Sheet", "Conditional Style Sheet"],
        answer: "Cascading Style Sheet"
    },
    {
        question: "Which of the following is used to store data on the client side in web development?",

        choices: ["Cookies", "Sessions", "Databases", "Local storage"],
        answer: "Local storage"
    },
    {
        question: "What is the purpose of the 'box-sizing' property in CSS?",

        choices: ["To control the box model of an element", "To set the background color of an element", "To define the position of an element", "To specify the font size of an element"],
        answer: "To control the box model of an element"
    },
    {
        question: "Which of the following is not a valid semantic HTML tag?",

        choices: ["<header>", "<div>", "<article>", "<footer>"],
        answer: "<div>"
    },
    {
        question: "What does the acronym API stand for in web development?",

        choices: ["Application Programming Interface", "Advanced Programming Interface", "Automated Programming Interface", "Application Protocol Interface"],
        answer: "Application Programming Interface"
    },
    {
        question: "What is the purpose of the 'this' keyword in JavaScript?",

        choices: ["To refer to the current instance of a class", "To create a new object", "To access a static method", "To indicate the end of a class definition"],
        answer: "To refer to the current instance of a class"
    },
    {
        question: "Which CSS property is used to change the text color of an element?",

        choices: ["text-color", "color", "font-color", "text-style"],
        answer: "color"
    },
    {
        question: "What is the purpose of the 'addEventListener' method in JavaScript?",

        choices: ["To add a new HTML element", "To define a new function", "To handle events on HTML elements", "To create a loop"],
        answer: "To handle events on HTML elements"

    },
    {
        question: "Which of the following is not a valid HTML form input type?",

        choices: ["text", "number", "boolean", "date"],
        answer: "boolean"
    },
    {
        question: "What is the purpose of the 'localStorage' object in JavaScript?",

        choices: ["To store data on the server", "To store data on the client side", "To define a new variable", "To create a new function"],
        answer: "To store data on the client side"
    },
    {
        question: "Which CSS property is used to control the order of flexible items in a flex container?",

        choices: ["order", "flex-order", "item-order", "flex-item"],
        answer: "order"
    },
    {
        question: "In JavaScript, what is the purpose of the 'setTimeout' function?",

        choices: ["To define a timeout for an HTTP request", "To set a timer for executing a function", "To delay the loading of a webpage", "To create a loop"],
        answer: "To set a timer for executing a function"
    },
    {
        question: "What is the purpose of the 'target' attribute in HTML links?",

        choices: ["To specify the URL of the link", "To open the link in a new window", "To define the link text", "To specify where to open the linked document"],
        answer: "To specify where to open the linked document"
    },
    {
        question: "Which of the following is a valid way to comment out multiple lines in HTML?",

        choices: ["<!-- This is a comment -->", "// This is a comment", "/* This is a comment */", "# This is a comment"],
        answer: "/* This is a comment */"
    }
];

// Making Variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

// Arrow Function to Show Questions
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            // Remove 'selected' class from all choices
            const allChoices = document.querySelectorAll('.choice');
            allChoices.forEach(choice => choice.classList.remove('selected'));

            // Add 'selected' class only to the clicked choice
            choiceDiv.classList.add('selected');
        });
    }

    if(currentQuestionIndex < quiz.length){
        startTimer();
    }
}

// Function to check answers
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        // alert("Correct Answer!");
        displayAlert("Correct Answer!");
        score++;
    }
    else {
        // alert("Wrong answer");
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }
    timeLeft = 45;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    }
    else {
        stopTimer();
        showScore();
    }
}

// // Function to show score
// const showScore = () => {
//     questionBox.textContent = "";
//     choicesBox.textContent = "";
//     scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
//     displayAlert("You have completed this quiz!");
//     nextBtn.textContent = "Play Again";
//     quizOver = true;
//     timer.style.display = "none";
// }

// Function to Show Alert
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display = "none";
    }, 2000);
}

// Function to Start Timer
const startTimer = () => {
    clearInterval(timerID); // Check for any exist timers
    timer.textContent = timeLeft;

    const countDown = ()=>{
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            const confirmUser = confirm("Time Up!!! Do you want to play the quiz again");
            if(confirmUser){
                timeLeft = 45;
                startQuiz();
            }
            else{
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000);
}

// Function to Stop Timer
const stopTimer = () =>{
    clearInterval(timerID);
}

// Function to shuffle question
const shuffleQuestions = () =>{
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

// Function to Start Quiz
const startQuiz = () =>{
    timeLeft = 45;
    timer.style.display = "flex";
    shuffleQuestions();
}

// Adding Event Listener to Start Button
startBtn.addEventListener('click', ()=>{
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        // alert("Select your answer");
        displayAlert("Select your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else {
        checkAnswer();
    }
});




// // Add an event listener for the exit button
// exitBtn.addEventListener('click', () => {
//     container.style.display = 'none';
//     resultDiv.style.display = 'block';
//     resultDiv.textContent = `You scored ${score} out of ${quiz.length}!`;
// });

// // Modify the showScore function to display the result div
// const showScore = () => {
//     questionBox.textContent = "";
//     choicesBox.textContent = "";
//     scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
//     displayAlert("You have completed this quiz!");
//     resultDiv.style.display = 'block'; // Display the result div
//     nextBtn.textContent = "Play Again";
//     quizOver = true;
//     timer.style.display = "none";
// };



// Add an event listener for the exit button
exitBtn.addEventListener('click', () => {
    container.style.display = 'none';
    resultDiv.style.display = 'none'; // Hide the result div
    startBtn.style.display = 'block'; // Show the start button
});



// Modify the showScore function to correctly display the result
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    resultDiv.textContent = `You scored ${score} out of ${quiz.length}!`; // Update the result div content
    resultDiv.style.display = 'block'; // Display the result div
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
};
