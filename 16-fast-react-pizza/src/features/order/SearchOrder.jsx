import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-sm  transition-all duration-300 placeholder:text-stone-400 sm:focus:w-72 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-yellow-500 sm:w-64"
      />
    </form>
  );
}

export default SearchOrder;
