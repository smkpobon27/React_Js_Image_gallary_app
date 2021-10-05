import React, {useContext} from "react";
import {Route, Redirect} from "react-router-dom";
import AppContext from "../store/AppContext.js";
import Loading from "../components/Loading.js";
import { motion,AnimateSharedLayout, AnimatePresence } from "framer-motion";


function GuestRoute({children, ...rest}){

	const [isLoggedIn] = useContext(AppContext);
	
	//if(isLoggedIn === null) return <Loading />;
	//console.log(isLoggedIn);
	if(!isLoggedIn) {
		console.log("Guest:"+isLoggedIn);
		return (<Route {...rest} >
					<motion.div initial={{x: 200}} animate={{x: 0}}>
						{children}
					</motion.div>
				</Route>);
	}
	

	return (<Redirect to="/" />);
}

export default GuestRoute;