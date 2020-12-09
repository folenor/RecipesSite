import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import SearchBar from "./SearchBar";
import "./App.css";

const App = () => {

    return (
        <div className="App">
            <Header />
            <SearchBar />
        </div>
    );
}

export default App;

ReactDOM.render(<App />, document.getElementById("root"));