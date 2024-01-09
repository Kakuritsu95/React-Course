import { createContext, useContext, useEffect, useReducer } from "react";
const Quiz = createContext();
function QuizContext({ children }) {
  const initialState = {
    questions: [],
    status: "loading",
    index: 0,
    timer: 300,
    answer: null,
    points: 0,
    highscore: 0,
  };
  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  const [
    { questions, answer, index, status, points, highscore, timer },
    dispatch,
  ] = useReducer(reducer, initialState);
  function reducer(state, action) {
    switch (action.type) {
      case "dataReceived":
        return {
          ...state,
          questions: action.payload,
          status: "ready",
        };
      case "dataFailed":
        return {
          ...state,
          status: "failed",
        };
      case "start":
        return {
          ...state,
          status: "active",
        };
      case "timerStart":
        return {
          ...state,
          timer: state.timer - action.payload,
        };
      case "newAnswer":
        const question = state.questions.at(state.index);
        return {
          ...state,
          answer: action.payload,
          points:
            question.correctOption === action.payload
              ? state.points + question.points
              : state.points,
        };
      case "nextQuestion":
        return {
          ...state,
          index: state.index + 1,
          answer: null,
        };
      case "finish":
        return {
          ...state,
          status: "finished",
          highscore:
            state.highscore > state.points ? state.highscore : state.points,
        };
      case "reset":
        return {
          ...initialState,
          status: "ready",
          questions: state.questions,
        };
      default:
        throw new Error("Actions unknown");
    }
  }

  const numQuestions = questions.length;
  const maxPoints = questions.reduce((acc, curr) => {
    return (acc += curr.points);
  }, 0);
  return (
    <Quiz.Provider
      value={{
        questions,
        status,
        index,
        timer,
        answer,
        points,
        highscore,
        numQuestions,
        maxPoints,
        dispatch,
      }}
    >
      {children}
    </Quiz.Provider>
  );
}
function useQuiz() {
  const context = useContext(Quiz);
  if (context === undefined)
    throw new Error("Cannot use context outside of QuizContext Provider");
  return context;
}
export { QuizContext, useQuiz };
