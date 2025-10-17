//ex6
import React, { useReducer, useEffect } from "react";
import { Button, Container, Card, Badge, ProgressBar, Alert } from "react-bootstrap";

const initialState = {
  questions: [
    {
      id: 1,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Canberra", "Melbourne", "Perth"],
      answer: "Canberra",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      id: 3,
      question: "What is the largest ocean on Earth?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Pacific Ocean",
        "Arctic Ocean",
      ],
      answer: "Pacific Ocean",
    },
    {
      id: 4,
      question: "Who painted the Mona Lisa?",
      options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
      answer: "Leonardo da Vinci",
    },
    {
      id: 5,
      question: "What is the smallest prime number?",
      options: ["0", "1", "2", "3"],
      answer: "2",
    },
  ],
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
  feedback: null,
  timeLeft: 10,
  highScore: parseInt(localStorage.getItem("quizHighScore")) || 0,
};

function quizReducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION":
      return { ...state, selectedOption: action.payload };

    case "NEXT_QUESTION":
      const isCorrect =
        state.selectedOption === state.questions[state.currentQuestion].answer;
      const newScore = isCorrect ? state.score + 1 : state.score;
      const isLastQuestion = state.currentQuestion + 1 === state.questions.length;
      
      // Update high score if needed
      const newHighScore = isLastQuestion && newScore > state.highScore 
        ? newScore 
        : state.highScore;
      
      if (isLastQuestion && newScore > state.highScore) {
        localStorage.setItem("quizHighScore", newScore.toString());
      }

      return {
        ...state,
        score: newScore,
        currentQuestion: state.currentQuestion + 1,
        selectedOption: "",
        showScore: isLastQuestion,
        feedback: isCorrect ? "correct" : "incorrect",
        timeLeft: 10,
        highScore: newHighScore,
      };

    case "SHOW_FEEDBACK":
      const correctAnswer = state.questions[state.currentQuestion].answer;
      const isAnswerCorrect = state.selectedOption === correctAnswer;
      return {
        ...state,
        feedback: {
          isCorrect: isAnswerCorrect,
          correctAnswer: correctAnswer,
        },
      };

    case "CLEAR_FEEDBACK":
      return { ...state, feedback: null };

    case "TICK_TIMER":
      if (state.timeLeft > 0) {
        return { ...state, timeLeft: state.timeLeft - 1 };
      }
      // Auto submit when time runs out
      return state;

    case "TIME_UP":
      const isQuizComplete = state.currentQuestion + 1 === state.questions.length;
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        selectedOption: "",
        showScore: isQuizComplete,
        feedback: null,
        timeLeft: 10,
      };

    case "RESTART_QUIZ":
      return {
        ...initialState,
        highScore: state.highScore,
      };

    default:
      return state;
  }
}

function QuestionBankAdvanced() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { questions, currentQuestion, selectedOption, score, showScore, feedback, timeLeft, highScore } =
    state;

  // Timer countdown
  useEffect(() => {
    if (!showScore && feedback === null) {
      const timer = setInterval(() => {
        if (timeLeft > 0) {
          dispatch({ type: "TICK_TIMER" });
        } else {
          dispatch({ type: "TIME_UP" });
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, showScore, feedback]);

  const handleOptionSelect = (option) => {
    dispatch({ type: "SELECT_OPTION", payload: option });
  };

  const handleNextQuestion = () => {
    // Show feedback first
    dispatch({ type: "SHOW_FEEDBACK" });
    
    // Then move to next question after a delay
    setTimeout(() => {
      dispatch({ type: "NEXT_QUESTION" });
      dispatch({ type: "CLEAR_FEEDBACK" });
    }, 2000);
  };

  const handleRestartQuiz = () => {
    dispatch({ type: "RESTART_QUIZ" });
  };

  const progress = ((currentQuestion) / questions.length) * 100;
  const timeWarning = timeLeft < 5;

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-sm">
        <Card.Title className="text-center mb-4 fs-4 fw-bold">
          Quiz Nâng Cao
        </Card.Title>

        {/* High Score Display */}
        {highScore > 0 && (
          <Alert variant="info" className="text-center mb-3">
            🏆 Điểm cao nhất: {highScore} / {questions.length}
          </Alert>
        )}

        {showScore ? (
          <div className="text-center">
            <div className="display-4 text-primary fw-bold mb-3">
              {score} / {questions.length}
            </div>
            <h2 className="mb-3">Điểm của bạn</h2>
            
            {score === questions.length && (
              <Alert variant="success" className="mb-3">
                🎉 Xuất sắc! Bạn đã trả lời đúng tất cả các câu hỏi!
              </Alert>
            )}
            
            {score === highScore && score > 0 && (
              <Alert variant="warning" className="mb-3">
                🏆 Chúc mừng! Bạn đã đạt điểm cao mới!
              </Alert>
            )}

            <Button variant="primary" size="lg" onClick={handleRestartQuiz}>
              Làm Lại Quiz
            </Button>
          </div>
        ) : (
          <div>
            {/* Progress Bar */}
            <div className="mb-3">
              <div className="d-flex justify-content-between mb-2">
                <span className="fw-bold">Tiến trình</span>
                <span className="fw-bold">
                  {currentQuestion + 1} / {questions.length}
                </span>
              </div>
              <ProgressBar 
                now={progress} 
                variant="primary"
                style={{ height: '10px' }}
              />
            </div>

            {/* Timer */}
            <div className="text-center mb-3">
              <Badge 
                bg={timeWarning ? "danger" : "primary"} 
                className="fs-4 px-4 py-2"
                style={{
                  animation: timeWarning ? 'pulse 1s infinite' : 'none'
                }}
              >
                ⏱️ {timeLeft}s
              </Badge>
            </div>

            {/* Question */}
            <h4 className="mb-4">
              <span className="badge bg-primary me-2">
                Câu {questions[currentQuestion].id}
              </span>
              {questions[currentQuestion].question}
            </h4>

            {/* Options */}
            <div className="mt-3">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant={
                    selectedOption === option ? "success" : "outline-secondary"
                  }
                  className="m-2 w-100"
                  size="lg"
                  onClick={() => handleOptionSelect(option)}
                  disabled={feedback !== null}
                >
                  {option}
                </Button>
              ))}
            </div>

            {/* Feedback */}
            {feedback && (
              <Alert 
                variant={feedback.isCorrect ? "success" : "danger"} 
                className="mt-3 text-center"
              >
                {feedback.isCorrect ? (
                  <div>
                    <span className="fs-3">✅</span>
                    <p className="mb-0 fs-5 fw-bold mt-2">Chính xác! 🎉</p>
                  </div>
                ) : (
                  <div>
                    <span className="fs-3">❌</span>
                    <p className="mb-0 fs-5 fw-bold mt-2">
                      Không chính xác!
                    </p>
                    <p className="mb-0 mt-1">
                      Đáp án đúng là: <strong>{feedback.correctAnswer}</strong>
                    </p>
                  </div>
                )}
              </Alert>
            )}

            {/* Next Button */}
            <Button
              variant="primary"
              className="mt-4 w-100"
              size="lg"
              disabled={!selectedOption || feedback !== null}
              onClick={handleNextQuestion}
            >
              {currentQuestion === questions.length - 1
                ? "Hoàn Thành Quiz"
                : "Câu Tiếp Theo"}
            </Button>
          </div>
        )}
      </Card>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
      `}</style>
    </Container>
  );
}

export default QuestionBankAdvanced;
