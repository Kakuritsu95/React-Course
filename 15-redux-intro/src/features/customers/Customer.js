import { useSelector } from "react-redux";
function Customer() {
  const { fullName } = useSelector((store) => store.customer);
  return <h2>👋 Welcome, {fullName.split(" ")[0]}</h2>;
}

export default Customer;
