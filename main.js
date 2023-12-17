const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    this.field = field;
    this.currentPosition = [0, 0]
  }

  print() {
    this.field[this.currentPosition[0]][this.currentPosition[1]] = "*"
    for (let i = 0; i < this.field.length; i++) {
      console.log(this.field[i].join(""));
    }
  }

  start(){
    this.print()
    const direction = prompt('Enter Direction to Move to: ');
    const directions = ["u", "d", "l", "r"]
    if(directions.includes(direction)){
        if(direction === 'r'){
            this.currentPosition = [this.currentPosition[0], this.currentPosition[1]+=1]
            this.start()
        } else if(direction === 'd'){
            this.currentPosition = [this.currentPosition[0]+=1, this.currentPosition[1]]
            this.start()
        } else if(direction === 'l'){
            this.currentPosition = [this.currentPosition[0], this.currentPosition[1]-=1]
            this.start()
        } else {
            this.currentPosition = [this.currentPosition[0]-=1, this.currentPosition[1]]
            this.start()
        }
    } else {
        console.log("Invalid Direction");
        this.start()
    }
  }
}

const field1 = new Field([
  ["*", "░", "O"],
  ["░", "O", "░"],
  ["░", "^", "░"],
]);

field1.start();
