class LoadScene extends Scene{
	constructor(_name){super(_name);}

	init = function(){
		
		//if there is saved data mark dataReady as true
		//if not, mark dataReady as false and then run function to create new save
		if(saveData == undefined){
			this.dataReady = false;
			this.createNewSave();
		}
		else{
			this.dataReady = true;
		}

		document.addEventListener("keydown", this.keyPressHandler);
	}

	createNewSave(){

		//TODO: update this with correct data and finish creating the world

		//initialize global saveData object
		saveData = new Object();

		//save the saveStructureVersion into the file, so we can override it if the structure has changed
		saveData.version = config.saveVersion;

		//initialize player sub-object
		var pObj = new Object();
		//initialize world sub-object
		var wObj = new Object();

		//populate player object with all values that need to 
		//persist between runtimes
		pObj.name = "NoName";

		//player starts at 0,0 position in space view
		pObj.posX = 0;
		pObj.posY = 0;

		pObj.xp = 0;
		pObj.level = 1;

		pObj.gold = 0;
		pObj.gas = 0;
		pObj.food = 0;
		pObj.o2 = 0;

		//init an empty array to hold planet locations/info
		wObj.planets = [];

		//init an empty array to hold salvage obj locations/info
		wObj.salvages = [];

		//insert pObj to object
		saveData.playerSave = pObj;
		//insert wObj to object
		saveData.worldSave = wObj;

		//SAVE INIT DATA TO LOCAL STORAGE
		SaveDataToStorage();

		//TODO: populate global REF with a new instance of the player class
		//player = new Player();
		//TODO: populate global REF with a new instance of the world class
		//(passing in a ref to the player)
		//world = new World(player);

		//TODO: pass in the PLAYER PORTION incomingData to the player class
		//TODO: if there is 'worldData' saved in the incomingData as well,
		//		pass WORLD PORTION that to the WorldManager

		//then, mark dataReady as true
		this.dataReady = true;
	}

	end = function(){
		document.removeEventListener("keydown", this.keyPressHandler);
	}

	keyPressHandler = (e) =>{

		//if data is not ready, do not respond to keys
		if(!this.dataReady)
			return;

		if(e.key == 'p'){
			//PLAY SELECTED

			//goto space scene
			sceneMgr.gotoScene({name: 'space'});
		}
	}

	update = function(_deltaTime){
		//console.log('MainMenuScene: update Running');
	}

	render = function(){
		
		//check if we are to clear the BG on each render
		if(this.clearOnRender){
			//clear BG
			ctx.clearRect(0, 0, canv.width, canv.height);
		}

		ctx.save();
		//_____________________
		//draw elements

		//PAGE TITLE
		ctx.beginPath();
		ctx.textAlign = 'center';
		ctx.fillStyle = '#dce0e3';
		ctx.font = '40px Arial';
		ctx.fillText('LOADING...', canv.width /2, 80);

		
		//INPUT PROMPTS
		ctx.beginPath();
		ctx.font = '24px Arial';
		ctx.fillStyle = '#8ac80b';
		if(!this.dataReady){
			ctx.fillText('Getting Data Ready...', canv.width /2, canv.height - 60);
		}
		else{
			ctx.fillText('Data Ready ... PRESS [P] TO PLAY', canv.width /2, canv.height - 60);
		}
		

		//CLASS DISPLAY AREA

		//BG RECT
		/* ctx.beginPath();
		ctx.strokeStyle = '#8ac80b';
		ctx.rect(canv.width /2 - 95, canv.height /2 - 135, 190, 270);
		ctx.stroke();

		//Character Defult Name
		ctx.beginPath();
		ctx.fillStyle = '#dce0e3';
		//ctx.font = '24px Arial';
		ctx.fillText('Name: ' + this.nameToUse, canv.width /2, 135);

		//Character class name
		//ctx.beginPath();
		//ctx.fillText('Class: ' + classDefaults[this.selectedClassIndex].class, canv.width /2, 165);

		//Image size Colored rect (based on 'color' param in class data)
		ctx.beginPath();
		//ctx.fillStyle = classDefaults[this.selectedClassIndex].color;
		ctx.rect(canv.width /2 - 70, canv.height /2 - 60, 140, 180);
		ctx.fill(); */
		
		ctx.beginPath();
		ctx.textAlign = 'left';
		ctx.font = '20px Arial';
		ctx.fillText('scene: ' + this.name, 30, 30);

		//_____________________
		ctx.restore();
	}
}