function bubbleCreate(){
    var clutter = ""
for(var i=1; i<=168; i++){
    var rand = Math.floor(Math.random()*10)
    clutter+=`<div class="bubble"><h2>${rand}</h2></div>`
}

document.querySelector("#container-bottom").innerHTML=clutter
}


var hitVal = 0
var score = 0
var timer = 60

function timerCreation(){
    var timerInterval = setInterval(function(){
        if(timer>0){
            timer--
            document.querySelector(".timerBox").textContent = timer
            
        }
        else{
            clearTimeout(timerInterval)
            document.querySelector("#container-bottom").innerHTML = `<h4>Game Over</h4>`
        }   
    },1000)
}



function generateHit(){
    hitVal = Math.floor(Math.random()*10)
    document.querySelector(".hit-number").textContent = hitVal
}

function genearteScore(){
    score+=10
    document.querySelector(".score-number").textContent = score
    
}


    document.querySelector("#container-bottom").addEventListener("click", function(dets){
        if(Number(dets.target.textContent)===hitVal){
            genearteScore() 
            bubbleCreate()
            generateHit()        
        }
    })


bubbleCreate()
timerCreation()
generateHit()


