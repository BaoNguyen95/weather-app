import { ReactNode } from "react";
import "./index.scss"

interface IProps {
    children: ReactNode;
    title?: string;
}

const BoxContainer = ({ children, title }: IProps) => {
    return <div className="wa-box-container">
        <div className="wa-box-container__title">{title}</div>
        <div className="wa-container">{children}</div>
    </div>
}

export default BoxContainer;