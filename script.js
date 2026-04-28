const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language", 
      "Hyper Transfer Mode Language",
      "Home Tool Markup Language"
    ],
    answer: 0
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["Python", "CSS", "Java", "C++"],
    answer: 1
  },
  {
    question: "What does JS stand for?",
    options: ["Java Style", "JavaScript", "Just Style", "Joint System"],
    answer: 1
  },
  {
    question: "Which tag is used for the largest heading in HTML?",
    options: ["<h6>", "<heading>", "<h1>", "<head>"],
    answer: 2
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Colorful Style Sheets"
    ],
    answer: 2
  }
];

let current = 0;
let score = 0;
let selected = null;

document.getElementById("total").innerText = questions.length;

function loadQuestion() {
  const q = questions[current];
  document.getElementById("current").innerText = current + 1;
  document.getElementById("question").innerText = q.question;
  
  const optDiv = document.getElementById("options");
  optDiv.innerHTML = "";
  
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.innerText = opt;
    btn.onclick = () => {
      // Remove selected from all buttons
      document.querySelectorAll("#options button").forEach(b => {
        b.classList.remove("selected");
      });
      // Add selected to clicked button
      btn.classList.add("selected");
      selected = i;
    };
    optDiv.appendChild(btn);
  });
  
  document.getElementById("result").innerText = "";
  selected = null;
}

function submitAnswer() {
  if (selected === null) {
    alert("Please select an answer before submitting!");
    return;
  }
  
  if (selected === questions[current].answer) {
    score++;
    document.getElementById("result").innerText = "✅ Correct!";
    document.getElementById("result").style.color = "#4CAF50";
  } else {
    document.getElementById("result").innerText = 
      "❌ Wrong! Correct answer: " + questions[current].options[questions[current].answer];
    document.getElementById("result").style.color = "#e94560";
  }
  
  document.getElementById("score").innerText = score;
  selected = null;
  current++;
  
  if (current < questions.length) {
    setTimeout(loadQuestion, 1500);
  } else {
    setTimeout(() => {
      document.getElementById("quiz-box").innerHTML = `
        <h2 style="color: #4CAF50; margin-bottom: 20px;">🎉 Quiz Complete!</h2>
        <p style="font-size: 22px;">Your Score: ${score} / ${questions.length}</p>
        <p style="margin-top: 15px; color: #aaa;">${score >= 3 ? "Great job! 🌟" : "Keep practicing! 💪"}</p>
        <button onclick="restartQuiz()" 
          style="margin-top: 25px; padding: 12px 30px; background: #e94560; 
          color: white; border: none; border-radius: 8px; font-size: 16px; cursor: pointer;">
          Restart Quiz
        </button>
      `;
    }, 1500);
  }
}

function restartQuiz() {
  current = 0;
  score = 0;
  selected = null;
  document.getElementById("score").innerText = 0;
  document.getElementById("quiz-box").innerHTML = `
    <div id="question-count">Question <span id="current">1</span> of 
      <span id="total">${questions.length}</span>
    </div>
    <p id="question"></p>
    <div id="options"></div>
    <button id="submitBtn" onclick="submitAnswer()">Submit Answer</button>
    <p id="result"></p>
  `;
  loadQuestion();
}

loadQuestion();