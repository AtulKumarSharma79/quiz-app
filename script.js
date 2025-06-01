const questions = [
    { q: "Capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: 2 },
    { q: "2 + 2 = ?", options: ["3", "4", "5", "2"], answer: 1 },
    { q: "Boiling point of water?", options: ["90°C", "100°C", "80°C", "110°C"], answer: 1 },
    { q: "Red Planet?", options: ["Earth", "Mars", "Venus", "Saturn"], answer: 1 },
    { q: "Author of 'Romeo and Juliet'?", options: ["Shakespeare", "Milton", "Dickens", "Homer"], answer: 0 }
  ];
  
  let current = 0;
  let score = 0;
  let timer;
  let timeLeft = 10;
  
  function loadQuestion() {
    if (current >= questions.length) {
      document.getElementById("question-container").innerHTML = "";
      document.getElementById("options").innerHTML = "";
      document.getElementById("timer").style.display = "none";
      document.getElementById("result").innerText = `Quiz finished! Your score is ${score}/${questions.length}`;
      return;
    }
  
    const question = questions[current];
    document.getElementById("question-container").innerText = question.q;
  
    const optionsEl = document.getElementById("options");
    optionsEl.innerHTML = "";
    question.options.forEach((opt, index) => {
      const btn = document.createElement("button");
      btn.innerText = opt;
      btn.onclick = () => {
        if (index === question.answer) score++;
        clearInterval(timer);
        current++;
        timeLeft = 10;
        loadQuestion();
      };
      optionsEl.appendChild(btn);
    });
  
    startTimer();
  }
  
  function startTimer() {
    document.getElementById("timer").innerText = `Time left: ${timeLeft}s`;
    timer = setInterval(() => {
      timeLeft--;
      document.getElementById("timer").innerText = `Time left: ${timeLeft}s`;
      if (timeLeft <= 0) {
        clearInterval(timer);
        current++;
        timeLeft = 10;
        loadQuestion();
      }
    }, 1000);
  }
  
  loadQuestion();
  