//set timer
/*
setTimeout(function(){
  oneMin();
},60000);

function oneMin() {
  $("#clock").html("<h2>1mins</h2>");
  console.log();
}  */
//$(document).ready(function(){

window.onload = function() {
    $("#wrapper").hide();
    $("#time-left").hide();
    $("#start").on("click", startClock.start);
    $("#start").on("click", function(){
      $("#wrapper").show();
      $("#time-left").show();

    });
    $("#restart").on("click", startClock.reset);

console.log("hello");
    //$(this).hide();
    $("#done").on("click", startClock.stop);
 //onclick
 }//window onload
//timer
// set timers from Dani`s Stop watch in class
var intervalId;
var clockRunning = false;
var startClock = {
  time: 30,


reset: function(){
  startClock.time = 30;
  $("#time-left").html("00:10");
},
start: function() {
  if(!clockRunning) {
    intervalId = setInterval(startClock.count, 1000);
    clockRunning = true;
  }
},
stop: function() {
  clearInterval(intervalId);
  clockRunning = false;
},
count: function() {
  startClock.time--;
  var converted = startClock.timeConverter(startClock.time);
  console.log(converted);
  $("#time-left").html(converted);
  if(startClock.time === -startClock.time){
    var message = "Times-Up";
    alert(message);
    clearInterval(intervalId);
    clockRunning = false;
  }
},
timeConverter: function(t) {
  var minutes = Math.floor( t / 60);
  var seconds = t - (minutes * 60);

  if ( seconds < 10) {
    seconds = "0" + seconds;
  }
  if (minutes === 0) {
    minutes = "00";
  }
  else if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return minutes + ":" + seconds;
}
};

//set timer of mine works ok.. but I don`t like it
/*function boTimer(duration) {

    var timer = duration * 20;
    var minutes, seconds;

    var interval = setInterval(function(){

        minutes = parseInt(timer / 60 % 60, 10);
        seconds = parseInt(timer % 60, 10);


        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;


        $('#time-min').text(minutes);
        $('#time-sec').text(seconds);

        if (--timer < 0) {
            timer = 0;
            alert("bam");
            clearInterval(interval);
        }
    }, 1000);
}

boTimer(1); //timer closed
*/
/*function stop(){
  var interval = setInterval(function(){
    minutes = parseInt(timer / 60 % 60, 10);
    seconds = parseInt(timer % 60, 10);


    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;


    $('#time-min').text(minutes);
    $('#time-sec').text(seconds);
  })
    // Clears our "counter" interval. The interval name is passed to the clearInterval function.
        clearInterval(interval);
    }*/





// var array for question /answer
var game = {
		questions: [
		{
	   		question: 'what is a breed of Queen`s dog ??',
	   		possibles: ['Pembroke Welsh Corgi', 'English Bulldog', 'Mix', 'australian shepherd'],
	   		id: 'firstQue',
	   		answer: 0
		}, {
        question: 'what is the name of the biggest doggie meet up in bay area?',
        possibles: ['English Bulldog', 'Corgi Con', 'samll breed', 'golden retriever'],
        id: 'secQue',
        answer: 1
  }, {
        question: 'what is the name of my dog ?',
        possibles: ['Tobi', 'Audrey', 'Seba', 'Cookie'],
        id: 'thirdQue',
        answer: 2
}, {
        question: 'how old she is ?',
        possibles: ['2', '3', '4', '1'],
        id: 'fourQue',
        answer: 1
}, {
        question: 'what is her name meaning',
        possibles: ['Crystal', 'Treasure', 'Star', 'No meaning'],
        id: 'fifQue',
        answer: 3
} ]};


//
function quiz(data) {
  var questionIs = "<form id='questionOne'>"+ data.question +"<br>";
  var possibles = data.possibles;

  for (var i = 0; i < possibles.length; i++) {
		var possible = possibles[i];
		console.log(possible);
		questionIs = questionIs + "<input type='radio' name='"+data.id+"' value="+ i +">"+possible;

	}
	return questionIs + "</form>";
}
window.quiz = quiz;
//
function buildQuestions(){
	var questionHTML = ''
	for (var i = 0; i<game.questions.length; i++) {
		questionHTML = questionHTML + quiz(game.questions[i]);
	}
	$('#questions-container').append(questionHTML);
}
//
function isCorrect(question){
	var answers = $('[name='+question.id+']');
	var correct = answers.eq(question.answer);
	var isChecked = correct.is(':checked');
	return isChecked;
}
// call the buildQuestions function
buildQuestions();
//
// function to build the display of guesser results
function resultsTemplate(question){
	var htmlBlock = '<div>'
	htmlBlock = htmlBlock + question.question + ': ' + isChecked;
	return htmlBlock + "</div>";
}

// function to tabulate the guesser results
function checkAnswers (){

// variables needed to hold results
	var resultsHTML = '';
	var guessedAnswers = [];
	var correct = 0;
	var incorrect = 0;
	var unAnswered =0

// for loop iterates through each question and passes the questions at each index first into
// the isCorrect function to see if they match the indices of correct answers, and if they do,
// increments up the correct score
	for (var i = 0; i<game.questions.length; i++) {
		if (isCorrect(game.questions[i])) {
			correct++;
		} else {
// then this statement runs the questions at each index through the checkAnswered function
// to determine whether the user clicked an answer, or did not click an answer, so that
// incorrect and unAnswered scores can be delineated from each other
			if (checkAnswered(game.questions[i])) {
				incorrect++;
			} else {
				unAnswered++;
			}
		}

	}
// display the results of the function in the results div and use strings of text to relate the
// results of the for loop with their corresponding values
	$('.results').html('correct: '+correct+ "<br>" +'incorrect: '+incorrect+ "<br>" +'unanswered: '+unAnswered);
}

// this function checks whether the guesser actually checked an answer for each of the
// questions
function checkAnswered(question){
	var anyAnswered = false;
	var answers = $('[name='+question.id+']');
// the for loop creates a condition to check if the buttons were checked and and then sets
// the anyAnswered variable to true if they were
	for (var i = 0; i < answers.length; i++) {
		if (answers[i].checked) {
			anyAnswered = true;
		}
	}
// then return the anyAnswered variable so it can be tabulated in the last function to distinguish
// between incorrect answers and those answers that were not attempted
	return anyAnswered;

}
//
$('#done').on('click', function() {
	checkAnswers();
	stop();
	$("#messageDiv").html("Good Job ~!");
	})



//});//document


/*  var count = 60;
$("#button").on("click", function(start){
  $("#count").html(count);
});

//start: function() {

//} */

 //document closed
