import React from "react";
import style from "./Recipe.module.css";

const Recipe = (props) => {
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
                <form>
                    <button className={style.AddButton}>
                        Add to my menu
                    </button>
                </form>
            </div>
            <img className={style.image}src={props.image} alt="Image"/>
        </div>
    );
};

export default Recipe;