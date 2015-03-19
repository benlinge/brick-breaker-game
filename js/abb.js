<!--Hides Code on old browsers

//Time Variables
var timer = null//The timer variable and is set to null to start at 0.
var milliseconds = 35//This variable will be applied to the timer function to reduce score by 35 milliseconds continiously as the game in progressing.
var time = 0//time

//Load Variables
var gameLoaded = 0//Variable set to determine whether the game is loaded on the page.
var gameStart = 0//Variable set to determine whether the game has started and is applied to the S key to start.
var miss=0//Variable set to determine whether the ball has gone passed the racket.
var endGame = 0//Variable set to determine when the game is to end.

//Block Variables
var brickColour = new Array(5)//block colour array
var brickStatus = new Array(40)//array for block to change colour when hit depending on level and disappear so the ball doesn't hit it again.
var blockRemove = 0//remove the block when hit or hit consecutive amount of times.

//Ball variables.
var ballX = 0//Margin above ball
var ballY = 0//Margin left of ball
var ballDX = 0//X doubled
var ballDY = 0//Y doubled
var ballNumber = 3//Number of balls left

//Racket variables
var rackMargin = 193//Margin to left of racket
var keyPress = 0//Keypresses
var keyPressTwo = 0//Second keypress variable for accelerated racket movements

//Array of block colours defined.
brickColour[0]="#0F0"//fifth layer, one hit then turns it to fourth layer
brickColour[1]="#0F6"//fourth layer, one hit then turns it to third layer
brickColour[2]="#0F9"//third layer, one hit then turns it to second to last layer
brickColour[3]="#0FC"//Second to last layer, one hit then turns it to last layer
brickColour[4]="#0FF"//Last layer, one hit to destroy
brickColour[5]="#666"//When block is destroyed

var ie=0//internet explorer
var n4FLG=0//netscape navigator
if (document.all){//if internet explorer get id element function
 ie=1//It will be ie format
}else{//Else use .document.getElementById as used by most borwsers
 if (document.getElementById){
  n4FLG=0
 }else{//If none, then netscape navigator 4 
  n4FLG=1
 }
}

//MAIN FUNCTION
function mainFunction(){//The main function
 	clearTimeout(timer)//Clears the timer for when a game had been played before.
 	time = time + 1//Time added by one
	//with adds the another statement to the chain. This uses math floor to round to nearest integer, but then divided by 10 to get the time in its first decimal place.
 	with (Math){tmptime = floor(time / 10)} 
 	timeDecimal = ""//the decimal
	//the time divided by 10  
 	timeSecond = time / 10
 	if (time == tmptime * 10){//IF the time is a second exactly
		timeDecimal = ".0"//Then the decimal is 0
	}
 	ballX = ballX + ballDX//Ball x axis doubled (margin left of ball)
 	ballY = ballY + ballDY//Ball y axis doubled (margin above ball)
 	wallRackBounce()//sub function called including wall and racket bounces
 	blockBounce()//sub function called including block bounces
 	if (document.getElementById){//IF this method is available on browser, then
  		document.summary.seconds.value = timeSecond + timeDecimal//adds time and decimal together and displays it in the "summary" named form as the "value" in the "seconds" named input.
  		document.summary.destroyed.value = blockRemove//displays the blocks destroyed in the "summary" named form as the "value" in the "destroyed" named input.
  		document.summary.score.value = blockRemove * 200 - time//multiplies the blocks destroyed by 200 and takes the time away from the score value continiously in the "summary" named form as the "value" in the "score" named input.
  		document.getElementById("ball").style.top =  ballY//Returns the margin properties above the ball.
  		document.getElementById("ball").style.left = ballX//Returns the margin properties to the left of the ball.
 	}else{//ELSE other browsers.
  		if (ie==1){//IF internet explorer.
   			document.summary.seconds.value = timeSecond + timeDecimal//adds time and decimal together and displays it in the "summary" named form as the "value" in the "seconds" named input.
   			document.summary.destroyed.value = blockRemove//displays the blocks destroyed in the "summary" named form as the "value" in the "destroyed" named input.
   			document.summary.score.value = blockRemove * 200 - time//multiplies the blocks destroyed by 200 and takes the time away from the score value continiously in the "summary" named form as the "value" in the "score" named input.
   			ball.style.posTop = ballY//Returns the margin properties above the ball.
   			ball.style.posLeft = ballX//Returns the margin properties to the left of the ball.
  		}else{//ELSE for netscape navigator 4.
   			document.layers["info"].document.forms[0].seconds.value = timeSecond + timeDecimal//adds time and decimal together and displays it in the "summary" named form as the "value" in the "seconds" named input.
   			document.layers["info"].document.forms[0].destroyed.value = blockRemove//displays the blocks destroyed in the "summary" named form as the "value" in the "destroyed" named input.
   			document.layers["info"].document.forms[0].score.value = blockRemove * 200 - time//multiplies the blocks destroyed by 200 and takes the time away from the score value continiously in the "summary" named form as the "value" in the "score" named input.
   			document.layers["ball"].moveTo(ballX,ballY)//Returns the margin properties to the left and above the ball.
  		}
 	}
 	racketMove()//sub function called including the racket movements
 		if (gameStart == 1){//IF the game has started
			timer = setTimeout("mainFunction()",milliseconds)//The timer starts using this functions and applys the value to the variable.
		}
}

