
import { useContext } from "react";
import "./index.scss";
import SearchIcon from "../../assets/wa-search.svg";
import PinIcon from "../../assets/wa-pin.svg";
import { AppContext } from "../../context/app.context";

const SideBarComponent = () => {

    const { state } = useContext(AppContext);

    const country = state.country;

    return (
        <div className="wa-side-bar">
            <div className="wa-side-bar__container">
                <img className="wa-side-bar__icon" src={PinIcon} alt="Location Icon" width={16} height={16} />
                {country && <span className="wa-side-bar__info">{country.name}, {country.country}</span>}
            </div>
            <img className="wa-side-bar__search" src={SearchIcon} alt="Search Country" width={16} height={16} />
        </div>
    )
}

export default SideBarComponent;