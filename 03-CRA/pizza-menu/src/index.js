import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  //   const x = pizzaData.map((pizza) => {
  //     return <Pizza pizData={pizza} key={pizza.name} />;
  //   });
  return (
    <div className="container">
      <Header />

      <Menu />

      <Footer />
    </div>
  );
}
function Header() {
  // cosnt style={ color: "red", fontSize: "32px", textTransform: "uppercase" }
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}
function Menu() {
  return (
    <main className="menu">
      <h2>Our menu</h2>

      <ul>
        <p>Hi guys its reastuanrant here!</p>
        {pizzaData.map((pizza) => {
          return !pizza.soldOut && <Pizza pizData={pizza} key={pizza.name} />;
        })}
      </ul>
    </main>
  );
}
function Footer() {
  //   return React.createElement("footer", null, "Were currently open!");
  //   const hour = new Date().getHours();
  // const [openHour, closeHour] = [12, 22];
  //   const isOpen = hour >= openHour && hour <= closeHour;
  //   if (isOpen) alert("is open");
  //   if (hour >= openHour && hour <= closeHour) alert("We're currently open!");
  //   else alert("sorry we're closed");
  const time = new Date().getHours();
  console.log(time);
  const isOpen = time > 12 && time < 22;
  return (
    <footer className="footer">
      <div className="order">
        {isOpen ? (
          <span>we're currently open!</span>
        ) : (
          <span>we're closed</span>
        )}
        <button className="btn">Order</button>
      </div>
    </footer>
  );
}
function Pizza({ pizData }) {
  return (
    <li className="pizza">
      <img
        src={process.env.PUBLIC_URL + `${pizData.photoName}`}
        alt="pizza spinaci"
      />
      <div>
        <h3>{pizData.name}</h3>
        <p>{pizData.ingredients}</p>
        <span>{pizData.price + 3}</span>
      </div>
    </li>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
