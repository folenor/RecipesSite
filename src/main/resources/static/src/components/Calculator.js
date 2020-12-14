import React, {Component} from "react";
import "./App.css";
import axios from "axios";
import CalculatorComponent from "./CalculatorComponent";

class Calculator extends Component{
    constructor(props){
        super(props);
        this.state = {
            recipes: []
        }
        this.render = this.render.bind(this);
    }


    render(){
    return(
        <div className={this.props.visible ? "Calculator Active" : "Calculator"} onClick={() => this.props.setVisible()}>
            <div className={this.props.visible ? "Calculator__content Active" : "Calculator__content"} onClick={e => e.stopPropagation()}>
                <h2 className="Calculator__header">Calculator</h2>
                {this.props.recipes.map(recipe => (
                    <CalculatorComponent 
                            name={recipe.name}
                            imageSource={recipe.imageSource}
                            id={recipe.id}
                            foodEnergy={recipe.foodEnergy}
                            delRecipe={this.props.delRecipe}
                    />
                ))}
                <form>
                    <button type="submit">Get total calories</button>
                </form>
            </div>
        </div>
    )
    }
}

export default Calculator;