const form = document.getElementById("form");
const input = document.getElementById("input");

const colorText = document.getElementById("color");
const scoreText = document.getElementById("score");
const timeText = document.getElementById("time");

const startBtn = document.getElementById("start-btn");

let score = 0;
let timeLeft = 15;
let timer;

const colors = ["blue", "red", "green", "cyan", "purple", "pink", "black", "yellow"];

function generateNewColor() {
	const index = Math.floor(Math.random() * colors.length);
	return colors[index];
}

function isCorrect(currentColor, typedColor) {
	return currentColor === typedColor.toLowerCase();
}

function updateScreen() {
	scoreText.innerHTML = score;
	input.value = "";
	colorText.innerHTML = generateNewColor();
	colorText.style.color = generateNewColor();
}

function startCountdown() {
	timer = setInterval(() => {
		if (timeLeft === 0) {
			stopGame();
			scoreText.classList.add("animate-bounce");
			clearInterval(timer);
		}
		timeText.innerHTML = timeLeft;
		timeLeft--;
	}, 1000);
}

function restartGame() {
	clearInterval(timer);
	timeLeft = 15;
	timeText.innerHTML = timeLeft;

	score = 0;
	scoreText.classList.remove("animate-bounce");

	input.disabled = false;
	input.focus();

	startCountdown();
	updateScreen();
}

function stopGame() {
	input.disabled = true;
	input.blur();
}

function handleForm(e) {
	e.preventDefault();

	if (isCorrect(colorText.style.color, input.value)) {
		score += 100;
	} else {
		score -= 50;
	}

	updateScreen();
}

stopGame();
// updateScreen();

form.addEventListener("submit", handleForm);
