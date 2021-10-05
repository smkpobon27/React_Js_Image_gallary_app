import React,{useState, useRef, useEffect} from 'react';
import Image from "./image.js";
import useFetchImages from "../utils/hooks/useFetchImages.js";
import useDebounce from "../utils/hooks/useDebounce.js";
// import useScroll from "../utils/hooks/useScroll.js";
import Loading from "./Loading.js";
import InfiniteScroll from 'react-infinite-scroll-component';
import { motion,AnimateSharedLayout, AnimatePresence } from "framer-motion";



//Functional component

function Images(){

	const [page, setPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState(null);
	const [Images, setImages, errors, isLoading] = useFetchImages(page, searchTerm);
	const [showPreview, setShowPreview] = useState(null);
	
	// const scrollPosition = useScroll();

	// const [newImageUrl, setNewImageUrl] = useState("");
	// const inputRef = useRef(null);
	// const varRef = useRef(0);

	//To create scroll system manually
	// useEffect(()=>{
	// 	if(scrollPosition >= document.body.offsetHeight-window.innerHeight){
	// 			setPage(page+1);
	// 		}
		

	// },[scrollPosition]);

	// function handleOnMouseEnter(){
	// 	setIsHovering(true);
	// }
	// function handleOnMouseLeave(){
	// 	setIsHovering(false);
	// }

	function handleRemove(index){

		setImages([...Images.slice(0, index), ...Images.slice(index+1, Images.length)]);
		
		//setImages(Images.filter((image, i)=> i !== index));

		//console.log(Images.filter((image, i)=> i !== index));
	}

	// function handleAdd(){
	// 	if(newImageUrl != ""){

	// 		console.log('working');
	// 		setImages([...Images, newImageUrl]);
	// 		setNewImageUrl("");
	// 	}
		
	// }
	// function handleChange(event){

	// 	setNewImageUrl(event.target.value);
	// 	//console.log(event.target.value);
	// }

	// useEffect(()=>{
	// 	inputRef.current.focus();

		
			
	// },[]);

	//for Update
	// useEffect(()=>{
	// 	varRef.current = varRef.current+1;

	// });

	//If isLoading is true then return Loading.
	
	const debounce = useDebounce();

	function handleInput(e){

		const text = e.target.value;

		 setPage(1);
		debounce(()=>setSearchTerm(text), 1000);
	}
	//Otherwise return the content
	return (<section>
				<div className="">
					<input type="text" onChange={handleInput} className="w-full p-2 rounded border" 
						placeholder="Search Photos Here.."/>
				</div>
			
			
		{
			<AnimateSharedLayout>
				<InfiniteScroll 
					dataLength={Images.length} 
					next={()=>setPage(page+1)} 
					hasMore={true}
					className="flex flex-wrap">

						{Images.map((img, index)=>(
						<motion.div className="w-1/3 p-1 border flex justify-center" 
								key={index}
								initially={{opacity: 0}}
								animate={{opacity: 1}}
								layoutId={img.urls.regular}> 
							<Image 
								image={img.urls.regular} 
								handleRemove={handleRemove} 
								index={index} 
								show={()=>setShowPreview(img.urls.regular)} />
						</motion.div> 
								)
						)}
				</InfiniteScroll>

				<AnimatePresence>
				{
					showPreview &&
						<motion.section className="fixed inset-0 overflow-y-auto w-full h-full flex justify-center items-center top-0 left-0 z-40" 
							layoutId={showPreview}
							onClick={()=>setShowPreview(null)}
							exit={{opacity: 0, rotate: 360, transition:{duration: 1} }}>
							<div className="bg-white">
								<img src={showPreview} alt="" className="rounded border" width="300" height="auto" />
							</div>
						</motion.section>
				}
				</AnimatePresence>
			</AnimateSharedLayout>
		}
			
			{ isLoading && (<Loading />) }
		</section>
		);
			// {
			// 	errors.length >= 0 ? null: 
			// 			(<button onClick={()=> setPage(page+1) }>Load More</button>)
			// }

			// <div className="flex justify-between my-5">
			// 	<div className="w-full">
			// 		<input type="text" ref={inputRef}
			// 			onChange={handleChange} 
			// 			value={newImageUrl} 
			// 			className="p-2 border border-gray-900 shadow rounded w-full"/>
			// 	</div>
			// 	<button className={`ml-2 p-2 text-white ${newImageUrl != "" ? "bg-green-700": "bg-green-400"}`} 
			// 		onClick={handleAdd}
			// 		disabled={newImageUrl ==""}>Add</button>
			// </div>
		// </section>
		// );

	
}




//Class based Component
// class Image extends React.Component{


// render(){
// 	return(
// 			<img src="/images/ab.png" alt=""/>
// 		);
// }

// }

export default Images;