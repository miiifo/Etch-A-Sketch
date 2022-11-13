let container=document.querySelector("#container");
let colorPicker=document.querySelector(".color-picker");
let bgcolorPicker=document.querySelector(".bgcolor-picker");
let range=document.querySelector("#range");
let currentValue=document.querySelector("#current-value");
let rainbow=document.querySelector(".rainbow")
let shading=document.querySelector(".shading")
let eraser=document.querySelector(".eraser")
let clear=document.querySelector(".clear")
let colorMode ="normal";
let gridColor="#000000";
let isShading=false;
let colorDict={"normal":getGridColor, "rainbow":makeRainbow, "shading":shade, "eraser":getGridColor}
let isDown = false;


createGrid(16);



range.addEventListener("mouseup",()=>{
    clearGrid();
    createGrid(range.value);
});


colorPicker.addEventListener("change",(e)=>{
    gridColor=e.target.value;
    colorMode="normal";
});


bgcolorPicker.addEventListener("change",(e)=>{
    let grid=document.querySelectorAll(".grid-element")    
    grid.forEach(newBg=>{
        newBg.style.backgroundColor=e.target.value;
    });
});


rainbow.addEventListener("click",(e)=>{
    colorMode="rainbow";
});


shading.addEventListener("click",(e)=>{
    isShading = !isShading
    colorMode="shading";
});


eraser.addEventListener("click",(e)=>{
    let grid=document.querySelector(".grid-element");
    isShading=false;
    
    gridColor=grid.style.backgroundColor;
    colorMode="eraser";
});


range.addEventListener("mousemove",()=>{
    currentValue.innerHTML=`${range.value}×${range.value}`;
});


clear.addEventListener("click",()=>{
    let grid=document.querySelectorAll(".grid-element")    
    grid.forEach(newBg=>{
        newBg.style.backgroundColor=bgcolorPicker.value;
        newBg.style.opacity=1;
    });
});

container.addEventListener("mouseup", function(){
    isDown =false;
});


function createGrid(row){
    container.style.gridTemplateColumns=`repeat(${row}, 1fr)`;
    container.style.gridTemplateRows=`repeat(${row}, 1fr)`;
    
    for(let i=0; i<row*row; i++){
        let grid=document.createElement("div");
        container.appendChild(grid);
        grid.classList.add('grid-element');
        grid.style.backgroundColor=bgcolorPicker.value;
        grid.style.opacity=1;
        grid.addEventListener("mousedown", function(){
            isDown =true;
            grid.style.backgroundColor=colorDict[colorMode]();
        });
        grid.addEventListener("mouseover", function(){
            if(isDown){
                grid.style.backgroundColor=colorDict[colorMode]();
                if(isShading){
                    decreaseOpacity(grid);
                }else{
                    grid.style.opacity=1;
                }
            }
        });
    } 
}

function makeRainbow(){
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    gridColor=`rgb(${r},${g},${b})`;
    return gridColor;
}

function getGridColor(){
    return gridColor;
}

function shade(){
    return gridColor=colorPicker.value;
}

function decreaseOpacity(e){
    if(e.style.opacity>=0){
        e.style.opacity-=.1;
    }
}

function clearGrid(){
    container.innerHTML="";
}