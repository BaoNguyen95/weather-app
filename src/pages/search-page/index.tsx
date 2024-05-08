
import SearchCountry from "../../components";
import "./index.scss";

interface IProp {
    onSearch: (value: string) => void;
}

const SearchPage = ({ onSearch }: IProp) => {

    return <div className="wa-search-page">
        <SearchCountry onSearch={onSearch} />
    </div>
};

export default SearchPage;