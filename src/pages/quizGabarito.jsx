import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import quizGabaritoStyle from "../components/styles/quizGabarito.scss";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Gabarito() {

  AOS.init({
    once: true
  })

  const history = useHistory()

  const [results, setResults] = useState([]);
  const [correct, setCorrect] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const resultData = history.location.state.data;
    setResults(resultData);

    let scoreCounter = 0

     const answersComparison = resultData.map(answer => {
        const correctAlt = answer.correctAnswer[0].split('_')[1];
        const userAlt = answer.userAnswer.split('_')[1];
        const isCorrect = correctAlt === userAlt
        const payload = {
          correctChoice: correctAlt, 
          userChoice: userAlt, 
          isCorrect: isCorrect,
        }
        if(isCorrect) {
          scoreCounter++;
        }
        return payload;
      })
      setScore(scoreCounter);
      setCorrect(answersComparison);
  }, []);

  useEffect(() => {
    console.log(score)
    console.log(correct)
  }, [score])
  
  let user = JSON.parse(localStorage.getItem("userName"));

  const resultComparison = () => {
    return correct.map((answer, index) => {
      return (
        <div className="alternatives" key={index}>
          <h1 className="question-gabarito">Questão {index + 1}</h1>
          <h1 className="user-choice" data-aos="fade-up" data-aos-duration="1000">Sua resposta: Letra: "{answer.userChoice}"</h1>
          <h1 className="correct-choice" data-aos="fade-up" data-aos-duration="1200">Resposta correta: Letra: "{answer.correctChoice}"</h1>
        </div>
      )
    })
  }

  const reiniciarQuiz = () => {
    history.push("/quizHomePage")
  }


  return(    
    <>
      <header className="header-container-gabarito">
        <div className="title-container-gabarito">
          <h1 className="header-title-gabarito">TechQuiz</h1>
          <a className="title-gabarito">Gabarito</a>
        </div>
        <div className="user-container-gabarito">
          <a className="user-gabarito">Usuário:</a>
          <a className="user-name-gabarito">{user}</a>
        </div>
      </header>

      <section className="Score-box">
        <div className="score">Sua pontuação : <strong>{score && score}/10</strong></div>
        <div className="result">
          {resultComparison()}
        </div>
      </section>

      <div className="buttons">
        <button className="restart-button" onClick={reiniciarQuiz}>Reiniciar quiz</button>
      </div>
    </>
  )
}