//1**************************************************1
//init canvas, ctx
let canvas = document.getElementById("game"); 

let ctx = canvas.getContext("2d");

//manage all instances of pets
let pets = [];

//2**************************************************2
//create classes, functions 

clear = function(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
}

draw = function(food,pet){
    let timer = 0 ;
	this.interval = setInterval(()=>{
        timer+=0.025
		clear();
		//food
        //hp 
		ctx.beginPath();
        ctx.font = "25px Arial";
		ctx.fillText(food.getHp(),20,20);
        ctx.fillText(Math.floor(timer),20,40);
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
            ctx.fillStyle="gray";
            ctx.lineWidth=0.00005;
            ctx.beginPath();
            ctx.arc(pet.x,pet.y,20*pet.form,0,2*Math.PI);
            ctx.stroke();

            if (pet.egging) {
                ctx.fillStyle="purple";
                ctx.beginPath();
                ctx.arc(pet.x,pet.y,20*pet.form,0,2*Math.PI);
                ctx.fill();
            }
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
