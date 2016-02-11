

$(window).bind("load", function(){
inlineX3d=document.getElementById('x3dFile');
console.log(inlineX3d._x3domNode.getVolume());
vol=inlineX3d._x3domNode.getVolume();
ran=0;
console.log(vol.max.x);
console.log(vol.min.x);

function translateCheck(){
if(vol.max.x==0 && vol.min.x==0){
console.log('test');

setTimeout(translateStart,500);
}
}

function translateStart(){
console.log('translateStart');
xtrans=-1*vol.getCenter().x;
ytrans=-1*vol.getCenter().y;
ztrans=-1*vol.getCenter().z;
document.getElementById('testtrans').setAttribute('translation', xtrans+" "+ytrans+" "+ztrans);
document.getElementById('start').setAttribute('position', '0 0 '+(vol.max.z-vol.min.z)*2.5);
scale = (vol.max.z-vol.min.z)/8
var floor = document.getElementById('floor')._x3domNode.getVolume();
floory=vol.min.y-(vol.min.y*.4)
$('#floor').attr('scale', scale+' '+scale+' '+scale);
$('#floor').attr('translation', '0 '+(vol.min.y-vol.max.y)/1.6+' 0');
translateCheck();    


}


translateCheck();
translateStart();
}

);


/*******************************************
Panosphere Table of Contents
1. resizeCanvas
2. Movement functions
    a. incrementAndWait
    b. mouseClicks
    c. left
    d. right
    e. up
    f. down
    g. zoom
3.  Panorama navigation functions
    a. textureChange
    b. toRoomA
    c. toRoomB
    d. toRoomC
    e. toRoomD
    f. displayItem

*/

// Makes sure the canvas size matches the x3d size. Needed to ensure clicks work
function resizeCanvas(){
// Sets the desired dimensions from the x3d element
var desiredWidthInCSSPixels = $('#x3dcontext').width();
var desiredHeightInCSSPixels = $('#x3dcontext').height();;
// Gets the canvas element
var canvas = document.getElementById("x3dom-x3dcontext-canvas");


// set the display size of the canvas.
canvas.style.width = desiredWidthInCSSPixels + "px";
canvas.style.height = desiredHeightInCSSPixels + "px";
canvas.width = desiredWidthInCSSPixels;
canvas.height = desiredHeightInCSSPixels;
}


// function makes click and hold work for directional buttons
$(document).ready(function(){
//Reruns function direction button 
function incrementAndWait(direction) {
  // Checks to see if mousedown is false. Used with mouseup to stop button press when button stops being pressed
  if (!mousedown) return;  
  // Reruns function after a variable time (timeoutInterval) 
  timeout = setTimeout(function(){incrementAndWait(direction)}, timeoutInterval);
  
  //This is for individual mouseclicks 
  if(timeoutInterval==150){
  //Sets timeout interval to .129 seconds
      timeoutInterval = 129;
      //moves in the direction .15 m
  window[direction](.15);    
  }
  //Delays a movement for .130 seconds for a total delay of .28 seconds
  else if(timeoutInterval>130)
  {timeoutInterval /= 1.1;  
  }
  //increasingly quickly make a small move while mouse is held down
  else {
  timeoutInterval /= 1.15;
  window[direction](.0075);  
  }
  //Reruns the function after the given amount of time
  setTimeout(direction,timeoutInterval);  
  
}});

// Catches a click on any individual direction button and moves that direction. Takes movement amount as an argument
$('.direction').mousedown(function() {
  // Reset to 150 to allow multiple mousedown/mouseup
  timeoutInterval = 150;
  //This allows the incrementAndWait function to run  
  mousedown = true;
  //Gets the direction of the button
  var direction=$(this).attr('id'); 
  // Runs the delay function that leads to movement
  window[incrementAndWait(direction)];
  


//When the mousekey is let up stops the increment function from firing
$(document).mouseup(function() {
  mousedown = false;
})
})
function left(move) {
// gets the camera rotation and splits it into individual numbers
    x = jQuery('#xcamera').attr('rotation').split(/[\s,]+/).map(Number);
// takes the 4th number and adds the movement to it     
    x[3] = x[3] + move;
// Makes the x axis the axis of rotation
    x[1] = 1;
// Sets the rotation    
    jQuery('#xcamera').attr('rotation', x);    
}
function right(move) {
    x = jQuery('#xcamera').attr('rotation').split(/[\s,]+/).map(Number);
    x[3] = x[3] - move;
    x[1] = 1;
    jQuery('#xcamera').attr('rotation', x);
    console.log(x);
}
function up(move) {
    y = jQuery('#ycamera').attr('rotation').split(/[\s,]+/).map(Number);
    y[3] = y[3] + move;
    y[0] = 1;
    jQuery('#ycamera').attr('rotation', y[0]+','+y[1]+','+y[2]+','+y[3]);
    console.log(y);
}
function down(move) {
    y = jQuery('#ycamera').attr('rotation').split(/[\s,]+/).map(Number);
    y[3] = y[3] - move;
    y[0] = 1;
    jQuery('#ycamera').attr('rotation', y);
    console.log(y);
}

