import React, { useReducer, useState } from "react";
import Progress from "../../components/Progress";
import Question from "../../components/Question";
import Answers from "../../components/Answers";
import QuizContext from "../../src/Context/QuizContext";

import {
  SET_ANSWERS,
  SET_CURRENT_QUESTION,
  SET_CURRENT_ANSWER,
  SET_ERROR,
  SET_SHOW_RESULTS,
  RESET_QUIZ,
} from "../../src/QuizReducers/types";

import quizReducer from "../../src/QuizReducers/QuizReducer";

import styles from '../styles/QuizApp.module.css';

/**
 * Styles is not working for buttons and centering
 *  
 */

function QuizApp({ goBackToDashboard }) {
//   const [quizResults, setQuizResults] = useState();
//   const [selects, setSelects] = useState();
  const questions = [
    {
      id: 1,
      question: "Which statement about Hooks is not true?",
      answer_a:
        "Hooks are 100% backwards-compatible and can be used side by side with classes",
      answer_b: "Hooks are still in beta and not available yet",
      answer_c:
        "Hooks are completely opt-in, there's no need to rewrite existing code",
      answer_d: "All of the above",
      correct_answer: "b",
    },
    {
      id: 2,
      question: "Which one is not a Hook?",
      answer_a: "useState()",
      answer_b: "useConst()",
      answer_c: "useReducer()",
      answer_d: "All of the above",
      correct_answer: "b",
    },
    {
      id: 3,
      question: "What Hook should be used for data fetching?",
      answer_a: "useDataFetching()",
      answer_b: "useApi()",
      answer_c: "useEffect()",
      answer_d: "useRequest()",
      correct_answer: "c",
    },
  ];

  const initialState = {
    questions,
    currentQuestion: 0,
    currentAnswer: "",
    answers: [],
    showResults: false,
    error: "",
  };

  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { currentQuestion, currentAnswer, answers, showResults, error } = state;

  const question = questions[currentQuestion];

  const renderError = () => {
    if (!error) {
      return;
    }

    return <div className={styles.error}>{error}</div>;
  };

//   const calculation = () => {
//     console.log(answers, "<--- ANSWERS");
//     let resultArray = [];

//     answers.forEach((answer) => {
//       resultArray.push(answer.answer);
//     });

//     console.log(resultArray, "<---- RESULT ARRAY");
//     let correctAnswerArray = [];

//     questions.forEach((question) => {
//       correctAnswerArray.push(question.correct_answer);
//     });

//     console.log(correctAnswerArray, "<---- CORRECT ANSWER ARRAY");

//     let count = 0;

//     for (let i = 0; i < questions.length; i++) {
//       if (resultArray[i] === correctAnswerArray[i]) {
//         count += 1;
//       }
//     }

//     console.log(count, "<----- COUNT");
//     setQuizResults(count / questions.length);
//     console.log(quizResults, "<--- QUIZ RESULTS");
//   };

  const renderResultMark = (question, answer) => {
    // setSelects(answers);
    if (question.correct_answer === answer.answer) {
      return <span className={styles.correct}>Correct</span>;
    }

    return <span className={styles.failed}>Failed</span>;
  };

  const renderResultsData = () => {
    return answers.map((answer) => {
      const question = questions.find(
        (question) => question.id === answer.questionId
      );

      return (
        <div key={question.id}>
          {question.question} - {renderResultMark(question, answer)}
        </div>
      );
    });
  };

  const restart = () => {
    dispatch({ type: RESET_QUIZ });
  };

  const next = () => {
    const answer = { questionId: question.id, answer: currentAnswer };

    if (!currentAnswer) {
      dispatch({ type: SET_ERROR, error: "Please select an option" });
      return;
    }

    answers.push(answer);
    dispatch({ type: SET_ANSWERS, answers });
    dispatch({ type: SET_CURRENT_ANSWER, currentAnswer: "" });

    if (currentQuestion + 1 < questions.length) {
      dispatch({
        type: SET_CURRENT_QUESTION,
        currentQuestion: currentQuestion + 1,
      });
      return;
    }

    dispatch({ type: SET_SHOW_RESULTS, showResults: true });
  };

  if (showResults) {
    return (
      <div className={styles.container}>
        <h2>Results</h2>
        <ul>{renderResultsData()}</ul>
        {/* Call Function for Correct Answers Logic */}
        <button className={styles.btnprimary} onClick={restart}>
          Restart
        </button>
        <button onClick={goBackToDashboard}>Back to dashboard</button>
        {/* <button onClick={calculation}>Submit Result</button> */}
      </div>
    );
  } else {
    return (
      <QuizContext.Provider value={{ state, dispatch }}>
        <div className={styles.container}>
          <Progress total={questions.length} current={currentQuestion + 1} />
          <Question />
          {renderError()}
          <Answers />
          <button className={styles.btn} onClick={next}>
            Confirm and Continue
          </button>
        </div>
      </QuizContext.Provider>
    );
  }
}

export default QuizApp;
