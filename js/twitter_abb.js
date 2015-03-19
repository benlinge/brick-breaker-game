$( document ).ready(function() {
    //returns score from local storage defined in scoreboard.js
    var score = localStorage.getItem('scores', 0);
    //encodeURIComponent ensures the correct encoding for URL parameters 
    var tweet = 'http://twitter.com/home?status='+encodeURIComponent('My Amazing Brick Breaker Score! ' + score + 'http://goo.gl/H2Q9gm');
    //Button set to a link and opens new window
    $( ".twitter-score" ).attr({
        href: tweet,
        target: "_blank"
    });
});

