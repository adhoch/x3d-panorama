// function makes click and hold work for directional buttons
$(document).ready(function(){
blahblah=0;
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
  
}

// Catches a click on any individual direction button
$('.direction').mousedown(function() {
  // Reset to 150 to allow multiple mousedown/mouseup
  timeoutInterval = 150;
  //This allows the incrementAndWait function to run  
  mousedown = true;
  //Gets the direction of the button
  var direction=$(this).attr('id'); 
  // Runs the delay function that leads to movement
  window[incrementAndWait(direction)];
  
});

//When the mousekey is let up stops the increment function from firing
$(document).mouseup(function() {
  mousedown = false;
})
})


//Move left -- Gets rotation from the xcamera transform in the html x3d, takes distance to move as argument
function left(move) {
    x = $('#xcamera').attr('rotation').split(/[\s,]+/).map(Number);
    x[3] = x[3] + move;
    x[1] = 1;
    $('#xcamera').attr('rotation', x);
    
    
}

//Move right -- Gets rotation from the xcamera transform in the html x3d, takes distance to move as argument
function right(move) {
    x = $('#xcamera').attr('rotation').split(/[\s,]+/).map(Number);
    x[3] = x[3] - move;
    x[1] = 1;
    $('#xcamera').attr('rotation', x);
    
    
}

//Move up -- Gets rotation from the ycamera transform in the html x3d,  takes distance to move as argument
function up(move) {
    y = $('#ycamera').attr('rotation').split(/[\s,]+/).map(Number);
    y[3] = y[3] + move;
    y[0] = 1;
    $('#ycamera').attr('rotation', y);
    
}

//Move down -- Gets rotation from the ycamera transform in the html x3d,  takes distance to move as argument
function down(move) {
    y = $('#ycamera').attr('rotation').split(/[\s,]+/).map(Number);
    y[3] = y[3] - move;
    y[0] = 1;
    $('#ycamera').attr('rotation', y);
    console.log(move);
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
    } else {
        vpt.fieldOfView = parseFloat(vpt.fieldOfView) + delta;
    }
}

