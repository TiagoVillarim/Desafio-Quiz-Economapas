import { Route, Switch, BrowserRouter, Link } from "react-router-dom";
import Home from './components/home';


export default function Routes(){
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}/>
      </Switch>
    </BrowserRouter>
    )
}