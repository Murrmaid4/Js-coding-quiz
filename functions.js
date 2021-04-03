var nextQuestionIndex = 0;
var time = questions.length * 15;
// first variable is used in our question selection function and second variable will be used in our time interval to set time for each question

var startBtn = document.querySelector("#begin");
var questionsEl = document.querySelector("#questionScreen");
var timerEl = document.querySelector("#time");
var optionsEl = document.querySelector("#options");
var endScreenEl = document.querySelector("#endGame");

// these variables select the id's in the html

function beginQuiz() {
  var firstScreen = document.querySelector("#start");
  //grabs the div in html

  firstScreen.setAttribute("class", "hide");
  // this variable (which is whats selecting the html) will set an attribute of the class hidden which is the display none property set up in my css to hide the first screen

  questionsEl.removeAttribute("class");
  //this removes the hidden class i have set up for the variable

  setTime();
  getNextQuestion();
}

startBtn.onclick = beginQuiz;
//  this event runs the function I created when the start button is clicked

function getNextQuestion() {

  if (nextQuestionIndex >= questions.length) {
    //if this number that is nextQuestionIndex is greater than or equal to the length of my questions array...
    endGame();
    //..run the endGame function 
 }
  var nextQuestion = questions[nextQuestionIndex];
  //grabs the first question from that var made above in the questions array
  var fullQuestion = document.querySelector("#fullQuestion");
  //selects the h2 element on the page so i can place the questions in there
  fullQuestion.textContent = nextQuestion.title;
  // puts the content from var next question title, to the element in var full questions

  var optionsEl = document.querySelector("#options");
  //selects the options div tag so I can places my choices in there 
  
  var choices = questions[nextQuestionIndex]
  //this grabs the questions array and starts at the very first index

  optionsEl.textContent = choices.choices
  //this pushes the choices from my choices array to the options div 
 
  for (var i = 0; i < nextQuestion.choices.length; i++) 
  // starting at the first index, so long as i is less than the length of the choices section in our array it will increment

  {
    var userChoice = document.createElement("button");
    //here we are creating the buttons our choices will be added to 

    userChoice.setAttribute("class", "options");
    //sets the class of the new attribute ive created

    userChoice.setAttribute("value", nextQuestion.choices[i]);
    //sets the value of the button just created with the choices in my index

    userChoice.textContent = i + 1 + "." + nextQuestion.choices[i];
    //sets the text content of the boxes to number for each choice

    userChoice.onclick = getAnswer;
    //when an answer is clicked, it runs the function get answer to get either correct or incorrect 

    optionsEl.appendChild(userChoice);
    //this puts these choices on the document itself
  }



  function getAnswer() {
    
    if (this.value === questions[nextQuestionIndex].answer) 
    //if the value clicked is equal to what is written in the answer part of the array...
    {
      alert("Correct!"); 
      //alert the user they are correct

      nextQuestionIndex++;
      //then increment to the next question
       
      getNextQuestion();
      //then run the getNextQuestion function again
    } 
    else 
    //if the value isn't equal then do this action..
    {
      alert("Wrong!");
      //alert the user they are wrong
      time -= 10;
      //deduct 10 seconds from the timer created 
      getNextQuestion();
      //then run the nextquestion function
    }
  }
}

function endGame() {
  questionsEl.setAttribute("class", "hide");
  //puts the hide class on my questions section
  endScreenEl.removeAttribute("class");
  //unhides my end screen div
}


function setTime() {
  var counter = setInterval(function ()
  //this variable sets the interval for the timer to countdown
  {
    time--;
    //this goes from the time var defined globally which is my starting number
    timerEl.textContent = time + " second(s)";
    //this displays the timer on the page

    if (time <= 0)
    //if my time variable hits a number less than or equal to zero.. 
    {
      endGame(); 
      //it will run my end game function 
      clearInterval(counter);
      // Stops execution of action at set interval
   
    }
  }, 1000);
}

