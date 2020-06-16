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

import styles from "../styles/QuizApp.module.css";

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
    {
      id: 4,
      question: "What are Props?",
      answer_a: "Props is shorthand for Properties in React",
      answer_b: "They're read only components which must be kept pure, i.e. immutable",
      answer_c: "They are always passed down from parent to child components",
      answer_d: "All of the above",
      correct_answer: "d",
    },
    {
      id: 5,
      question: "Which method is not part of ReactDOM?",
      answer_a: "ReactDOM.destroy()",
      answer_b: "ReactDOM.hydrate()",
      answer_c: "ReactDOM.createPortal()",
      answer_d: "ReactDOM.findDOMNode()",
      correct_answer: "a",
    },
    {
      id: 6,
      question: "What tool allows you to test React apps?",
      answer_a: "Prettier",
      answer_b: "Flow",
      answer_c: "Jest",
      answer_d: "Yarn",
      correct_answer: "c",
    },
    {
      id: 7,
      question: "What is a higher-order component (HOC)?",
      answer_a: "A higher-order component transforms a component into another component",
      answer_b: "Does not exist",
      answer_c: "Connects to the backend of an app",
      answer_d: "None of the above",
      correct_answer: "a",
    },
    {
      id: 8,
      question: "What is the correct order for React Lifecycle of Components?",
      answer_a: "Mounting, Updating, Unmounting",
      answer_b: "Rendering, Mounting, Unmounting",
      answer_c: "Constructor(), getDerivedStateFromProps(), render(), componentDidMount()",
      answer_d: "componentWillUnmount",
      correct_answer: "a",
    },
    {
      id: 9,
      question: "What is React.createClass()",
      answer_a: 'Allows us to generate component "classes"',
      answer_b: "It does not exist",
      answer_c: "It does not affect the virtual DOM",
      answer_d: "It is a state within React",
      correct_answer: "a",
    },
    {
      id: 10,
      question: "What is create-react-app",
      answer_a: "Does not do anything",
      answer_b: "it's the official CLI for React to create React apps with no build configuration",
      answer_c: "Includes vue components",
      answer_d: "Adds Redux to React",
      correct_answer: "b",
    }
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

  const renderResultMark = (question, answer) => {
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

  const renderNumericalCorrect = () => {
    let num = 0;

    for(let i = 0; i < answers.length; i++) {
      if(answers[i].answer === questions[i].correct_answer) {
        num++;
      }
    }

    num = Math.floor((num * 100)/answers.length);

    return num;
  }

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
      <div className="container results">
        <h2>Results</h2>
        <ul>{renderResultsData()}</ul>
        <ul>You got {renderNumericalCorrect()}% correct on this quiz!</ul>
        
        <button className="btn btnPrimary" onClick={restart}>
          Restart
        </button>
        <button className="btn btnPrimary" onClick={goBackToDashboard}>
          Back to dashboard
        </button>
        {/* <button onClick={calculation}>Submit Result</button> */}
        <style jsx global>{`
          .container {
            background-color: #282c34;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 23px;
            color: white;
            text-align: center;
          }
          .btn {
            color: #4f4c4c;
            background-color: #f4f4f4;
            padding: 10px 50px;
            text-transform: uppercase;
            font-size: 18px;
            margin-top: 20px;
            cursor: pointer;
          }
          .btnPrimary {
            color: gray;
            background-color: #ffc107;
            font-weight: bold;
          }
          h1,
          h2 {
            margin: 10px;
          }
          .results span.correct {
            color: #c8ffbb;
          }

          .results span.failed {
            color: #f27c7c;
          }
        `}</style>
      </div>
    );
  } else {
    return (
      <QuizContext.Provider value={{ state, dispatch }}>
        <div className="container">
          <Progress total={questions.length} current={currentQuestion + 1} />
          <Question />
          {renderError()}
          <Answers />
          <button className={styles.btnPrimary} onClick={next}>
            Confirm and Continue
          </button>
        </div>
      </QuizContext.Provider>
    );
  }
}

export default QuizApp;

/*

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

*/