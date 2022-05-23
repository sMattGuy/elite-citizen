import {newSeed, rndDouble, rndInt} from './random.js';

let doneQuests = [];
let openQuests = [];

class Planet{
	distance = 0;
	diameter = 0;
	color = {'r':0,'g':0,'b':0};
	quest = false;
	moons = [];
}

class SolarSystem{
	diameter = 0;
	color = {'r':0,'g':0,'b':0};
	planets = [];
	starExists = false;
	constructor(positionX, positionY, fullSystem){
		newSeed(((positionX&0xFFFF)<<16|(positionY&0xFFFF)).toString());
		this.starExists = (rndInt(0,20) == 1);
		//check if making a star at this location
		if(!this.starExists) return;
		this.diameter = rndDouble(40,70);
		this.color.r = rndInt(100, 255);
		this.color.g = rndInt(100, 255);
		this.color.b = rndInt(100, 255);
		//check if making a solar system for the star
		if(!fullSystem) return;
		let distanceFromStar = rndDouble(60,200);
		let numberPlanets = rndInt(0,10);
		for(let i=0;i<numberPlanets;i++){
			let newPlanet = new Planet();
			newPlanet.distance = distanceFromStar;
			distanceFromStar += rndDouble(20,200);
			newPlanet.diameter = rndDouble(4,20);
			newPlanet.color.r = rndInt(100, 255);
			newPlanet.color.g = rndInt(100, 255);
			newPlanet.color.b = rndInt(100, 255);
			
			newPlanet.quest = (rndInt(0,10)<1);
			
			let moonCount = rndInt(-5,5);
			for(let j=0;j<moonCount;j++){
				newPlanet.moons.push(rndDouble(1,5));
			}
			this.planets.push(newPlanet);
		}
	}
}

export {Planet, SolarSystem, doneQuests, openQuests};