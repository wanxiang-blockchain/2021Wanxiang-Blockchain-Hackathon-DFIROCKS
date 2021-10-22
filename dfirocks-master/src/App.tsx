import React from 'react';
import styles from "./App.module.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { HomePage, CreatePage, EvolvePage, GalleryPage } from "./pages";
import { Header } from "./components";
// import background from "./bg.jpg";

function App() {
  return (
    <div className={styles.App} >
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/create" component={CreatePage} />
          <Route exact path="/evolve" component={EvolvePage} />
          <Route exact path="/gallery" component={GalleryPage} />
          <Route path='/icrocks' component={() => {
            window.location.href = 'https://ic.rocks/principal/yxdxv-aiaaa-aaaah-qcb3a-cai'; return null;}}/>

          <Route render={() => <h1>404 not found!</h1>} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
