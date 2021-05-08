class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();
    //write code to change the background color here
    background("yellow");
    //write code to show a heading for showing the result of Quiz
    fill("red");
    textSize(30);
    text("Result of the Quiz :-",400,300);
    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();

    //write condition to check if contestantInfor is not undefined
    if(allContestant !== undefined){
      var displayAns = 230;
      fill("blue");
      textSize(20);
      text("Note :- Contestant who answered correct are highlighted as green color");
      for (var plr in allContestant){
        var correctAns = "2";
        if (correctAns === allContestant[plr].answer){
          fill("green");
        }
        else{
          fill("red");
        }
        displayAns += 30;
        textSize(20);
        text(allContestant[plr].name,+" : "+ allContestant[plr].answer,250,displayAns);
        
      }
    }    
  }

}
