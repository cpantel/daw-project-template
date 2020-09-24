class Main {
  constructor(){

  }
  main():void {
      let users:Array<User> = new Array<User>();
      users.push(new User(0,"Ana", "ana@gmail.com"));
      users.push(new User(1,"Beto", "beto@gmail.com"));
      users.push(new User(2,"Camila", "camila@gmail.com"));

      this.mostrarUsers(users);

      let mf:MyFramework = new MyFramework();

      let b:HTMLElement = mf.getElementById("button_1");

      b.textContent = "Hello World";

      b.addEventListener("click", this.evento);
  }

  mostrarUsers(users:Array<User>):void {
    
      users.forEach( user => user.printInfo());
  }

  evento(ev:Event):void {
    console.log("click in button");
    console.log(this);
  }

}

window.onload = function(){
    let main:Main = new Main();
    main.main()
};
