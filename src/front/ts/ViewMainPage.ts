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
            <span clas="title">${device.name}</span>
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
    showDevices2(list:DeviceInt[],element:Main):void {
        let ulist = document.getElementById("devicesList");
        list.forEach(device => {


            var span2 = document.createElement("span");
            span2.setAttribute("class", "lever")

            var label = document.createElement("label");
            label.appendChild(document.createTextNode("Off"));

            var input=document.createElement("input");
            input.setAttribute("type","checkbox");
            input.setAttribute("id","dev "+device.id)

            label.appendChild(input);
            label.appendChild(span2)

            label.appendChild(document.createTextNode("On"));

            var div = document.createElement("div");
            div.setAttribute("class", "switch");

            div.appendChild(label)

            var img= document.createElement("img");
            if (device.type == "0") {
                img.setAttribute("src","static/images/lightbulb.png");
            } else {
                img.setAttribute("src","static/images/window.png");
            }

            var span = document.createElement("span");
            span.setAttribute("class","title");
            span.appendChild(document.createTextNode(device.name))

            var a = document.createElement("a");
            a.setAttribute("class", "secondary-content");
            a.appendChild(div)

            var p = document.createElement("p");
            p.appendChild(document.createTextNode(device.description));

            let li = document.createElement("li");
            li.setAttribute("class", "collection-item avatar");

            li.appendChild(img);
            li.appendChild(span);
            li.appendChild(p);
            li.appendChild(a);
            
            ulist.appendChild(li);
            input.addEventListener("click",element);
        });
    }


}