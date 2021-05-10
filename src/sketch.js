let vid;
let p_cur; // record the pixels on the current frame
let p_pre; // record the pixels on the previous frame
let rgba; // #total_pixel * 4 matrix storing the rgba value of each pixel
let initialize = false;
let diff = 0; // how much the pixels change
let btns = 0; // brightness of the frame
let size; // total number of pixels

let r_ave = 0;
let g_ave = 0;
let b_ave = 0;

let windPlayer;
let chimesPlayer;

let colorThreshold = 15;
let justPlayed = false;
let playCount = 0;

let minInterval = 20;

let notes = ["E1", "F1", "G1", "A1", "B1", "C1", "D1", "A2","E2", "Eb2", "C2", "D2", "E2", "F2", "G2", "A2"]

function preload(){
  windPlayer = new Tone.Player("assets/sounds/soft_wind.mp3");
  windPlayer.loop = true;
  // windPlayer.retrigger = true;
  windPlayer.toDestination();
  windPlayer.autostart = true;
}

chimesPlayer = new Tone.Sampler(
    {
      "A1" : "assets/sounds/wc_single.wav",
    }
);

chimesPlayer.toDestination();
Tone.Transport.start();

function setup() {
  createCanvas(100, 60);
  size = width * height;
  // vid = createVideo(
  //   ['assets/video/light.mp4'],
  //   vidLoad
  // );
  vid = createCapture(VIDEO);
  vid.hide();
  // vid.size(400, 400);
  noStroke();
  fill(255);
}

// This function is called when the video loads
function vidLoad() {
  vid.loop();
  vid.volume(0);
}

function draw() {
  image(vid, 0, 0, width, height);
  loadPixels(); // give an output 4*width*height array called pixels 
  // pixels = [r,g,b,a,r,g,b,a,...]
  // process the pixels
  p_cur = nj.array(Array.from(pixels));
  size = pixels.length/4;
  rgba = p_cur.reshape(size,4); // [[r,g,b,a], [r,g,b,a],....]
  rgb = rgba.slice(null,[3]); // [[r,g,b],[r,g,b],....]
  r = rgba.slice(null,[1]); // [[r],[r],[r],...] 
  g = rgba.slice(null,[1,2]); // [[g],[g],[g],...] 
  b = rgba.slice(null,[2,3]); // [[b],[b],[b],...] 
  
  btns = rgb.flatten().sum()/size;
  r_ave = r.flatten().sum()/size;
  g_ave = g.flatten().sum()/size;
  b_ave = b.flatten().sum()/size;
  fill(r_ave,g_ave,b_ave);
  let std = distance3d(r,g,b,size);
  if(std > colorThreshold && !justPlayed) {
    playNote();
    justPlayed = true;
  }

  if(justPlayed) {
    playCount ++;
  }
  if(playCount == minInterval){
    playCount = 0;
    justPlayed = false;
  }
  if(initialize) {
    let temp = p_cur.subtract(p_pre);
    temp = nj.abs(temp);
    diff = temp.sum()/size;
    ellipse(50,30,20);
    push();
    fill(255,0,0);
    rect(0,0,diff,10);
    pop();
  }
  windPlayer.playbackRate = lerp(windPlayer.playbackRate, map(diff, 0, 30, 0.5, 1),0.1);
  // console.log(windPlayer.playbackRate)
  p_pre = p_cur;
  initialize = true;
}

function playNote(time){
  let noteInd = floor(random(0,16));
    chimesPlayer.triggerAttack(notes[noteInd],time);      
  
}

function mouseReleased() {
  playNote();
}

function distance3d(r,g,b,s) {
  let r_g = nj.abs(r.subtract(g));
  let r_b = nj.abs(r.subtract(b));
  let g_b = nj.abs(g.subtract(b));
  let std = r_g.add(r_b.add(g_b)).flatten().sum()/(3*s);
  // console.log(std);
  return std;
}