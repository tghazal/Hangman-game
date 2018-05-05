
// get html elements
var letterText = document.getElementById("letterGuessed");
var currentText = document.getElementById("currentWord");
var remainingtText = document.getElementById("guessesRemaining");
var winstText = document.getElementById("wins");
var imageText=document.getElementById("image");

//declare global variables
var letters = [];
var i = 0;
var newWord = true;
var isWin = false;
var alphapit = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

//declare hangman object
var hangmanWords = {

    guessedAllowed: 9,
    wordArray: ["oyster","caiman", "hamster", "jaguar", "koala","leopard","oyster","puma","zebra","snail"],
    imageArray:["./assets/images/oyster.jpg","./assets/images/caiman.jpg","./assets/images/hamster.jpg","./assets/images/jaguar.jpg","./assets/images/koala.jpg","./assets/images/leopard.jpg","./assets/images/oyster.jpg","./assets/images/puma.jpg","./assets/images/zebra.jpg","./assets/images/snail.jpg",],
    wordIndex: Math.floor(Math.random() * 4),
    tryToGuess: ["-"],
    wins: 0,
    invalidLetters: [],

    //declare function to return one word from word array  each time
    myWord: function () {

        return (this.wordArray[this.wordIndex]);
    },

    //return array of letters in the word 
    letterOfWord: function () {
        var letters = [];
        letters = this.myWord();
        return (letters);


    },

    // function to fill the array of guesed letters
    fillWord: function (isnew, x, y) {
        // if this is new word then fill it with -  
        if (isnew === true) {
            for (var s = 0; s < this.letterOfWord().length; s++) {
                this.tryToGuess[s] = "-";
                //convert the array to string 
                var displayString = this.tryToGuess.join(' ');
                currentText.textContent = (displayString);
            }
        }
        else {
            // if this is not new word then fill the correct letter in the approciate index 
            this.tryToGuess[x] = y;
            //convert array to string 
            var displayString = this.tryToGuess.join(' ');
            currentText.textContent = (displayString);


        }
    },

    // function o fill invalid leters in the invalid letters array
    fillInvalidLetters: function (letter) {
        var o = this.invalidLetters.indexOf(letter);
        //  if the letter is not already inside the array then push it to the array  
        if (o === -1) {
            this.invalidLetters.push(letter);
            this.guessedAllowed--;
        }

    },
    //function to check if the word is totally guessed 
    checkWord: function () {
        var array = this.tryToGuess;
        // check if the tryToGuess array still have "-"
        var v = array.indexOf("-");
        // if the tryToGuess array dont have any "-" then will move to the new word
        if (v === -1) {
            // give the isWin boolean a value of true as the user guessed the leeter 
            isWin = true;
            // call reset function to get new word 
            var img=document.createElement("img");
           // put the right image from imageArray
           imageText.textContent="";
           img.src=this.imageArray[this.wordIndex];
            img.id="picture";
            img.height="150";
            img.width="150";
            imageText.appendChild(img);
          // call reset function
            this.resetMe(isWin);
        }


    },

    resetMe: function (win) {
        // give the word index a  random number for the new word from wordArray 
        this.wordIndex = Math.floor(Math.random() * hangmanWords.wordArray.length);
        //if the user guessed the letter then add 1 to win variable
        if (win) {
            this.wins++;
        }
        // reset variables and change newWord boolean to true 
        newWord = true;
        letterText.textContent = "";
      //  imageText.textContent="";
        this.guessedAllowed = 9;
        this.tryToGuess = [];
        this.invalidLetters = [];
        remainingtText.textContent = this.guessedAllowed;
        winstText.textContent = this.wins;
        // call function fillWord to fill the array of tryToGuess by "-" as its new word
        this.fillWord(newWord, 0, 0);
        //set newWord boolean to false after filling the array by "-"
        newWord = false;


    },


};


winstText.textContent = hangmanWords.wins;
remainingtText.textContent = hangmanWords.guessedAllowed;
// fill the array of tryToGuess by "-" as its new word
hangmanWords.fillWord(newWord, 0, 0);
 //set newWord boolean to false after filling the array by "-"
newWord = false;
// call this function when any key preesed 
document.onkeyup = function (event) {
     // get the letter that pressed 
    var userLetter = event.key;
    //convert the letter to upper case
    var userLetterCapital = userLetter.toUpperCase();
    //check if the key pressed is letter included in the alphapit array 
    var wordKind = alphapit.indexOf(userLetterCapital);
    // if the key pressed is letter then ..
    if (wordKind > -1) {
        // get the letters array of the word that the user should guess 
        var arr = hangmanWords.letterOfWord();
       //check if the letter pressed is one of the letter of the word
        var a = arr.indexOf(userLetter);
        if ((a) > -1) {
            for (var x = 0; x < arr.length; x++) {
                // look in the letter array to check if the letter pressed is matching any of them 
                if (arr[x] === userLetter) {
                   // if the letter pressed match any of the letter then fill the tryToGuess array with that letter at specific index
                    hangmanWords.fillWord(newWord, x, userLetter);
                }
            }
        }
        else {
            // if the letter presed dosn't match any of the letter of the word then fill it in the invalidLetter array 
            hangmanWords.fillInvalidLetters(userLetterCapital);
            remainingtText.textContent = hangmanWords.guessedAllowed;
            letterText.textContent = hangmanWords.invalidLetters;
            // if the guessed allowed is zero then reset game for a new word and give the isWin boolean a false value
            if (hangmanWords.guessedAllowed == 0) {
                isWin = false;
                hangmanWords.resetMe(isWin);
            }

        }
        // check if the user guess the whole word
        hangmanWords.checkWord();
    }
    // if the key pressed is not one of the alphabit then alert 
    else {
        alert("please enter alphabet only");
    }


}
