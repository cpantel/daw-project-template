class ViewMainPage {
    showDevices(list:DeviceInt[],element:Main):void {

      let e:HTMLElement = document.getElementById("devicesList");
      e.innerHTML="";
      for (let device of list) {
          let image = "lightbulb.png";
          let checked = "";
          if (device.type == "1") image = "window.png";
          if (device.state == "1") checked = "checked"
          e.innerHTML += `<li class="collection-item avatar">
            <img src="static/images/${image}" alt="" class="circle">
            <span class="title" id="edit_${device.id}">${device.name} (Editar)</span>
            <p>${device.description}</p>
            <a href="#!" class="secondary-content">
              <div class="switch">
                <label>
                OFF
                <input id="dev_${device.id}" type="checkbox" ${checked}>
                <span class="lever"></span>
                On
                </label>
              </div>
            </a>
          </li>  
          `;
      }
    }

    editDevice(id:DeviceInt,location:HTMLElement,element:Main):string {
        console.log(`ready to edit ${id}`)
        var d = document.createElement("span");
        location.parentNode.appendChild(d)
        
        d.innerHTML=`<form >
        <div class="row">
        <form class="col s12">
          <div class="row">
            <div class="input-field col s6">
              <input id="device_name" type="text" value="${id.name}">
              <label for="device_name" >Name</label>
            </div>
            <div class="input-field col s6">
              <input id="device_description" type="text"  value="${id.description}">
              <label for="device_description">Description</label>
            </div>
          </div>
          <a class="waves-effect waves-light btn" id="updateDevice">Enviar</a>
        </form>
        </div>
        `;
        return "updateDevice";
        
    }
}