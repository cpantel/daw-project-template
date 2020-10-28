interface DeviceInt {
  id:string;
  name:string;
  description:string;
  state:string;
  type:string;
}

class Main implements EventListenerObject, GETResponseListener, POSTResponseListener {

  counter = 0;
  mf = new MyFramework();
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
    this.showDevices(devices);
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

  showDevicesOriginal(list:DeviceInt[]):void {
    let ulist = document.getElementById("devicesList");
    for (let device of list) {
      let path = "static/images/window.png";
      if (device.type =="0") {
         path = "static/images/lightbulb.png";
      }
      ulist.innerHTML += `
      <li class="collection-item avatar">
      <img src="${path}" alt="" class="circle">
         <span class="title">${device.name}</span>
         <p>${device.description} <br>
         </p>
         <a href="#!" class="secondary-content">
           <div class="switch">
             <label>
                Off
               <input id="dev_${device.id}"type="checkbox">
               <span class="lever"></span>
                On
              </label>
            </div>
         </a>
       </li>      
      `;
    }

  }
    showDevices(list:DeviceInt[]):void {
        let ulist = document.getElementById("devicesList");
        
        list.forEach(device => {
            let li = document.createElement("li");
            li.setAttribute("class", "collection-item avatar");
            var img= document.createElement("img");
            if (device.type == "0") {
                img.setAttribute("src","static/images/lightbulb.png");
            } else {
                img.setAttribute("src","static/images/window.png");
            }
            

            var span = document.createElement("span");
            span.setAttribute("class","title");
            span.appendChild(document.createTextNode(device.name))

            var p = document.createElement("p");
            p.appendChild(document.createTextNode(device.description));
            var a = document.createElement("a");
            a.setAttribute("class", "secondary-content");
            
            var div = document.createElement("div");
            div.setAttribute("class", "switch");
            var label = document.createElement("label");
            label.appendChild(document.createTextNode("off"));
            var input=document.createElement("input");
            input.setAttribute("type","checkbox");
            input.setAttribute("id","dev_"+device.id)
            var span2 = document.createElement("span");
            span2.setAttribute("class", "lever")
            label.appendChild(input);
            label.appendChild(span2)

            label.appendChild(document.createTextNode("on"));
            
            div.appendChild(label)
            a.appendChild(div)
            

            li.appendChild(img);
            li.appendChild(span);
            li.appendChild(p);
            li.appendChild(a);
            
            ulist.appendChild(li);
            input.addEventListener("click",this);
               
            

        });
    }

  mostrarUsers(users:Array<User>):void {
    
      users.forEach( user => user.printInfo());
  }

  handleEvent(evt:Event):void{
    //let target = this.mf.getElementByEvent(evt);
    let target = <HTMLElement>evt.target;
    let type   = evt.type;
    console.log("target: " + target + " type: " + type +  " id: " + target.id);
    //console.log(target);
    //console.log(this);
    if (target.id=="boton") {
      this.counter++;
      target.textContent = this.counter.toString();
      this.mf.requestGET("devices.json",this);
    } else {
      let state:boolean =    (<HTMLInputElement>evt.target).checked;
      let data = { "id":`${target.id}`, "state":state };
//       this.mf.requestPOST ("https://cors-anywhere.herokuapp.com/https://postman-echo.com/post", data, this);
      
       this.mf.requestPOST("http://localhost:8080/devices.php",data,this);
    }
  }


}

window.onload = function(){
    let main:Main = new Main();
    main.main()
};
