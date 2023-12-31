// Quiz JavaScript

// Questions

var questions = [
        {
          question: "What is the purpose of CSS?",
          options: [
            "To style the content and layout of a web page",
            "To define the functionality and behavior of a web page",
            "To manipulate data in a database",
            "To handle server-side operations"
          ],
          answer: "To style the content and layout of a web page"
        },
        {
          question: "What is the output of the following JavaScript code?\n\nconsole.log(typeof 42);",
          options: [
            "number",
            "string",
            "boolean",
            "undefined"
          ],
          answer: "number"
        },
        {
          question: "Which of the following is NOT a valid programming language?",
          options: [
            "JavaScript",
            "Python",
            "HTML",
            "Java"
          ],
          answer: "HTML"
        },
        {
          question: "What is the result of the following code snippet?\n\nconsole.log(5 + '5');",
          options: [
            "55",
            "10",
            "NaN",
            "Error"
          ],
          answer: "55"
        },
        {
          question: "What does the acronym 'API' stand for?",
          options: [
            "Application Program Interface",
            "Advanced Programming Interface",
            "Automated Program Integration",
            "Application Protocol Interface"
          ],
          answer: "Application Program Interface"
        }
      ];
      
    //   Variables
      var currentQuestionIndex = 0;
      var timeLeft = 60;
      var timerInterval;
      var userScore = 0;
      var leaderboard = [];
      
      var startBtn = document.getElementById("start-btn");
      var questionContainer = document.getElementById("question-container");
      var optionsContainer = document.getElementById("options-container");
      var timeLeftDisplay = document.getElementById("time-left");
      var userScoreDisplay = document.getElementById("user-score");
      var initialsInput = document.getElementById("initials-input");
      var submitBtn = document.getElementById("submit-btn");
      var leaderboardList = document.getElementById("leaderboard-list");
      var restartBtn = document.getElementById("restart-btn");

    //   Start quiz
      function startQuiz() {
        startBtn.style.display = "none";
        restartBtn.style.display = "none";
        timerInterval = setInterval(updateTimer, 1000);
        showQuestion();
      }
    //   Update timer
      function updateTimer() {
        timeLeft--;
        timeLeftDisplay.textContent = timeLeft;
      
        if (timeLeft <= 0) {
          endQuiz();
        }
      }
    
      //   Show question
      function showQuestion() {
        var currentQuestion = questions[currentQuestionIndex];
        questionContainer.textContent = currentQuestion.question;
      
        optionsContainer.innerHTML = "";
      
        for (var i = 0; i < currentQuestion.options.length; i++) {
          var optionBtn = document.createElement("button");
          optionBtn.textContent = currentQuestion.options[i];
          optionBtn.setAttribute("data-answer", currentQuestion.options[i]);
          optionBtn.addEventListener("click", checkAnswer);
          optionsContainer.appendChild(optionBtn);
        }
      }

    //   Check answer
      function checkAnswer() {
        var selectedOption = this.getAttribute("data-answer");
        var currentQuestion = questions[currentQuestionIndex];
      
        if (selectedOption === currentQuestion.answer) {
          userScore++;
        } else {
          timeLeft -= 10;
        }
      
        currentQuestionIndex++;
      
        if (currentQuestionIndex < questions.length) {
          showQuestion();
        } else {
          endQuiz();
        }
      }

    //   End quiz
      function endQuiz() {
        clearInterval(timerInterval);
      
        questionContainer.textContent = "Completed!";
        optionsContainer.innerHTML = "";
        timeLeftDisplay.textContent = timeLeft;
        userScoreDisplay.textContent = userScore;
      
        initialsInput.style.display = "inline";
        submitBtn.style.display = "inline";
        restartBtn.style.display = "inline";
      }

    //   Save score to local storage
      function saveScore() {
        var initials = initialsInput.value.trim();
      
        if (initials !== "") {
          var score = {
            initials: initials,
            score: userScore
          };
      
          leaderboard.push(score);
          leaderboard.sort((a, b) => b.score - a.score);
          localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
      
          updateLeaderboard();
        }
      
        initialsInput.value = "";
        initialsInput.style.display = "none";
        submitBtn.style.display = "none";
      }

    //   Restart quiz
      function restartQuiz() {
        currentQuestionIndex = 0;
        timeLeft = 60;
        userScore = 0;
        leaderboardList.innerHTML = "";
        initialsInput.style.display = "none";
        submitBtn.style.display = "none";
        restartBtn.style.display = "none";
        startBtn.style.display = "inline";
      }
      
    //   Leaderboard functions
      function updateLeaderboard() {
        leaderboardList.innerHTML = "";
      
        for (var i = 0; i < leaderboard.length; i++) {
          var listItem = document.createElement("li");
          listItem.textContent = leaderboard[i].initials + ": " + leaderboard[i].score;
          leaderboardList.appendChild(listItem);
        }
      }

// Event listeners
startBtn.addEventListener("click", startQuiz);
submitBtn.addEventListener("click", saveScore);
restartBtn.addEventListener("click", restartQuiz);

// Load leaderboard from local storage
if (localStorage.getItem("leaderboard")) {
  leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
  updateLeaderboard();
}
