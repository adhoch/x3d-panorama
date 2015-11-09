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
        jQuery('#overlay').css({'display':'inline'});
}