//SUB FUNCTIONS
//game start
function initG(){//initial game mechanics
  	keyPress=0//no key presses needed
 	if (endGame == 0){//no end game 
  		endGame = 1//end game set to 1 to reset form
  		blockRemove = 0//block colours set to original colours
  		time = 0//time set to 0
  		ballNumber = 3//balls left set to 3
		//with adds the another statement to the chain. This uses math floor to round to nearest integer, but then divided by 10 to get the time in its first decimal place.
  		with (Math){tmptime = floor(time / 10)}
  		if (document.getElementById){//IF this method is available on browser, then
   			document.summary.seconds.value = tmptime//returns the value of the seconds input area and sets it to the tmptime variable as it is already defined that the Seconds and Decimals are merged.
   			document.getElementById("ovrmes").style.top =- 1000//returns the game over message and displays it a specific distance from the top.
   			document.getElementById("clrmes").style.top =- 1000//returns the game clear message and displays it a specific distance from the top.
  		}else{//other browsers
  		 	if (ie == 1){//IF internet explorer.
    			document.summary.seconds.value = tmptime//Sets the value to tmptime.
    			clrmes.style.top =- 1000//returns the game clear message and displays it a specific distance from the top.
    			ovrmes.style.top =- 1000//returns the game over message and displays it a specific distance from the top.
   			}else{//ELSE for netscape navigator 4.
    			document.layers["info"].document.forms[0].seconds.value = tmptime//Sets the value to tmptime
    			document.layers["ovrmes"].visibility = "HIDE"//returns the game over message and displays it a specific distance from the top.
    			document.layers["clrmes"].visibility = "HIDE"//returns the game clear message and displays it a specific distance from the top.
   			}
  		}
		//Starting brick status'
  		for (ib=0; ib<5; ib++){//Loops to change the colour of the blocks when hit. 5 rows
			for (ia=0; ia<8; ia++){//Loop for all additional hits to blocks
   				tmpIDn = ib * 8 + ia + 1//Number each individual block and additional hits
   				if (document.getElementById){//IF this method is available on browser, then
    				document.getElementById(tmpIDn).style.backgroundColor = brickColour[ib]//returns tmpIDn as the temporary number calculated
   				}else{//other browsers
    				if (ie == 1){//IF internet explorer.
     					document.all(tmpIDn + 9).style.backgroundColor = brickColour[ib]//returns tmpIDn as the temporary number calculated
    				}else{//ELSE for netscape navigator 4.
     					document.layers[tmpIDn].bgColor = brickColour[ib]//returns tmpIDn as the temporary number calculated
    				}
   				}
   				brickStatus[ib * 8 + ia] = ib//block status set to ib and defines which value within the array the block is.
  			}		
  		}
	}
 	if (document.getElementById){//IF this method is available on browser, then
  		document.summary.ballsleft.value = ballNumber//returns the ballsleft input and sets the value as the ballNumber value on the variable
  		document.getElementById("starter").style.top =- 1000//returns the starter element and positions this accordingly from the top
 	}else{//other browsers
  		if (ie == 1){//IF internet explorer
   			document.summary.ballsleft.value = ballNumber//returns the ballsleft input and sets the value as the ballNumber value on the variable
   			starter.style.top =- 1000//returns the starter element and positions this accordingly from the top
  		}else{//IF netscape Navigator 4
   			document.layers["info"].document.forms[0].ballsleft.value = ballNumber//returns the ballsleft input and sets the value as the ballNumber value on the variable
   			document.layers["starter"].visibility = "HIDE"//returns the starter element and positions this accordingly from the top
  		}
 	}
 	gameStart = 1; gameLoaded = 1//returns that game started and game loaded variables are set to 1 for it to begin
 	ballX = 209;ballY = 270; ballDX =- 5; ballDY =- 8; rackMargin = 193; miss = 0//returns ball position of Xa and Y, ball direction, ball speed, racket position and that there are no misses at the start of the game.
 	timer = setTimeout("mainFunction()",milliseconds)//Returns the timer should start using this functions and applys the value to the variable.
}


