import React, { useState, useEffect } from "react";
import { searchUsers } from "../services/api";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 100);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  useEffect(() => {
    const search = async () => {
      if (searchTerm !== "") {
        console.log("searchTerm:", searchTerm);
        const found = await searchUsers(searchTerm);
        setSearchResults(found);
      } else {
        setSearchResults([]);
      }
    };

    search();
  }, [searchTerm]);

  return (
    <div className="relative bg-gray-50 p-1 rounded-sm">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Search for friends..."
        className="border-none outline-none text-black w-full"
      />
      {isFocused && <SearchResultsList searchResults={searchResults} />}
    </div>
  );
};

const SearchResultsList = ({ searchResults }) => {
  if (!searchResults) {
    return null;
  }
  return (
    <div className="flex flex-col absolute right-0 bg-white w-full mt-2 rounded-sm space-y-1 divide-y">
      {searchResults.length !== 0 ? (
        searchResults.map((user) => (
          <div key={user._id} className="flex items-center h-10 pl-2">
            {/* <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full" /> */}
            <p
              className="text-black"
              onClick={() => {
                const userId = user._id;
                window.location.href = `/${userId}`;
              }}
            >
              {user.username}
            </p>
          </div>
        ))
      ) : (
        <div className="flex items-center h-10 pl-2">
          <p className="text-black">No users found</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
