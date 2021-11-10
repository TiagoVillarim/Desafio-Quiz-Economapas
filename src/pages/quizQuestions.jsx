import axios from "axios";
import React, { useEffect, useState } from "react";
import '../components/styles/quizQuestionsStyle.scss';
import { useHistory } from "react-router-dom";

export default function QuizQuestions() {
  
  const history = useHistory();

  const [questions, setQuestions] = useState([]);
  const [questionCounter, setQuestionCounter] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState();
  const [selectedQuestion, setSelectedQuestion] = useState();
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState();


  let user = JSON.parse(localStorage.getItem("userName"));
  
  const apiRequest = async () => {
    const quizDifficulty = history.location.state.data
    const headerOptions = {  headers: {"X-Api-Key": "Rfb9YDX3Ax9u4IUgn11H1IApmy0wLG8ENIT85v3e"}}
    const response = await axios.get(`https://quizapi.io/api/v1/questions?difficulty=${quizDifficulty}`, headerOptions)
    
    const filteredQuestions = response.data.filter(question => {
      const filtered = Object.values(question.answers).filter(value => value !== null);
      if (filtered.length === 4) return filtered;
    });
    
    if (filteredQuestions.length < 10) await apiRequest();
    
    return filteredQuestions;
  }

  useEffect(() => {
    const fetchQuestions = async () => {
      const request = await apiRequest();
      setQuestions(request);
      console.log(questions);
    }
    fetchQuestions();
  }, []);

  useEffect(() => {
    setCurrentQuestion( () => questions[questionCounter])
  }, [questionCounter, questions])

  const handleQuestion = () => {
    setSelectedQuestion(undefined);
    setQuestionCounter(questionCounter + 1);
    const correctAnswer = Object.entries(currentQuestion.correct_answers).filter(([key, value]) => value == "true");
    setAnswers([...answers, {userAnswer: answer, correctAnswer: correctAnswer[0], question: questionCounter}]);
  }

  useEffect(() => {
    console.log(answers)
  },[answers])

  const handleCheckbox = (target) => {
    setSelectedQuestion(target.value);
    setAnswer(target.id);
  };

  const goFinishPage = () => {
    history.push('/quizGabarito')
  }

  const generateButton = () => {
    if(questionCounter === 9){
      return(
        <button onClick={() => goFinishPage()} className="button">finish</button> 
      )
    }
     return <button onClick={() => handleQuestion()} className="button">next</button> 
    
  }
  
  return(
    <>
      <header className="header-container-questions">
        <div className="title-container">
          <h1 className="header-title-questions">TechQuiz</h1>
          <a className="title-perguntas">Perguntas</a>
        </div>
        <div className="user-container-questions">
          <a className="user-questions">Usuário:</a>
          <a className="user-name-questions">{user}</a>
        </div>
      </header>
      <section className="question-section">
        <div className="question-box"><strong className="question-number">Question number {questionCounter + 1} :</strong>
          <a className="question">{currentQuestion && currentQuestion.question}</a>
        </div>
        {currentQuestion && Object.entries(currentQuestion.answers).map(([key, value], index) => {
          if (value == null || undefined) return undefined;
          return(
            <div className="answer-alternative" key={index}>
              <input type="checkbox" id={key} value={index} onChange={({ target }) => handleCheckbox(target)} checked={selectedQuestion == index} />
              {key.slice(-1)[0].toUpperCase()} - {value}
            </div>
          )
        })}
      </section>
      <div className="button-box">
        {generateButton()}
      </div>
    </>
  )
}