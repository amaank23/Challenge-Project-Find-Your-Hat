const prompt = require("prompt-sync")({ sigint: true });

class Field {
  constructor(field) {
    this.field = field;
    this.currentPosition = [0, 0];
  }

  print() {
    this.field[this.currentPosition[0]][this.currentPosition[1]] = "*";
    for (let i = 0; i < this.field.length; i++) {
      console.log(this.field[i].join(""));
    }
  }

  start() {
    this.print();
    const direction = prompt("Which Way: ");
    const directions = ["u", "d", "l", "r"];
    if (directions.includes(direction)) {
      if (direction === "r") {
        this.currentPosition = [
          this.currentPosition[0],
          (this.currentPosition[1] += 1),
        ];
        this.moveCheck();
      } else if (direction === "d") {
        this.currentPosition = [
          (this.currentPosition[0] += 1),
          this.currentPosition[1],
        ];
        this.moveCheck();
      } else if (direction === "l") {
        this.currentPosition = [
          this.currentPosition[0],
          (this.currentPosition[1] -= 1),
        ];
        this.moveCheck();
      } else {
        this.currentPosition = [
          (this.currentPosition[0] -= 1),
          this.currentPosition[1],
        ];
        this.moveCheck();
      }
    } else {
      console.log("Invalid Direction");
      this.start();
    }
  }

  moveCheck() {
    const [first, second] = this.currentPosition;
    if (
      first < this.field.length &&
      first >= 0 &&
      second < this.field[0].length &&
      second >= 0
    ) {
      if (this.field[first][second] === "O") {
        console.log("Sorry, you fell inside a hole!");
      } else if (this.field[first][second] === "^") {
        console.log("Congrats, you found your Hat");
      } else {
        this.start();
      }
    } else {
      console.log("Out of Bound!");
    }
  }

  static generateField(height, width, percentage) {
    const hat = "^";
    const hole = "O";
    const fieldCharacter = "░";
    const pathCharacter = "*";
    const fieldsArr = []
    const noOfColums = width;
    const noOfRows = height;
    const hatPos = [Math.floor(Math.random() * noOfRows), Math.floor(Math.random() * noOfColums)]
    const characterPos = [0, 0]
    const totalCells = noOfColums * noOfRows;
    const countOfHoles = (percentage / 100) * totalCells;
    
    for(let i = 0; i < noOfRows; i++){
      const temp = []
      for(let j = 0; j < noOfColums; j++){
        temp.push(fieldCharacter)
      }
      fieldsArr.push(temp);
    }

    for(let i = 0; i < countOfHoles; i++){
      const temp = [Math.floor(Math.random() * noOfRows), Math.floor(Math.random() * noOfColums)]
      fieldsArr[temp[0]][temp[1]] = hole
    }

    fieldsArr[hatPos[0]][hatPos[1]] = hat;
    fieldsArr[characterPos[0]][characterPos[1]] = pathCharacter
    return fieldsArr
  }
}

const field1 = new Field(Field.generateField(8, 8, 50));

field1.start();
