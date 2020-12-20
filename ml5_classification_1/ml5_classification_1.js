let targetLabel = 'C';
let model;
let state = 'collection';

function setup() {
   createCanvas(600,600);
   background(100);
   
   // 2. option
   let options = {
     inputs:['x','y'],
     outputs:['label'],
     task:'classification',
     debug:'true'
   };
   
   // 3. init
   model = ml5.neuralNetwork(options);
   
   
}

function draw() {

}

function keyPressed(){
  
  if(key == 't')
  {
      state = 'training';
      console.log('start training');
      
      // 5. normalization
      model.normalizeData();
      
      let options = {
        epochs:200
      };
      
      // 6. train
      model.train(options, whileTraining, finishedTraining);
  }
  else
  {
      targetLabel = key.toUpperCase();
  }
}



function whileTraining(epoch, loss){
    console.log(epoch);
}
 

function finishedTraining(){
    console.log('finished train');
    state = 'prediction';
}



function mousePressed(){
  
  // 4. Add data
  let inputs ={
    x:mouseX,
    y:mouseY
  };
  
  if(state == 'collection')
  {
    let target = {
      label:targetLabel
    };
    
    model.addData(inputs,target);
    
    stroke(0);
    noFill();
    ellipse(mouseX,mouseY,24);
    
    fill(0);
    noStroke();
    textAlign(CENTER,CENTER);
    text(targetLabel,mouseX,mouseY);
  }
  else if(state == 'prediction')
  {
    // 6. 훈련된 모델 적용
    model.classify(inputs,getResults);
  }
}

function getResults(error,results){
  
  if(error) {
     console.log(error);
     return;
  }
  
  console.log(results);
  
  stroke(0);
  fill(0,0,255,100);
  ellipse(mouseX,mouseY,24);
  
  noStroke();
  fill(0);
  textAlign(CENTER,CENTER);
  text(results[0].label , mouseX,mouseY);
}
