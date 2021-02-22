import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import '../node_modules/slick-carousel/slick/slick-theme.css';
import '../node_modules/slick-carousel/slick/slick.css';
import Header from './components/layout/Header';
import About from './pages/About';
import Booking from './pages/Booking';
import Homepage from './pages/Homepage';
import NotFound from './pages/NotFound';
import './styles/main.scss';

export default () => {
  return (
    <div className="App">
      <Router>
        <Header />

        <Switch>
          <Route path="/" exact={true} component={Homepage} />
          <Route path="/about" component={About} />
          <Route path="/book/:id" component={Booking} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
};
