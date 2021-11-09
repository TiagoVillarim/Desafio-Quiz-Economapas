import React, { useState } from "react";
import HomeStyle from './styles/homeStyle.scss';
import HomeImage from '../assets/images/imageQuiz.jpg'


export default function Home() {

  const [inputName, setInputName] = useState('');


  function saveUserName() {
    if(inputName != null || inputName != undefined){
      localStorage.setItem("userName", JSON.stringify(inputName));
      setInputName();
    }else{
      alert("Opa, você esqueceu de digitar seu nome! tente novamente.")
    }

  }

  return(
    <>
      <section className="body-container">
        <section className="section-left">    
          <header className="header-container">
            <h1 className="header-title">TechQuiz</h1>
            <a className="header-economapas">Desafio Economapas</a>
          </header>
            <div className="body-content">
              <h1 className="body-content-text">Seja bem vindo! teste seu conhecimento em tecnologia.</h1>
              <div className="input-container">
                <label className="input-title">
                  Digite seu nome:
                </label>
                <input type="text" value={inputName} onChange={event => setInputName(event.target.value) } className="input-name" maxLength="20"/>
                <button onClick={saveUserName} className="button">Próximo</button>
              </div>
            </div>
        </section>

        <section className="section-right"></section>

      </section>
    </>
  )
}