class Form {
  constructor() {
    this.title = createElement('h2');
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h3');
    this.reset = createButton('Reset');
  }

  hide() {
    this.title.hide();
    this.input.hide();
    this.button.hide();
    this.greeting.hide();
  }

  display() {
   
    this.title.html("Car Racing Game");
    this.title.position(displayWidth/2 - 100, 0);
    
    this.input.position(displayWidth/2 - 100, 100);
    this.button.position(displayWidth/2 - 40, 200);

    this.reset.position(displayWidth/4 - 100, 500);

    this.button.mousePressed(()=>{
      //hide the input and button
      this.input.hide();
      this.button.hide();

      //player name has to be inputed
      player.name = this.input.value();

      //var name = this.input.value();
      
      //the playercount should increase
      playerCount+= 1;
      player.index = playerCount;

      //updating player name and playercount
      player.update();
      player.updateCount(playerCount);

      this.greeting.html("Hello " + player.name);
      this.greeting.position(displayWidth/2 - 100, 500);
    });
    
    this.reset.mousePressed(()=>{
      game.update(0);
      player.updateCount(0);
    });
  }
}
