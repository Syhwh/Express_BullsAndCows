
class Game {
  constructor(level) {
    this.guessNumber = this.generateNumber(level);
    console.log("Num: ", this.guessNumber);
    if (level==2){
      this.chances=5;
    }else if(level==3){
      this.chances=7;
    }else{
      this.chances=null;
    }
    this.attempts = [];
  }
  
  generateNumber(level) {
    let array = [];
    let pos = 0;
    const length = level == 3 ? 6 : 4;
    while (array.length < length) {
      let number = Math.floor(Math.random() * 10);
      if (!array.includes(number)) {
        array.push(number);
        pos++
      }
    }
    return array.slice(0, length).join("")
  }

  //Check the number for cows and bulls
  createAttempt(userNumber,level) {
    let cows = 0;
    let bulls = 0;
    let length = level==3 ? 6:4;
    for (let i = 0; i < length; i++) {
      if (this.guessNumber[i] == userNumber[i]) {
        bulls++;
      } else {
        cows += this.guessNumber.indexOf(userNumber[i]) > -1 ? 1 : 0;
      }
    }
    let attempt = { level, userNumber, cows, bulls }
    this.attempts.push(attempt);

    if (this.chances==null){
      return attempt
    } else if(this.chances!=null && this.chances!=0){
      this.chances--;
      return attempt
    }else{
      return  { level:undefined, userNumber,  cows, bulls, correctNumber:this.guessNumber }
    }
   
  }

}

module.exports = Game;