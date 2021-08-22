class SceneManager{
	constructor(){
		this._currentSceneIndex = undefined;
		this._registeredScenes = [];
	}
	registerScene = function(_name, _className){
		this._registeredScenes.push(new _className(_name));
	}
	initSceneChange = function(_newIndex){
		if(this._currentSceneIndex != undefined){
			this._registeredScenes[this._currentSceneIndex].end();
		}
		this._currentSceneIndex = _newIndex;
		this._registeredScenes[this._currentSceneIndex].init();
	}
	gotoScene = function({name = undefined, index = undefined} = {}){
		if(name != undefined){
			var ind = this.indexByName(name);
			if(ind != -1){
				this.initSceneChange(ind);
			}
			else{
				if(index != undefined){
					this.initSceneChange(index);
				}
				else{
					return;
				}
			}
				
		}
		else if (index != undefined){
			this.initSceneChange(index);
		}
		else{
			return;
		}
	}
	indexByName = function(_name){
		for(var s = 0; s < this._registeredScenes.length; s++){
			if(_name == this._registeredScenes[s].name)
				return s;
		}
		return -1;
	}
	update = (_deltaTime) =>{
		if(this._currentSceneIndex != undefined)
			this._registeredScenes[this._currentSceneIndex].update(_deltaTime);
	}
	render = () =>{
		if(this._currentSceneIndex != undefined)
			this._registeredScenes[this._currentSceneIndex].render();
	}
}