//key commands
function keyDown(DnEvents){//Function for when keys are pressed down
 	if (ie == 0){//IF internet Explorer
  		k = DnEvents.which//internet explorer keycode method
 	}else{//Other browsers
 	 	k = window.event.keyCode//Keycodes for the keyboard commands are called
 	}
  	if (k == 39){keyPress = 5}//Right arrow Key. Move right five pixels
  	if (k == 102){keyPress = 5}//Right arrow Key. Move right five pixels
  	if (k == 37){keyPress =- 5}//Left arrow Key. Move left five pixels
  	if (k == 100){keyPress =- 5}//Left arrow Key. Move left five pixels
  	if (k == 38){if (gameStart == 0){initG()}}//Start with S and calls the start game function
}
//Function for when keys are let go
function keyUp(UpEvents){//This is needed so that the racket doesn't keep moving left or right after letting go of the keys.
 	if (ie == 0){//IF internet Explorer
  		k = UpEvents.which//internet explorer keycode method
 	}else{//Other browsers
  		k = window.event.keyCode//Keycodes for the keyboard commands are called
 	}
  	if (k == 102){keyPress = 0}//Right arrow Key
  	if (k == 39 ){keyPress = 0}//Left arrow Key
  	if (k == 100){keyPress = 0}//Right arrow Key
  	if (k == 37 ){keyPress = 0}//Left arrow Key
}

