import React, {Component} from "react";
import { BrowserRouter as Router, Route,Redirect, Switch } from 'react-router-dom';

import AdminLayout from "layouts/Admin.jsx";
import AuthLayout from "layouts/Auth.jsx";
//import AuthRoute from "./components/Util/AuthRoute";
import UserPage from "./views/examples/UserPage.jsx";

import { Offline, Online } from "react-detect-offline";

import jwtDecode from 'jwt-decode';

import { Provider } from 'react-redux';
import store from './redux/store';

import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData} from "./redux/actions/userActions";
import axios from 'axios';

//axios.defaults.baseURL = 'https://us-central1-intelligent-bin-ca982.cloudfunctions.net/api';

const token = localStorage.FBIdToken;

if(token){
    const decodedToken = jwtDecode(token);
    //console.log(decodedToken);
    if(decodedToken.exp * 1000 < Date.now()){
        store.dispatch(logoutUser());
        window.location.href = '/auth/login';
    }else{
        store.dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common['Authorization'] = token;
        store.dispatch(getUserData());
    }
}

class App extends Component {
    render() {
        return(
            <>
                <Offline>
                    <h1>Se perdió la conexión a Internet. Verifique su conexión y vuelva a intentarlo más tarde.</h1>
                </Offline>

                <Online>
                    <Provider store={ store }>
                        <Router>
                            <Switch>
                                <Route path="/admin" component={ props => <AdminLayout { ...props }/> }/>
                                <Route path="/auth" component={ props => <AuthLayout { ...props }/> }/>
                                <Route exact path="/users/:handle" component={ props => <UserPage { ...props }/> }/>
                                <Route exact path="/users/:handle/project/:projectId" component={ props => <UserPage { ...props }/> }/>
                                <Redirect exact from="/" to="/admin/user-profile"/>
                            </Switch>
                        </Router>
                    </Provider>
                </Online>
            </>
        )
    }
}

export default App;