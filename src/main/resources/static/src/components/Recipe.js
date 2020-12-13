import React, {useState} from "react";
import style from "./Recipe.module.css";
import axios from "axios";

const Recipe = (props) => {
    const id = 0;
    return (
        <div className={style.Recipe}>
            <h1>{props.label}</h1>
            <p>Calories per 100 grams: {Math.trunc(props.calories)}</p>
            <p>Ingredients:</p>
            <ol className={style.ingredients}>
                {props.ingredients.map(ingredient => (
                    <li>{ingredient.text}</li>
                ))}
            </ol>
            <div className={style.Center}>
                <form action={props.source} target="_blank">
                    <button className={style.SourceButton}>
                        Instructions
                    </button>
                </form>
                <form onSubmit={async (e) => {axios.post('http://localhost:9000/api/', {id: id, name: props.label,imageSource: props.image, foodEnergy: Math.trunc(props.calories)}).then(result => console.log(result)); e.preventDefault();}}>
                    <button className={style.AddButton} type="submit">
                        Add to my menu
                    </button>
                </form>
            </div>
            <img className={style.image}src={props.image} alt="Image"/>
        </div>
    );
};

export default Recipe;