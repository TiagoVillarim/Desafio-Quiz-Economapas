import React from "react";
import axios from "axios";
import { useHistory } from "react-router";
import quizGabaritoStyle from "../components/styles/quizGabarito.scss"

export default function Gabarito() {

  let user = JSON.parse(localStorage.getItem("userName"));

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
    </>
  )
}