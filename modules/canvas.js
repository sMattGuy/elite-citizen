import {Planet, SolarSystem, openQuests} from './planets.js';

let hudImg = new Image();
hudImg.src = '../imgs/hud.png';

let currentHulu = 0;
let huluGirl = [new Image(),new Image(),new Image()];
huluGirl[0].src = '../imgs/hulu1.png';
huluGirl[1].src = '../imgs/hulu2.png';
huluGirl[2].src = '../imgs/hulu3.png';

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let timePassed = Date.now();

function draw(galaxyOffset, moving){
	ctx.fillStyle = 'black';
	ctx.fillRect(0,0,canvas.width,canvas.height);
	
	let sectorX = canvas.width / 16;
	let sectorY = canvas.height / 16;
	
	let screenSector = {'x':0,'y':0};
	
	for(screenSector.x = 0;screenSector.x<sectorX;screenSector.x++){
		for(screenSector.y = 0;screenSector.y<sectorY;screenSector.y++){
			let seed1 = galaxyOffset.x + screenSector.x;
			let seed2 = galaxyOffset.y + screenSector.y;
			
			let star = new SolarSystem(seed1, seed2, false);
			if(star.starExists){
				ctx.fillStyle = `rgba(${star.color.r},${star.color.g},${star.color.b},1)`;
				ctx.beginPath();
				ctx.arc(screenSector.x*16+8, screenSector.y*16+8, star.diameter/8, 0, 2*Math.PI, false);
				ctx.fill();
				if(screenSector.x == sectorX/2 && screenSector.y == sectorY/2){
					ctx.strokeStyle = 'red';
					ctx.beginPath();
					ctx.arc(screenSector.x*16+8, screenSector.y*16+8, (star.diameter/8)+5, 0, 2*Math.PI, false);
					ctx.stroke();
				}
			}
			for(let i=0;i<openQuests.length;i++){
				if(openQuests[i].x == seed1 && openQuests[i].y == seed2){
					let xPos = screenSector.x*16+8;
					let yPos = screenSector.y*16+8;
					ctx.strokeStyle = 'red';
					ctx.beginPath();
					ctx.moveTo(xPos, yPos);
					ctx.lineTo(xPos+20,yPos-20);
					ctx.lineTo(xPos+20+35,yPos-20);
					ctx.stroke();
					ctx.fillStyle = 'red';
					ctx.font = "8px conthrax";
					ctx.fillText(`COMPLETE QUEST`,xPos+20,yPos-22);
				}
			}
		}
	}
	ctx.drawImage(hudImg,0,0,canvas.width,canvas.height);
	ctx.fillStyle = 'rgba(255,255,255,1)';
	ctx.font = "16px conthrax";
	ctx.textAlign = "center";
	ctx.fillText(`X Alignment: ${galaxyOffset.x}`,canvas.width/2,canvas.height - 130);
	ctx.fillText(`Y Alignment: ${galaxyOffset.y}`,canvas.width/2,canvas.height - 110);
	
	if(Date.now() - timePassed > 100){
		timePassed = Date.now();
		if(moving){
			if(currentHulu == 2)
				currentHulu = 1;
			else
				currentHulu = 2;
		}
		else{ 
			currentHulu = 0;
		}
	}
	ctx.drawImage(huluGirl[currentHulu],170,canvas.height-260);
}

export {canvas, ctx, draw};