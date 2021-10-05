import React, {useState, useContext} from "react";
import {NavLink, Redirect, useHistory} from "react-router-dom";
import firebase from "firebase";
import AppContext from "../store/AppContext.js";


export default function Header(){

			const [isLoggedIn, user] = useContext(AppContext);
			let history = useHistory();

			

			function logout(){

				firebase.auth().signOut().then((res)=>{
					history.replace("/login");
					
				})
				.catch((e)=>{
					console.log(e.response.data);
				});
			}

			return(
					<nav className="flex py-5  bg-purple-900 text-white justify-between">
			          <ul className="flex justify-between px-10">
				            <li className="mr-5">
				              <NavLink to="/" exact activeClassName="underline text-yellow-200">Home</NavLink>
				            </li>
				            <li className="mr-5">
				              <NavLink to="/gallery" activeClassName="underline text-yellow-200">Gallery</NavLink>
				            </li>
				            <li className="mr-5">
				              <NavLink to="/tensorflow" activeClassName="underline text-yellow-200">Tensorflow</NavLink>
				            </li>
				       </ul>
				       <ul className="flex justify-between px-10">
			            <li>
			            {
			            	isLoggedIn ? 
			            		(<button onClick={logout}>Logout</button>) :
			              			(<NavLink to="/login" activeClassName="underline text-yellow-200">Login</NavLink>)
			            }	
			            </li>

			            {
			            	!isLoggedIn &&
				            (<li className="ml-5">
				             
				              			<NavLink to="/signup" activeClassName="underline text-yellow-200">SignUp</NavLink>
				              				
				           	
				            </li>)
			             }
			          </ul>
			        </nav>
			       );
}