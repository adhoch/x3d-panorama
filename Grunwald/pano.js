/* Front end x3d panorama javascript
 *  
 * 1. Button/Fullscreen functions
 *  a. Fullscreen exit detection
 *  b. Fullscreen button change
 *  c. Fullscreen button toggle
 *  d. Move left
 *  e. Move right
 *  f. Move up
 *  g. Move down
 *  h. Zoom
 * 2. Overlays
 *  a. Raw HTML overlays
 *  b. Omeka overlay
 * 
 */




//***1. Button/fullscreen functions



//****** 1a. Fullscreen exit detection
    //Listen for a change in full screen status
    document.addEventListener('webkitfullscreenchange', changeHandler, false);
    document.addEventListener('mozfullscreenchange', changeHandler, false);
    document.addEventListener('fullscreenchange', changeHandler, false);
    document.addEventListener('MSFullscreenChange', changeHandler, false);
    
    
//****** 1b. Fullscreen exit detection   
    //Runs when there's a change in full screen status however accomplished (ie keyboard or button)
    function changeHandler() {
        //sets the element to change the text of
        button = document.getElementById("fullscreen")
        //If the document is full screen changes the button text
        if (document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement != null) {
            button.innerHTML = "Unzoom";
            }
            //if the button isn't full screen changes the button text 
            else {
            button.innerHTML = "Full Screen";
        }
    }

//******* 1c. Fullscreen button toggle    
    //Full screen function. Also contains command to exit full screen
    function fullscreen(button) {
        //get the x3d node
        x3dcontext = document.getElementById('x3dcontext');
        // Check if in full screen
        if (document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement != null) {
            // Exits full screen in all browsers
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
     
     // if not in full screen
        } else {
            // Puts in full screen in all browsers
            if (x3dcontext.requestFullscreen) {
                x3dcontext.requestFullscreen();
            } else if (x3dcontext.mozRequestFullScreen) {
                x3dcontext.mozRequestFullScreen();
            } else if (x3dcontext.webkitRequestFullScreen) {
                x3dcontext.webkitRequestFullScreen();
            } else if (x3dcontext.msRequestFullscreen) {
                x3dcontext.msRequestFullscreen();
            }
        }
    }
    

//******** 1d. Move left
    //Move left -- takes distance to move as argument
    function left(move) {
        // Sets x as the x camera's rotation
        x = $('#xcamera').attr('rotation')
        // Changes from string to 4 numbers
        x=x.split(/[\s,]+/).map(Number);
        // Adds the movement left to the current rotation of the sphere
        x[3] = x[3] + move;
        // Assigns the movement to the x axis
        x[1] = 1;
        // Moves the x camera
        $('#xcamera').attr('rotation', x);
        
    }
    
//******** 1e. Move right    
    //Move right -- takes distance to move as argument
    function right(move) {
    // Sets x as the x camera's rotation
        x = $('#xcamera').attr('rotation')
        // Changes from string to 4 numbers
        x=x.split(/[\s,]+/).map(Number);
        // Subtracts the movement right to the current rotation of the sphere
        x[3] = x[3] - move;
        // Assigns the movement to the x axis
        x[1] = 1;
        // Moves the camera
        $('#xcamera').attr('rotation', x);    
    }


//******** 1f. Move up
    //Move up -- takes distance to move as argument
    function up(move) {
        // Sets y as the y camera's rotation
        y = $('#ycamera').attr('rotation')
        // Changes from a string to 4 numbers
        y=y.split(/[\s,]+/).map(Number);
        // Adds the movement up to the current rotation of the sphere
        y[3] = y[3] + move;
        // Assigns the movement to the y axis
        y[0] = 1;
        // Moves the camera
        $('#ycamera').attr('rotation', y);    
    }
    
    
//******** 1g. Move down
    //Move down -- takes distance to move as argument
    function down(move) {
        // Sets y as the y camera's rotation 
        y = $('#ycamera').attr('rotation')
        // Changes from a string to 4 numbers
        y=y.split(/[\s,]+/).map(Number);
        // Subtracts the movement down to the current rotation of the sphere
        y[3] = y[3] - move;
        // Assigns the movement to the y axis
        y[0] = 1;
        // Moves the camera
        $('#ycamera').attr('rotation', y);
        
    }
    
    
//******** 1h. Zoom    
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


//**** 2. Overlays


