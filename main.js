$(document).ready(
    function () {

        var myRules =
            {
                userNumber:{
                    required: true,
                    min: 1000,
                    max: 9999
                }
            }

        var myMessages =
            {
                userNumber:{
                    required: "Please enter a number",
                    min: "Enter a number 1000 - 9999",
                    max: "Enter a number 1000 - 9999"
                }
            }

        $("form").validate(
            {
                submitHandler: compareGuess,
                rules: myRules,
                messages: myMessages
            }
        );

        //add event handlers
        $("#nGame").click(newGame);
        $("#startButton").click(startGame);
        $("#rulesButton").click(viewRules);
        $("#backButton").click(viewGame);

        //all other functions (program logic)
        function startGame(){
            event.preventDefault();
            $("#gameNav").tab("show");
            newGame();
        }

        function viewRules(){
            event.preventDefault();
            $("#rulesNav").tab("show");
        }

        function viewGame(){
            event.preventDefault();
            $("#gameNav").tab("show");
        }

        var randomNum = 0;
        var ranSet = '';

        function newGame(){
            //clear the guess list and generate a new number
            $("#userGuesses").empty();

            //generate a number until there are no duplicates. Check for 0s
            var goodNumber = false;
            while(!goodNumber){
                var duplicates = true;
                var illegalDigits = true;

                randomNum = Math.floor(Math.random() * (9999 - 1000)) + 1000;
                var ranArray = randomNum.toString().split('');
                ranSet = new Set(ranArray);

                if(ranSet.size == ranArray.length){
                    duplicates = false;
                }
                if(!ranArray.includes("0")){
                    illegalDigits = false;
                }
                if(!illegalDigits && !duplicates){
                    goodNumber = true;
                }
            }
        }

        var guessNum = 1

        function compareGuess(){
            var userNum = $("#userNumber").val();
            var bulls = 0;
            var cows = 0;

            //convert users guess and random number into arrays for comparison
            var userArray = userNum.toString().split('');
            var answerArray = randomNum.toString().split('');

            //check for duplicates in user guess
            var userSet = new Set(userArray);
            var userDuplicate = false;
            if(userSet.size != userArray.length){
                userDuplicate = true;
            }
            for(i=0;i<userArray.length;i++){
                var userInt = userArray[i];
                for(j=0;j<answerArray.length;j++){
                    if(i == j && userInt == answerArray [j]){
                        bulls += 1;
                    }
                    else if (userInt == answerArray[j]){
                        cows += 1;
                    }
                }
            }

            //check for zeroes in users guess
            var userZeroes = false;
            if(userArray.includes("0")){
                userZeroes = true;
            }

            //output users guess or win statement depending on guess
            if(userDuplicate){
                $("#userGuesses").append("<p class='guessOutput'>Please enter a value with no duplicate numbers.</p>");
            }
            if(userZeroes){
                $("#userGuesses").append("<p class='guessOutput'>Please enter a digit 1-9</p>")
            }
            if(!userDuplicate && !userZeroes && userNum != randomNum){
                $("#userGuesses").append("<p class='guessOutput'>Guess " + guessNum + ": " + userNum + " | 🐄: " + cows + " | 🐂: " + bulls + ".</p>");
                guessNum++;
            }
            if(userNum == randomNum){
                $("#userGuesses").append("<p class='guessOutput'>Congratulations! You Win!</p>");
                guessNum = 1;
            }
        }
    }
)