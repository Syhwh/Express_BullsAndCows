//Generate random Number
let currentGame;
let level;
var number = 0;
let userNumber;
// Methods

const postAttemps = (level) => {
  fetch("/games", {
    headers: { 'Content-Type': 'application/json' },
    method: "POST",
    body: JSON.stringify({ gameLevel:level })
  })
    .then(response => response.json())
    .then(data => {
      currentGame = data.gameId;     
    });
}


const start = (level) => {
  $(".result tbody").html("")
  $("input").val("");
  postAttemps(level);
}

$(".level").change(function () {
  level = $(this).val();
  start(level)
})



$('#play_btn').on('click',()=>{
    userNumber = $('input').val();
    if (level != null) {
      if (validate(level, userNumber)) {
        postAttempt(level, userNumber);
        $('input').val('');
      } else {
        errorUserNumber(level, userNumber );
      }

    } else {
      errorLevel();
    }
 
});

$("input").on('keypress', function (e) {

  if (e.which == 13) {
    userNumber = $(this).val();
    if (level != null) {
      if (validate(level, userNumber)) {
        postAttempt(level, userNumber);
        $(this).val('');
      } else {
        errorUserNumber(level, userNumber );
      }

    } else {
      errorLevel();
    }
  }
});

$('#playAgain').on('click',()=>{
  location.reload()
})


const errorLevel = () => {
  $("#wnum").modal('show')
  $(".bad-number").html('<p>You have to choose a Level</p>');
  $("input").val("")
}

const errorUserNumber = (level, number) => {

  if(!number){
    $("#wnum").modal('show')
    $(".bad-number").html(`<p> Sorry... you have to write a number</p>`);
    $("input").val("")
    return
  }

  if (level == 3) {
    $("#wnum").modal('show')
    $(".bad-number").html(`<p> Sorry... <strong>${userNumber}</strong> it\'s not a valid number,
    you have to put a 6 unique digits number</p>`);
    $("input").val("")
    return
  }
  $("#wnum").modal('show')
  $(".bad-number").html(`<p> Sorry... <strong>${userNumber}</strong> it\'s not a valid number,
     you have to put a 4 unique digits number</p>`);
  $("input").val("")

}



const validate = (level, num) => {
  if (level == 3) {
    if (num.length === 6) {
      const valideNumber = Array.from(new Set(num.split('').map(Number)))
      return valideNumber.length === 6;
    }
  }
  if (num.length === 4) {
    const valideNumber = Array.from(new Set(num.split('').map(Number)))
    return valideNumber.length === 4;
  }
}

const postAttempt = (gameLevel, guessNumber) => {
  fetch("/games/" + currentGame + "/attempt", {
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({ gameLevel, guessNumber })
  })
    .then(response => response.json())
    .then(data => {
      let bulls = data.bulls;
      let cows = data.cows;
      let userNumber = data.userNumber;
      let level = data.level
      let correctNumber=data.correctNumber
      updateInfo(bulls,cows,userNumber,level,correctNumber)
    });
}

const updateInfo=(bulls,cows,userNumber,level,correctNumber)=>{
 
  if (level==3 && bulls == 6) {
    $("#win").modal('show');
    $(".win-number").html('<p>You did it, the numer was: ' + userNumber + '</p>');
    
  }
  if (bulls == 4) {
    $("#win").modal('show');
    $('#mtitle').html('Congratulations!!')
    $(".win-number").html('<p>You did it, the numer was: ' + userNumber + '</p>');
    
  }

  if (level == undefined) {
    $("#win").modal('show');    
    $('#mtitle').html('Ups...!!')
    $(".win-number").html('<p> Oh Sorry you have lost, the numer was: ' + correctNumber + '</p>');
   
  }

  $(".results tbody").append('<tr><th scope="row">' + $(".results tr").length + '</th><td>' + userNumber + '</td><td>' + cows + '</td><td>' + bulls + '</td></tr>')
  $("input").val("");

}
