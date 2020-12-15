import React, {Component} from "react";
import axios from "axios";
import "./App.css";
import Recipe from "./Recipe";
import Calculator from "./Calculator";

class SearchBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: '',
            recipesList: [],
            calcVisible: props.calc,
            savedRecipes: []
        };
        this.getRecipes = this.getRecipes.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.hideCalculator = this.hideCalculator.bind(this);
        this.render = this.render.bind(this);
        this.deleteRecipe = this.deleteRecipe.bind(this);
        this.getSavedRecipes(); 
    }
    

    handleChange(event) {
        this.setState({value: event.target.value});
        console.log(this.state.value);    
    }

    getRecipes = async () => {
        axios.get(`http://localhost:9000/api/${this.state.value}`).then(response => {
            console.log(response.data.hits);
            this.setState({recipesList : response.data.hits});
        })
    }

    getSavedRecipes = async () => {
        axios.get("http://localhost:9000/api/").then(response => {
            this.setState({
                savedRecipes: response.data
            });
            console.log(this.state.savedRecipes);
        });
    }

    handleSubmit(event) {
        this.getRecipes();
        event.preventDefault();
    }

    deleteRecipe = async (id, event) => {
        axios.delete(`http://localhost:9000/api/${id}`).then(response =>{
                                 console.log(response);
                                 this.getSavedRecipes();
        });
        this.setState({
            savedRecipes: this.state.savedRecipes.splice(id,1)
        })

        event.preventDefault();
    }

    hideCalculator(){
        this.setState({calcVisible: false});
    }
    render() {
        return (
            <div>
                <form className="search-form" onSubmit={this.handleSubmit}>
                    <input className="search-bar" type="text" value={this.state.value} onChange={this.handleChange} />
                    <button className="Button" type="submit">
                        Search
                    </button>
                </form>
                <div className="Recipes">
                <Calculator visible={this.state.calcVisible}
                            setVisible={this.hideCalculator}
                            recipes={this.state.savedRecipes} 
                            delRecipe={this.deleteRecipe}
                    />
                {this.state.recipesList.map(recipe => (
                    <Recipe 
                        label={recipe.recipe.label}
                        ingredients={recipe.recipe.ingredients}
                        calories={100 * recipe.recipe.calories / recipe.recipe.totalWeight}
                        image={recipe.recipe.image}
                        source={recipe.recipe.url}
                    />
                ))}
                </div>
            </div>
    )
    //добавить футер и доделать хедер, сделать калькулятор
    }
}

export default SearchBar;