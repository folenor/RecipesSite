import React, {Component} from "react";
import "./App.css";
import axios from "axios";
import CalculatorComponent from "./CalculatorComponent";

class Calculator extends Component{
    constructor(props){
        super(props);
        this.state = {
            totalCalories: 0,
            recipes: []
        }
        this.render = this.render.bind(this);
        this.getTotalCalories = this.getTotalCalories.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.deleteRecipe = this.deleteRecipe.bind(this);
    }

    getSavedRecipes = async () => {
        axios.get("http://localhost:9000/api/").then(response => {
            this.setState({
                recipes: response.data
            });
        });
    }


    componentDidMount = async () => {
        axios.get("http://localhost:9000/api/").then(response => {
            this.setState({
                recipes: response.data
            });
            console.log(this.state.recipes);
        });
        axios.get("http://localhost:9000/api/total/calories").then(response =>{
            this.setState({
                totalCalories: response.data
            });
        });
    }

    getTotalCalories = async () => {
        axios.get("http://localhost:9000/api/total/calories").then(response =>{
            this.setState({
                totalCalories: response.data
            });
        });
    }

    deleteRecipe = async (id, event) => {
        axios.delete(`http://localhost:9000/api/${id}`).then(response =>{
                                 console.log(response);
                                 this.getSavedRecipes();
                                 this.getTotalCalories();
        });
        this.setState({
            recipes: this.state.recipes.splice(id,1)
        })

        event.preventDefault();
    }
    componentDidUpdate() {
        this.getSavedRecipes();
    }


    render(){
    return(
        <div className={this.props.visible ? "Calculator Active" : "Calculator"} onClick={() => {this.props.setVisible(false); this.getSavedRecipes();
        }}>
            <div className={this.props.visible ? "Calculator__content Active" : "Calculator__content"} onClick={e => e.stopPropagation()}>
                <h2 className="Calculator__header">Calculator</h2>
                {this.state.recipes.map(recipe => (
                    <CalculatorComponent 
                            name={recipe.name}
                            imageSource={recipe.imageSource}
                            id={recipe.id}
                            foodEnergy={recipe.foodEnergy}
                            delRecipe={this.deleteRecipe}
                    />
                ))}
                <h5 className="Calculator__header">Total calories: {this.state.totalCalories}</h5>
                <form className="Calculator__header" onSubmit={e => {this.getTotalCalories(); e.preventDefault();}}>
                    <button className="Green_button" type="submit">Get total calories</button>
                </form>
            </div>
        </div>
    )
    }
}

export default Calculator;