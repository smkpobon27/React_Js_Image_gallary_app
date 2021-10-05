import firebase from '../config/firebase.js';
import {useState} from "react";
import {Redirect, useHistory} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";

	function SignUp(){

		const history = useHistory();

		const formik = useFormik({
			initialValues: {email: "", password: ""},
			onSubmit: (values)=>{
				// console.log("formik: ",values);
				firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
				.then((res)=>{

					history.replace("/");
				})
				.catch((e)=>{
					//console.log(e);
					formik.setFieldError("email", e.message);
				});
			},

			validationSchema: Yup.object({
				email: Yup.string().required("Email is required.").email("Invalid email address"),
				password: Yup.string().required("Password is required.").min(6)
			})

			// validate: (values)=>{
			// 	const errors = {};

			// 	if(!values.email){
			// 		errors.email = "Email is required.";
			// 	}else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
   //   				errors.email = 'Invalid email address';
   // 				}

			// 	if(!values.password){
			// 		errors.password = "Password is required.";
			// 	}else if(values.password.length < 6){
			// 		errors.password = "Password must be upper than 6 character.";
			// 	}

			// 	return errors;
			// }
			
		});

  		return(
  				<div className="flex h-screen bg-gray-200">
  					
  					<div className="m-auto w-1/3 text-white flex flex-wrap justify-center bg-gradient-to-br 
  					from-indigo-900 to-indigo-700 shadow-lg rounded-lg">

  						<form className="m-5 w-10/12" onSubmit={formik.handleSubmit}>

  							<h1 className="w-full text-4xl tracking-widest text-center my-6">Sign Up Here</h1>

  							<div className="w-full my-6">
  								<input type="email" 
  									className="p-2 rounded shadow w-full text-black"
  									placeholder="Email or Username"
  									name="email"
  									value={formik.values.email}
  									onChange={formik.handleChange}
  									onBlur={formik.handleBlur}
  								 />
  								 {
  								 	(formik.touched.email && formik.errors.email) ? 
  								 	(<p>{formik.errors.email}</p> ):null
  								 }
  							</div>

  							<div className="w-full my-6">
  								<input type="password" 
  									className="p-2 rounded shadow w-full text-black"
  									placeholder="Password"
  									name="password"
  									value={formik.values.password}
  									onChange={formik.handleChange}
  									onBlur={formik.handleBlur}
  								 />
  								 {
  								 	(formik.touched.password && formik.errors.password) ? 
  								 	(<p>{formik.errors.password}</p> ):null
  								 }
  							</div>

  							<div className="w-full my-6">
  								<button type="submit" 
  									className="p-2 rounded shadow w-full bg-gradient-to-tr from-yellow-400 
  										to-yellow-200 text-black"
  									 >
  									 SignUp
  									 </button>
  									
  							</div>
  						</form>
  					</div>

  				</div>
  			);
  	}

  	export default SignUp;