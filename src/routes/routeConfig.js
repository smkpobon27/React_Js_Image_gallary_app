import React from "react";
import {Route} from "react-router-dom";
import Home from "../page/Home.js";
import Gallery from "../page/Gallery.js";
import Login from "../page/Login.js";
import SignUp from "../page/SignUp.js";
import Tensorflow from "../page/Tensorflow.js";


const routes = [
				{
					path: "/",
					component: Home,
					exact: true,
					protected: null
				},
				{
					path: "/gallery",
					component: Gallery,
					protected: "auth"
				},
				{
					path: "/login",
					component: Login,
					protected: "guest"
				},
				{
					path: "/signup",
					component: SignUp,
					protected: "guest"
				},
				{
					path: "/tensorflow",
					component: Tensorflow,
					protected: null
				}
			   ];


export default routes;