// for a counter used for getting point number
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
    
    //Mark hitting point, get the x,y,z coordinates respectively
    var coordinates = event.hitPnt;
    var x = (coordinates[0]);
    var y = (coordinates[1]);
    var z = (coordinates[2]);
    
    /* Takes the x, y, or z coordinate closest to the edge of the sphere(largest #) and subtracts .05m from it.
    This can lead to some distortion from the point clicked. It's neccesary to get the shape entirely
    in the sphere. It is as small as possible while working for most locations in the sphere. May have
    to manually adjust points in some areas to get the shape entirely in the sphere
    */
    if (Math.abs(x) > Math.abs(y) && Math.abs(x) > Math.abs(z)) {
        if (x > 1) {
            x = x -.05
        } else {
            x = x + .05
        }
    } else if (Math.abs(y) > Math.abs(x) && Math.abs(y) > Math.abs(z)) {
        if (y > 1) {
            y = y -.05
        } else {
            y = y + .05
        }
    } else {
        if (z > 1) {
            z = z -.05
        } else {
            z = z + .05
        }
    }
    // an array with all the click coordinates. Each click adds to the arry
    // not using yet
    coords.push([ {
        'x': x, 'y': y, 'z': z
    }]);
    
    // appends input x,y,z input boxes to the html with an id of the axis+click#
    $('#inputShape').append('<p> point ' + b + '<br/>' +
    'x: <input type="number" id="xpoint' + b + '" value="' + x.toFixed(2) + '"/>' +
    'y: <input type="number" id="ypoint' + b + '" value="' + y.toFixed(2) + '"/>' +
    'z: <input type="number" id="zpoint' + b + '" value="' + z.toFixed(2) + '"/>' +
    '</p>')
    
    // if a line exists in the x3d. This should happen on the 3rd point of a shape. Puts the "Draw shape" button in the html
    if ($('#firstLine').length > 0) {
    //deletes any existing draw shape button
        $('#drawShapeBut').remove();
        // gets the first point of the shape
        firstPoint = $('#firstPoint').find('Coordinate').attr('point');
        // gets the first four digits of the previous points in the shape. Each set of points is 15 characters long
        points = points + ' ' + x.toFixed(4) + ' ' + y.toFixed(4) + ' ' + z.toFixed(4)
        // string version of points
        pointToShape = points.toString();
        // Inserts a draw shape button that calls the drawShape function. Arguments are the #of points, the coordinate points, and the shape#
        $('#inputShape').append('<input id="drawShapeBut" type="submit" onclick="drawShape(' + points.replace(/\D/g, '').length / 15 + ', \'' + pointToShape.toString() + '\',+' + b + ');" value="Draw Shape"/>');
        // Deletes the point and replaces with an x3d line
        $('#firstLine').replaceWith("<Shape id='firstLine'>" +
        "<Appearance><Material emissiveColor='.76 0 .38' ambientintensity='1' diffusecolor='1 .72 .39'/></Appearance><LineSet vertexCount='" +(points.replace(/\D/g, '').length / 15 + 4) + "' containerField='geometry'><Coordinate DEF='TurnPoints' point='" + firstPoint + " " + points + " " + firstPoint + "'/>" +
        "</PointSet></Shape>");
    }
    
    // if there is no line and there is a point draw a line. This should happen on the 2nd point of a shape
    if ($('#firstLine').length == 0 && $('#firstPoint').length > 0) {
        //gets the location of the first point
        firstPoint = $('#firstPoint').find('Coordinate').attr('point');
        // gets the location of the second point
        points = points + ' ' + x.toFixed(4) + ' ' + y.toFixed(4) + ' ' + z.toFixed(4)
        // draws an x3d line between the two points
        $('scene').append("<Shape id='firstLine'>" +
        "<Appearance><Material emissiveColor='.76 0 .38' ambientintensity='1' diffusecolor='1 .72 .39'/></Appearance><LineSet vertexCount='" +(points.replace(/\D/g, '').length / 15) + "' containerField='geometry'><Coordinate DEF='TurnPoints' point='"  + points + "'/>" +
        "</LineSet></Shape>");        
    }
    
    
    // Draws a point at the place clicked. Should only happen on the first click of a shape
    if ($('#firstPoint').length < 1) {
        // gets the first four digits of the x,y,z coordinates
        points = x.toFixed(4) + ' ' + y.toFixed(4) + ' ' + z.toFixed(4)
        //draws the point in the x3d. Needs more than 1 point
        $('scene').append("<Shape id='firstPoint'>" +
        "<Appearance><Material emissiveColor='.76 0 .38' ambientintensity='1' diffusecolor='1 .72 .39'/></Appearance><PointSet><Coordinate DEF='TurnPoints' point='" + points + " " + points + "'/>" +
        "</PointSet></Shape>");
    }
  
}


