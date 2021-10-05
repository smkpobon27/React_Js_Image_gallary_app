import React, {useRef, useEffect, useState} from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs";


function Tensorflow(){

	const imageRef = useRef();
	const [isLoading, setIsLoading] = useState(false);
	const [predictions, setPredictions] = useState([]);

	function predict(){
		const img = imageRef.current;

		setIsLoading(true);

		mobilenet.load().then(model => {
	    // Classify the image.
	    model.classify(img).then(predictions => {
	      setPredictions(predictions);
	      setIsLoading(false);
	    });
	  });
	}

	return(
		<div className="flex justify-center">
			<div className="w-1/3">
				<h1 className="text-center">Tensorflow example</h1>
				<img src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDI2ODV8MHwxfHNlYXJjaHwzfHxkb2d8ZW58MHx8fA&ixlib=rb-1.2.1&q=80&w=1080" 
				width="400" height="auto" ref={imageRef} 
				crossOrigin="anonymous"
				className="text-center"/>

				<div className="text-center my-5">
					{
						predictions.length > 0 && (
							predictions.map((prediction, index)=>(
								<div className="flex justify-between" key={index}>
									<p>{prediction.className}</p>
									<p>{Math.floor(prediction.probability * 100)} %</p>
								</div>
							))
					)}

					<button className="p-2 rounded bg-purple-900 text-white w-60"
						onClick={predict}>
							{isLoading ? "Loading" : "Predict Result"}</button>
				</div>
				
			</div>
			
		</div>
		);
}


export default Tensorflow;