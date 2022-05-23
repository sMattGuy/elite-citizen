//canvas setup
import {canvas, ctx, draw} from './modules/canvas.js';
import {dragElement, showDetails} from './modules/menu.js';
import {dragTalkElement} from './modules/talkMenu.js';
//variables
let galaxyOffset = {'x':0,'y':0};
let moving = false;
let showingDetail = false;
window.addEventListener('keydown', e => {
	const keyname = e.code;
	if(keyname === 'KeyW'){
		galaxyOffset.y -= 1;
		moving = true;
	}
	else if(keyname === 'KeyS'){
		galaxyOffset.y += 1;
		moving = true;
	}
	else if(keyname === 'KeyA'){
		galaxyOffset.x -= 1;
		moving = true;
	}
	else if(keyname === 'KeyD'){
		galaxyOffset.x += 1;
		moving = true;
	}
	else if(keyname === 'Space'){
		showDetails(galaxyOffset,(canvas.width / 16)/2,(canvas.height / 16)/2);
		document.getElementById("starSystem").style.display = "block";
		showingDetail = true;
	}
});
window.addEventListener('keyup', e => {
	const keyname = e.code;
	if(keyname === 'KeyW' || keyname === 'KeyS' || keyname === 'KeyA' || keyname === 'KeyD'){
		moving = false;
	}
});
document.getElementById("closeMenu").onclick = function(){
	document.getElementById("starSystem").style.display = "none";
	showingDetail = false;
}
document.getElementById("closeTalkMenu").onclick = function(){
	document.getElementById("talkMenu").style.display = "none";
}
//called on page load
window.onload = init();
function init(){
	//called only once
	frame();
}

//called every 1/60 of a second
function frame(){
	if(showingDetail){
		showDetails(galaxyOffset,(canvas.width / 16)/2,(canvas.height / 16)/2);
	}
	//draws main screen
	draw(galaxyOffset, moving);
	window.requestAnimationFrame(frame);
}