//counter for number of drawn shapes
drawn = 0;
// b is number of points, points is xyz coordinates, click is the click numbers of the points
function drawShape(b, points, click) {
    //counter increase
    drawn++;
    //if it's the no "shapeInputCont#" div (no previous drawn shape) creates one and throws all points into it
    if ($('div[id*="shapeInputCont"]').length == 0) {
        $('#inputShape').children().wrapAll('<div id="shapeInputCont' + click + '">');
    }
    /* if more shapeInputCont# exists  checks for points below it and adds them to a
    / new shapeInputCont#*/ else {
        $("div[id*='shapeInputCont']").last().nextAll().wrapAll('<div id="shapeInputCont' + click + '">');
    }
    // Throws the shape number above the drawn shape points. Number includes deleted shapes
    $("div[id*='shapeInputCont']").last().prepend('Shape: ' + drawn + '<br/>');
    // empties points variable
    // removes previously drawn shape
    // loops through number of clicks. Number of points to connect
    
    coordIndex = ''
    for (i = 1; i <= b; i++) {
        // variable containing a list of xyz points for the Coordinate paints;
        // variable to determine order connecting points. Goes from lower left -> lower right -> upper right -> upper left
        coordIndex = coordIndex + ' ' + (i -1).toString();
    }
    
    // Creates transparency, color, delete, modify and accept shape buttons
    $('#shapeInputCont' + click).append('Transparency(0-1)<br/><input id="shape' + click + 'tran" type="number" value="0"/><br/>');
    $('#shapeInputCont' + click).append('Color<br/><input id="shape' + click + 'difCol" type="text" value="1 1 1"/><br/>');
    $('#shapeInputCont' + click).append('<input type="submit" onclick="modifyShape(' + click + ', \'' + coordIndex + '\');" value="modify Shape"/>');
    $('#shapeInputCont' + click).append('<input type="submit" onclick="deleteShape(' + click + ');" value="Delete Shape"/>');
    $('#shapeInputCont' + click).append('<input type="submit" onclick="acceptShape(' + click + ');" value="Accept Shape"/>');
    
    // Draws shape based on values in input boxes. May be user generated with modify shape
    $('scene').append('<Shape id="drawnShape' + click + '"><Appearance><Material emissiveColor="1 1 1"/></Appearance><IndexedFaceSet solid="false" creaseAngle="3.14" convex="false" coordIndex="' + coordIndex + ' 0 -1"><Coordinate point="' + points + '"/></IndexedFaceSet></Shape>');
    // Throws code for the drawn shape into the console.
    /******Eventually want this to go to a file after accept shape*********/
    console.log('<Shape id="drawnShape' + click + '"><Appearance><Material emissiveColor="1 1 1"/></Appearance><IndexedFaceSet creaseAngle="3.14" solid="false" convex="false" coordIndex="' + coordIndex + ' 0 -1"><Coordinate point="' + points + '"/></IndexedFaceSet></Shape>');
    b = 0;
    
    
    //removes the draw shape button the first point and the first line
    $('#drawShapeBut').remove();
    $('#firstLine').remove();
    $('#firstPoint').remove();
}

// removes previously inserted drawn shape and all related content 
function deleteShape(b) {
    $('#drawnShape' + b).remove();
    $('#firstLine').remove();
    $('#firstPoint').remove();
    $('#shapeInputCont' + b).remove();
}

// Redraws the shape from the values in the input boxes
function modifyShape(click, coordIndex) {
// deletes existing shape
    $('#drawnShape' + click).remove();
    //empties out existing variable
    modShapePtslst = '';    
    // gets all the points
    modShapePts = $("div[id='shapeInputCont" + click + "']").find('input[type="number"][value]');
    // throws all the points into a list
    for (a = 0; a < modShapePts.length; a++) {
        modShapePtslst = modShapePtslst + ' ' + modShapePts[a][ 'value'];
    }
    //Redraws the shape. click is the shape#
    $('scene').append('<Shape id="drawnShape' + click + '"><Appearance><Material diffuseColor="' + $('#shape' + click + 'difCol').val() + '"  transparency="' + $('#shape' + click + 'tran').val() + '"/></Appearance><IndexedFaceSet convex="false" coordIndex="\'' + coordIndex + ' 0 -1\'"><Coordinate point="' + modShapePtslst + '"/></IndexedFaceSet></Shape>');
      // Throws code for the drawn shape into the console. Gets the values from the input boxes
    /******Eventually want this to go to a file after accept shape*********/  
    console.log('<Shape id="drawnShape' + click + '"><Appearance><Material diffuseColor="' + $('#shape' + click + 'difCol').val() + '"  transparency="' + $('#shape' + click + 'tran').val() + '"/></Appearance><IndexedFaceSet convex="false" coordIndex="\'' + coordIndex + ' 0 -1\'"><Coordinate point="' + modShapePtslst + '"/></IndexedFaceSet></Shape>');
}


//Button not really functional right now. Throws the code for the shape to the console and prints it in the html. Print currently invisible with css. Eventually should go to a file
function acceptShape(click) {
    console.log($('#drawnShape' + click)[0].outerHTML);
    var shapeHtml = String($('#drawnShape' + click)[0].outerHTML);
    $('#mainNav').append('<p>&gt;Shape id="' + click + '"&lt;' + $('#drawnShape' + click).html() + '"&gt;/Shape&lt;</p>')
}


