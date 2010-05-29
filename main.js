
$(document).ready(function() {

var music = new Object(); //Create music object
music.chrScale = ["A","A#","B","C","C#","D","D#","E","F","F#","G","G#"]; //Create the scale array
// Set up chord patterns using 3d array. One dimension contains chord types, the other their patterns
	music.chords = new Array;
	music.chords.maj = new Array(0,4,7);
	music.chords.min = new Array(0,3,7);
	music.chords.dom7 = new Array(0,4,7,10);
	music.chords.min7 = new Array(0,3,7,10);
	music.chords.maj7 = new Array(0,4,7,11);
	
	music.scales = new Array;
	music.scales.major = new Array(0,2,4,5,7,9,11)
	music.scales.minor = new Array(0,2,3,5,7,8,10)
	
	music.intervals = new Array ("Prime/Octave", "Minor Second", "Major Second", "Minor Third", "Major Third", "Perfect Fourth", "Tritone", "Perfect Fifth", "Minor Sixth", "Major Sixth", "Minor Seventh", "Major Seventh");
	
	
music.isnote = function(note) {				

		music.chrScale.indexOf[note]==-1?return false:return true;
			
		
	}




//	var incr=0;									//Counter for correct notes
//	wrongnotes = new Array();					// Global array of incorrect notes
//	for (n in notes) { 							// Iterate through each note of the input array
//		var inci=0;								// Set the "not a match" counter to 0
//		for (i in music.chrScale) {				// Iterate through each scale note
//			if (music.chrScale[i] != notes[n]) {	// If the scale note doesn't match the input note
//				inci++;							// Increase the not-a-match counter
//			}
//		}
//		if (inci!=12) {							// If the not a match counter is not 12 (meaning a scale note matched)
//			incr++;								// Increment the right note counter
//		}
//		else {									//If a note did match any scale note
//			wrongnotes.push(notes[n]);			//append it to an array of invalid notes
//		}
//	}
//	if (incr == notes.length) {					// If the right note counter is the same as the number of notes input
//		return true	;							// Return true
//	}	
//	else {										//If any of the notes are wrong
//		return false							//Return false
//	
//	}
//}
	
music.scale = function (note,scale) {                           			
	if ($.isArray(scale) && music.isnote(note)) {							//If both inputs are valid
						                     		//Creates array to be returned
		var index;													
		var startpoint = music.chrScale.indexOf(note);            		    //Find the index of the starting note in the chromatic scale
		for (i in scale) {					 								//Loop through scale pattern
			var index = parseInt(startpoint) + parseInt(scale[i]);
			if (index >= music.chrScale.length) { 						    //Once the index escapes the bounds of the chromatic scale (as it most often will)
				var index = parseInt(startpoint) + parseInt(scale[i]) - 12; //The index is the starting position plus the next interval, minus the scale length
			}
			newScale.push(music.chrScale[index]);
		}
	return newScale;	
	}
	else {
		return false;
	}
}

music.chordfind = function(notes) {
	

	
	var notearray = notes.split(","); //Split up the CSV into an array			 		 			            
	var intervals = new Array();
		if (music.isnote(notearray)) { //If the notes are legit
			//Set up the array of patterns (fix this)
			var patternArray = new Array();	
			patternArray[0]= new Array ();
			patternArray[1]= new Array ();
			patternArray[2]= new Array ();
			patternArray[3]= new Array ();
			
			for (i in notearray) { // Loop through each note, assuming each to be the tonic
				for (n in notearray) { // Loop through each note, comparing it to the current tonic
						patternArray[i].push(music.numInterval(notearray[i],notearray[n])); //add each interval pattern into the next element in an array	
				}
			}
			for (d in patternArray) { //Loop through the array of patterns
				patternArray[d].sort(function(a,b){return a - b}) //Numerically sort them
				
			
				
			}
			return patternArray; //Return the array
		}
		
		else {
			alert("Incorrect Input: " + wrongnotes.join(" ,"));
		}
}

music.interval = function(note1, note2){
	alert (music.intervals[Math.abs(music.chrScale.indexOf(note2)-music.chrScale.indexOf(note1))] + " / " + music.intervals[12- Math.abs(music.chrScale.indexOf(note2)-music.chrScale.indexOf(note1))]); 
}

music.numInterval = function (note1,note2) {
	if (music.chrScale.indexOf(note2)-music.chrScale.indexOf(note1)<0) {
		return 12+(music.chrScale.indexOf(note2)-music.chrScale.indexOf(note1));
	}
	else {
		return music.chrScale.indexOf(note2)-music.chrScale.indexOf(note1);
	}
}



$("#findbutton").click(function() {


//var result = music.chordfind("C,E,G,B").toString(", ");

alert(music.isnote("F"));



	
});




});

