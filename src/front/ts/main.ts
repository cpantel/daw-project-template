interface DeviceInt {
  id:string;
  name:string;
  description:string;
  state:string;
  type:string;
}

class Main implements EventListenerObject, GETResponseListener {

  counter = 0;
  mf = new MyFramework();
  constructor(){
    this.counter = 0;
  }

  handleGETResponse(status:number, response:string):void {
    let devices:DeviceInt[]= JSON.parse(response);
    console.log("status: " + status + " response: " + response); 
    console.log(devices);
  }

  main():void {
      let users:Array<User> = new Array<User>();
      users.push(new User(0,"Ana", "ana@gmail.com"));
      users.push(new User(1,"Beto", "beto@gmail.com"));
      users.push(new User(2,"Camila", "camila@gmail.com"));

      this.mostrarUsers(users);

      let b:HTMLElement = document.getElementById("boton");
      b.addEventListener("click",this);

  }

  mostrarUsers(users:Array<User>):void {
    
      users.forEach( user => user.printInfo());
  }

  handleEvent(evt:Event):void{
    let target = this.mf.getElementByEvent(evt);
    console.log("click");
    console.log(target);
    console.log(this);
    this.counter++;
    target.textContent = this.counter.toString();
    this.mf.requestGET("devices.json",this);
  }


}

window.onload = function(){
    let main:Main = new Main();
    main.main()
};
