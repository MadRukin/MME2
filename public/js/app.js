/**
* app.js - Funktionalitaet fuer die HTML5-Seite "videos.html"
* @author Florian Kruellke
*/

// anomnyme Funktion - kein global scope
(function(){
	/**
	* Eventlistener ruft init-Function auf, sobald das Dokument geladen wurde.
	*/
	window.addEventListener("load", init, false);

	/**
	* Initialisiert die Buttons der Videos, sobald das Dokument geladen wurde.
	* @param {event} event
	*/
	function init(event){

		var videos = document.getElementsByTagName("video");
		var l = videos.length;
		for(var i = 0; i < l; i++){
			// Am Ende vom Video auf Null-Poistion via Stop-Click
			videos[i].addEventListener("ended", function(event){
				event.currentTarget.parentNode.children[2].click();
			}, false);

			// Play Button
			var btn = document.createElement("div");
			btn.className = "btn play"
			btn.name = "play";
			
			btn.addEventListener("click", handlePlay, false);
			var div = document.createElement("div");
			div.className = "play-triangle";
			btn.appendChild(div);
			videos[i].parentNode.appendChild(btn);

			// Stop Button
			btn = document.createElement("div");
			btn.setAttribute("type", "button");
			btn.className = "btn stop"
			btn.name = "stop";
			
			btn.addEventListener("click", handlePlay, false);
			div = document.createElement("div");
			div.className = "stop-square";
			btn.appendChild(div);
			videos[i].parentNode.appendChild(btn);


			// In einem neuen Tab oeffnen
			btn = document.createElement("button");
			btn.className = "btn open";
			btn.innerHTML = "open in new tab";
			btn.addEventListener("click", function(event){
				window.open(event.currentTarget.parentNode.children[0].children[0].src, "blank");
			}, false);
			videos[i].parentNode.appendChild(btn);
		}
	}


	/**
	* Delegiert die Funktionalitaet aller Video-Buttons
	* @param {event} event
	*/
	function handlePlay(event){
		var e = event.currentTarget;
		var video = e.parentNode.children[0];
		var play = e.parentNode.children[1];
		var clss = "";/*
		if(e.name === "play") {
			video.play();
			clss = "pause-blocks";
			e.name = "pause";
		} else if(e.name === "pause") {
			video.pause();
			e.name = "play";
			clss= "play-triangle";
		} else {
			video.pause();
			video.currentTime = 0;
			play.name = "play";
			clss = "play-triangle";
		}
		play.children[0].className = clss;*/
		switch(e.name){
			case "play":
				video.play();
				clss = "pause-blocks";
				e.name = "pause";
				break;
			case "pause":
				video.pause();
				e.name = "play";
				clss = "play-triangle";
				break;
			case "stop":
				video.pause();
				video.currentTime = 0;
				play.name = "play";
				clss = "play-triangle";
				break;
		}
		play.children[0].className = clss;
	}
})();
