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
  devices:DeviceInt[];

  constructor(){
    
  }

  handlePATCHResponse(status:number, response:string):void {
    console.log(status);
    console.log(response);
    this.api.requestGET("devices",this);    
  }

  handleGETResponse(status:number, response:string):void {
    this.devices= JSON.parse(response);
    this.view.showDevices(this.devices,this);

    for (let device of this.devices ) {
      document.getElementById("dev_"+device.id).addEventListener("click",this);
      document.getElementById("edit_"+device.id).addEventListener("click",this);
    }    
  }

  main():void {
      this.api.requestGET("devices",this);
      document.getElementById("boton").addEventListener("click",this);
  }

  handleEvent(evt:Event):void{
    let target = <HTMLElement>evt.target;
    let type   = evt.type;
    console.log("target: " + target + " type: " + type +  " id: " + target.id) ;
    target.classList.forEach(className => console.log("   class: " +  className));
    
    if (target.id=="boton") {
      this.api.requestGET("devices",this);
      console.log("handling boton");
    } else {
      
      if (target.classList[0] == "title") {
        let device = this.devices.filter(
          elem => elem.id == target.id.slice(5)
        )
        console.log(device)
        let b = this.view.editDevice(device[0],target, this);
        document.getElementById(b).addEventListener("click",this);
      } else if(target.id == "updateDevice") {
        console.log("ready to update a device");
        
        let data = {
          id: 1,
          name: (<HTMLInputElement>document.getElementById("device_name")).value,
          description : (<HTMLInputElement>document.getElementById("device_description")).value
        }
        this.api.requestPATCH("devices", data, this);

 //       this.api.requestGET("devices",this);

      } else {
        let state:boolean = (<HTMLInputElement>evt.target).checked;
        let id = target.id.slice(4);
        let data = { "id":`${id}`, "state":state };
        this.api.requestPATCH("http://localhost:8000/devices",data,this);
        console.log("sending patch");
        console.log(data)
      }
    }
  }
}

window.onload = function(){
    let main:Main = new Main();
    main.main()
};
