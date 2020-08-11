import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseRouter from './routes';
import SidePanal from './containers/SidePanal/SidePanal';
import Profile from './containers/SidePanal/profile';
import Model from './containers/Popup'
import * as actions from './store/actions/auth';
import * as navaction from './store/actions/nav'


class App extends React.Component {

    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        return(
            <Router>
                <div id="frame">
                    <SidePanal />
                    <Model isVisible= {this.props.showAddchat}
                        close={() => this.props.closeAddchat()} />
                    <div className="content">
                        <Profile />
                        <BaseRouter />
                    </div>
                </div>
            </Router>
        );
    };
}
  

const mapStateToProps = (state) => {
    return {
        showAddchat: state.nav.showAddPop
    }

}


const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckstate()),
        closeAddchat: () => dispatch(navaction.closeAddChat())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);