


// const url = `https://api.disneyapi.dev/characters`

// async function disneyData() {
//   const response = await fetch(url);
//   const json = await response.json();
//   return json
// }

// disneyData().then(json => {
//   json;
//   console.log(json.data[1])
// });

// const disneyName = Object.values(url).map((item) => item.name);
// console.log(disneyName)

// console.log(disneyData()[Math.floor(Math.random()*disneyData().length)])

// const url = `https://api.disneyapi.dev/characters`

// async function fetchDisneyData() {
//   const response = await fetch(url);
//   const json = await response.json();
//   sampleCharacter(json.data);
// }

// const sampleCharacter = (data) => (
//   console.log(data[Math.floor(Math.random()*data.length)]));
// ;

// fetchDisneyData();

// // CLICK FUNCTIONS

// const choice = document.querySelectorAll('.clickable');

// const toggleActiveClass = (event) => {
//   event.currentTarget.classList.toggle('active');
// };

// const toggleActiveOnClick = (choice) => {
//   choice.addEventListener('click', toggleActiveClass);
// };

// choice.forEach(toggleActiveOnClick);


const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
      question: 'Inside which HTML element do we put the JavaScript??',
      choice1: '<script>',
      choice2: '<javascript>',
      choice3: '<js>',
      choice4: '<scripting>',
      answer: 1,
  },
  {
      question:
          "What is the correct syntax for referring to an external script called 'xxx.js'?",
      choice1: "<script href='xxx.js'>",
      choice2: "<script name='xxx.js'>",
      choice3: "<script src='xxx.js'>",
      choice4: "<script file='xxx.js'>",
      answer: 3,
  },
  {
      question: " How do you write 'Hello World' in an alert box?",
      choice1: "msgBox('Hello World');",
      choice2: "alertBox('Hello World');",
      choice3: "msg('Hello World');",
      choice4: "alert('Hello World');",
      answer: 4,
  },
];

const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
      return window.location.assign('/end.html');
  }
  questionCounter++;
  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
      const number = choice.dataset['number'];
      choice.innerText = currentQuestion['choice' + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener('click', (e) => {
      if (!acceptingAnswers) return;

      acceptingAnswers = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset['number'];
      getNewQuestion();
  });
});

startGame();
