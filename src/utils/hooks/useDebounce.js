import React, {useState} from "react";



function useDebounce(){

	const [typingTimeout, setTypingTimeout] = useState("");

	function debounce(func, wait){

		clearTimeout(typingTimeout);
			const timeout = setTimeout(function() {
				func();
			}, wait);
			
			setTypingTimeout(timeout);
	}

	return debounce; 
}

export default useDebounce;