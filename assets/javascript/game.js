

var letterText = document.getElementById("letterGuessed");
var currentText = document.getElementById("currentWord");
var remainingtText = document.getElementById("guessesRemaining");
var winstText = document.getElementById("wins");


var letters = [];
var i = 0;
var newWord = true;
var isWin=false;

var alphapit = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

var hangmanWords = {
    guessedAllowed: 9,
   // var randomNumber = Math.floor(Math.random() * hangmanWords.wordArray.length);
    
    wordArray: ["aarrbee","horse", "dog", "zebra"],
    wordIndex: Math.floor(Math.random() *4 ),
    tryToGuess: ["-"],
    wins: 0,
    invalidLetters: [],

   
    myWord: function () {
        var randomNumber = Math.floor(Math.random() * hangmanWords.wordArray.length);
        console.log(randomNumber);
        return (this.wordArray[this.wordIndex]);
    },

    letterOfWord: function () {
        var letters = [];
        letters = this.myWord();
        return (letters);
        // console.log(letters.length);

    },

    fillWord: function (isnew, x, y) {

        if (isnew === true) {
            for (var s = 0; s < this.letterOfWord().length; s++) {
                this.tryToGuess[s] = "-";
                console.log("new word");
                var displayString = this.tryToGuess.join(' ');
                currentText.textContent = (displayString);
            }
        }
        else {

            this.tryToGuess[x] = y;
            var displayString = this.tryToGuess.join(' ');
            currentText.textContent = (displayString);
            console.log(this.tryToGuess);

        }
    },

    fillInvalidLetters: function (letter) {
        var o = this.invalidLetters.indexOf(letter);
        if (o === -1) {

            this.invalidLetters.push(letter);
            console.log(hangmanWords.invalidLetters);
            this.guessedAllowed--;
        }

    },
    checkWord: function () {
        var array = this.tryToGuess;
        var v = array.indexOf("-");
        console.log("same word");
        if (v === -1) {
            console.log("new word");
           isWin=true;
            this.resetMe(isWin);

            // console.log("done");
        }


    },

    resetMe: function (win) {
        console.log("reset");
        // if (this.wordIndex === this.wordArray.length - 1) { this.wordIndex = 0; }
        // else {
        //     this.wordIndex++;
        // }
        this.wordIndex= Math.floor(Math.random() * hangmanWords.wordArray.length);

        if (win) {
            this.wins++;
        }

        newWord = true;

        letterText.textContent = "";
        this.guessedAllowed = 9;
        console.log(this.wordIndex);

        this.tryToGuess = [];
        this.invalidLetters = [];
        remainingtText.textContent = this.guessedAllowed;
        winstText.textContent = this.wins;
        this.fillWord(newWord, 0, 0);
        newWord = false;


    },



};

console.log(hangmanWords.letterOfWord());
winstText.textContent = hangmanWords.wins;
remainingtText.textContent = hangmanWords.guessedAllowed;
hangmanWords.fillWord(newWord, 0, 0);
newWord = false;
document.onkeyup = function (event) {
    var randomNumber = Math.floor(Math.random() * hangmanWords.wordArray.length);
    console.log(randomNumber);
    //hangmanWords.fillWord();
    var userLetter = event.key;
    var userLetterCapital = userLetter.toUpperCase();
    var wordKind = alphapit.indexOf(userLetterCapital);
    if (wordKind > -1) {
        var arr = hangmanWords.letterOfWord();
        console.log("arr=="+arr);
        var a = arr.indexOf(userLetter);
        if ((a) > -1) {
            for(var x=0; x<arr.length ;x++)
            { console.log(arr[x]);
                if( arr[x] ===  userLetter)
                {
                 hangmanWords.fillWord(newWord, x, userLetter);
                }
            }
           // hangmanWords.fillWord(newWord, a, userLetter);
            console.log(userLetter);
        }
        else {
            console.log(hangmanWords.invalidLetters);
            hangmanWords.fillInvalidLetters(userLetterCapital);

            // hangmanWords.invalidLetters.push(userLetterCapital);
            // console.log(hangmanWords.invalidLetters);

            // hangmanWords.guessedAllowed--;
            remainingtText.textContent = hangmanWords.guessedAllowed;
            letterText.textContent = hangmanWords.invalidLetters;
            // var newdiv = document.createElement("div");
            // newdiv.setAttribute("style", "display:inline");
            // newdiv.textContent = userLetterCapital + ",";
            // letterText.appendChild(newdiv);

            if (hangmanWords.guessedAllowed == 0) {
                isWin=false;
                hangmanWords.resetMe(isWin);
            }

        }
        hangmanWords.checkWord();
    }
    else {
        alert("please enter alphabet only");
    }


}
