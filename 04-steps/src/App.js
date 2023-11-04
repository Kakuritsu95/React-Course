import { useState } from "react";
const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];
// export default function dateCounter() {
//   const [counter, setCounter] = useState(0);
//   const [step, setStep] = useState(1);
//   return (
//     <>
//       <div>
//         <button
//           onClick={() => {
//             if (step === 1) return;
//             setStep((s) => s - 1);
//           }}
//         >
//           -
//         </button>
//         <span>Step:{step}</span>
//         <button
//           onClick={() => {
//             setStep((s) => s + 1);
//           }}
//         >
//           +
//         </button>
//       </div>
//       <div>
//         <button
//           onClick={() => {
//             setCounter((c) => c - step);
//           }}
//         >
//           -
//         </button>
//         <span>Count:{counter}</span>
//         <button
//           onClick={() => {
//             setCounter((c) => c + step);
//           }}
//         >
//           +
//         </button>
//       </div>
//       <p>
//         {counter === 0
//           ? "today is "
//           : counter < 0
//           ? `${-counter} days ago was `
//           : `${counter} days from today is `}
//         {new Date(new Date().setDate(new Date().getDate() + counter))
//           .toString()
//           .slice(0, 15)}
//       </p>
//     </>
//   );
// }
export function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setisOpen] = useState(true);
  function handleNext() {
    if (step === 3) return;
    setStep((s) => s + 1);
  }
  function handlePrevious() {
    if (step === 1) return;
    setStep((s) => s - 1);
  }
  return (
    <>
      <button class="close" onClick={() => setisOpen(!isOpen)}>
        X
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className="active">1</div>
            <div className={step > 1 ? "active" : ""}>2</div>
            <div className={step > 2 ? "active" : ""}>3</div>
          </div>
          <Step classN={"message"} step={step}>
            {messages[step - 1]}
          </Step>

          <div className="buttons">
            <Button
              textColor="#fff"
              backgroundColor="#7950f2"
              onClick={handlePrevious}
            >
              👈
              <span> Previous</span>
            </Button>
            <Button
              textColor="#fff"
              backgroundColor="#7950f2"
              onClick={handleNext}
            >
              <span>Next</span>
              👉
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
function Step({ step, classN, children }) {
  return (
    <p className={classN}>
      <h3>Step:{step}</h3>
      {children}
    </p>
  );
}
function Button({ textColor, backgroundColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: backgroundColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
