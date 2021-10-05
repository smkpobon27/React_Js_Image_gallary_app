
import "./assets/css/style.css";
import React, {useState, useEffect, useRef} from "react";
import { BrowserRouter as Router,Switch, Route, Link,Redirect } from "react-router-dom";
import Home from './page/Home.js';
import Login from './page/Login.js';
import Gallery from './page/Gallery.js';
import Header from './components/Header.js';
import firebase from "firebase";
import AppContext from "./store/AppContext.js";
import routes from "./routes/routeConfig.js";
import AuthRoute from "./routes/AuthRoute.js";
import GuestRoute from "./routes/GuestRoute.js";
import Loading from "./components/Loading.js";
import NotFound from "./page/404.js";
import { motion,AnimateSharedLayout, AnimatePresence } from "framer-motion";


function App(){

	const [isLoggedIn, setIsLoggedIn] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [user, setUser] = useState({});

	useEffect(()=>{

		firebase.auth().onAuthStateChanged((user)=>{
				if(user){
					setIsLoggedIn(true);
					setUser(user);
					setIsLoading(false);
					console.log(user);
				}else{
					setIsLoggedIn(false);
					setUser({});
					setIsLoading(false);
				}
				//console.log(user);
			});

	},[]);

	if(isLoading) return <Loading />;

	return (
		    <Router>
		    	<AppContext.Provider value={[isLoggedIn, user]}>
		    	<div>
		    		<Header />

			        <Switch>
			        	
			        	{
			        	  routes.map((route, index)=>{

				        	  	if(route.protected === "auth"){
					        	  			return (<AuthRoute 
					        	  						key={index} 
								        				path={route.path}
								        				exact={route.exact}
								        				component={route.component}
								        			/>);
					        	}
			        	  		
			        	  		if(route.protected === "guest"){
						        	  		return (<GuestRoute 
						        	  						key={index} 
									        				path={route.path}
									        				exact={route.exact}
									        			>
									        				<route.component />
									        			</GuestRoute>
									        		);
								}	

			        	  		return (<Route 
			        	  						key={index} 
						        				path={route.path}
						        				exact={route.exact}
						        			>
						        				<motion.div initial={{x: 200}} animate={{x: 0}}>
						        					< route.component />
						        				</motion.div>

						        		</Route>
						        		);
			        	  		
			        		})
			        	}

			        	<Route path="*">
			        		<NotFound />
			        	</Route>
			          
			        </Switch>
		        </div>
		        </AppContext.Provider>
		    </Router>
    );


	// const[title, setTitle] = useState("Hello React");
	// const[isShowing, setIsShowing] = useState(false);
	// const mountRef = useRef(false);

	// function handleClick(){
	// 	setIsShowing(!isShowing);
	// }

//For Mount and unmount
  // useEffect(()=>{
  // 	console.log('App Mounted');

  // 	return()=>{
  // 		console.log('App Un-Mount');
  // 	};
  // },[]);

  //For Update
  	// useEffect(()=>{
  	// 	if(useRef.current){
  	// 		console.log('App Updated');
  	// 	}else{
  	// 		useRef.current = true;
  	// 	}
  	// });
  

}




// class App extends React.Component{

// 	constructor(props){
// 		super(props);
// 		this.state = {title: "Hello React", isShowing: false};
// 	}

// 	handleClick=()=>{
// 		this.setState({isShowing: !this.state.isShowing});
// 	}
// 	render(){
// 		return (
// 			<section className="flex justify-center text-center">
// 				<div className="w-1/2">
// 					<div className="my-4">{this.state.title}</div>
// 					<div>
// 						<button className="p-1 bg-blue-700 text-white"
// 							onClick={this.handleClick }>Toggle Image</button>
// 					</div>

// 					{
// 						this.state.isShowing ?(
// 							<Image />) : null
// 					}
// 				</div>
// 			</section>
			
// 			);
// 	}
// }



export default App;