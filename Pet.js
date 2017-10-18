//class: pet
function Pet(initx, inity, initfood) {
	//init pet, position x+y , age 1, speed, food(our cursor) .....
	this.food = initfood;
	this.x = initx; 
	this.y = inity; 
    this.age = 1; 
	this.speed = 10;
    this.foodX = this.food.getX();
    this.foodY = this.food.getY();
    this.distance = parseFloat(Math.sqrt(Math.pow((this.foodX - this.x),2) + Math.pow((this.foodY - this.y),2))) 

    this.vecX = this.speed*(this.x - this.foodX)/(this.distance);  

    this.vecY = this.speed*(this.y - this.foodY)/(this.distance);
	this.atWall = true;
    this.egging = false;
	this.form = 1+parseInt(this.age/10);
	// functions: move, touch food, lay eggs, poops,... 
	// ************************************************
	
	// move the pet according to food's position and check if has caught food)
	this.move =function() {
		//check if pet is at the wall
		//if atWall -> move to food, no longer at wall 
                
        //if has reached a wall, stop, re-coordinate . 
        if ( this.x <= 0 || this.y <= 0 || this.x >= 495 || this.y >= 495 ){
            //get coordinate
			this.foodX = this.food.getX();
			this.foodY = this.food.getY();

            //set coordinate when touches wall
            if (this.x != this.foodX || this.y != this.foodY){
                this.distance = parseFloat(Math.sqrt(Math.pow((this.foodX - this.x),2) + Math.pow((this.foodY - this.y),2))) 
            } 

            this.vecX = this.speed*(this.x - this.foodX)/(this.distance);  
            this.vecY = this.speed*(this.y - this.foodY)/(this.distance);
        }
	
        //catches food
        //
        this.caught();
    
	}

	// got some food
	// food shall lose health.
	//caught the food : call caught(), get more speed, lay an egg
	this.caught = function(){
        let x_dis = Math.abs(this.x-this.food.getX());
        let y_dis = Math.abs(this.y-this.food.getY());
        if ( (10+this.form*20) > Math.sqrt((x_dis*x_dis) + (y_dis*y_dis))) {
            console.log("caught it !!!! : ");
            
            if (( this.food.hp % 5) == 0 ) { 
                this.layEgg();
                this.egging = true; 
                if (this.speed <= 25) {
                    this.speed+=1.5;
                }
            }

            this.food.lost();

            if (this.age != 31){
                this.age+=1;
            }
        }
	}

	// lay egg : 
	this.layEgg = function(){
		console.log("laid an egg");
        miniPet = new Pet(0,0,this.food);
        pets.push(miniPet);
        this.egging = false;
	}
}	

