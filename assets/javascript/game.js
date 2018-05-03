

var letterText = document.getElementById("letterGuessed");
var currentText = document.getElementById("currentWord");
var remainingtText = document.getElementById("guessesRemaining");
var winstText = document.getElementById("wins");


var letters = [];
var i = 0;
var newWord = true;
var alphapit =['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

var hangmanWords = {
    guessedAllowed: 9,
    wordIndex: 0,
    wordArray: ["horse", "dog", "zebra"],
    tryToGuess: ["-"],
    wins :0,


    myWord: function () {

        return (this.wordArray[this.wordIndex]);
    },

    letterOfWord: function () {
        var letters = [];
        letters = this.myWord();
        return (letters);
        // console.log(letters.length);

    },

    fillWord: function (t, x, y) {

        if (t === true) {
            for (var s = 0; s < this.letterOfWord().length; s++) {
                this.tryToGuess[s] = "-";
                console.log("new word");
                currentText.textContent = (this.tryToGuess);
            }
        }
        else {

            this.tryToGuess[x] = y;
            currentText.textContent = (this.tryToGuess);
            console.log(this.tryToGuess);

        }
    },

    checkWord: function () {
        var array=this.tryToGuess;
        var v = array.indexOf("-");
        console.log("same word");
        if (v === -1 ){ 
            console.log("new word");
            this.resetMe();
           
           // console.log("done");
        }
     

    },
   
    resetMe : function(){
      console.log("reset");
      if(this.wordIndex===this.wordArray.length-1)
      {this.wordIndex=0;}
      else{
     this.wordIndex++; }

    //    if(this.wordIndex<this.wordArray.length-1){
    //  this.wordIndex++;
     
    // }
    //  else{this.wordIndex=0;
    //     console.log(wordIndex);}
    
     newWord=true;
     this.wins++;
     letterText.textContent="";
     this.guessedAllowed=9;
     console.log(this.wordIndex);
     
     this.tryToGuess= [];
     remainingtText.textContent = this.guessedAllowed;
     winstText.textContent=this.wins;
     this.fillWord(newWord, 0, 0);
     newWord = false;

    
},
    
    

};

console.log(hangmanWords.letterOfWord());
winstText.textContent=hangmanWords.wins;
remainingtText.textContent = hangmanWords.guessedAllowed;
hangmanWords.fillWord(newWord, 0, 0);
newWord = false;
document.onkeyup = function (event) {
    
    //hangmanWords.fillWord();
    var userLetter = event.key;
    var userLetterCapital = userLetter.toUpperCase();
    var wordKind =alphapit.indexOf(userLetterCapital);
    if(wordKind>-1)
    {
    var arr = hangmanWords.letterOfWord();
    var a = arr.indexOf(userLetter);
    if ((a) > -1) {
      
        hangmanWords.fillWord(newWord, a, userLetter);
        console.log(userLetter);
    }
    else {
        hangmanWords.guessedAllowed--;

        remainingtText.textContent = hangmanWords.guessedAllowed;

        console.log(" not inside");

  
    var newdiv = document.createElement("div");
    newdiv.setAttribute("style", "display:inline");
    newdiv.textContent = userLetterCapital + ",";
    letterText.appendChild(newdiv);
    if (hangmanWords.guessedAllowed==0)
    {
        location.reload();
    }
    
    } 
    hangmanWords.checkWord();
    }
    else {
        alert("please enter alphabet only");
    }


}
