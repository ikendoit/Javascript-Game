//1**************************************************1
//init canvas, ctx
let canvas = document.getElementById("game"); 

let ctx = canvas.getContext("2d");


//2**************************************************2
//create classes, functions 

//class: pet
function Pet(initx, inity, initfood) {
	//init pet, position x+y , age 1, speed, food(our cursor) .....
	this.x = initx ; 
	this.y = inity ; 
	this.vecX = 0;
	this.vecY = 0;
	this.age = 1 ; 
	this.speed = 1 ;
	this.atWall = false;
	this.food = initfood;
	this.form = function(){
		switch (this.age) {
			case 1 : return "small"; 
			case 2 : return "medium";
			case 3 : return "big";
			default : return "none";
		}
	}
	// functions: move, touch food, lay eggs, poops,... 
	// ************************************************
	
	// move the pet according to food's position and check if has caught food)
	this.move =function() {
		//check if pet is at the wall
		//if atWall -> move to food, no longer at wall 
		if (this.atWall){
			//calculate coordinate
			let foodX = this.food.getX();
			let foodY = this.food.getY();
			this.vecX = this.speed*(this.x - foodX)/Math.sqrt(Math.abs(this.x*this.x - foodX*foodX));
			this.vecY = this.speed*(this.y - foodY)/Math.sqrt(Math.abs(this.y*this.y - foodY*foodY));
			
			//if has reached a wall, stop, re-coordinate . 
			if (this.x == 0 || this.y == 0 || this.x == 700 || this.y == 500){
				console.log("pet at wall");
				this.atWall = true; 
				this.vecX = 0 ; 
				this.vecY = 0 ;
			}
			//caught the food : call caught(), get more speed, lay an egg
			if ((this.x-20)*this.age <= foodX && (this.x+20)*this.age >= foodX && (this.y-20)*this.age <= foodY && (this.y+20)*this.age >= foodY){
				caught(this.food);
				layEgg();
				this.speed++;
				vecX=0;
				vecY=0;
				
			}
			this.atWall = false;
		}
		console.log(this.atWall);
		
	}

	// got some food
	// food shall lose health.
	this.caught = function(){
		console.log("caught it !!!!");
		this.food.lost();
	}

	// lay egg : 
	this.layEgg = function(){
		console.log("laid an egg");
		miniPet = new Pet(this.x,this.y,this.food);
	}

	this.interval = setInterval(() =>{
		this.move();

		this.x -= this.vecX;
		this.y -= this.vecY;

		ctx.fillStyle="red";
		ctx.beginPath();
		ctx.arc(this.x,this.y,20*this.age,0,2*Math.PI);
		ctx.fill();

	},20);


}

//class : food 
function Food(){
	//init food ( out cursor ) with xy position, hp ...
	this.x = 100;
	this.y = 100;
	this.hp = 11;
	this.isStuck = false;

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

	this.getX = function(){
		return this.x;
	}

	this.getY = function(){
		return this.y;
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

draw = function(food){
	console.log("clearing in interval");
	this.interval = setInterval(()=>{
		clear();
		//food
		ctx.beginPath();
		ctx.fillText(0,20,food.hp);
		ctx.fill();
		
		
		if (food.isStuck){
			//draw image of food stuck
		}
	}, 100);
}


//3******************************************************3
//starting the game 

//init objects
var food = new Food();
var myPet = new Pet(0,0,food);


//check mouse movement
canvas.addEventListener("mousemove",function(evt){
	food.updPos(canvas,evt);
});

//re-draw the game
draw(food);


