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

var b = 0;
var points = '';
var d = 0;
coords =[];
//Handle click on any group member
function handleGroupClick(event) {
    
    
    // number of times click function has run
    b++;    
    //Mark hitting point    
    var coordinates = event.hitPnt;
    var x = ((coordinates[0]) + .05);
    var y = (coordinates[1]);
    var z = (coordinates[2]);
    // an array with all the click coordinates. Each click adds to the arry
    // not using yet
    coords.push([ {
        'x': x, 'y': y, 'z': z
    }]);
    
    
    
    // if else sets the points variable to draw the shape
    // if first click
    if (b == 1) {
    // points = first xyz
        points = x + ' ' + y + ' ' + z
        // appends an empty div to the html
        $('#mainNav').append('<div id="inputShape"></div>');
    } 
    // if after first click
    else {
    // points variable adds to itself
        points = points + ' ' + x + ' ' + y + ' ' + z
        
    }
    // appends input x,y,z input boxes to the html
    $('#inputShape').append('<p>point '+b+'<br/>'+
    'x: <input type="number" id="xpoint'+b+'" value="'+x.toFixed(4)+'"/>'+
    'y: <input type="number" id="ypoint'+b+'" value="'+y.toFixed(4)+'"/>'+
    'z: <input type="number" id="zpoint'+b+'" value="'+z.toFixed(4)+'"/>'+
    '</p>')
    
    // if right click
    if (event.button == '2') {
       // inserts draw and delete buttons below x,y,z inputs
       // button goes to the drawShape function drawing a shape based on numbers in the input boxes. May have been altered by user
        $('#inputShape').append('<input type="submit" onclick="drawShape('+b+');" value="Draw Shape"/>');
        // deletes the drawn shape either user generated or click generated.
        $('#inputShape').append('<input type="submit" onclick="deleteShape('+b+');" value="Delete Shape"/>');
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
        $('scene').append('<Shape id="drawnShape'+b+'"><Appearance><Material emissiveColor="1 0 0"/></Appearance><IndexedFaceSet coordIndex="' + coordIndex + ' -1"><Coordinate point="' + points + '"/></IndexedFaceSet></Shape>');
        
        // zeroes out click counter
        b = 0;
    }
}
function drawShape(b){
// empties points variable
    points=''
    // removes previously drawn shape
    $('#drawnShape'+b).remove();
    // loops through number of clicks. Number of points to connect
    for (i = 1; i <= b; i++) {
    // variable containing a list of xyz points for the Coordinate paints
            points=points+' '+$('#xpoint'+i).val()+' '+$('#ypoint'+i).val()+' '+$('#zpoint'+i).val();
            // variable to determine order connecting points. Goes from lower left -> lower right -> upper right -> upper left
            coordIndex = coordIndex + ' ' + (i-1).toString();
        }
// Draws shape based on values in input boxes. May be user generated        
        $('scene').append('<Shape id="drawnShape'+b+'"><Appearance><Material emissiveColor="1 0 0"/></Appearance><IndexedFaceSet coordIndex="' + coordIndex + ' -1"><Coordinate point="' + points + '"/></IndexedFaceSet></Shape>');
}
// removes inserted drawn shape
function deleteShape(b){
    $('#drawnShape'+b).remove();
    console.log('worked')
}