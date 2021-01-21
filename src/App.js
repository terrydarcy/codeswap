import React from "react";
import "./App.css";
import SplashScreen from "./pages/SplashScreen";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserProvider from "./providers/UserProvider";
import Footer from "./components/Footer";
import { createStore } from "redux";
import songDataReducers from "./redux/reducers";
import { Provider } from "react-redux";

function App() {
  const store = createStore(songDataReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

  return (
    <UserProvider>
      <Provider store={store}>
        <div className="app">
          <div className="app_body">
            <Router>
              <Switch>
                <Route path="/" exact component={SplashScreen} />
              </Switch>
            </Router>
          </div>
          <Footer />
        </div>
      </Provider>
    </UserProvider>
  );
}

export default App;
