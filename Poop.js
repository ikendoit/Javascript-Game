function Poop(coorX,coorY,food){
	//init variables
    this.x = coorX ; 
    this.y = coorY ; 
    this.food = food;
	this.TTL = 166; 
	//size : 8pixel in width and height
    this.width = 20; 
    this.height = 20; 
    this.checkStepped = function(){
        this.TTL--;
        let x_dis = Math.abs(this.x-this.food.getX());
        let y_dis = Math.abs(this.y-this.food.getY());
        if (10+10 > Math.sqrt(Math.pow(x_dis,2)+Math.pow(y_dis,2))){
            //stepped 
            this.food.isStuck = true; 
            this.food.xStuck = this.food.getX();
            this.food.yStuck = this.food.getY()-18;
            this.food.TTLStuck = 51;
            this.TTL=0;
            return true;
        } else {
            return false;
        }
    }
}
