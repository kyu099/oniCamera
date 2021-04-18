const video = document.getElementById("video");
const picture = document.getElementById("picture");
const button = document.getElementById("btn");
const bigbutton = document.getElementById("big");
const smallbutton = document.getElementById("small");
const changebutton = document.getElementById("change");
const up = document.getElementById("up");
const down = document.getElementById("down");
const left = document.getElementById("left");
const right = document.getElementById("right");

const ctx = canvas.getContext("2d");
const ctx2 = canvas2.getContext("2d");

const imglist = ["oni1.PNG", "oni2.PNG"];

let img = new Image();
let imgnum = 0;
img.src = imglist[0];
let size = 200;
let x = 0;
let y = 0;
let drag = false;

navigator.mediaDevices.getUserMedia({
    video: { facingMode: "environment" },
    audio: false,
}).then(stream =>{
    video.srcObject = stream;
    video.play();
}).catch(e =>{
    console.log(e);
})

timer = setInterval(() =>{
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, size, size);
}, 1000/60);

function move(e){
    if(drag){
        x = e.clientX - canvas.getBoundingClientRect().left - size/2;
        y = e.clientY - canvas.getBoundingClientRect().top - size/2;
    }
}

button.onclick = () => {
    ctx2.drawImage(canvas, 0, 0);
}

bigbutton.onclick = () => {size += 10};
smallbutton.onclick = () => {if(size > 0) size -= 10};
changebutton.onclick = () => {
    if(imgnum < imglist.length - 1) imgnum++;
    else imgnum = 0;
    img.src = imglist[imgnum];
    console.log(imglist.length, imgnum, imglist[imgnum]);
}
up.onclick = () => {if(y > - size) y -= 20}
down.onclick = () => {if(y < size + canvas.height) y += 20}
left.onclick = () => {if(x > - size) x -= 20}
right.onclick = () => {if(x < size + canvas.width) x += 20}

canvas.addEventListener('mousemove', move, false);
canvas.addEventListener('mousedown', () => {drag = true;}, false);
canvas.addEventListener('mouseup', () => {drag = false;}, false);
