status="";
input="";
objects=[];
function setup(){
    canvas=createCanvas(480,380);
    canvas.position(400,200);
    video=createCapture(VIDEO);
    video.size(480,380);
    video.hide();
}
function start(){
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";

    input=document.getElementById("object").value;

}
function modelLoaded(){
    console.log("Model Loaded!");
    status=true;
}
function draw(){
    image(video,0,0,480,380);
    if(status !=""){
        objectDetector.detect(video,gotResult);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status:Detecting objects";
            document.getElementById("number_of_objects").innerHTML="Object Found";
            
            percent=floor(objects[i].confidence * 100);
            fill('#7a0707');
            text(objects[i].label+""+percent+"%",objects[i].x+15,objects[i].y+15)
            noFill();
            stroke('#7a0707');
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label==input){
                video.stop("Object Found");

            }
        }
    }else{
        document.getElementById("number_of_objects").innerHTML="Object Not Found";
    }
}
function gotResult(error,results){
    if(error){
        console.log(error)
    }
    console.log(results);
    objects=results;
}