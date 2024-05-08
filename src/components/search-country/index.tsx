import { useState } from "react";
import "./index.scss";


interface IProp {
    onSearch: (value: string) => void;
}

const SearchCountry = ({ onSearch }: IProp) => {
    const [input, setInput] = useState("");

    return (<div className="wa-search-country">
        <input
            className="wa-search-country__input"
            onChange={e => setInput(e.target.value)}
            placeholder="Search country or city here..."
        />
        <button className="wa-search-country__button" onClick={() => onSearch(input)}>
            Search
        </button>
    </div>)
}

export default SearchCountry;