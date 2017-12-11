'use strict';

//In-memory databse of questions
const questionList = [
  
  //First question
  {
    question: 'What planet is Rey from?',
    answerOptions: [
      'Jakku',
      'Tatooine',
      'Endor',
      'Taris'
    ],
    correctAnswer: 'Jakku',
    answerSelect: 1
  },
  //Second question
  {
    question: 'What color is Lukes lightsaber in Return of the jedi?',
    answerOptions: [
      'Purple',
      'Blue',
      'Green',
      'Red'
    ],
    correctAnswer: 'Green',
    answerSelect: 2
  },
  //Third question
  {
    question: 'What is the group of dark side users that Kylo Ren leads?',
    answerOptions: [
      'Knights of Ren',
      'The First Order',
      'The Sith Order',
      'Acolytes of Snoke'
    ],
    correctAnswer: 'Knights of Ren',
    answerSelect: 3
  },
  //Fourth Question
  {
    question: 'What movie does Emperor Palpatine first appear in?',
    answerOptions: [
      'Episode 6',
      'Episode 5',
      'Episode 1',
      'Episode 4'
    ],
    correctAnswer: 'Episode 5',
    answerSelect: 4
  },
];

//Create your initial store
const store = {
  view: 'start',
  currentQuestion: questionList[1].question,
  score: 0,
  totalQuestions: 4
};

console.log(store.currentQuestion);

//Template generators

let randomQuestion; //Fix global variable issue!

//Function generates a random question to be inserted
//by the generate answer list function
function generateRandomQuestion() {
  randomQuestion = questionList.find(item => item.answerSelect ===  Math.floor(Math.random() * (questionList.length) + 1));
  console.log(randomQuestion);
  return randomQuestion;
}

//This function generates an new answer list with a 
//random question passed in
function generateAnswerList(QuestionGenerator) {
  QuestionGenerator();
  console.log(randomQuestion);
  $('.question-title-container').html(`${randomQuestion.question}`)
  $('.question-list').html(`<input type="radio" name="clicked-question" value='${randomQuestion.answerOptions[0]}'>
  <label for="form-option-1">${randomQuestion.answerOptions[0]}</label>
  <input type="radio" name="clicked-question" value='${randomQuestion.answerOptions[1]}'>
  <label for="form-option-2">${randomQuestion.answerOptions[1]}</label>
  <input type="radio" name="clicked-question" value='${randomQuestion.answerOptions[2]}'>
  <label for="form-option-3">${randomQuestion.answerOptions[2]}</label>
  <input type="radio" name="clicked-question" value='${randomQuestion.answerOptions[3]}'>
  <label for="form-option-4">${randomQuestion.answerOptions[3]}</label>`)
  ;
}

//Rendering functions
function render(){
  if (store.view === 'start'){
    $('.start').show();
    $('.quiz').hide();
    $('.status').hide();
    $('.results').hide();
  }
  else if (store.view === 'quiz') {
    $('.quiz').show();
    $('.start').hide();
    $('.status').show();
  }
}

//Event handlers

//Button that begins the game
function handleQuizStartSubmitted() {
  $('.js-start-btn').click(event => {
    event.preventDefault();    
    store.view = 'quiz';
    console.log('Start button submitted');  
    console.log(store.view); 
    render();
  });
}

//Button that submits the user's answer
function handleAnswerSubmitted() {
  $('#answer-submit-form').submit( event => {
    event.preventDefault();  
    let submittedAnswer = $('input[name=\'clicked-question\']:checked').val();
    console.log(submittedAnswer);
    console.log(randomQuestion.correctAnswer);
    if (submittedAnswer === randomQuestion.correctAnswer) {
      console.log('You got it right!');
      userCorrectAnswerSubmitted(submittedAnswer);
    }
    else {
      console.log('Wrong!!');
    }
    store.view === 'quiz';
    render();
    return submittedAnswer;
  });
}

//Create a function that handles if the user was correct
function userCorrectAnswerSubmitted(answer) {
  store.score++;
  $('.correct-updater').html(`Correct: ${store.score} / ${store.totalQuestions}`);
}
//Create a function that handles if the user was incorrect
function userInCorrectAnswerSubmitted(answer) {
  
}

//Button that resets the game
function handleStartOverSubmitted(){
  $('.js-startover-btn').click(event => {
    event.preventDefault();        
    store.view = 'start';
    store.score = 0;
    $('.correct-updater').html(`Correct: ${store.score} / ${store.totalQuestions}`);
    console.log('Start Over Button submitted');
    console.log(store.view);
    render();
    generateAnswerList(generateRandomQuestion);
  });
}


//Function that initializes all event listeners when DOM is ready
function handleQuizEventListeners() {
  //Place all event listeners here
  render();
  handleQuizStartSubmitted();
  handleStartOverSubmitted();
  handleAnswerSubmitted();
  generateAnswerList(generateRandomQuestion);
}

$(handleQuizEventListeners);
