
$(document).ready(function() {
var music = new Object(); //Create music object	
music.init = function(custom){ 

	music.chrScale = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"]; //Create the scale array
	
	music.chords = new Array;
	music.chords.maj = new Array(0, 4, 7);
	music.chords.min = new Array(0, 3, 7);
	music.chords.dom7 = new Array(0, 4, 7, 10);
	music.chords.min7 = new Array(0, 3, 7, 10);
	music.chords.maj7 = new Array(0, 4, 7, 11);
	
	music.scales = new Array;
	music.scales.major = new Array(0, 2, 4, 5, 7, 9, 11)
	music.scales.minor = new Array(0, 2, 3, 5, 7, 8, 10)
	
	music.intervals = new Array("Prime/Octave", "Minor Second", "Major Second", "Minor Third", "Major Third", "Perfect Fourth", "Tritone", "Perfect Fifth", "Minor Sixth", "Major Sixth", "Minor Seventh", "Major Seventh");
	



	var standardfrets = new music.fretboard("E,A,D,G,B,E", 24)//Make standard guitar fretboards object
}

music.fretboard = function(strings, limit, pattern){ 	//Make fretboard class
	this.openstrings = strings.split(",");				//Parse input into array
	this.limit = limit;									//Set highest fret
	this.string = new Array();							//Set up '2d' array to hold strings and frets
	
	if (typeof(pattern) == 'undefined') {   			//If pattern is not given
		var pattern = new Array(); 						//Set up array to hold default pattern
		for (i = 0; i <= limit; i++) {      			//Assume it is 0,1,2,3, etc and build scale
			pattern.push(i);
		}
	}
	for (n=1; n<=this.openstrings.length;n++) {						//Cycle through each string
		this.string[n] = music.scale(this.openstrings[n-1],pattern);//Assign each fret its appropriate note
	}
}

music.isNote = function(note) {				
	music.chrScale.indexOf(note)==-1 ? bool = false : bool = true
	return bool;
}
	
music.scale = function (note,scale) {                           			
	if ($.isArray(scale) && music.isNote(note)) {							//If both inputs are valid
		var newScale = new Array();				                     		//Creates array to be returned
															
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
	

	
	var notearray = music.parse(notes);		 		 			            
	var intervals = new Array();
		if (notearray.every(music.isNote)) { //If the notes are legit
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
			alert("Incorrect Input");
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

music.parse = function (input) {					

		
}


$("#findbutton").click(function() {
music.init();
var custguitar = new music.fretboard("E,A,D",12)
alert (custguitar.string[3][0]);
var majguitar = new music.fretboard("C",12,music.scales.major)
alert (majguitar.string[1][3]);


	
});




});

