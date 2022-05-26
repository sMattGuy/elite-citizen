import {Planet, SolarSystem, openQuests} from './planets.js';
import {rndInt} from './random.js';
// Make the DIV element draggable:
dragTalkElement(document.getElementById("talkMenu"));

function dragTalkElement(elmnt) {
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	if (document.getElementById(elmnt.id + "Header")) {
		// if present, the header is where you move the DIV from:
		document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;
	}
	else {
		// otherwise, move the DIV from anywhere inside the DIV:
		elmnt.onmousedown = dragMouseDown;
	}
	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}
	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
		elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
	}
	function closeDragElement() {
		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;
	}
}
function updateTalkBox(galaxyOffset, selectedPlanet){
	let aligntext = document.getElementById("alignmentText");
	let planetchoice = document.getElementById("planetChoice");
	let planetFound = false;

	while(!planetFound){
		let offSetX = (Math.floor(Math.random()*100) - 100 + galaxyOffset.x);
		let offSetY = (Math.floor(Math.random()*100) - 100 + galaxyOffset.y);
		
		let star = new SolarSystem(offSetX, offSetY, true);
		if(star.starExists){
			if(star.planets.length != 0){
				openQuests.push({'x':offSetX, 'y':offSetY});
				if(openQuests.length > 10)
					openQuests.shift();
				planetFound = true;
				let selectedPlanet = Math.floor(Math.random()*star.planets.length);
				aligntext.innerHTML = `X Alignment ${offSetX-25} and Y Alignment ${offSetY-25}.`;
				planetchoice.innerHTML = `${selectedPlanet+1} planet from the star.`;
				break;
			}
		}

	}
	document.getElementById("talkMenu").style.display = "block";
}
export {dragTalkElement, updateTalkBox};