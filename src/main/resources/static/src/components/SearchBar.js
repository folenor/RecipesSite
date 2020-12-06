import React, {useEffect, useState, Component} from "react";
import axios from "axios";
import "./App.css";

class SearchBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: '',
            recipesList: []
        };
        this.getRecipes = this.getRecipes.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    

    handleChange(event) {
        this.setState({value: event.target.value});
        console.log(this.state.value);    
    }

    getRecipes = async () => {
        axios.get(`http://localhost:9000/api/${this.state.value}`).then(response => {
            console.log(response.data.hits);
        })
    }

    handleSubmit(event) {
        this.getRecipes();
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form className="search-form" onSubmit={this.handleSubmit}>
                    <input className="search-bar" type="text" value={this.state.value} onChange={this.handleChange} />
                    <button type="submit">
                        Search
                    </button>
                </form>
            </div>
    )
    }
}

export default SearchBar;