import firebase from '../config/firebase.js';
import {useState} from "react";
import {Redirect} from "react-router-dom";

	function Login(){

		const [isLoading, setIsLoading] = useState(false);
		const [error, setError] = useState("");
		const [form, setForm] = useState({email:"", password: ""});
		const [isLoggedIn, setIsLoggedIn] = useState(false);

		function handleForm(e){

			if(isLoading) return;

			setIsLoading(true);
			e.preventDefault();
			firebase.auth().signInWithEmailAndPassword(form.email, form.password)
			.then((res)=>{
				//console.log(res);
				setError("");
				setIsLoggedIn(true);
				setIsLoading(false);
			})
			.catch((e)=>{
				console.log(e);
				setError(e.message);
				setIsLoading(false);
			});
		}

		function handleInput(e){

			setForm({...form, [e.target.name]:e.target.value});
		//	console.log(e.target.value, e.target.name);
		}

		if(isLoggedIn) return (<Redirect to="/" />);

  		return(
  				<div className="flex h-screen bg-gray-200">
  					
  					<div className="m-auto w-1/3 text-white flex flex-wrap justify-center bg-gradient-to-br 
  					from-indigo-900 to-indigo-700 shadow-lg rounded-lg">

  						<form className="m-5 w-10/12" onSubmit={handleForm}>

  							{error !=="" ? (<p>{error}</p>) : null}

  							<h1 className="w-full text-4xl tracking-widest text-center my-6">Login</h1>

  							<div className="w-full my-6">
  								<input type="email" 
  									className="p-2 rounded shadow w-full text-black"
  									placeholder="Email or Username"
  									name="email"
  									value={form.email}
  									onChange={handleInput}
  								 />
  							</div>

  							<div className="w-full my-6">
  								<input type="password" 
  									className="p-2 rounded shadow w-full text-black"
  									placeholder="Password"
  									name="password"
  									value={form.password}
  									onChange={handleInput}
  								 />
  							</div>

  							<div className="w-full my-6">
  								<button type="submit" 
  									className="p-2 rounded shadow w-full bg-gradient-to-tr from-yellow-400 
  										to-yellow-200 text-black"
  									 >
  									 {
  									 	isLoading ? 
  									 	(<i className="fa fa-circle-o-notch fa-spin text-yellow-800" aria-hidden="true"></i>)
  									 	: "Login"
  									 }
  									 
  								</button>
  							</div>
  						</form>
  					</div>

  				</div>
  			);
  	}

  	export default Login;