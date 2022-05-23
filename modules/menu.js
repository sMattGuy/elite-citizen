import {Planet, SolarSystem} from './planets.js';
import {updateTalkBox} from './talkMenu.js';
//canvas
let canvas = document.getElementById("canvasBody");
let ctx = canvas.getContext("2d");
// Make the DIV element draggable:
dragElement(document.getElementById("starSystem"));

let xMousePos, yMousePos;
let selectedPlanet = false;
let galaxyOffsetSave;
canvas.addEventListener('mousemove', e => {
	xMousePos = e.offsetX;
	yMousePos = e.offsetY;
});
canvas.addEventListener('mousedown', e => {
	if(selectedPlanet != null && selectedPlanet.quest){
		updateTalkBox(galaxyOffsetSave, selectedPlanet);
		selectedPlanet = null;
	}
});
function dragElement(elmnt) {
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
function showDetails(galaxyOffset,middleX, middleY){
	let seed1 = galaxyOffset.x + middleX;
	let seed2 = galaxyOffset.y + middleY;
			
	let star = new SolarSystem(seed1, seed2, true);
	
	if(star.starExists){
		ctx.fillStyle = 'black';
		ctx.fillRect(0,0,canvas.width,canvas.height);
		let vBody = {'x':10+star.diameter,'y':20+star.diameter};
		ctx.fillStyle = `rgba(${star.color.r},${star.color.g},${star.color.b},1)`;
		ctx.beginPath();
		ctx.arc(vBody.x, vBody.y, star.diameter, 0, 2*Math.PI, false);
		ctx.fill();
		vBody.x += star.diameter + 8;
		let noPlanet = true;
		for(let i=0;i<star.planets.length;i++){
			ctx.fillStyle = `rgba(${star.planets[i].color.r},${star.planets[i].color.g},${star.planets[i].color.b},1)`;
			if(vBody.x + star.planets[i].diameter >= canvas.width) break;
			vBody.x += star.planets[i].diameter + 8;
			ctx.beginPath();
			ctx.arc(vBody.x, vBody.y, star.planets[i].diameter, 0, 2*Math.PI, false);
			ctx.fill();
			let distance = Math.sqrt(Math.pow(vBody.x - xMousePos,2)+Math.pow(vBody.y - yMousePos,2));
			if(distance < star.planets[i].diameter){
				noPlanet = false;
				ctx.strokeStyle = 'red';
				ctx.stroke();
				selectedPlanet = star.planets[i];
				galaxyOffsetSave = galaxyOffset;
			}
			if(star.planets[i].quest){
				ctx.strokeStyle = 'red';
				ctx.beginPath();
				ctx.moveTo(vBody.x, vBody.y);
				ctx.lineTo(vBody.x+20,vBody.y-20);
				ctx.lineTo(vBody.x+20+35,vBody.y-20);
				ctx.stroke();
				ctx.fillStyle = 'red';
				ctx.font = "8px conthrax";
				ctx.fillText(`QUEST`,vBody.x+20,vBody.y-22);
			}
			let vMoons = {'x':vBody.x,'y':vBody.y};
			vMoons.y += star.planets[i].diameter + 10;
			ctx.fillStyle = `#E0D142`;
			for(let j=0;j<star.planets[i].moons.length;j++){
				vMoons.y += star.planets[i].moons[j];
				ctx.beginPath();
				ctx.arc(vBody.x, vMoons.y, star.planets[i].moons[j], 0, 2*Math.PI, false);
				ctx.fill();
				vMoons.y += star.planets[i].moons[j] + 10; 
			}
			vBody.x += star.planets[i].diameter;
		}
		if(noPlanet){
			selectedPlanet = null;
		}
	}
}
export {dragElement, showDetails};