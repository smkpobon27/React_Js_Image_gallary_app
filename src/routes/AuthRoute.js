import React, {useContext} from "react";
import {Route, Redirect} from "react-router-dom";
import AppContext from "../store/AppContext.js";
import Loading from "../components/Loading.js";


function AuthRoute(props){

	const [isLoggedIn] = useContext(AppContext);

	//if(isLoggedIn === null) return <Loading />;
	//console.log(isLoggedIn);
	if(isLoggedIn) {
		console.log("Auth: "+isLoggedIn);
		return (<Route {...props} />);
	}
	

	return (<Redirect to="/login" />);
}

export default AuthRoute;