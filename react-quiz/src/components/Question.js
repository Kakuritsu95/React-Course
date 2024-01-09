import Option from "./Option";
import { useQuiz } from "../QuizContext";
function Question() {
  const { questions, index } = useQuiz();
  const question = questions[index];
  return (
    <div>
      <h4>{question.question}</h4>
      <Option question={question} />
    </div>
  );
}
export default Question;
