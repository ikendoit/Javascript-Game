//1**************************************************1
//init canvas, ctx
let canvas = document.getElementById("game"); 

let ctx = canvas.getContext("2d");

//manage all instances of pets
let pets = [];

//2**************************************************2
//create classes, functions 

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
        if ( this.x <= 0 || this.y <= 0 || this.x >= 695 || this.y >= 495 ){
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

        let x_dis = Math.abs(this.x-this.foodX);
        let y_dis = Math.abs(this.y-this.foodY);
        if ( (10+this.form*20) > Math.sqrt((x_dis*x_dis) + (y_dis*y_dis))) {
            //console.log("caught it !!!! : ");
            //console.log(this.foodX+"  "+this.x);
            //console.log(this.foodY+"  "+this.y);
            
        	//this.layEgg();
            //this.egging = true; 
            if (this.speed <= 25) {
                this.speed+=3;
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

	this.interval = setInterval(() =>{

	},10);
}

//class : food 
function Food(){
	//init food ( out cursor ) with xy position, hp ...
	this.x =800;
	this.y =800;
	this.hp =50;
	this.isStuck = false;

	//functions :update position,  lost hp , stuck in poop , .... 
	//******************************************************************************
	//update position according to mouse
    
	this.updPos = function(canvas,evt){
        let rect = canvas.getBoundingClientRect();
		this.x = evt.clientX - rect.left;
		this.y = evt.clientY - rect.top;
        console.log(this.x+"  "+this.y);
    }

	this.getX = function(){
		return this.x;
	}

	this.getY = function(){
		return this.y;
	}

    this.getHp = function(){
        return this.hp;
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

draw = function(food,pet){
	this.interval = setInterval(()=>{
		clear();

		//food
        //hp 
		ctx.beginPath();
		ctx.fillText(food.getHp(),20,20);
		ctx.fill();
        //object
        ctx.beginPath();
        ctx.filStyle="blue";
        ctx.arc(food.getX(),food.getY(),20,0,2*Math.PI);
        ctx.fill();
		
		if (food.isStuck){
			//draw image of food stuck
		}
        
        pets.forEach((pet) => {
            pet.move();
            pet.x -= parseFloat(pet.vecX);
            pet.y -= parseFloat(pet.vecY);
            ctx.fillStyle="red";
            ctx.beginPath();
            ctx.arc(pet.x,pet.y,20*pet.form,0,2*Math.PI);
            ctx.fill();

            //if (pet.egging) {
            //    ctx.fillStyle="purple";
            //    ctx.beginPath();
            //    ctx.arc(pet.x,pet.y,20*pet.form,0,2*Math.PI);
            //    ctx.fill();
            //}
        });
            
	}, 40);
}

//3******************************************************3
//starting the game 

//init objects
var food = new Food();
var myPet = new Pet(0,0,food);
pets.push(myPet);

//check mouse movement
canvas.addEventListener("mousemove",function(evt){
	food.updPos(canvas,evt);
});

//re-draw the game
draw(food,pets);
