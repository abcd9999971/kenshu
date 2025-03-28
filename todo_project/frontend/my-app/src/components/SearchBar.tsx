import React, { useState } from 'react';


//型検査
interface TodoSearchProps {
  onSearch: (searchTerm: string) => void;
}


const SearchBar = ({ onSearch }: TodoSearchProps) => {

  const [search, setSearch] = useState("");
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    onSearch(value);
  };

  return (
    <div className="search-container">
      <div className="search-wrapper">
        <input
          type="text"
          className="search"
          value={search}
          onChange={handleSearchChange}
          placeholder="ToDoを検索..."
        />
      </div>
    </div>
  );
} 

export default SearchBar;