import { React, useState } from "react";

export default function Search(props) {
  const [searchText, setSearchText] = useState("");

  function handleChange(e) {
    setSearchText(e.target.value);
  }

  function submitHandler(){
    
  }


  return (
    <form onSubmit={(e) => props.submit(e, searchText, setSearchText)}>
      <input
        className="search-box"
        type="text"
        placeholder="Enter movie name here"
        onChange={handleChange}
        name="searchbox"
        value={searchText}
      />
      <button className="search-btn" type="submit">
        Search
      </button>
    </form>
  );
}
