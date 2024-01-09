import { useQuiz } from "../QuizContext";
function NextButton() {
  const { answer, index, dispatch, numQuestions } = useQuiz();
  if (answer === null) return;
  if (index < numQuestions - 1) {
    return (
      <button
        onClick={() => {
          dispatch({ type: "nextQuestion" });
        }}
        className="btn btn-ui"
      >
        Next
      </button>
    );
  }
  if (index === numQuestions - 1) {
    return (
      <button
        onClick={() => {
          dispatch({ type: "finish" });
        }}
        className="btn btn-ui"
      >
        Finish
      </button>
    );
  }
}

export default NextButton;
