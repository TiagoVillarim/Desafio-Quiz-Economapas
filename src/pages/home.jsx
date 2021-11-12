import React, { useState } from "react";
import { useHistory } from "react-router";
import HomeStyle from '../components/styles/homeStyle.scss';
import Keyframes from '../components/styles/keyframes.scss'



export default function Home() {

  let history = useHistory();

  const [inputName, setInputName] = useState();
  const [error, setError] = useState("Digite seu nome:")

  function saveUserName() {
      if(!authName()){
        return;
      }else{
        let user = {
          inputName: inputName,
        }
      }
      localStorage.setItem("userName", JSON.stringify(inputName).toLocaleLowerCase());
      setInputName("");
      setError("Digite seu nome:")
      history.push("/quizHomePage")
  };

  function authName() {
    if(inputName === undefined || inputName < 1){
      setError("Opa, você esqueceu de digitar seu nome!")
      return false;
    }
    return true;
  };



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
                  {error}
                </label>
                <input type="text" value={inputName} placeholder="ex: tiago villarim" onChange={event => setInputName(event.target.value) } className="input-name" maxLength="21"/>
                <button onClick={saveUserName} className="button">Próximo</button>
              </div>
            </div>
        </section>

        <section className="section-right"></section>

      </section>
    </>
  )
}