//adding grids
const gridSize = 15;
let game = document.querySelector('.game');
for (let i = 0; i < gridSize * gridSize; i++) 
{
  let gridItem = document.createElement('div');
  gridItem.classList.add('grid-item');
  game.appendChild(gridItem);
}

let grid_items = document.querySelectorAll('.grid-item');
let value = document.querySelector('.value');

//available grid index set
let  grid_indexes= new Set();
//let grid_indexes = [];
for(let i=0;i<grid_items.length;i++)
{
  grid_indexes.add(i);
}

//initializing 
//let head_index=random_grid_index();
//let tail_index=head_index;
let food_index=random_grid_index();
let dir = Math.floor(Math.random() * 4); // 0 up 1 down 2 left 3 right
let score=0;
let snake_body=[];
snake_body.push(random_grid_index());

grid_items[snake_body[0]].style.backgroundColor='red';
grid_items[food_index].style.backgroundColor='yellow';

//type of displacement in different direction
// 0 up 1 down 2 left 3 right
var displace=
{
  0: {row:-1,column:0},
  1: {row:1,column:0},
  2: {row:0,column:-1},
  3: {row:0,column:1}
}
const up = document.querySelector(".up"); 
const down = document.querySelector(".down"); 
const left = document.querySelector(".left"); 
const right = document.querySelector(".right"); 

//Execution
//while(true)
//setTimeout(move,5000);// name of the function
//move();
let myInterval =setInterval(move, 500);
up.addEventListener("click",()=>{if(dir!=1)dir=0});
down.addEventListener("click",()=>{if(dir!=0)dir=1});
left.addEventListener("click",()=>{if(dir!=3)dir=2});
right.addEventListener("click",()=>{if(dir!=2)dir=3});
//document.addEventListener('keydown',()=>{if(dir!=1)dir=0})

//functions

//choose index for random grid
function random_grid_index()
{
  let arrayFromSet = Array.from(grid_indexes);
  let grid_index = arrayFromSet[Math.floor(Math.random() * arrayFromSet.length)];
  //let randomIndex = Math.floor(Math.random() * grid_indexes.length);
  //let grid_index = grid_indexes[randomIndex];
  grid_indexes.delete(grid_index);   
  return grid_index;
}

//movement at a time
function move()
{
  //console.log(dir);
  //console.log(head);
  //console.log(Math.floor(head/gridSize));
  //console.log(displace[dir].row);
  let head_index=snake_body[0];
  let row=Math.floor(head_index/gridSize) + displace[dir].row; //use floor
  if(row<0)
  {
    row=gridSize-1;
  }
  else if(row>=gridSize)
  {
    row=0;
  }
  //console.log(row);
  //console.log(head%gridSize);
  //console.log(displace[dir].column);


  let column=head_index%gridSize + displace[dir].column;
  if(column<0)
  {
    column=gridSize-1;
  }
  else if(column>=gridSize)
  {
    column=0;
  }


  //console.log(column);
  //let temp=head_index;
  //grid_items[head_index].style.backgroundColor='blue';
  head_index=row*gridSize+column;
  grid_items[head_index].style.backgroundColor='red';
  snake_body.unshift(head_index);
  if(head_index==food_index)
  {
    score++;
    value.textContent=score;
    food_index=random_grid_index();
    grid_items[food_index].style.backgroundColor='yellow';
  }
  else if(grid_indexes.has(head_index))
  {
    let tail_index=snake_body.pop();// last index to be removed
    grid_indexes.delete(head_index); //particular value to be removed
    grid_indexes.add(tail_index);
    grid_items[tail_index].style.backgroundColor='green';
  }
  else
  {
    clearInterval(myInterval);
  }
}