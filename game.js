const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];


// getRandomCharacter().then(data => exampleFunctionCalledAfterAsyncReturns(data));

// async function getRandomCharacter() {

// id = Math.floor(Math.random() * 7400);;
// request = 'https://api.disneyapi.dev/characters/' + id;
// let response = await fetch(request);
// let data = await response.json()
// return data;
// }

// function exampleFunctionCalledAfterAsyncReturns(data) {
// console.log(data.imageUrl)
// console.log(data.name)
// console.log(data)
// }


let questions = [
  {
    question: `<img src="https://static.wikia.nocookie.net/disney/images/4/4a/Treasureplanet069.jpg" alt="">`,
    choice1: "Billy Bones",
    choice2: "Genius",
    choice3: "Boudreaux",
    choice4: "Sven",
    answer: 1
  },
  {
    question: `<img src="https://static.wikia.nocookie.net/disney/images/2/29/Profile_-_Bolt.jpeg" alt="">`,
    choice1: "Amy Duncan",
    choice2: "Rizza",
    choice3: "Bolt",
    choice4: "Vanellope Von Schweez",
    answer: 3
  },
  {
    question: `<img src="https://static.wikia.nocookie.net/disney/images/5/52/Profile_-_Bashful.png" alt="">`,
    choice1: "Elfonso",
    choice2: "Eli the Elf",
    choice3: "U-God",
    choice4: "Bashful",
    answer: 4
  },
  {
    question: `<img src="https://static.wikia.nocookie.net/disney/images/3/31/Kerchak_Tarzan.jpg" alt="">`,
    choice1: "Kerchak",
    choice2: "Surak",
    choice3: "Cappa",
    choice4: "Diago",
    answer: 1
  },
  {
    question: `<img src="https://static.wikia.nocookie.net/disney/images/3/31/Profile_-_The_Sultan.jpeg" alt="">`,
    choice1: "Vulcan",
    choice2: "Sultan",
    choice3: "Deck",
    choice4: "Roddy",
    answer: 2
  },
  {
    question: `<img src="https://static.wikia.nocookie.net/disney/images/3/3a/Profile_-_Mowgli.jpeg" alt="">`,
    choice1: "Kim",
    choice2: "GhostFace",
    choice3: "Hugo",
    choice4: "Mowgli",
    answer: 4
  },
  {
    question: `<img src="https://static.wikia.nocookie.net/disney/images/2/23/Hannah_Montana_%28character%29.jpg" alt="">`,
    choice1: "Annie James",
    choice2: "Ella",
    choice3: "Hanna Montana",
    choice4: "Ol' Dirty",
    answer: 3
  },
  {
    question: `<img src="https://static.wikia.nocookie.net/disney/images/4/43/Zeus_Hercules_97.jpg" alt="">`,
    choice1: "Zevon",
    choice2: "Papa Goof",
    choice3: "Meth",
    choice4: "Zeus",
    answer: 4
  },
  {
    question: `<img src="https://static.wikia.nocookie.net/disney/images/1/17/Profile_-_Mushu.jpeg" alt="">`,
    choice1: "Mushu",
    choice2: "Albert",
    choice3: "Raekwon",
    choice4: "Heggy",
    answer: 1
  },
  {
    question: `<img src="https://static.wikia.nocookie.net/disney/images/1/1f/Profile_-_Lilo.png" alt="">`,
    choice1: "Busta",
    choice2: "Lilo",
    choice3: "Rachel",
    choice4: "Lady",
    answer: 2
  },
  {
    question: `<img src="https://static.wikia.nocookie.net/disney/images/9/9c/Profile_-_WALL-E.png" alt="">`,
    choice1: "Awesomo",
    choice2: "WALL-E",
    choice3: "MF DOOM",
    choice4: "Sebastion",
    answer: 2
  },
  {
    question: `<img src="https://static.wikia.nocookie.net/disney/images/6/60/Profile_-_Flounder.jpeg" alt="">`,
    choice1: "Flounder",
    choice2: "Reggie",
    choice3: "Flotsam",
    choice4: "Arnold",
    answer: 1
  },
  {
    question: `<img src="https://static.wikia.nocookie.net/disney/images/f/f0/Profile_-_Jiminy_Cricket.jpeg" alt="">`,
    choice1: "Chris One",
    choice2: "Leonard",
    choice3: "Mustafa",
    choice4: "Jiminy Cricket",
    answer: 4
  },
];

const correct_bonus = 10;
const max_questions = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= max_questions) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${max_questions}`;


  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerHTML = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(correct_bonus);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