//racket movements
function racketMove(){
 	if (gameLoaded == 1) {//IF the game has loaded
  		if (keyPress != 0) {//IF there was not 0 keys pressed.
   			tmpkeyPress = keyPress * keyPressTwo//multiply both values together to create another keypress variable
   			if (tmpkeyPress >= 0) {//IF key press is greater or equal to 0
    			if (keyPressTwo != 0) {//IF keypress is not equal to 0
     				if (Math.abs(keyPressTwo) < 15) {//Math.abs returns the actual value of the keypress. In this case, IF the value (time key is pressed in milliseconds) is large than 15 millseconds.
						keyPressTwo = keyPressTwo * 1.25//THEN it will multiply the two keypresses to accelerate the speed of the racket by 1.2 every 15 milliseconds.
					}
    			}else{//ELSE moves at normal speed when not pressed for a long enough duration
    				keyPressTwo = keyPress
    			}
   			}else{//ELSE moves at normal speed when not pressed for a long enough duration
   				keyPressTwo = keyPress
   			}
  		}else{//ELSE second keypress variable is set to 0.
   			keyPressTwo = 0
  		}
		
  		rackMargin = rackMargin + keyPressTwo//variable set to set the racket to not go a further distance than the gamewindow
  		if (rackMargin < 20) { rackMargin = 20 }//IF the movement creates a margin of less than 20 to the left, then it is set to a minimum of 20
  		if (rackMargin > 375) { rackMargin = 375 }//IF the movement creates a margin of more than 375 to the left, then it is set to a maximum of 375
  		if (document.getElementById) {//IF this method is available on browser, then
   			document.getElementById("racket").style.left = rackMargin//returns the racket element and left property to set position. This is used for the above calculations.
  		}else{//ELSE for other browsers
   			if (ie == 1) {//IF internet explorer.
    			racket.style.left = rackMargin//returns the racket element and left property to set position. This is used for the above calculations.
   			}else{//ELSE for netscape navigator 4.
    			document.layers["racket"].left = rackMargin//returns the racket element and left property to set position. This is used for the above calculations.
   			}
  		}
 	}
}

//ball bounce on wall and racket
function wallRackBounce(){//function for wall and racket bounce
 	if (ballX < 16){ballX = 32 - ballX; ballDX =- ballDX}//IF ball hits left side of game window then it bounces 
 	if (ballX > 401){ballX = 802 - ballX; ballDX =- ballDX}//IF ball hits right side of game window then it bounces 
 	if (ballY < 16){ballY = 32 - ballY; ballDY =- ballDY}//IF ball hits top of game window then it bounces 
 		if (ballY >= 272){//IF ball hits bottom of game window then it is a miss 
  			if (miss == 0){//IF it is not a miss
			//then this cacluation determines the distance to the wall by the direction double divided by the x and y axis and then multiplied by the width minus the single y axis determines the movement up. A final addition adds the single x axis value to the answer to determine the sideways movement.
   				tmpX = (ballDX/ballDY)*(272 - ballY) + ballX
   				if (tmpX >= rackMargin - 12){//Works out the distance to the racket margin
    				if (tmpX <= rackMargin + 42){//Works out the distance to the racket margin
     					ballY = 272; ballDY =- ballDY//Distance from racket to top of window
     					ballX = tmpX//x axis now set to the previous distance calculated.
     					ballRD = tmpX - rackMargin//Distance from wall set to variable to resemble rotation and distance
						//returns the absolute value to work out x axis distance to wall
     					with (Math){ballDX = 8 * abs(ballDX) / ballDX}
						//Rotation distances. 8 possible directions
     					if (ballRD <- 4){ballDX =- 15}
     					if (ballRD > 36){ballDX = 15}
     					if (ballRD >= 14){if (ballRD <= 16){ballDX =- 2}}
     					if (ballRD >= 17){if (ballRD <= 20){ballDX = 2}}
     					if (ballRD >= 0){if (ballRD <= 4){ballDX =- 4}}
     					if (ballRD >= 28){if (ballRD <= 32){ballDX = 4}}
     					if (ballRD >=- 4){if (ballRD <=- 1){ballDX =- 11}}
     					if (ballRD >= 33){if (ballRD <= 36){ballDX = 11}}
    				}
   				}
  				if (ballDY > 0){miss = 1}//adds a miss to the variable.
  			}else{//If the balls went past the racket margin defined 
  				if (ballY > 290){miss = 0; ballNumber = ballNumber - 1; gameEnd()}//takes a ball from the balls numbered and resets the game.
  			}
 		}
}

