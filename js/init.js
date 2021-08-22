let canv,ctx,loop,sceneMgr,saveData,player,world;

document.addEventListener("DOMContentLoaded", function(){
    canv = document.getElementById("game");	
	ctx = canv.getContext("2d");
	ctx.imageSmoothingEnabled = false;
    sceneMgr = new SceneManager();
	for(var s = 0; s < config.scenes.length; s++){sceneMgr.registerScene(config.scenes[s].name, config.scenes[s].class);}
    //TODO: leave out fps if it matches the default
	loop = new Loop({fps: config.fps, renderCallback: sceneMgr.render, updateCallback: sceneMgr.update});
	sceneMgr.gotoScene({index: config.initSceneIndex});
	loop.startLoop();
});

//helper function to create the default save data
function CreateNewSaveData (){

	//initialize global saveData object
	saveData = new Object();

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
}

//helper function to save out the data (to local storage in this case)
function SaveDataToStorage(){
	//console.log('saving out data');

	//stringify the saveData object
	var jsonString = JSON.stringify(saveData);
	//save the stringified string out to the localStorage key from config
	localStorage.setItem(config.saveKeyName, jsonString);
}

