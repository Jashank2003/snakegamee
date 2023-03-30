// game constants
 
let inputDir={ x: 0 , y:0};
const movesound = new Audio('movesound.mp3');
const foodeat = new Audio('foodeat.mp3');
const gameover = new Audio('gameover.mp3');
const themesong = new Audio('themesong.mp3');
const speed = prompt(`Enter the Speed of snake( use 7 for best exp.)`);
 themesong.volume = 0.5;
let score = 0;
let lastpaintime =0;
let snakearr = [
    { x:13 , y:15}
]

food = {x:10 , y:15};

  

// game functions
    function main(ctime){
        window.requestAnimationFrame(main);
        if((ctime - lastpaintime)/1000 <  1/speed ){
            return;
        }
        // console.log(ctime);
        lastpaintime = ctime;
        // themesong.play();
        gameEngine();
    }

    function isCollide(sarr){
        //  khud se takraya
        for (let i = 1; i < sarr.length; i++) {
            if(sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y ){
                return true;
            }
        }
        //  wall se takraya
        if( sarr[0].x >= 20  ||  sarr[0].x <= 0  || sarr[0].y >=20   ||  sarr[0].y <= 0  ){
            return true;
    }
    }


    function gameEngine(){

        // updating snakearr and food 

        if(isCollide(snakearr)){
            gameover.play();
            themesong.pause();
            inputDir = {x:0 , y:0};
            alert("Game Over. Press any key to play again");
            snakearr = [{x:13 , y:15}];
            themesong.play();
            score =0;


        }

        //  if snake it the food then  increment score and regenerate food 

        if(snakearr[0].y === food.y && snakearr[0].x === food.x){
            foodeat.play();
            score += 1;
            scoreBox.innerHTML= "Score: " + score; 
            // console.log(score);
            snakearr.unshift({x: snakearr[0].x +  inputDir.x , y: snakearr[0].y +  inputDir.y});
            let a = 2;
            let b = 18;
            food = { x: Math.round( a + (b-a)* Math.random()) , y: Math.round( a + (b-a)* Math.random())}
        } 

        // moving the snake
        for (let i = snakearr.length -2 ; i >=0 ; i--) {
            snakearr[i+1] = {...snakearr[i]} ;        // kyunki loop snake ki tail se chla rhe toh  i +1 wala segment snakearr ki length -1 wala part hoga
        }
        snakearr[0].x += inputDir.x;
        snakearr[0].y += inputDir.y;


        // display snake 
        board.innerHTML ="";
        snakearr.forEach((e , index)=>{
            snakeElement = document.createElement('div');
            snakeElement.style.gridRowStart = e.y;
            snakeElement.style.gridColumnStart = e.x;
            if(index === 0 ){
                snakeElement.classList.add('head');   
            }
            else{
                snakeElement.classList.add('snake');
                
            }
            board.appendChild(snakeElement);
            
        });

        // display food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);

    }




// main logic starts here 
window.requestAnimationFrame(main);

window.addEventListener('keydown',e =>{
    // game start if you press any key
    inputDir = {x:0 , y:1}      
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            // console.log("arrowup");
            inputDir.x =0;
            inputDir.y =-1;
            break;

        case "ArrowDown":
            // console.log("arrowDown");
            inputDir.x =0;
            inputDir.y =1;
            break;

        case "ArrowLeft":
            // console.log("arrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            // console.log("arrowRight");
            inputDir.x =1;
            inputDir.y =0;
            break;
    
        default:
            break;
    }
})