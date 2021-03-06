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
const dlURL = document.getElementById("dlURL");
const cameraChange = document.getElementById("cameraChange");

const ctx = canvas.getContext("2d");
const ctx2 = canvas2.getContext("2d");

const imglist = ["oni1.PNG", "oni2.PNG","oni3.PNG","oni4.PNG","oni5.PNG","oni6.PNG","oni7.PNG","oni8.PNG"];

let img = new Image();
let imgnum = 0;
img.src = imglist[0];
let size = 300;
let x = 0;
let y = 0;
let drag = false;
let facing = false;
let curSTREAM = null;
let cameraMode = {video: { facingMode: "environment" }, audio: false};

function moveCamera(cameraMode){
    navigator.mediaDevices.getUserMedia(cameraMode).then(stream =>{
        curSTREAM = stream;
        video.srcObject = stream;
        video.play();
    }).catch(e =>{
        console.log(e);
    })
}

timer = setInterval(() =>{
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, size, size);
}, 1000/60);

moveCamera(cameraMode);

function move(e){
    if(drag){
        x = e.clientX - canvas.getBoundingClientRect().left - size/2;
        y = e.clientY - canvas.getBoundingClientRect().top - size/2;
    }
}

button.onclick = () => {
    ctx2.drawImage(canvas, 0, 0);
    canvas2.hidden = false;

    const cvs = document.getElementById("canvas");
    const png = cvs.toDataURL();
    console.log(png);
    dlURL.innerHTML = `<a href="${png}" download>画像を保存</a>`
}

bigbutton.onclick = () => {size += 10};
smallbutton.onclick = () => {if(size > 0) size -= 10};
changebutton.onclick = () => {
    if(imgnum < imglist.length - 1) imgnum++;
    else imgnum = 0;
    img.src = imglist[imgnum];
}
up.onclick = () => {if(y > - size) y -= 20}
down.onclick = () => {if(y < size) y += 20}
left.onclick = () => {if(x > - size) x -= 20}
right.onclick = () => {if(x < size) x += 20}

cameraChange.onclick = () => {
    curSTREAM.getVideoTracks().forEach( (camera) => {
        camera.stop();
    });

    if(facing === true){
        cameraMode.video = { facingMode: "environment"};
        moveCamera(cameraMode);
    } else {
        cameraMode.video = "user";
        moveCamera(cameraMode);
    }
    facing = !facing;
}

canvas.addEventListener('mousemove', move, false);
canvas.addEventListener('mousedown', () => {drag = true;}, false);
canvas.addEventListener('mouseup', () => {drag = false;}, false);
