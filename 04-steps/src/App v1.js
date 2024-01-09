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
          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>

          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={() => {
                if (step > 1) setStep(step - 1);
              }}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={() => {
                if (step < 3) setStep(step + 1);
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}
