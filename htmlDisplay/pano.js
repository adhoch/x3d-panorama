// Creates the zoom function
function zoom (delta) {
    // id of the <x3d> element in the html
    var x3d = document.getElementById('x3dcontext');
    // for this to work viewpoint needs to be in html not associated x3d file
    var vpt = x3d.getElementsByTagName("viewpoint")[0];
    
    // checks to see if zoomed in too close
    if (parseFloat(vpt.fieldOfView) + delta < .1) {
        alert("Zoom in limit reached");
        vpt.fieldOfView = .1;
        // checks to see if zoomed out too much
    } else if (parseFloat(vpt.fieldOfView + delta) > 1.3) {
        alert("Zoom out limit reached");
        vpt.fieldOfView = 1.3;
    } else {
        vpt.fieldOfView = parseFloat(vpt.fieldOfView) + delta;
    }
}

// Creates and toggles the overlay when panorama is clicked takes an item# as an argument. This should be in the shape that calls it.
function overlay() {
    // shows the overlay div
    jQuery('#overlay').css({
        'display': 'inline'
    });
}
//Round a float value to x.xx format
function roundWithTwoDecimals(value) {
    return (Math.round(value * 100)) / 100;
}
// for a counter
var b = 0;
// creates an empty points variable
var points = '';
// not sure
var d = 0;
// creates an empty coords variable
coords =[];
//Handle click on any group member
function handleGroupClick(event) {
    
    
    // number of times click function has run
    b++;    
    
    //Mark hitting point    
    var coordinates = event.hitPnt;
    var x = (coordinates[0]);
    var y = (coordinates[1]);
    var z = (coordinates[2]);
    if (Math.abs(x)>Math.abs(y) && Math.abs(x)>Math.abs(z)){
        if (x>1){x=x-.05}
        else{x=x+.05}
    }
    else if (Math.abs(y)>Math.abs(x) && Math.abs(y)>Math.abs(z)){
        if (y>1){y=y-.05}
        else{y=y+.05}
    }
    else {
        if(z>1){z=z-.05}
        else {z=z+.05}
    }
    // an array with all the click coordinates. Each click adds to the arry
    // not using yet
    coords.push([ {
        'x': x, 'y': y, 'z': z
    }]);
    
// appends input x,y,z input boxes to the html with an id of the axis+click#
    $('#inputShape').append('<p> point '+b+'<br/>'+
    'x: <input type="number" id="xpoint'+b+'" value="'+x.toFixed(2)+'"/>'+
    'y: <input type="number" id="ypoint'+b+'" value="'+y.toFixed(2)+'"/>'+
    'z: <input type="number" id="zpoint'+b+'" value="'+z.toFixed(2)+'"/>'+
    '</p>')
    
// if a line exists in the x3d
if($('#firstLine').length>0){
// gets the first point of the shape
firstPoint = $('#firstPoint').find('Coordinate').attr('point');
// gets the previous points in the shape
points = points + ' ' + x.toFixed(4) + ' ' + y.toFixed(4) + ' ' + z.toFixed(4)
pointToShape=points.toString();
$('#drawShapeBut').remove();
$('#inputShape').append('<input id="drawShapeBut" type="submit" onclick="drawShape('+points.replace(/\D/g, '').length/15+', \''+pointToShape.toString()+'\',+'+b+');" value="Draw Shape"/>');
$('#firstLine').replaceWith("<Shape id='firstLine'>"+
"<Appearance><Material emissiveColor='.76 0 .38' ambientintensity='1' diffusecolor='1 .72 .39'/></Appearance><LineSet vertexCount='"+(points.replace(/\D/g, '').length/15+4)+"' containerField='geometry'><Coordinate DEF='TurnPoints' point='"+firstPoint+" "+points+" "+firstPoint+"'/>"+
"</PointSet></Shape>");
    
    
}

if($('#firstLine').length==0 && $('#firstPoint').length>0){
firstPoint = $('#firstPoint').find('Coordinate').attr('point');
points = points + ' ' + x.toFixed(4) + ' ' + y.toFixed(4) + ' ' + z.toFixed(4)
    $('scene').append("<Shape id='firstLine'>"+
"<Appearance><Material emissiveColor='.76 0 .38' ambientintensity='1' diffusecolor='1 .72 .39'/></Appearance><LineSet vertexCount='"+(points.replace(/\D/g, '').length/15+4)+"' containerField='geometry'><Coordinate DEF='TurnPoints' point='"+firstPoint+" "+points+" "+firstPoint+"'/>"+
"</LineSet></Shape>");
}
    
    // if else sets the points variable to draw the shape
    // if first click
    if ($('#firstPoint').length<1) {
    //console.log('1')
    // points = first xyz
        points = x.toFixed(4) + ' ' + y.toFixed(4) + ' ' + z.toFixed(4)
        // appends an empty div to the html        
        $('scene').append("<Shape id='firstPoint'>"+
"<Appearance><Material emissiveColor='.76 0 .38' ambientintensity='1' diffusecolor='1 .72 .39'/></Appearance><PointSet><Coordinate DEF='TurnPoints' point='"+points+" "+points+"'/>"+
"</PointSet></Shape>");
    
    } 
    // if after first click
    
    /*
    if (event.button=='1'){
    firstPoint = $('#firstPoint').find('Coordinate').attr('point');
if ($('#firstPoint').length != 0 && $('#firstLine').length==0){
console.log('2')
        $('scene').append("<Shape id='firstLine'>"+
"<Appearance><Material emissiveColor='.76 0 .38' ambientintensity='1' diffusecolor='1 .72 .39'/></Appearance><LineSet vertexCount='"+(b+4)+"' containerField='geometry'><Coordinate DEF='TurnPoints' point='"+firstPoint+" "+points+" "+firstPoint+"'/>"+
"</LineSet></Shape>");}
if (b>2 && $('#firstLine').length!=0) {
console.log('3')
$('#drawShapeBut').remove();
$('#inputShape').append('<input id="drawShapeBut" type="submit" onclick="drawShape('+b+');" value="Draw Shape"/>');
$('#firstLine').replaceWith("<Shape id='firstLine'>"+
"<Appearance><Material emissiveColor='.76 0 .38' ambientintensity='1' diffusecolor='1 .72 .39'/></Appearance><LineSet vertexCount='"+(b+4)+"' containerField='geometry'><Coordinate DEF='TurnPoints' point='"+firstPoint+" "+points+" "+firstPoint+"'/>"+
"</PointSet></Shape>");
    }}
    
 */   
    // if right click
    if (event.button == '2') {
       // inserts draw and delete buttons below x,y,z inputs
       // button goes to the drawShape function drawing a shape based on numbers in the input boxes. May have been altered by user        
        // deletes the drawn shape either user generated or click generated.
        $('#inputShape').append('<input type="submit" onclick="deleteShape('+b+');" value="Delete Shape"/>');
        $('#firstPoint').removeAttr('id');
        
        //empties array
        coords =[];
        // creates empty coordIndex variable
        coordIndex = ''
        // loops through number of clicks
        for (i = 0; i < b; i++) {
            // variable to determine order connecting points. Goes from lower left -> lower right -> upper right -> upper left
            coordIndex = coordIndex + ' ' + i.toString();
        }
        
        // creates the shape formed by clicks
        $('scene').append('<Shape id="drawnShape'+b+'"><Appearance><Material emissiveColor="1 0 0"/></Appearance><IndexedFaceSet coordIndex="' + coordIndex + ' 0 -1"><Coordinate point="' + points + '"/></IndexedFaceSet></Shape>');
        
        // zeroes out click counter
        b = 0;
    }
}
//counter for number of drawn shapes
drawn=0;
// b is number of points, points is xyz coordinates, click is the click numbers of the points
function drawShape(b,points,click){
//counter increase
drawn++;
console.log(b+'draw'+click);
//if it's the no "shapeInputCont#" div creates one and throughs all points into it
if($('div[id*="shapeInputCont"]').length==0){
$('#inputShape').children().wrapAll('<div id="shapeInputCont'+click+'">');
}
// if more shapeInputCont# exists  checks for points below it and adds them to a new shapeInputCont#
else{
$("div[id*='shapeInputCont']").last().nextAll().wrapAll('<div id="shapeInputCont'+click+'">');
}
// Throws the shape number above the drawn shape points. Number includes deleted shapes
$("div[id*='shapeInputCont']").last().prepend('Shape: '+drawn+'<br/>');
// empties points variable
    // removes previously drawn shape    
    // loops through number of clicks. Number of points to connect
    
    coordIndex = ''
    for (i = 1; i <= b; i++) {
    // variable containing a list of xyz points for the Coordinate paints;
            // variable to determine order connecting points. Goes from lower left -> lower right -> upper right -> upper left
            coordIndex = coordIndex + ' ' + (i-1).toString();
            }
            
            // Creates delete and modify shapes
$('#shapeInputCont'+click).append('Transparency(0-1)<br/><input id="shape'+click+'" type="number" value="0"/><br/>');
$('#shapeInputCont'+click).append('<input type="submit" onclick="modifyShape('+click+', \''+coordIndex+'\');" value="modify Shape"/>');
$('#shapeInputCont'+click).append('<input type="submit" onclick="deleteShape('+click+');" value="Delete Shape"/>');
$('#shapeInputCont'+click).append('<input type="submit" onclick="acceptShape('+click+');" value="Accept Shape"/>');


// Draws shape based on values in input boxes. May be user generated        
        $('scene').append('<Shape id="drawnShape'+click+'"><Appearance><Material emissiveColor="1 0 0"/></Appearance><IndexedFaceSet creaseAngle="3.14" convex="false" coordIndex="' + coordIndex + ' 0 -1"><Coordinate point="' + points + '"/></IndexedFaceSet></Shape>');
b=0;


//removes the draw shape button 
$('#drawShapeBut').remove();
  $('#firstLine').remove();
    $('#firstPoint').remove();
  
}
// removes inserted drawn shape
function deleteShape(b){
    $('#drawnShape'+b).remove();
    $('#firstLine').remove();
    $('#firstPoint').remove();
    $('#shapeInputCont'+b).remove();
}

function modifyShape(click,coordIndex){
    $('#drawnShape'+click).remove();
    console.log('mod'+click);
    modShapePtslst='';
    console.log(coordIndex);
    modShapePts=$("div[id='shapeInputCont"+click+"']").find('input[type="number"][value]');
    
for(a=0;a<modShapePts.length;a++){
    modShapePtslst=modShapePtslst+' '+modShapePts[a]['value'];
}

    $('scene').append('<Shape id="drawnShape'+click+'"><Appearance><Material emissiveColor="1 0 0"  transparency="'+$('#shape'+click).val()+'"/></Appearance><IndexedFaceSet convex="false" coordIndex="\''+coordIndex+' 0 -1\'"><Coordinate point="' + modShapePtslst + '"/></IndexedFaceSet></Shape>');

}

function acceptShape(click){
    
}