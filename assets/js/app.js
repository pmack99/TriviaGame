var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "YES! You are right!",
	incorrect: "STRIKE! You missed it.",
	endTime: "You're Out...    of time!",
	finished: "Alright! Let's look at the scorecard..."
}

var triviaQuestions = [{
	question: "Babe Ruth played for what professional baseball team before joining the Boston Red Sox on July 11, 1914?",
	answerList: ["NY Yankees", "Baltimore Orioles", "NY Giants", "Boston Braves"],
	answer: 1
},{
	question: "What team moved to Washington, D.C. to become the Washington Nationals in 2005?",
	answerList: ["Montreal Expos", "Milwaukee Brewers", "Brooklyn Dodgers", "Kansas CIty Monarchs"],
	answer: 0
},{
	question: "Who has played the most consecutive games of baseball, breaking Lou Gehrig's record on September 6, 1995?",
	answerList: ["Dave Winfield", "Mark McGuire", "Barry Bonds", "Cal Ripken Jr."],
	answer: 3
},{
	question: "What amazing feat did Lee Richmond accomplish in a 1929 Major League Baseball game?",
	answerList: ["Hit a grand slam", "Struck out 6 times in one game", "Pitched a perfect game", "Hit 4 home runs in one game"],
	answer: 2
},{
	question: "Before playing in the Major Leagues, Jackie Robinson played with the minor league Montreal Royals, the top farm club of which organization?",
	answerList: ["Kansas City Royals", "NY Yankees", "Boston RedSox", "Brooklyn Dodgers"],
	answer: 3
},{
	question: "What up-and-coming star player saw his first World Series with the Yankees in 1936 as Babe Ruth's 'replacement'?",
	answerList: ["Lou Gehrig", "Ty Cobb", "Joe DiMaggio", "Mickey Mantle"],
	answer: 2
},{
	question: "What is the oldest active baseball stadium in Major League Baseball?",
	answerList: ["Yankee Stadium", "Fenway Park", "Wrigley Field", "Marlins Park"],
	answer: 1
},{
	question: "What player was accused of using too much pine tar on his bat on July 24, 1983, causing his game-winning home run to be nullified?",
	answerList: ["Dick Howser", "Graig Nettles", "George Brett", "Goose Gossage"],
	answer: 2
},{
	question: "What NBA basketball star made the surprising decision to switch sports, signing a minor league baseball contract with the Chicago White Sox in 1994?",
	answerList: ["Steph Curry", "Michael Jordan", "LeBron James", "Magic Johnson"],
	answer: 1
},{
	question: "Which team hosted the infamous Disco Demolition Night promotional event on July 12, 1979?",
	answerList: ["Seattle Mariners", "Philadelphia Phillies", "Cleveland Indians", "Chicago WhiteSox" ],
	answer: 3
},{
	question: "Who is the only pitcher in Major League Baseball to win a World Series game in three different decades?",
	answerList: ["Jim Palmer", "Nolan Ryan", "Greg Maddux", "Mariano Rivera"],
	answer: 0
},{
	question: "In the mythology surrounding the Chicago Cubs, what curse is responsible for that team not reaching the World Series since 1945?",
	answerList: ["The Curveball Curse", "The Curse of the Billy Goat", "Curse of the Bambino", "The Chicago Fire Curse"],
	answer: 1
},{
	question: "1998 saw a race between the St. Louis Cardinals' Mark McGwire and the Chicago Cubs' Sammy Sosa to break which player's 61 home run record?",
	answerList: ["Babe Ruth", "Barry Bonds", "Willie Mays", "Roger Maris"],
	answer: 3
},{
	question: "What baseball great is known for such colorful sayings as 'It ain't over till it's over'?",
	answerList: ["Yogi Berra", "Whitey Herzog", "Billy Martin", "Honus Wagner"],
	answer: 0
},{
	question: "Who holds the highest career batting average of all time?",
	answerList: ["Pete Rose", "Ichiro", "Ty Cobb", "Don Mattingly"],
	answer: 2
}];


$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#reStartBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		checkAnswer();
	});
}

function countdown(){
	seconds = 7;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 900);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		checkAnswer();
	}
}

function checkAnswer(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); 
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
        $('#message').html(messages.correct);
        $('#correctedAnswer').html('The correct answer is: ' + rightAnswerText);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer is: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer is: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 4000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 4000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#reStartBtn').addClass('reset');
	$('#reStartBtn').show();
	$('#reStartBtn').html('Click here to Start over');
}