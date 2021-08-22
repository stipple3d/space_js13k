class SpaceScene extends Scene{
	constructor(_name){super(_name);}
	init = function(){

		//TODO: handle setting up space map view
		

		document.addEventListener("keydown", this.keyPressHandler);
	}

	end = function(){
		document.removeEventListener("keydown", this.keyPressHandler);
	}

	keyPressHandler = (e) =>{

        //TODO: input handling for the space scene./..

	}

	update = function(_deltaTime){
		//console.log('MainMenuScene: update Running');

        //TODO: update player pos, etc on the space scene
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
		ctx.textAlign = 'left';
        ctx.fillStyle = '#dce0e3';
		ctx.font = '20px Arial';
		ctx.fillText('scene: ' + this.name, 30, 30);

		//_____________________
		ctx.restore();
	}
}