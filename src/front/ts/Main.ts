interface DeviceInt {
  id:string;
  name:string;
  description:string;
  state:string;
  type:string;
}

class Main implements EventListenerObject, GETResponseListener, POSTResponseListener {

  counter = 0;
  api = new API();
  view = new ViewMainPage();

  constructor(){
    this.counter = 0;
  }

  handlePOSTResponse(status:number, response:string):void {
    console.log(status);
    console.log(response);
  }

  handleGETResponse(status:number, response:string):void {
    let devices:DeviceInt[]= JSON.parse(response);
    console.log("status: " + status + " response: " + response); 
    console.log(devices);
    this.view.showDevices(devices,this);
  }

  main():void {
      let users:Array<User> = new Array<User>();
      users.push(new User(0,"Ana", "ana@gmail.com"));
      users.push(new User(1,"Beto", "beto@gmail.com"));
      users.push(new User(2,"Camila", "camila@gmail.com"));
      this.mostrarUsers(users);
      document.getElementById("boton").addEventListener("click",this);
  }

    
  mostrarUsers(users:Array<User>):void {
      users.forEach( user => user.printInfo());
  }

  handleEvent(evt:Event):void{
    let target = <HTMLElement>evt.target;
    let type   = evt.type;
    console.log("target: " + target + " type: " + type +  " id: " + target.id);
    if (target.id=="boton") {
      this.counter++;
      target.textContent = this.counter.toString();
      this.api.requestGET("devices.json",this);
    } else {
      let state:boolean =    (<HTMLInputElement>evt.target).checked;
      let data = { "id":`${target.id}`, "state":state };
      this.api.requestPOST("http://localhost:8080/devices.php",data,this);
    }
  }
}

window.onload = function(){
    let main:Main = new Main();
    main.main()
};
