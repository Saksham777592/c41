class Game {
  constructor() {}
  
  getState() {
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value", function(data) {
       gameState = data.val();
    })
  }

  update(state) {                    //if update(0)--->the gameState:0
                                     //if update(1)--->the gameState:1
                                     //if update(2)--->the gameState:2
    database.ref('/').update({
      gameState: state
    });
  }

  //calling a function
  //ojectname.function(parameter)
  //game.update(0)

  async start() {
    if(gameState === 0) {      
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");

      if(playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      
      form = new Form();
      form.display();
    }
    
    car1 = createSprite(100, 200);
    car1.addImage(car1Img);
    car2 = createSprite(300, 200);
    car2.addImage(car2Img);
    car3 = createSprite(500, 200);
    car3.addImage(car3Img);
    car4 = createSprite(700, 200);
    car4.addImage(car4Img);

    cars = [car1, car2, car3, car4];
  }

  play() {
    form.hide();
    //show on the screen game to start in position 120,100
    //textSize(30);
    //text("Game Start", 120, 100);

    //getting all the players data by calling the static function from player class
    Player.getPlayerInfo();

    //fetching the carAtEnd data by calling the function ---> individually the player objects
    player.getCarAtEnd(); 

    //Display all the info on screen=name,distnace
    if(allPlayers !== undefined) {
      
        //for(var plr in allPlayers) {
        //first time plr=1, index=1
        //second time plr=2, index=2
        //third time plr=3, index=3
        //fourth time plr=4, index=4

        //meaning of index
        //When data objects are stored in an array, 
        //individual objects are selected by an index that is usually a non-negative scalar integer. 
        //Indexes are also called subscripts. 
        //An index maps the array value to a stored object
      background("grey");

      //x position=o
      //y position=-displayHeight*4 because i want the car to start from the below
      //width=displayWidth
      //height=displayHeight*5
      //we are not moving right and left so we can keep wigth to be be same as canvas width
      //but we are moving up, so we want a long image of the track
      //we are starting the track image 4 times of screen orgin--->so minus we are using
      image(trackImg, 0, -displayHeight * 4, displayWidth, displayHeight * 5);
      
      var x = 175;
      var y;
      
      //index for the array
      var index = 0;
    
      for(var plr in allPlayers) {
        //adding 1 to the index for every loop
        index = index + 1;                            //first time, index=1
                                                                  
        //position the cars a little awayfrom each other in x direction
        x = x + 200;

        //for the y position of the sprite, we will use distance data from the database
        y = displayHeight - allPlayers[plr].distance;

        cars[index-1].x = x;               
        cars[index-1].y = y;
        
       if(index===player.index){
        stroke(10);
        fill("green");
        ellipse(x, y, 50, 50);
        cars[index-1].shapeColor="red";

        camera.position.x = displayWidth/2;
        camera.position.y = cars[index-1].y;
       }
       //text(allPlayers[plr].name,allPlayers[plr].distance,120,display_position);       
      }
    }

    //Whenever the keydown is pressed we want the distance to increase by 5 and the function updatew to be called 
    //so that the distance gets updated in the database
    if(keyIsDown(UP_ARROW) && player.index!==null) {
      player.distance+= 50;
      player.update();
    }
    
    //if the players distance is become greater than 3860 then game state should be end
    if(player.distance > 3860) {
      gameState = 2;

      //here whenever one player crosses the finish line, we want the rank of the player to increase
      //in the beggining the rank=0
      //first player finishes the line then rank=1
      //second player
      player.rank+= 1;

      //we want this increased rank to be updated into the database
      Player.updateCarsRank(player.rank);
    }
    
    drawSprites();
  }

  end() {
    console.log("Game Ended");
    console.log("Your ranks is : " + player.rank);
  }
}

//whenever you call the normal function or a property of a class ---> you always call it with the object
//whenever you call the static function of a class ---> you call it with class name
