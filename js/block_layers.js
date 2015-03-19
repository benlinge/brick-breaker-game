<!--
//Dynamic Block status' mid game
for (ib=0; ib<5; ib++){//Loops to change the colour of the blocks when hit. 5 rows
 	for (ia=0; ia<8; ia++){//Loop for all additional hits to blocks
  		tmpL = 31 + 46 * ia; tmpT = 50 + 20 * ib//amount of hits on the game.
  		tmpIDn = ib * 8 + ia + 1//Number each individual block and additional hits
  		if (n4FLG!=1){//IF not netscape navigator 4
   			document.write("<div id='"+tmpIDn+"' style='position:absolute; background-color:"+brickColour[ib]+"; top:"+tmpT+"px; left:"+tmpL+"px; width:42; height:16; clip:rect(0,43,17,0)'></div>")//Writes the content to the document that the browser can read
  		}else{//IF netscape navigator 4
   			document.write("<layer left="+tmpL+" TOP="+tmpT+" CLIP='1,1,43,17' bgcolor='"+brickColour[ib]+"'></layer>")//Writes the content to the document that netscape navigator 4 can read
  		}
  			brickStatus[ib * 8 + ia] = ib//returns the status of the brick
 	}
}
//-->