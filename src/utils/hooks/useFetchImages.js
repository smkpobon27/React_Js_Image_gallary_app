import React, {useState, useEffect} from "react";
import Axios from "axios";



const api = process.env.REACT_APP_UNSPLASH_API;
const secret = process.env.REACT_APP_UNSPLASH_KEY;

function useFetchImages(page, searchTerm){

	const [images, setImages] = useState([]);
	const [errors, setErrors] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	function fetchSearch(){

		Axios.get(`${ api }/search/photos/?client_id=${ secret }&page=${page}&query=${searchTerm}`
				)
				.then((res)=>{

						if(page > 1){
							setImages([...images, ...res.data.results]);
						}
						else{
							setImages([...res.data.results]);
						}
						setIsLoading(false);
					})
				.catch(function(e){
						// console.log(e.response.data.errors.length);
						setErrors(e.response.data.errors);
						setIsLoading(false);
				});
	}

	function fetchRandom(){

		Axios.get(`${ api }/photos/?client_id=${ secret }&page=${page}`
				)
				.then((res)=>{
					
						setImages([...images, ...res.data]);
						setIsLoading(false);
					})
				.catch(function(e){
						// console.log(e.response.data.errors.length);
						setErrors(e.response.data.errors);
						setIsLoading(false);
				});
	}
	//Here useEffect is used to stop the axios Api call again & again.
	//By using useEffect, API will be called once only when the app is mounted.
	useEffect(()=>{

		setIsLoading(true);
		
		if(searchTerm !== null){
			fetchSearch();
		}else{
			fetchRandom();
		}

	},[page]);

//For Search query
	useEffect(()=>{
		
		setIsLoading(true);

		if(searchTerm === null){
			fetchRandom();
		}

		fetchSearch();

	},[searchTerm]);

	return [images, setImages, errors, isLoading];
}


export default useFetchImages;