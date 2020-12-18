import React, {Component} from "react";
import "./App.css";
import axios from "axios";

class CalculatorComponent extends Component{
    constructor(props){
        super(props);
        this.state ={
            grams: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.render = this.render.bind(this);
    }
    

    componentDidMount(){
        axios.post(`http://localhost:9000/api/${this.props.id}/${this.state.grams}`, {}).then(response =>{
        })
    }

    handleChange(event){
        this.setState({
            grams: event.target.value
        });
    }

    handleSubmit = async (event) => {
        axios.post(`http://localhost:9000/api/${this.props.id}/${this.state.grams}`, {}).then(response =>{
            console.log(response);
        })
        event.preventDefault();
    }

    render(){
        return(
            <div>
                <div>
                    <h5 className="Calc_data">{this.props.name}</h5>
                    <img className="Calculator__image" src={this.props.imageSource}/>
                    <form className="Calc_data" onSubmit={this.handleSubmit}>
                        <input type="text" value={this.state.grams} onChange={this.handleChange} placeholder="please enter the number of grams"/>
                        <button className="Green_button" type="submit">
                            ✓
                        </button>
                        <button className="Red_button" onClick={e => {this.props.delRecipe(this.props.id, e);
                        }}>
                            ✘
                    </button>
                    </form>
                </div>
                <p className="Calc_data">Calories per {this.state.grams}g: {this.props.foodEnergy * this.state.grams / 100}</p>
            </div>
        )
    }
}

export default CalculatorComponent;