//ball bounce off blocks
function blockBounce(){//function to allow the ball to bounce of the blocks
	tmpY = ballY + 4; tmpX = ballX + 4//Four sides defined and with new x and y variables that will define the distance min/max disatnce from top and left
 	if (tmpY >= 48){//IF distance from top is greater than 48
	if (tmpY <= 147){//IF distance from top is less than than 147
	if (tmpX >= 29){//IF distance from left is greater than 29
	if (tmpX <= 396){//IF distance from left is less than 396
  		with (Math) {//return value of minimum positions from top and left with calculated block colours changes when colided.
   			ia = floor((tmpX - 29) / 46); ib = floor((tmpY - 48) / 20); ic = ib * 8 + ia
  		}
  		if (brickStatus[ic] <= 4){//IF brick starus is less than or equal to 4 (max layer)
   			tmpbc = brickStatus[ic] + 1//Adds one to each value of the array so that when hit, the brick will turn into the next value
   			brickStatus[ic] = tmpbc//Set to variable
   			tmpIDnc = ic + 1//Number added one for each brick status
   			if (document.getElementById){//IF this method is available on browser, then
    			document.getElementById(tmpIDnc).style.backgroundColor = brickColour[tmpbc]//returns value of the background colours to be displayed on the bricks when they hit and the array value of the brick changes.
   			}else{//other browsers
    			if (ie == 1){//IF internet explorer
     				document.all(tmpIDnc + 9).style.backgroundColor = brickColour[tmpbc]//returns value of the background colours to be displayed on the bricks when they hit and the array value of the brick changes.
    			}else{//netscape navigater 4
     				document.layers[tmpIDnc].bgColor = brickColour[tmpbc]//returns value of the background colours to be displayed on the bricks when they hit and the array value of the brick changes.
    			}
   			}
   			if (tmpbc == 5){blockRemove = blockRemove + 1}//IF the hit brick sets the brick array to value 5, it will remove the block so it is not hit.
   			if (blockRemove >= 40){gameEnd()}//IF all blocks are removed, the gameEnd function will be called, displaying congratulations.
   			if (ballDX > 0){//IF ball double x axis is more than 0
			//divide double x and y axise and multiply the answer by the brick hit box (height + width) added together multiplied by the brick hit (ai or ib depending on top/bottom or sides) minus one new axis (depending on direction). the answer is added to the new opposing axis to work out the direction
    			iy = (ballDY / ballDX)*(29 + 46 * ia - tmpX) + tmpY
    			if (iy > 48 + 20 * ib + 18){
     				tmpY1 = 48 + 20 * ib + 18
     				tmpX1 = (ballDX / ballDY)*(48 + 20 * ib + 18 - tmpY) + tmpX  
     				ballX = tmpX1 - 4; ballY = tmpY1 - 4
     				ballDY =- ballDY
    			}else{
    	 			if (iy < 44 + 20 * ib){
      					tmpY1 = 48 + 20 * ib
      					tmpX1 = (ballDX / ballDY) * (48 + 20 * ib - tmpY) + tmpX  
      					ballX = tmpX1 - 4; ballY = tmpY1 - 4
      					ballDY =- ballDY
     				}else{
     			 		tmpX1 = 29 + 46 * ia
      					tmpY1 = (ballDY / ballDX)*(29 + 46 * ia - tmpX) + tmpY
      					ballX = tmpX1 - 4; ballY = tmpY1 - 4
      					ballDX =- ballDX
     				}
    			}
   			}else{
    			iy = (ballDY / ballDX)*(29 + 46 * ia + 44 - tmpX) + tmpY
    			if (iy > 48 + 20 * ib + 18){
     				tmpY1 = 48 + 20 * ib + 18
     				tmpX1 = (ballDX / ballDY)*(48 + 20 * ib + 18 - tmpY) + tmpX  
     				ballX = tmpX1 - 4; ballY = tmpY1 - 4
     				ballDY =- ballDY
    			}else{
     				if (iy < 44 + 20 * ib){
      					tmpY1 = 48 + 20 * ib
      					tmpX1 = (ballDX / ballDY)*(48 + 20 * ib - tmpY) + tmpX  
      					ballX = tmpX1 - 4; ballY = tmpY1 - 4
      					ballDY =- ballDY
     				}else{
      					tmpX1 = 29 + 46 * ia + 44
      					tmpY1 = (ballDY / ballDX)*(29 + 46 * ia + 44 - tmpX) + tmpY
      					ballX = tmpX1 -4; ballY = tmpY1 -4
      					ballDX =- ballDX
     				}
    			}
   			}
 	 	}
 }}}}
}

