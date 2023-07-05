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

      function startQuiz() {
        startBtn.style.display = "none";
        restartBtn.style.display = "none";
        timerInterval = setInterval(updateTimer, 1000);
        showQuestion();
      }

      function updateTimer() {
        timeLeft--;
        timeLeftDisplay.textContent = timeLeft;
      
        if (timeLeft <= 0) {
          endQuiz();
        }
      }

       