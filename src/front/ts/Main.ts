interface DeviceInt {
  id:string;
  name:string;
  description:string;
  state:string;
  type:string;
}

class Main implements EventListenerObject, GETResponseListener, PATCHResponseListener {

  api = new API();
  view = new ViewMainPage();

  constructor(){
    
  }

  handlePATCHResponse(status:number, response:string):void {
    console.log(status);
    console.log(response);
  }

  handleGETResponse(status:number, response:string):void {
    let devices:DeviceInt[]= JSON.parse(response);
    this.view.showDevices(devices,this);

    for (let device of devices ) {
      console.log(device)
      document.getElementById("dev_"+device.id).addEventListener("click",this);
    }    
  }

  main():void {
      this.api.requestGET("devices",this);
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
      //target.textContent = this.counter.toString();
      this.api.requestGET("devices",this);
      console.log("handling boton");
    } else {
      let state:boolean =    (<HTMLInputElement>evt.target).checked;
      let id = target.id.slice(4);
      let data = { "id":`${id}`, "state":state };
      this.api.requestPATCH("http://localhost:8000/devices",data,this);
      console.log("sending patch");
      console.log(data)
    }
  }
}

window.onload = function(){
    let main:Main = new Main();
    main.main()
};