//When the current game will stop
function gameEnd(){
 	gameStart=0//game hasn't started
 	gameLoaded=0//score havn't started
 		if (document.getElementById){//IF this method is available on browser, then
  			document.summary.ballsleft.value = ballNumber//returns ballnumber value
  			document.getElementById("starter").style.top = 200//returns and displays the instructions in defined position.
  			if (blockRemove >= 40){//IF all blocks are destroyed
   				document.getElementById("clrmes").style.top = 150//returns and displays the congratulations message
   				endGame = 0//doesn't reset game. So the game is in paused state
  			}
  			if (ballNumber <= 0){//IF there are no balls left
   				document.getElementById("ovrmes").style.top = 160//returns and displays the game over message
   				endGame = 0//doesn't reset game. So the game is in paused state
  			}
 			}else{
  				if (ie == 1){//IF internet explorer
   					document.summary.ballsleft.value = ballNumber//returns ballnumber value
   					starter.style.top = 200//returns and displays the instructions in defined position.
   					if (blockRemove >= 40){//IF all blocks are destroyed
    					clrmes.style.top = 150//returns and displays the congratulations message
    					endGame=0//doesn't reset game. So the game is in paused state
   					}
   					if (ballNumber <= 0){//IF there are no balls left
    					ovrmes.style.top = 160//returns and displays the game over message
    					endGame = 0//doesn't reset game. So the game is in paused state
   					}
  				}else{//IF netscape navigator 4
   					document.layers["info"].document.forms[0].ballsleft.value=ballNumber//returns ballnumber value
   					document.layers["starter"].visibility="SHOW"//returns and displays the instructions in defined position.
   				if (blockRemove >= 40){//IF all blocks are destroyed
    				document.layers["clrmes"].visibility="SHOW"//returns and displays the congratulations message
    				endGame = 0//doesn't reset game. So the game is in paused state
   				}
   				if (ballNumber <= 0){//IF there are no balls left
    				document.layers["ovrmes"].visibility="SHOW"//returns and displays the game over message
    				endGame = 0//doesn't reset game. So the game is in paused state
   				}
  			}
 		}
}


//The initial event called within the body tag of the html file.
function onLD(){//onload function
	document.onkeydown = keyDown//key down variable created
 	document.onkeyup = keyUp//key up variable created

 	if (document.getElementById){//For most browsers, they will use this to get the elements using id
  		document.getElementById("starter").style.top=200//Gets the starter element from the html file and positions it
  		document.getElementById("info").style.top=16//Gets the info element from the html file and positions it
 	}else{
  		if (ie==1){//For internet explorer
   			starter.style.top=200//Styles the positioning of the starter element
   			info.style.top=16//Styles the positioning of the info element
  		}else{//other browsers
   			document.layers["starter"].visibility="SHOW"//Makes the starter the element visible for other browsers
  		}
 	}//For netscape navigator 4
 	if (n4FLG!=0){
		document.captureEvents(Event.KEYDOWN|Event.KEYUP)//Specifies the type of events that should be passed and are the keydown and keyup events
	}
}

/* Colour Themes */

