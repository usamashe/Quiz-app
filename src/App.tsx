import React, { useState } from "react";
import { QuizCard, Footer } from "./Components/Components";
import { AnswerObject } from "./Components/QuizCard/QuizCard";
import { fetchQuestions, Difficulty, Questionsstate } from "./API";
import { GlobalStyle, Wrapper } from "./App.styles";

const TOTAL_QUESTIONS = 10;

function App() {
  const [Loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Questionsstate[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [quizEnd, setQuizEnd] = useState(true);

  const QuizStart = async () => {
    setLoading(true);
    setQuizEnd(false);
    const newQuestions = await await fetchQuestions(
      TOTAL_QUESTIONS,
      Difficulty.MEDIUM
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswer([]);
    setNumber(0);
    setLoading(false);
  };

  const nextQuestion = async () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setQuizEnd(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!quizEnd) {
      const answers = e.currentTarget.value;

      const correct = questions[number].correct_answer === answers;

      if (correct) setScore((prev) => prev + 1);

      const answerObject = {
        questions: questions[number].question,
        answers,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswer((prev) => [...prev, answerObject]);
    }
  };
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>Quiz</h1>

        {quizEnd || userAnswer.length === TOTAL_QUESTIONS ? (
          <button className="start" onClick={QuizStart}>
            Begin Quiz
          </button>
        ) : null}
        {!quizEnd ? <p className="score">Score:{score}</p> : null}
        {Loading ? <p>Loading</p> : null}
        {!quizEnd && !Loading ? (
          <QuizCard
            questionNum={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            questions={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswer[number]}
            callback={checkAnswer}
          />
        ) : null}
        {!quizEnd &&
        !Loading &&
        userAnswer.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next
          </button>
        ) : null}
      </Wrapper>
      <Footer />
    </>
  );
}

export default App;
