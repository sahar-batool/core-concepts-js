//generate random color
const randomColor = function(){
    const hex = "0123456789ABCDEF";
    let color =  "#";
    for(let i = 0; i < 6; i++){
        color += hex[Math.floor(Math.random() * 16)]
    }
    return color;
}
console.log(randomColor())

let intervalId;
const startChangingColor = function(){
    if(!intervalId){
        intervalId = setInterval(changebgcolor, 1000)
    }
        function changebgcolor(){
    document.body.style.backgroundColor = randomColor();
    }
}

const stopchangingcolor = function(){
    clearInterval(intervalId)
    intervalId = null;
}

const resetAll = function(){
     const reset = document.body.style.backgroundColor = "";
     console.log(reset)
}


document.querySelector('#start').addEventListener('click', startChangingColor)
document.querySelector('#stop').addEventListener('click', stopchangingcolor)
document.querySelector('#reset').addEventListener('click', resetAll)