// Creates the zoom function
function zoom (delta) {
    // id of the <x3d> element in the html
    var x3d = document.getElementById('x3dcontext');
    // for this to work viewpoint needs to be in html not associated x3d file
    var vpt = x3d.getElementsByTagName("viewpoint")[0];
    
    // checks to see if zoomed in too close
    if (parseFloat(vpt.fieldOfView) + delta < .1) {
        
        vpt.fieldOfView = .1;
        // checks to see if zoomed out too much
    } else if (parseFloat(vpt.fieldOfView + delta) > 1.3) {
        
        vpt.fieldOfView = 1.3;
    } 
    // if not zoomed out too far/close changes the zoom 
    else {
        vpt.fieldOfView = parseFloat(vpt.fieldOfView) + delta;
    }
}

// Resets the rotation to default. Used when moving between panorama
function resetRotation() {
    $('#ycamera').attr('rotation','0 0 0 0');
    $('#xcamera').attr('rotation','0 1 0 1.65');
}


// Changes the panorama being viewed
function textureChange(url,extension)
{
    $('#front').find('imageTexture').attr('url',url+'_f'+'.'+extension);
    $('#back').find('imageTexture').attr('url',url+'_b'+'.'+extension);
    $('#left').find('imageTexture').attr('url',url+'_l'+'.'+extension);
    $('#right').find('imageTexture').attr('url',url+'_r'+'.'+extension);
    $('#up').find('imageTexture').attr('url',url+'_u'+'.'+extension);
    $('#down').find('imageTexture').attr('url',url+'_d'+'.'+extension);
}


//Moves to room B
function toRoomB()
{
// Calls textureChange with the url of the sides
textureChange('facultyShow/roomB/Grunwald-20160120-b-big','jpg');
// Makes currently rendered info/path buttons not rendered
$('group[render="true"]').not('#Cube').attr('render','false');
// Renders the room info/path buttons 
$('#B-click').attr('render','true');
// Resets the x/y roation and sets the rotation to start looking the desired way
resetRotation();
}
// Moves to room A
function toRoomA()
{
// Calls textureChange with the url of the sides
textureChange('facultyShow/roomB/Grunwald-20160120-b-big','jpg');
// Makes currently rendered info/path buttons not rendered
$('group[render="true"]').not('#Cube').attr('render','false');
// Renders the room B info/path buttons 
$('#A-click').attr('render','true');
// Resets the x/y roation
resetRotation();
// Sets the rotation to start looking the desired way
$('#xcamera').attr('rotation','0 1 0 .50');
}
// Moves to room C
function toRoomC()
{
// Calls textureChange with the url of the sides
textureChange('facultyShow/roomB/Grunwald-20160120-b-big','jpg');
// Makes currently rendered info/path buttons not rendered
$('group[render="true"]').not('#Cube').attr('render','false');
// Renders the room B info/path buttons 
$('#C-click').attr('render','true');
// Resets the x/y roation
resetRotation();
// Sets the rotation to start looking the desired way$('#xcamera').attr('rotation','0 1 0 .75');
}
//Moves to room D
function toRoomD(element)
    {
// Calls textureChange with the url of the sides
textureChange('facultyShow/roomB/Grunwald-20160120-b-big','jpg');
// Makes currently rendered info/path buttons not rendered
$('group[render="true"]').not('#Cube').attr('render','false');
// Renders the room B info/path buttons 
$('#A-click').attr('render','true');
// Resets the x/y roation
resetRotation();
// Sets the rotation to start looking the desired way
    $('#xcamera').attr('rotation','0 1 0 .75');        
    }


// For showing information about individual items. Takes as an argument the filename of the image associated with the item
function displayItem(file)
{
// Loads the JSON with the metadata
$.getJSON('metadata.json',function(data){
// Goes through the length of the JSON
for(i=0; i<data.length; i++){
// Finds the entry with the correct filename, gets the relevant metadata
if (data[i]["File"]==file){
    Artist=data[i]["Artist"];    
    Name=data[i]["Name"];
    Year=data[i]["Year"];
    Material=data[i]["Material"];
// One item is made up of multiple objects
    Name1=data[i]["Name1"];
    Material1=data[i]["Material1"];
    Year1=data[i]["Year1"];
// Attatches the image and metadata to the overlay    
    jQuery('#overlayContent').html('<a href="http://www.iub.edu/~cyberdh/x3dViewer/'+file+'"><img src="'+file+'"/></a>');
    $('#overlayContent').append("<Span>"+Artist+"</Span>");
    $('#overlayContent').append("<Span>"+Name+", "+Year+"</Span>");
    // Tests to eliminate empty fields
    if(typeof(Material)!='undefined'){
        $('#overlayContent').append("<Span>"+Material+"</Span>");
    }
    // Tests to eliminate empty fields
    if(typeof(Material1)!='undefined'){    
    $('#overlayContent').append("<br/><br/><Span>"+Name1+", "+Year1+"</Spam>");
    $('#overlayContent').append("<Span>"+Material1+"</Span>");}
        // shows the overlay div
        jQuery('#overlay').css({'display':'inline'});
}    

}});}