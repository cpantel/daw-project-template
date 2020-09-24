class Main {
  constructor(){

  }
  main():void {
      let users:Array<User> = new Array<User>();
      users.push(new User(0,"Ana", "ana@gmail.com"));
      users.push(new User(1,"Beto", "beto@gmail.com"));
      users.push(new User(2,"Camila", "camila@gmail.com"));
      users.forEach( user => user.printInfo());

      let mf:MyFramework = new MyFramework();

      let b:HTMLElement = mf.getElementById("button_1");

      b.textContent = "Hello World";
  }

}

window.onload = function(){
    let main:Main = new Main();
    main.main()
};
