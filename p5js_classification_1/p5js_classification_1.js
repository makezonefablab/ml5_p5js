// 영역 나누기 (Classification) – ML5.js
// http://makezone.co.kr/blog/2020/11/22/%ec%98%81%ec%97%ad-%eb%82%98%eb%88%84%ea%b8%b0-classification-ml5-js-2/

let targetLabel = 'C';
let model;
let state = 'collection';

function setup() {
  
  createCanvas(600,600);
  
  // 2. option
  let options = {
    inputs:['x','y'],
    outputs:['label'],
    task:'classification',
    debug:true
  };

  // 2. initialize
  model = ml5.neuralNetwork(options);

  background(100); // 어두운 회색 바탕 칠하기 
}


function draw() {

}

function keyPressed(){

  if(key == 't'){
    state = 'training';

    console.log('start training');
    model.normalizeData();

    let options ={
      epochs:200
    }
    model.train(options, whileTraining, finishedTraining);
  }
  else if(key == 's'){
    //model.saveData('mouse-notes');
  }
  else{
    targetLabel = key.toUpperCase();
  }
}

function whileTraining(epoch, loss){
  console.log(epoch);
}

function finishedTraining(){
  console.log('finished train')
  state = 'prediction';
}

function mousePressed(){


  // option에서 정의한 입력 레이블에 맞게 값 정의
  let inputs ={
    x:mouseX,
    y:mouseY
  };

  if(state =='collection')
  {
    
    // option에서 정의한 출력 레이블에 맞게 값 정의
    let target ={
      label:targetLabel
    };

    // 데이터 입력
    model.addData(inputs,target);

    stroke(0);
    noFill();
    ellipse(mouseX,mouseY,24);
    fill(0);
    noStroke();
    textAlign(CENTER,CENTER);
    text(targetLabel,mouseX,mouseY);
  }
  else if (state =='prediction'){
    model.classify(inputs,getResults);
  }


}

function getResults(error,results){
  if(error){
    console.error(error);
    return;
  }
  console.log(results);

  stroke(0);
  fill(0,0,255,100);
  ellipse(mouseX,mouseY,24);
  fill(0);
  noStroke();
  textAlign(CENTER,CENTER);
  text(results[0].label,mouseX,mouseY);
}
