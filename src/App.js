import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import './styles/main.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          component={ HomePage }
        />
        {/* <Route
          path="/favorites"
          component={ Favorites }
        /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
