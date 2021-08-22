class MenuScene extends Scene{
	constructor(_name){super(_name);}
	init = function(){

		//delete the save file key entry
		//localStorage.removeItem(config.saveKeyName);

		//save any previous save data from [wherever data is being saved]
		//(local storage in this case)
		this.incomingData = localStorage.getItem(config.saveKeyName);

		if(this.incomingData != null){
			//parse incoming data locally and keep in same var
			this.incomingData = JSON.parse(this.incomingData);

			//TODO: validate the data? (clear it if it is not valid)
			if(config.saveVersion > this.incomingData.version){
				console.log("newer save version detected, forcing new game...");
				this.previousSave = false;
			}
			else{
				//if save is valid, mark previous flag true
				this.previousSave = true;

				//render will show options for new & continue
				//render will also display the previous save data (for ref)
				//keypressHandler will accept input for new OR continue
			}


		}
		else{

			this.previousSave = false;

			//render will show prompt to start a new game (only option)
			//keyPressHandler will only accept input for new game
		}
		

		document.addEventListener("keydown", this.keyPressHandler);
	}

	end = function(){
		document.removeEventListener("keydown", this.keyPressHandler);
	}

	keyPressHandler = (e) =>{
		
		if(e.key == 'n'){

			//NEW GAME SELECTED

			//clear out the saveGame var
			saveData = undefined;

			//goto load scene (will handle everything else)
			sceneMgr.gotoScene({name: 'load'});
		}
		//only checking for continue key if there is a previous save
		else if(this.previousSave && e.key == 'c'){

			//CONTINUE SELECTED

			//put the data into the saveData global object
			saveData = this.incomingData;

			//goto load scene (will handle everything else)
			sceneMgr.gotoScene({name: 'load'});
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

		ctx.beginPath();
		ctx.textAlign = 'center';
		ctx.fillStyle = '#dce0e3';
		ctx.font = '80px Arial';
		ctx.fillText('JS13K:SPACE', canv.width /2, 120);
		
		ctx.beginPath();
		ctx.font = '40px Arial';
		ctx.fillStyle = '#8ac80b';
		ctx.fillText('NEW GAME  [ N ]', canv.width /2, canv.height -40);

		if(this.previousSave){

			ctx.beginPath();
			ctx.fillStyle = '#dce0e3';
			ctx.fillText('CONTINUE  [ C ]', canv.width /2, 300);

			ctx.font = '26px Arial';
			ctx.beginPath();
			ctx.fillText('PREVIOUS SAVE: ' + this.incomingData.name, canv.width /2, 240);
		}

		ctx.beginPath();
		ctx.textAlign = 'left';
		ctx.font = '20px Arial';
		ctx.fillText('scene: ' + this.name, 30, 30);

		//_____________________
		ctx.restore();
	}
}