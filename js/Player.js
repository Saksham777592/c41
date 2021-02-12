class Player {
  constructor(){
   //intialised player objects properties
   this.index = null;
   this.distance = 0;
   this.name = null;
   this.rank = null;
  }

  getCount(){
    database.ref('playerCount').on("value", (data)=>{
      playerCount = data.val();
    });
  }

  updateCount(count){    //javascript to json-->{}
    database.ref('/').update({  
    playerCount: count                                 //playercount of the database
    });
  }
  //ojectname.function(parameter);
  //player.updateCount(0);

  // in the form.js there is player.update(name)
  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name: this.name, 
      distance: this.distance
    });
  }
  
  //static function which are called by the class themselves rather than by objects
  //of the class
  //a static function is a member of function of the class that can be called even when object of class is not intilaised
  static getPlayerInfo() {
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    });
    
    //arrow function=>
    //function(data)
    //{
    //  allPlayers = data.val();
    //});
  }

  //refer to the database carAtEnd ---> getting the car at end ---> function as "getCarAtEnd"
  //refer and keep listening to the carAtEnd in the database
  //this value fetched has to be stored in the rank 
  getCarAtEnd() {
    database.ref('carAtEnd').on("value", (data)=>{
      this.rank = data.val();
    });
  }

  static updateCarsRank(rank) {
    database.ref('/').update({
      carAtEnd: rank
    });
  }
  
}
