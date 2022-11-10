let container=document.querySelector("#container");
    
createGrid(16);

function createGrid(row){
    container.style.gridTemplateColumns=`repeat(${row}, 1fr)`;
    container.style.gridTemplateRows=`repeat(${row}, 1fr)`;
    for(let i=0; i<row; i++){
        for(let v=0; v<row; v++){
            let grid=document.createElement("div");
            container.appendChild(grid);
            grid.classList.add('grid-element');
            grid.addEventListener("mouseover", function(){
                
                //Change the color to rainbow
                /*const r = Math.floor(Math.random() * 256);
                const g = Math.floor(Math.random() * 256);
                const b = Math.floor(Math.random() * 256);
                grid.style.backgroundColor=`rgb(${r},${g},${b})`;*/
                
                //Add a 10% of black each pass
                grid.style.backgroundColor=`rgb(0,0,0)`;
                let currentOpacity=Number(grid.style.opacity);
                grid.style.opacity=currentOpacity+.1;
            });

        }
    
    } 
}

let btn=document.querySelector(".btn");
btn.addEventListener("click",()=>{
    let number=prompt("set the number of squares per side (2 to 100)");
    if (number>=2 &&number<=100){
        clearGrid();
        createGrid(number);
    }else {
            location.reload();
        }
})

function clearGrid(){
    container.innerHTML="";
}

   