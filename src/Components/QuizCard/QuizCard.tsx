import React from "react";
import { Wrapper, ButtonWrapper } from "./QuizCard.styles";

export type AnswerObject = {
  questions: string;
  answers: string;
  correct: boolean;
  correctAnswer: string;
};

type Props = {
  questions: string;
  answers: string[];
  callback: any;
  userAnswer: AnswerObject | undefined;
  questionNum: number;
  totalQuestions: number;
};

const QuizCard: React.FC<Props> = function ({
  questions,
  answers,
  callback,
  userAnswer,
  questionNum,
  totalQuestions,
}) {
  return (
    <Wrapper>
      <p>
        questions:{questionNum} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: questions }}></p>
      <div>
        {answers.map((answer) => (
          <ButtonWrapper
            correct={userAnswer?.correctAnswer === answer}
            userClicked={userAnswer?.answers === answer}
            key={answer}
          >
            <button
              disabled={Boolean(userAnswer)}
              value={answer}
              onClick={callback}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </ButtonWrapper>
        ))}
      </div>
    </Wrapper>
  );
};

export default QuizCard;
