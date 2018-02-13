const tile = ["", "#button1", "#button2", "#button3", "#button4"];
const audio = ["", "#audio1", "#audio2", "#audio3", "#audio4"];
const max_level = 20;
var button = document.getElementsByClassName("square");
var level_div = document.getElementById("level");
var message = document.getElementById("message");
var level_count = 1;
var seq_count = 1;
var strict_mode = 'On'; // off by default
var sequence = [];
var input_record=[];

// GAME FUNCTIONS
function generateGame() {	
	var pattern=[];
	for(var i=0; i<max_level; i++){
		pattern.push(Math.floor(Math.random()*4)+1);
	}
	level_count = 1;
	seq_count = 1;
	input_record=[];
	
	return pattern;
}

function startGame() {			//generates new game + runs initButtons()
	message.innerHTML = "Good Luck!";
	sequence = generateGame();
	console.log("\n NEWGAME: ", sequence);
	initButtons();
	playLevel(sequence.slice(0, level_count));
	
}

function playLevel(input) {
	seq_count=1;
	input_record=[];
	message.innerHTML = ""; // Clear Message
	flashSequence(input);
	//document.querySelector("#answer").innerHTML=input;
	console.log("level count: ", level_count);
	level_div.innerHTML = level_count;
}

function checkMatch(num) {
	console.log("PRESSED: ", num);
	input_record.push(num);
	if(input_record[seq_count-1] === sequence[seq_count-1]) {
		if(level_count === seq_count){
			if (level_count === max_level) {
				message.innerHTML = "YOU WIN! Please Press Play";
			} 
			else {
				level_count++;
				playLevel(sequence.slice(0, level_count));
			}
		}
		else {
			seq_count++;
		}
	}
	else{
		flashFail(sequence[seq_count-1]);
		if(strict_mode === 'Off') {
			message.innerHTML = "Please Try Again!";
			playLevel(sequence.slice(0, level_count));
		}
		else {
			message.innerHTML = "GAME OVER! Please Try Again.";
		}
	}
	if(seq_count > level_count) {
		playLevel(sequence.slice(0, level_count++));
		seq_count = 1;
	}	
}


// BUTTON FUNCTIONS
function initButtons() {		//initializes each tile
		document.querySelector(tile[1]).onclick = function() {
			flash('#'+this.id);
			playAudio("#audio1");
			checkMatch(1);
		}
		document.querySelector(tile[2]).onclick = function() {
			flash('#'+this.id);
			playAudio("#audio2");
			checkMatch(2);
		}
		document.querySelector(tile[3]).onclick = function() {
			flash('#'+this.id);
			playAudio("#audio3");
			checkMatch(3);
		}
		document.querySelector(tile[4]).onclick = function() {
			flash('#'+this.id);
			playAudio("#audio4");
			checkMatch(4);
		}
}

// FLASH FUNCTIONS
function flash(button) {			//makes tile flash and plays the audio
	document.querySelector(button).classList.remove('lit-animation');
	document.querySelector(button).classList.remove('fail-animation');
	document.querySelector(button).offsetWidth;
	document.querySelector(button).classList.add('lit-animation');
}
function flashAll() {					//makes all tile flash at once
	flash("#button1"); flash("#button2"); flash("#button3"); flash("#button4");
}
function flashSequence(seq) {	//flashes to given pattern based on array arg
	for(var i=0; i<seq.length; i++) {
		setTimeout(flash, (750*i+750), tile[seq[i]]);
		setTimeout(playAudio, (750*i+750), audio[seq[i]]);
	}
}
function flashFail(num) {
	document.querySelector('#button'+num).classList.remove('fail-animation');
	document.querySelector('#button'+num).classList.remove('lit-animation');
	document.querySelector('#button'+num).offsetWidth;
	document.querySelector('#button'+num).classList.add('fail-animation');
}


// AUDIO FUNCTIONS
function playAudio(audioID) {
	var aud = document.createElement("audio");
	var num = audio.indexOf(audioID);
	aud.setAttribute("id","audio"+num);
	aud.setAttribute("preload","auto");
	aud.setAttribute("src","https://s3.amazonaws.com/freecodecamp/simonSound"+num+".mp3");
	aud.setAttribute("type","audio/mp3");
	//aud.volume=0.5;
	aud.play();
	aud.remove();
}


// BUTTONS
var play = document.getElementById("play");
var test2 = document.querySelector("#test2");
var strict = document.querySelector("#strict");

play.onclick = function() {startGame();}

strict.onclick = function() {
	(strict.childNodes[1].innerHTML==='On') ? strict.childNodes[1].innerHTML = 'Off' : strict.childNodes[1].innerHTML = 'On';
	strict_mode = strict.childNodes[1].innerHTML;
	console.log(strict_mode);
}