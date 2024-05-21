import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import "./index.scss";
import weatherService from "../../service/weather.service";
import { ErrorType, ICountry } from "../../models";
import BoxContainer from "../box-container";

interface IProp {
    onSearch: (value: string) => void;
}

const SearchCountry = ({ onSearch }: IProp) => {
    const [input, setInput] = useState("");
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [error, setError] = useState<ErrorType>("");

    useEffect(() => {
        (async () => {
            if (input) {
                const countries = await weatherService.getCountryList(input);
                if (typeof countries === "string") {
                    setError(countries);
                } else {
                    setCountries(countries);
                    setError("");
                }
            }
        })();
    }, [input]);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

    const onDebounce = useMemo(() => {
        return debounce(handleOnChange, 1000);
    }, []);


    return (<div className="wa-container wa-search-country">
        <div className="wa-search-country__search-content">
            <input
                className="wa-search-country__input"
                onChange={onDebounce}
                placeholder="Search country or city here..."
            />
            {error && <span className="wa-error-message">{error}</span>}
        </div>
        {countries.length !== 0 && <BoxContainer className="wa-search-country__list" title="State">
            {countries.map(c => {
                const strDisplay = [c.name, c.state, c.country];
                const country = strDisplay.filter(Boolean).join(", ");
                return <span className="wa-search-country__item" onClick={() => onSearch(country)}>{country}</span>
            })}
        </BoxContainer>}
    </div>)
}

export default SearchCountry;