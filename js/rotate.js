$(function() {
    var $rota = $('#glowball'),//variable returns the image id.
        degree = 0,//No starting degree angle
        timer;//Timer included.
    function rotate() {//The rotate function
        $rota.css({ transform: 'rotate(' + degree + 'deg)'});//uses the rotate and deg functions from the api to add styles for the image to rotate.
        timer = setTimeout(function() {//timeout function to increase the degree turn of the image.
            ++degree;//increments the degree angle.
            rotate();//function called again which then loops the  process
        },25);
    }
    rotate();//calls the function on load
});