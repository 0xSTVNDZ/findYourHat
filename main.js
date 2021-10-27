const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field){
    this.field = field;
    this.currentLocation = field[0][0];
  }

  //prints current field
  print(){
    
    console.log(this.field.join("\n"));
  }

  //makes up a board
  static generateField(height, width){
    let randomX = Math.floor(Math.random() * height);
    let randomY = Math.floor(Math.random() * width);

    if(randomX === 0 && randomY === 0){
      randomX = Math.floor(Math.random() * height);
      randomY = Math.floor(Math.random() * width);
    }

    //create array height
    let gameField = [];
    while(height > 0){
      gameField.push([]);
      height -= 1;
    }

    //create array width and populate
    for(let i = 0; i < gameField.length; i++){
      let z = 0;
      while(z < width){
        if(i === randomX && z === randomY){
          gameField[i].push(hat);
          z += 1;
        }else{
            let randomChoice = Math.floor(Math.random() * 4);
            //if holes variable is > 0 then take a gamble
            if(randomChoice === 0){
              gameField[i].push(hole);
              z += 1;
            }else{
              gameField[i].push(fieldCharacter);
              z += 1;
            }
          }
        }
      }
    //manually set player start position
    gameField[0][0] = pathCharacter;
    
    return gameField;
  }

  //asks user input, returns user reponse
  userInput(){
    let response = prompt("Please enter a direction(up, down, left, or right):");
    return response;
  }

  play(){
  	console.log("Your location is marked by the *");
  	console.log("Game is over if you step out of the board or land on a 'O'. Enjoy!")
    //start of game: print out map and ask for first move
    this.print();

    //inital player position
    let vertical = 0;
    let horizontal = 0;
    let state = true; //keep playing until false

    while(state){
      let choice = this.userInput();
      //until we land on the hat, until we land on a mine,
      //until we get a outofrange error
      if(choice == "left"){
        horizontal -= 1;
      }else if(choice == "right"){
        horizontal += 1;
      }else if(choice == "up"){
        vertical -= 1;
      }else if(choice == "down"){
        vertical += 1;
      }else{
        console.log("Please enter valid choice.");
        choice = userInput();
      }
      //if within range, check movement, else end the game
      if((vertical >= 0 && vertical < this.field.length) && (horizontal >= 0 && horizontal < this.field[0].length)){
        if(this.field[vertical][horizontal] === hat){
          console.log("You found the hat! You win!");
          state = false;
        }else if(this.field[vertical][horizontal] === pathCharacter){
          console.log("Already been here.");
        }else if(this.field[vertical][horizontal] === fieldCharacter){
          this.field[vertical][horizontal] = pathCharacter;
          this.print();
       }else if(this.field[vertical][horizontal] === hole){
          console.log("You landed in a hole. Game over.");
          state = false;
        }
      }else{
        console.log("You moved out of range. Game over.");
        state = false;
      }
      
    } // end while loop

  } // end play()
} // end class Field

const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

let field1 = Field.generateField(7,7);
//console.log(field1);
const coolField = new Field(field1);
coolField.play();