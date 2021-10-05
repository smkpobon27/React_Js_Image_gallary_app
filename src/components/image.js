import React,{useState, useRef} from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs";

function Image({image, handleRemove, index, show}){

	const [isHovering, setIsHovering] = useState(false);
	const imageRef = useRef();
	const [isLoading, setIsLoading] = useState(false);
	const [predictions, setPredictions] = useState([]);

	function predict(img){

		setIsLoading(true);

		mobilenet.load().then(model => {
	    // Classify the image.
	    model.classify(img).then(predictions => {
	      setPredictions(predictions);
	      console.log(predictions);
	      setIsLoading(false);
	    });
	  });
	}

	return(
		
				<div className="relative" onMouseEnter={()=>setIsHovering(true)}
						onMouseLeave={()=>setIsHovering(false)}>

					{
						predictions.length > 0 && (
							<span className="absolute bg-gray-800 rounded-lg shadow text-white px-2 left-0 ml-5"
								onClick={()=>setPredictions([])}
							>
								{isLoading ? (<p>Fetching results....</p>):null}
								
								{predictions.map((prediction, index)=>(
								<div className="flex justify-between" key={index}>
									<p>{prediction.className}</p>
									<p>{Math.floor(prediction.probability * 100)} %</p>
								</div>
							))}
							</span>
						)
					}

					<i className={`fa fa-times-circle right-0 absolute cursor-pointer opacity-20 hover:opacity-100 ${isHovering ? "":"hidden"}`} 
						aria-hidden="true"  onClick={()=>handleRemove(index)}></i>

					<i className={`fa fa-search left-0 absolute cursor-pointer opacity-20 hover:opacity-100 ${isHovering ? "":"hidden"}`} 
						aria-hidden="true"  onClick={()=>predict(imageRef.current)}></i>
					<img onClick={show} src={image} ref={imageRef} alt="" width="auto" height="auto" 
						crossOrigin="anonymous"/>
				</div>
		
	);
}


export default Image;