import React from "react";


function Loading(){

	return(
		<div className="flex h-screen">
				<p className="m-auto">
					<i className="fa fa-circle-o-notch fa-spin text-5xl text-yellow-400" aria-hidden="true"></i>
				</p>
		</div>
		);
}

export default Loading;