//1**************************************************1
//init canvas, ctx
let canvas = document.getElementById("game"); 

let ctx = canvas.getContext("2d");


//2**************************************************2
//create classes, functions 

//class: pet
function Pet(x,y,food) {
	//init pet, position x+y , age 0, speed, food(our cursor) .....
	this.x = x ; 
	this.y = y ; 
	this.vecX = 0;
	this.vecY = 0;
	this.age = 0 ; 
	this.speed = 2 ;
	this.atWall = false;
	this.food = food;
	this.form = function(){
		switch (this.age) {
			case 0 : return "small"; 
			case 1 : return "medium";
			case 2 : return "big";
			default : return "none";
		}
	}
	// functions: move, touch food, lay eggs, poops,... 
	// ************************************************
	//
	// move the pet according to food's position and check if has caught food)
	this.move =function() {
		//check if pet is at the wall
		//if atWall -> move to food, no longer at wall 
		if (!this.atWall){
			console.log("moving is workdint");
			ctx.fillStyle="red";
			ctx.beginPath();
			ctx.arc(this.x,this.y,40,0,2*Math.PI);
			ctx.fill();
			this.vecX = (this.x - this.food.x)/this.speed;
			this.vecY = (this.y - this.food.y)/this.speed; 
			//caught the food : call caught(), get more speed, lay an egg
			if (this.x == this.food.x && this.y == this.food.y){
				caught(this.food);
				layEgg();
				this.speed++;
				
			}
			atWall = false;
		}

		//if has reached a wall, stop, re-coordinate . 
		if (this.x == 0 || this.y == 0 || this.x == 700 || this.y == 500){
			console.log("pet at wall");
			atWall = true; 
			vecX = 0 ; 
			vecY = 0 ;
		}
	}

	// got some food
	// food shall lose health.
	this.caught = function(){
		console.log("caught !!!!");
		this.food.lost();
	}

	// lay egg : 
	this.layEgg = function(){
		console.log("laid an egg");
		miniPet = new Pet(this.x,this.y,this.food);
	}

	this.interval = setInterval(this.move,1000);
}

//class : food 
function Food(){
	//init food ( out cursor ) with xy position, hp ...
	this.x = 100;
	this.y = 100;
	this.hp = 11;

	//functions :update position,  lost hp , stuck in poop , .... 
	//******************************************************************************
	//update position according to mouse
	this.updPos = function(canvas,evt){
		let rect = canvas.getBoundingClientRect();
		ctx.beginPath();
		ctx.fillStyle="Blue";
		ctx.arc(this.x,this.y, 10, 0, 2*Math.PI);
		ctx.fill();
		this.x = evt.clientX - rect.left;
		this.y = evt.clientY - rect.top;
	}

	//lost 1 hp
	this.lost = function(){
		this.hp--;
	}

	//stuck in poop
	this.stuck = function(){
		//get stuck, cant move food in 3s
	}
}

clear = function(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
}

draw = function(){
	console.log("clearing in interval");
	this.interval = setInterval(clear, 20);
}


//3******************************************************3
//starting the game 

//init objects
let food = new Food();
let myPet = new Pet(0,0,food);

//check mouse movement
canvas.addEventListener("mousemove",function(evt){
	food.updPos(canvas,evt);
});

//re-draw the game
draw();


