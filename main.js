song="";
scoreRightWrist=0
scoreLeftWrist=0
rightWristX=0
rightWristY=0
leftWristX=0
leftWristY=0
function preload(){
    song1=loadSound("song1.mp3");
    song2=loadSound("song2.mp3")
}
function setup(){
    canvas=createCanvas(500,400);
    canvas.position(420,220);
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log("posenet is initiallized")
}
function gotPoses(results){
if(results.length>0){
    console.log(results);
    rightWristX=results[0].pose.rightWrist.x;
    rightWristY=results[0].pose.rightWrist.y;
    console.log("rightWristX="+rightWristX+"rightWristY="+rightWristY);
    leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    console.log("leftWristX="+leftWristX+"leftWristY="+leftWristY);
    scoreLeftWrist=results[0].pose.keypoints[9].score;
    scoreRightWrist=results[0].pose.keypoints[10].score;
    console.log(scoreLeftWrist)
    console.log(scoreRightWrist)
}
}
function draw(){
    image(video,0,0,600,500);
    song1_status=song1.isPlaying()
    song2_status=song2.isPlaying()
    fill ('#ff0000')
    stroke ('#ff0000')
    if(scoreLeftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        song1.stop()
        if (song2_status==false){
            song=song2
            song.play()
            
        }
    }
    if(scoreRightWrist>0.2){
        circle(rightWristX,rightWristY,20);
        
        song2.stop()
        if (song1_status==false){
            song=song1
            song.play()
            
        }
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function stop(){
    song.stop()
}
function pause(){
    song.pause()
}