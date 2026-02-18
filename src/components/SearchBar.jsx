import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-3 text-gray-500" size={20} />
      <input
        type="text"
        placeholder="Rechercher un cours..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full bg-gray-800/50 border border-gray-700 rounded-full py-2 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default SearchBar;