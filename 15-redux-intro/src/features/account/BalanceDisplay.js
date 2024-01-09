import { useSelector } from "react-redux";
function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay() {
  const { balance, isLoading } = useSelector((store) => store.account);
  return (
    <div className="balance">
      {isLoading ? "Converting..." : formatCurrency(balance)}
    </div>
  );
}

export default BalanceDisplay;
