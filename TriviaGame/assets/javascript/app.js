var questions = [{
	question: "What year was the National Basketball Association first established?", 
	answers: ["1924","1935", "1946", "1954"],
	correctAnswer: 2
}, {
	question: "Who was the last player to win back-to-back NBA MVP awards after LeBron James pulled off the accomplishment following the 2011-2012 and 2012-2013 seasons?", 
	answers: ["Kevin Durant" , "Steve Nash", "LeBron James", "Shaquille O&#39Neal"],
	correctAnswer: 2
}, {	
	question: "Michael Jordan was drafted third overall in 1984. Which two players were selected ahead of him?", 
	answers: ["Hakeem Olajuwon & Sam Bowie", "Patrick Ewing & Hakeem Olajuwon", "Charles Barkley & Hakeem Olajuwon", "Karl Malone & Sam Bowie"],
	correctAnswer: 0
}, {
	question: "What number did Michael Jordan wear when he came out of retirement for the end of the 1994-1995 season?", 
	answers: ["32", "45", "23","22"],
	correctAnswer: 1
}, {
	question: "Before they were the 'Showtime' Los Angeles Lakers, what US city was home to the franchise?",
	answers: ["Kansas City", "Indianapolis", "Minneapolis", "St. Louis"],
	correctAnswer: 2
}, {
	question: "Since the NBA began handing out Most Valuable Player awards in 1956, who has won the most MVP trophies through the 2013-14 season?", 
	answers: ["Wilt Chamberlain", "Michael Jordan", "Bill Russell", "Kareem Abdul-Jabbar"],	
	correctAnswer: 3
}];

var currentQuestion = 0;
var correctAnswers = 0;
var incorrectAnswers = 0;
var triviaOver = false;

$(document).ready(function(){
	var question, answer1;

	$(".container1").on("click", function(){

		$(".container1").hide();

		timer();

		displayQA();

	});	
	
    $(".answerList").on("click", "li", function() {
	   
	    if ($(this).val() == questions[currentQuestion].correctAnswer) {
	    	
            correctAnswers++;                

	    	stop();

			$(".answerList").find("li").remove();

			$(".question").remove();

			$(".result").show(); 
			$(".result").html("Correct!")

			currentQuestion++;

			setTimeout(function(){  

				$(".result").hide(); 
				if (questions.length !== currentQuestion){
	
					timer();
					displayQA();
				} else {
					gameOver();
				}

			}, 5000);

	    } else {
	    	
            incorrectAnswers++;              

	    	stop();

			$(".answerList").find("li").remove();

			$(".question").remove();

			$(".result").show();
			$(".result").html("Wrong Answer! <br><br> The correct answer was "+questions[currentQuestion].answers[questions[currentQuestion].correctAnswer]);

			currentQuestion++;

			setTimeout(function(){  

				$(".result").hide(); 


				if (questions.length !== currentQuestion){

					timer();

					displayQA();
				} else {
					gameOver();
				}

			}, 5000);

	    }

	});
	

});

function highlightAnswer() {
	$(".answer").mouseover(function(){
		$(this).addClass("highlight-yellow");
	 });

	$(".answer").mouseout(function(){
		$(this).removeClass("highlight-yellow");
	 });
}

function displayQA() {

   var question = questions[currentQuestion].question;

   console.log("question: "+question);
   console.log("currentQuestion: "+currentQuestion);
   var questionClass = ".question";

   var answerList = ".answerList";
    var numAnswers = questions[currentQuestion].answers.length;

     var theQuestion = $('<div>');
		 theQuestion.addClass('question');
		 theQuestion.text(question);
		 $(".questionContainer").html(theQuestion);

    $(answerList).find("li").remove();

    var choice;
    for (i = 0; i < numAnswers; i++) {
        answer = questions[currentQuestion].answers[i];

        $('<li class="answer" value="'+i+'">' + answer + '</li>').appendTo(answerList);
    }

    highlightAnswer();
}

function resetQA() {
    currentQuestion = 0;
    correctAnswers = 0;
}

function timer() {
	var number = 33;
	var audio = new Audio("assets/mp3/Jeopardy-theme-song.mp3");

    function run(){
      counter = setInterval(decrement, 1000);
      
    }
    function decrement(){
      number--;

      $('#show-number').html("Time Remaining: "+number);
      if (number === 0){
        stop();
        outOfTime();
      }
    }

  run();
}

function stop() {
    clearInterval(counter);
 }

 function outOfTime() {

	$(".answerList").find("li").remove();


	$(".question").remove();

	$(".result").show(); 
	$(".result").html("Out Of time! <br><br> The correct answer was "+questions[currentQuestion].answers[questions[currentQuestion].correctAnswer]);

	currentQuestion++;

	setTimeout(function(){  

		$(".result").hide();

		timer();

		displayQA();

	}, 5000);
 }

 function gameOver() {

	stop();

	$(".answerList").find("li").remove();

	$(".question").remove();

	$(".result").show();
	$(".result").html("Game over! <br><br>");
	$(".result").append("Correct Answers: "+correctAnswers+"<br><br>Incorrect Answers: "+incorrectAnswers);

 }





