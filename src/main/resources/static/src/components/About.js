import React from "react";
import "./App.css";

const About = () => {
    return (
        <div className="About">
            <div className="About_content">
                <h1 className="About_header">Site description</h1>
                <article className="Article_content">
                    <div><p>Это веб-приложение является курсовой работой по предмету Объектно-ориентированное программирование,
                        по теме "Создание веб-приложений на базе сочетания серверных сервисов и клиентских одностраничных приложений,
                        проектируемых с применением современных технологий фронтенд-разработки".
                        Серверная часть данного веб-приложения написана с использованием языка Java и фреймворка Spring на серверной части,
                        вместе с базой данных PostgreSQL. Фронтед часть выполнена с использованием языка JavaScript и фреймфорка React
                        </p>
                    </div>
                    <div className="Image-block">
                        <img className="App-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png"/>
                        <img className="App-logo" src="https://spring.io/images/OG-Spring.png"/>
                    </div>
                </article>
            </div>
        </div>
    )
}

export default About;