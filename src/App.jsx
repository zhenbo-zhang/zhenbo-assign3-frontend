import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import RequestPage from './components/requestPage.jsx';
import RedirectPage from './components/redirectPage.jsx';
import EditPage from './components/editPage.jsx';
import './index.css';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <Route exact path="/" component={RequestPage} />
                    <Route
                        exact
                        path="/url/:uniquePathId/"
                        component={RedirectPage}
                    />
                    <Route
                        exact
                        path="/url/:uniquePathId/edit/"
                        component={EditPage}
                    />
                </Router>
            </div>
        );
    }
}

export default App;