//****** 2a. Raw HTML overlays
// Creates and toggles the overlay when panorama is clicked takes an item# as an argument. This should be in the shape that calls it.
function overlayBraid() {
    // shows the overlay div
    jQuery('#overlay').css({
        'display': 'inline'
    });
    jQuery('#overlayContent').html('<h3>Braid of Hair - Date Unknown - Wylie House</h3> <p><img src="Images/Braid.jpg"/>THIS HAIR IS KEPT IN A DRAWER. The Wylie House has no record of the hair, but a boy who was visiting with his family for a tour of the museum several years ago who, as the tour was winding down, asked the tour guide about the lady on the stairs with the long braided hair. During the Victorian Era, hair was saved for sentimental reasons, to memorialized a loved one in mourning jewelry or hair wreaths. Hair was also a common material used for pin cushions and pillows. Very often, women would use excess hair to add volume to the large hair styles of the Victorian era. We do not know why this braid of hair from the Wylie House Museum was saved but it has an interesting association to a ghost story that’s been passed down. The story goes that several years ago a family was visiting the museum for a tour. On their way out, the young boy in the family asked the docent about the woman on the stairs. “What woman?” she replied. “The woman in the dress with the long braided hair,” he replied. Of course, there was no other woman in the house at the time but there are several other accounts of a woman in a long dress standing on the stairs, and this braid of hair remains housed in a dresser drawer in the master bedroom of the museum.</p> ')
}


function overlayCrucifix() {
    // shows the overlay div
    jQuery('#overlay').css({
        'display': 'inline'
    });
    jQuery('#overlayContent').html('<h4>Crucifix - Date 1982 <br/>Kahil Gibran - AMERICAN (1922-2008)<br/> Bronze and wood Edition 1/3<h4><h5>Gift of the Estate of Morton C. Bradley, Jr. Indiana University Campus Art Collection</h5><p><img style="max-width:25%;" src="Images/crucifix.jpg"/>Kahlil Gibran was a painter and sculpture from Boston Massachusetts. Gibran first received acclaimed in the late 1940’s when he exhibited with other young artists later known as the “Boston Expressionists”. Gibran studied under Karl Zerbe at the school of Museum and Fine Arts in Boston. He was talented in many media, including wood, wax, stone, welding and instrument making. The poet, Kahlil Gibran, author of The Prophet, was a cousin to both Gibran’s father and mother. In 1972, in an attempt to separate his identity from his famous cousin, Gibran and his wife, Jean wrote a biography of the poet entitled, KahlilGibran His Life and World.</p>')
}


function overlayBird() {
    // shows the overlay div
    jQuery('#overlay').css({
        'display': 'inline'
    });
    jQuery('#overlayContent').html('<h2>Cyprimus Caprio</h2><h3>Date of Collection: 7/30/1942 Department of Biology</h3><h3>Horned Puffin</h3><h3>Date of Collection: Unknown</h3> <h3>Department of Biology</h3><img src="Images/bird.jpg"/>')
}



//****** Omeka overlay
// Creates and toggles the overlay when panorama is clicked takes an item# as an argument. This should be in the shape that calls it.
function overlay(item) {

    // Goes to the item api to get the item description and title
    jQuery.getJSON("http://www.iub.edu/~lodzdsc/omeka-2.3.1/api/items/" + item, function (json) {
        for (var x = 0; x < json.element_texts.length; x++) {
            if (json.element_texts[x].element.name == 'Description') {
                description = (json.element_texts[x].text);
            }
            if (json.element_texts[x].element.name == 'Title') {
                title = (json.element_texts[x].text);
        
            }
        }
         // Goes to the file api to get the item thumbnail
    jQuery.getJSON("http://www.iub.edu/~lodzdsc/omeka-2.3.1/api/files?item=" + item, function (json) {
        image = json[0].filename;
        // puts together the url for the link to the item
        itemLink = "<a href=http://www.iub.edu/~lodzdsc/omeka-2.3.1/items/show/"+item+">View the item</a>"
        // inserts the thumbnail, title, and description into the overlay div
        jQuery('#overlayContent').html('<img src="files/original/'+image+'"/><h3>'+title+'</h3><p>'+description+'</p>'+itemLink);        
        // shows the overlay div
        jQuery('#overlay').css({'display':'inline'});
        
    })
   
    })

    
    
}