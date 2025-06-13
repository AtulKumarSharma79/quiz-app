const questions = [
  { q: "What is 5²?", options: ["24", "34", "25", "30"], answer: 2 },
  { q: "What is 2 × 6?", options: ["10", "12", "14", "16"], answer: 1 },
  { q: "What is 27 ÷ 3?", options: ["17", "20", "21", "9"], answer: 3 },
  { q: "What is 2 + 10?", options: ["12", "13", "14", "15"], answer: 0 },
  { q: "What is 20 - 3?", options: ["15", "17", "16", "14"], answer: 1 }
];

let current = 0;
let score = 0;
let timeLeft = 10;
let timer = null;
let userAnswers = [];

const tickSound = new Audio("tick.mp3");
tickSound.volume = 0.3;

function loadQuestion() {
  if (current >= questions.length) {
    showFinalResult();
    return;
  }

  const question = questions[current];
  document.getElementById("question-container").innerText = question.q;

  const optionsEl = document.getElementById("options");
  optionsEl.innerHTML = "";

  question.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => handleAnswer(btn, index);
    optionsEl.appendChild(btn);
  });

  renderNextButton();
  timeLeft = 10;
  startTimer();
}

function handleAnswer(button, selectedIndex) {
  const correctIndex = questions[current].answer;
  userAnswers[current] = selectedIndex;

  if (selectedIndex === correctIndex) {
    score++;
    button.style.backgroundColor = "#28a745";
    button.style.color = "white";
    document.querySelectorAll(".options button").forEach(b => b.disabled = true);
    stopTimer();
  } else {
    button.style.backgroundColor = "#dc3545";
    button.style.color = "white";
    button.disabled = true;
  }
}

function startTimer() {
  document.getElementById("timer").innerText = `Time left: ${timeLeft}s`;
  timer = setInterval(() => {
    tickSound.pause();
    tickSound.currentTime = 0;
    try {
      tickSound.play();
    } catch (e) {}

    timeLeft--;
    document.getElementById("timer").innerText = `Time left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      stopTimer();
      userAnswers[current] = null;
      current++;
      loadNextQuestionWithDelay();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  timer = null;
  tickSound.pause();
  tickSound.currentTime = 0;
}

function renderNextButton() {
  const container = document.getElementById("next-btn-container");
  container.innerHTML = "";

  const nextBtn = document.createElement("button");
  nextBtn.innerText = "Next";
  nextBtn.onclick = () => {
    stopTimer();
    if (userAnswers[current] === undefined) {
      userAnswers[current] = null; // skipped
    }
    current++;
    loadNextQuestionWithDelay();
  };
  container.appendChild(nextBtn);
}

function loadNextQuestionWithDelay() {
  stopTimer();
  document.getElementById("question-container").innerText = "Next question loading...";
  document.getElementById("options").innerHTML = "";
  document.getElementById("timer").innerText = "";
  document.getElementById("next-btn-container").innerHTML = "";
  setTimeout(() => loadQuestion(), 2000);
}

function showFinalResult() {
  stopTimer();

  document.getElementById("question-container").innerHTML = "";
  document.getElementById("options").innerHTML = "";
  document.getElementById("timer").style.display = "none";
  document.getElementById("next-btn-container").innerHTML = "";

  const resultEl = document.getElementById("result");
  resultEl.innerHTML = `<h2>Quiz Finished!</h2><p>Your score is ${score}/${questions.length}</p>`;

  const summaryList = document.createElement("ol");

  questions.forEach((q, i) => {
    const userAnsIndex = userAnswers[i];
    const correctAns = q.options[q.answer];
    const userAns = userAnsIndex !== null && userAnsIndex !== undefined ? q.options[userAnsIndex] : "Not Answered";
    const correct = userAns === correctAns;

    const item = document.createElement("li");
    item.innerHTML = `
      <strong>${q.q}</strong><br/>
      ✅ Correct: <b>${correctAns}</b><br/>
      ${correct ? "✔️" : "❌"} Your Answer: <b>${userAns}</b>
    `;
    summaryList.appendChild(item);
  });

  resultEl.appendChild(summaryList);

  const restartBtn = document.createElement("button");
  restartBtn.innerText = "Restart Quiz";
  restartBtn.onclick = restartQuiz;
  resultEl.appendChild(restartBtn);
}

function restartQuiz() {
  current = 0;
  score = 0;
  timeLeft = 10;
  userAnswers = [];

  document.getElementById("result").innerHTML = "";
  document.getElementById("timer").style.display = "block";
  document.getElementById("next-btn-container").innerHTML = "";
  document.getElementById("question-container").innerHTML = "";
  document.getElementById("options").innerHTML = "";

  loadQuestion();
}

loadQuestion();
