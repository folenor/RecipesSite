import React, {useState} from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import SearchBar from "./SearchBar";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Calculator from "./Calculator";
import axios from "axios";
import "./App.css";

const App = () => {
    const [calcVisible, setCalcVisible] = useState(true);


    return (
        <div className="App">
            <Router>
            <Header />
            <SearchBar/>
            <Switch>
                <Route path="/calculator">
                    <Calculator visible={calcVisible}
                                setVisible={setCalcVisible}/>
                </Route>
            </Switch>
            </Router>
        </div>
    );
}

export default App;

ReactDOM.render(<App />, document.getElementById("root"));