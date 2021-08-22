class Loop{
	constructor({fps = 60, renderCallback = undefined, updateCallback = undefined} = {}){
		this.fps = fps;
		this.renderCB = renderCallback;
		this.updateCB = updateCallback;
		this.accTime = 0;
		this.lastTime;
		this.dt = 1 / this.fps;
		this.raf;
		this.updated = false;
	}
	processFrame = (time) => {
		this.accTime += (time - this.lastTime) /1000;
		while(this.accTime >= this.dt){
			if(this.updateCB != undefined){
				this.updateCB(this.dt);
			}
			this.accTime -= this.dt;
			this.updated = true;
		}
		if(this.updated){
			if(this.renderCB != undefined){
				this.renderCB();
			}
			this.updated = false;
		}
		this.lastTime = time;
		this.requestAFrame();
	}
	startLoop = function(){
		this.lastTime = window.performance.now();
		this.requestAFrame();
	}
	requestAFrame = function(){
		this.raf = window.requestAnimationFrame(this.processFrame);
	}
	stopLoop = function(){
		window.cancelAnimationFrame(this.raf);
	}	
}