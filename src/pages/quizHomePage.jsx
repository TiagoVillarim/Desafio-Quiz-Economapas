import React, { useEffect, useState } from "react";
import QuizHomePageStyle from '../components/styles/quizHomePageStyle.scss';
import Keyframes from '../components/styles/keyframes.scss'
import { useHistory } from "react-router-dom";
import api from "../services/Api";
import image from '../assets/images/char.png'

export default function QuizHomePage() {

    const [select, setSelect] = useState('easy');
    const [quizDifficult, setQuizDifficult] = useState('');

    useEffect(() => {
      setQuizDifficult(select)
    }, [select])
    
    let user = JSON.parse(localStorage.getItem("userName"));
  
    let history = useHistory();

    const iniciarQuiz = () => {
      history.push('/quizQuestions', {data: quizDifficult})
    }

  return(
    <>
      <header className="header-container-quiz">
        <h1 className="header-title-quiz">TechQuiz</h1>
        <div className="user-container">
          <a className="user">Usuário:</a>
          <a className="user-name">{user}</a>
        </div>
      </header>

      <section className="section-container">
        <h1 className="section-container-title">Está na hora de você praticar!</h1>
        <div className="image-box">
          <img src={image} className="char-image"/>
        </div>
        <div className="select-section">
          <label className="select-label">Escolha a dificuldade do quiz:</label>
            <select name="difficulty" id="difficulty" value={select} size="1" className="select" onChange={({target}) => setSelect(target.value)}>
              <option value="Easy" id="easy">Fácil</option>
              <option value="Hard" id="hard">Difícil</option>
            </select>
        </div>

        <button className="button-start" onClick={iniciarQuiz}>Iniciar Quiz</button>
      </section>
    </>
  )
}
