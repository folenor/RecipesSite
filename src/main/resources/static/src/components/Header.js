import React, {useState} from "react";
import Calculator from "./Calculator";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import "./App.css";

const Header = () => {
    const [visible, setVisible] = useState(false);
    return (
        <div className="Header">
            <a className="Anchor" href="/"><div className="Header__text">Recepies site</div></a>
            <ul className="Nav-menu">
                <li className="Nav-link">
                    <Link className="Nav-Anchor" to="/">Search</Link>
                </li>
                <li className="Nav-link" onClick={(e) => {
                    setVisible(true);
                    e.stopPropagation();
                    e.preventDefault();
                }}>
                    Calculator
                </li>
                <li className="Nav-link">
                    <Link className="Nav-Anchor" to="/about">About</Link>
                </li>
            </ul>
            <div>
            <Calculator visible={visible}
                                setVisible={setVisible}/>
            </div>
        </div>
    )
}

export default Header;