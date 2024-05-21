
import { useContext } from "react";
import "./index.scss";
import SearchIcon from "../../assets/wa-search.svg";
import PinIcon from "../../assets/wa-pin.svg";
import { AppContext } from "../../context/app.context";

interface IProp {
    onClickSearchIcon: () => void;
    onClickCountry: () => void;
}

const SideBarComponent = ({ onClickSearchIcon, onClickCountry }: IProp) => {

    const { state: { country } } = useContext(AppContext);

    return (
        <div className="wa-side-bar">
            <div className="wa-side-bar__container">
                <div className="wa-side-bar__content" onClick={onClickCountry}>
                    <img className="wa-side-bar__icon" src={PinIcon} alt="Location Icon" width={16} height={16} />
                    {country && <span className="wa-side-bar__info">{country.name}, {country.sys.country}</span>}
                </div>
                <img className="wa-side-bar__search" src={SearchIcon} alt="Search Country" width={16} height={16} onClick={onClickSearchIcon} />
            </div>
        </div>
    )
}

export default SideBarComponent;