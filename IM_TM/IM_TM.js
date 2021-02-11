let video;
let classifier;
let modelURL = './model/';
let label = "waiting...";

// STEP 1: Load the model!
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
}

function setup() {
  createCanvas(320, 300);
  // Create the video
  video = createCapture(VIDEO);
  video.hide();

  // STEP 2.1: Start classifying
  classifyVideo();
}

// STEP 2.2 classify!
function classifyVideo() {
  classifier.classify(video, gotResults);
}

function draw() {
  background(0);
  
  // Draw the video
  image(video, 0, 0);

  // STEP 4: Draw the label
  textSize(16);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label, width / 2, height - 16);
}


// STEP 3: Get the classification!
function gotResults(error, results) {
  // Something went wrong!
  if (error) {
    console.error(error);
    return;
  }
  // Store the label and classify again!
  if(results[0].confidence > 0.99)
  {
      console.log(results[0]);
      label = results[0].label + "\n" + results[0].confidence;
  }
  else
      label = "Hi";
      
  classifyVideo();
}
