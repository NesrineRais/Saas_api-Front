import logo from './logo.svg';
import './App.css';
import Home from './components/home';
import Header from './components/header';
import Register from './components/user/register';
import Login from './components/user/login';
import Forgot from './components/user/forgot';
import Logout from './components/user/logout';
import {Switch, Route} from "react-router-dom";
import RequireDataAuth from './helpers/require-auth-data';
import Agenda from './components/agenda.js';
import Follow from './components/prospect/prospect'
import registerServiceWorker from './registerServiceWorker';
import Prospect from './components/prospect/prospect';
import AddProspect from './components/prospect/addProspect';
import DetailProspect from './components/prospect/detailProspect'
import EditProspect from './components/prospect/editProspect';
import Stats from './components/stats';


function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={RequireDataAuth(Home, true)} />
        <Route exact path="/register" component={RequireDataAuth(Register)} />
        <Route exact path="/login" component={RequireDataAuth(Login)} />
        <Route exact path="/forgot" component={RequireDataAuth(Forgot)} />
        <Route exact path="/logout" component={RequireDataAuth(Logout)} />
        <Route exact path="/agenda" component={RequireDataAuth(Agenda, true)} />
        <Route exact path="/prospect" component={RequireDataAuth(Prospect, true)} />
        <Route exact path="/addProspect" component={RequireDataAuth(AddProspect, true)} />
        <Route exact path="/editProspect/:id" component={RequireDataAuth(EditProspect, true)} />
        <Route exact path="/detail/:id" component={RequireDataAuth(DetailProspect, true)} />
        <Route exact path="/stats" component={RequireDataAuth(Stats, true)} />


      </Switch>
    </div>
  );
}

export default App;
