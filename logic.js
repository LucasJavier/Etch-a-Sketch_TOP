const myContainerGrid = document.getElementById("canvas");
const myGridSize = document.getElementById("gridSize");
const allButtons = document.querySelectorAll("button");
const myLabel = document.querySelector("label");
const colorSelected = document.getElementById("colorSelected");
const myColor = document.getElementById("myColor");
const myRainbow = document.getElementById("rainbow");
const myClear = document.getElementById("clear");
const myBorderCanvas = getComputedStyle(myContainerGrid);
const myDropper = document.getElementById("dropper");
const myBody = document.querySelector("body");
let canPaint = false;
let canErase = false;
let itsDropper = false;

window.addEventListener("load",() =>{
    const myWidth = myContainerGrid.offsetWidth - parseInt(myBorderCanvas.borderRightWidth) - parseInt(myBorderCanvas.borderLeftWidth);
    const myHeight = myContainerGrid.offsetHeight - parseInt(myBorderCanvas.borderTopWidth) - parseInt(myBorderCanvas.borderBottomWidth);
    const sizeWidth = myWidth / 32;
    const sizeHeight = myHeight / 32.5;
    myColor.setAttribute("class","active");
    myLabel.textContent = "32 x 32";
    for(let i = 0; i < (32*32); i++){
        const newDiv = document.createElement("div");
        newDiv.setAttribute("class","square");
        newDiv.style.cssText = `width: ${sizeWidth}px; height: ${sizeHeight}px; background-Color: white`;
        newDiv.addEventListener("mousedown",(e) =>{
            if(itsDropper) {
                const rgbaColor = getComputedStyle(newDiv).backgroundColor;
                const rgbColor = rgbaToRgb(rgbaColor);
                const hexColor = rgbToHex(rgbColor);
                colorSelected.value = hexColor; 
                itsDropper = false;
                myBody.classList.remove("dropper");
            }
            else{
                if(myColor.classList.contains("active") || myRainbow.classList.contains("active")) {
                    canPaint = true;
                    canErase = false;
                }
                else {
                    canPaint = false;
                    canErase = true;
                }
                if(canPaint) painting(e);
                else eraseDiv(e);
            }
        });
        newDiv.addEventListener("mouseup",() => {
            canPaint = false;
            canErase = false;
        });
        newDiv.addEventListener("mouseover",(e) => {
            if(canPaint) painting(e);
            else if(canErase) eraseDiv(e);
        });
        myContainerGrid.appendChild(newDiv);
    }  
});

myGridSize.addEventListener("input",() => {
    const myWidth = myContainerGrid.offsetWidth - parseInt(myBorderCanvas.borderRightWidth) - parseInt(myBorderCanvas.borderLeftWidth);
    const myHeight = myContainerGrid.offsetHeight - parseInt(myBorderCanvas.borderTopWidth) - parseInt(myBorderCanvas.borderBottomWidth);
    while(myContainerGrid.firstChild) myContainerGrid.removeChild(myContainerGrid.firstChild);
    const theValue = parseInt(myGridSize.value);
    const sizeWidth = myWidth / theValue;
    const sizeHeight = myHeight / theValue;
    for(let i = 0; i < (theValue*theValue); i++){
        const newDiv = document.createElement("div");
        newDiv.setAttribute("class","square");
        newDiv.style.cssText = `width: ${sizeWidth}px; height: ${sizeHeight}px; background-Color: white`;
        newDiv.addEventListener("mousedown",(e) =>{
            if(itsDropper) {
                myColor.value = newDiv.style.background;
                itsDropper = false;
                myBody.classList.remove("dropper");
            }
            else{
                if(myColor.classList.contains("active") || myRainbow.classList.contains("active")) {
                    canPaint = true;
                    canErase = false;
                }
                else {
                    canPaint = false;
                    canErase = true;
                }
                if(canPaint) painting(e);
                else eraseDiv(e);
            }
         });
         newDiv.addEventListener("mouseup",() => {
            canPaint = false;
            canErase = false;
        });
        newDiv.addEventListener("mouseover",(e) => {
            if(canPaint) painting(e);
            else if(canErase) eraseDiv(e);
        });
         myContainerGrid.appendChild(newDiv);
    }
    myLabel.textContent = (theValue).toString() + " x " + (theValue).toString(); 
});

allButtons.forEach(button => button.addEventListener("click",() => {
    if(!button.classList.contains("active")) {
        allButtons.forEach(theOtherButton => {
            if(theOtherButton.classList.contains("active")) theOtherButton.removeAttribute("class");
        })
        button.setAttribute("class","active");
    }
    else button.removeAttribute("class");
}));

myClear.addEventListener("click",() => { 
    let myNewDivs = document.querySelectorAll("div[class='square']");
    myNewDivs.forEach(div => div.style.backgroundColor = "white");
    myColor.setAttribute("class","active");
    myClear.removeAttribute("class");

});

myDropper.addEventListener("click", () => {
    myBody.classList.add("dropper");
    itsDropper = true;
})

function painting(event){
    if(event.target.style.backgroundColor === "white"){
        if(myColor.classList.contains("active")) event.target.style.backgroundColor = colorSelected.value;
        else event.target.style.backgroundColor = randomColor();
    }
}

function randomColor(){
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red},${green},${blue})`;
}

function eraseDiv(event){
    event.target.style.backgroundColor = "white";
}

function rgbToHex(rgbColor) {
    const rgbArray = rgbColor.match(/\d+/g);
    const hexColor = `#${Number(rgbArray[0]).toString(16).padStart(2, '0')}${Number(rgbArray[1]).toString(16).padStart(2, '0')}${Number(rgbArray[2]).toString(16).padStart(2, '0')}`;
    return hexColor;
}

function rgbaToRgb(rgbaColor) {
    const rgbaArray = rgbaColor.match(/\d+/g);
    const rgbColor = `rgb(${rgbaArray[0]}, ${rgbaArray[1]}, ${rgbaArray[2]})`;
    return rgbColor;
}

function rgbToHex(rgbColor) {
    const rgbArray = rgbColor.match(/\d+/g);
    const hexColor = `#${Number(rgbArray[0]).toString(16).padStart(2, '0')}${Number(rgbArray[1]).toString(16).padStart(2, '0')}${Number(rgbArray[2]).toString(16).padStart(2, '0')}`;
    return hexColor;
}