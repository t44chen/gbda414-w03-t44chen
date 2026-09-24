let faceMesh;
let video;
let faces = [];

// CHANGE ONLY THE COLOUR BELOW
let maskColour = "#ff2bd6";

let options = {
  maxFaces: 1,
  refineLandmarks: false,
  flipHorizontal: false,
};

async function setup() {
  createCanvas(640, 480);

  faceMesh = await ml5.faceMesh(options);

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  faceMesh.detectStart(video, gotFaces);
}

function draw() {
  background(20);

  if (video) {
    image(video, 0, 0, width, height);
  }

  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];

    drawEyeMask(face.leftEye.keypoints);
    drawEyeMask(face.rightEye.keypoints);
  }
}

function drawEyeMask(keypoints) {
  fill(maskColour);
  noStroke();

  beginShape();

  for (let i = 0; i < keypoints.length; i++) {
    vertex(keypoints[i].x, keypoints[i].y);
  }

  endShape(CLOSE);
}

function gotFaces(results) {
  faces = results;
}
