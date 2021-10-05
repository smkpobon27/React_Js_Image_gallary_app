import Images from '../components/images.js';



function Gallery(){
		
		return(
			<section className="flex justify-center text-center my-5">
				<div className="w-1/2">
					
						<Images />
				</div>
			 </section>

					// 	<button className="p-1 bg-blue-700 text-white"
					// 		onClick={handleClick }>Toggle Image</button>
					// </div>

					// {
					// 	isShowing ?(
					// 		<Image />) : null
					// }
			// 	</div>
			// </section>
		);
	}

export default Gallery;