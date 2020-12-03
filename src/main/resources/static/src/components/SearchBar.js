import React, {useEffect, useState} from "react";
import axios from "axios";
import "./App.css";

const SearchBar = () => {

    useEffect(() => {
        getRecipes();
    }, []);

    const getRecipes = async () => {
        axios.get('http://localhost:9000/api').then(response => {
            console.log(response.data.hits);
        })
    }

    return (
        <div>
            <form className="search-form">
                <input className="search-bar" type="text"/>
                <button   type="submit">
                    Search
                </button>
            </form>
        </div>
    )
}

export default SearchBar;