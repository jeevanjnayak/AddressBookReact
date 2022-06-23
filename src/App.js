import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import React from "react";
import './App.css';
import AddressBook from "./component/addressBook/AddressBook";
import AddPerson from "./component/addPerson/AddPerson";
import Header from "./Header";

function App() {
  return (
    <div className="App">
      <Header/>
        <Router>
          <Switch>
            <Route path="/home"><AddressBook /></Route>
            <Route path="/add"><AddPerson /></Route>
            <Route exact path="/AddPerson/:id"><AddPerson /></Route>
          </Switch>
        </Router>
    </div>
  );
}
export default App;