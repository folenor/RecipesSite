import React, {useState} from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import SearchBar from "./SearchBar";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import axios from "axios";
import "./App.css";
import About from "./About";

const App = () => {
    const [calcVisible, setCalcVisible] = useState(true);


    return (
        <Router>
        <div className="App">
            <Header />
                <Switch>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/">
                        <SearchBar />
                    </Route>
                </Switch>
        </div>
        </Router>
    );
}

export default App;

ReactDOM.render(<App />, document.getElementById("root"));