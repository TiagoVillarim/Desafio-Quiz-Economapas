import { Route, Switch, BrowserRouter, Link } from "react-router-dom";
import Home from './pages/home';
import QuizHome from './pages/quizHomePage';
import QuizQuestions from './pages/quizQuestions';
import Gabarito from './pages/quizGabarito';


export default function Routes(){
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/quizHomePage" component={QuizHome}/>
        <Route exact path="/quizQuestions" component={QuizQuestions}/>
        <Route exact path="/quizGabarito" component={Gabarito}/>
      </Switch>
    </BrowserRouter>
    )
}