function redFunction(){//Changes the elements border colours, background colours, shadows and font family
	document.getElementById("gamewindow").style.boxShadow="0px 0px 10px 15px #C00";
	document.getElementById("gamewindow").style.borderColor="#C00";
	document.getElementById("racket").style.boxShadow="0px 0px 15px 10px #C00";
	document.getElementById("racket").style.backgroundColor="#C00";
	document.getElementById("racket").style.borderColor="#000";
	document.getElementById("ball").style.backgroundColor="#900";
	document.getElementById("ball").style.boxShadow="0px 0px 3px 2px #C00";
	document.body.style.borderColor="#C00";
}
function naturalFunction(){//Changes the elements border colours, background colours and shadows 
	document.getElementById("gamewindow").style.boxShadow="0px 0px 10px 15px #0FF";
	document.getElementById("gamewindow").style.borderColor="#0FF";
	document.getElementById("racket").style.boxShadow="0px 0px 15px 10px #0FF";
	document.getElementById("racket").style.backgroundColor="#0FF";
	document.getElementById("racket").style.borderColor="#C00";
	document.getElementById("ball").style.backgroundColor="#0C3";
	document.getElementById("ball").style.boxShadow="0px 0px 3px 2px #0FF";
	document.body.style.borderColor="#0F0";
}
function goldFunction(){//Changes the elements border colours, background colours and shadows 
	document.getElementById("gamewindow").style.boxShadow="0px 0px 10px 15px #FC0";
	document.getElementById("gamewindow").style.borderColor="#FC0";
	document.getElementById("racket").style.boxShadow="0px 0px 15px 10px #FC0";
	document.getElementById("racket").style.backgroundColor="#FC0";
	document.getElementById("racket").style.borderColor="#C00";
	document.getElementById("ball").style.backgroundColor="#FC0";
	document.getElementById("ball").style.boxShadow="0px 0px 3px 2px #FF0";
	document.body.style.borderColor="#FC0";
}
function purpleFunction(){//Changes the elements border colours, background colours and shadows 
	document.getElementById("gamewindow").style.boxShadow="0px 0px 10px 15px #93F";
	document.getElementById("gamewindow").style.borderColor="#93F";
	document.getElementById("racket").style.boxShadow="0px 0px 15px 10px #93F";
	document.getElementById("racket").style.backgroundColor="#93F";
	document.getElementById("racket").style.borderColor="#0FF";
	document.getElementById("ball").style.backgroundColor="#F3F";
	document.getElementById("ball").style.boxShadow="0px 0px 3px 2px #93F";
	document.body.style.borderColor="#93F";
}
function blueFunction(){//Changes the elements border colours, background colours and shadows 
	document.getElementById("gamewindow").style.boxShadow="0px 0px 10px 15px #00F";
	document.getElementById("gamewindow").style.borderColor="#00F";
	document.getElementById("racket").style.boxShadow="0px 0px 15px 10px #00F";
	document.getElementById("racket").style.backgroundColor="#00F";
	document.getElementById("racket").style.borderColor="#000";
	document.getElementById("ball").style.backgroundColor="#09F";
	document.getElementById("ball").style.boxShadow="0px 0px 3px 2px #00F";
	document.body.style.borderColor="#00F";
}
function pinkFunction(){//Changes the elements border colours, background colours and shadows 
	document.getElementById("gamewindow").style.boxShadow="0px 0px 10px 15px #F3F";
	document.getElementById("gamewindow").style.borderColor="#F3F";
	document.getElementById("racket").style.boxShadow="0px 0px 15px 10px #F3F";
	document.getElementById("racket").style.backgroundColor="#F3F";
	document.getElementById("racket").style.borderColor="#93F";
	document.getElementById("ball").style.backgroundColor="#93F";
	document.getElementById("ball").style.boxShadow="0px 0px 3px 2px #F3F";
	document.body.style.borderColor="#F3F";
}
function simple(){//Changes font family of the body
	document.body.style.fontFamily="calibri";
}
function block(){//Changes font family of the body
	document.body.style.fontFamily="Aharoni";
}
function normal(){//Changes font family of the body
	document.body.style.fontFamily="textfont";
}

//-->