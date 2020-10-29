interface POSTResponseListener{
  handlePOSTResponse(status:number, response:string):void;
}

interface GETResponseListener {
  handleGETResponse(status:number, response:string): void;
}

class API{

  requestGET(url:string, listener: GETResponseListener):void {
    let xhr:XMLHttpRequest = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4) {
        if(xhr.status == 200) {
          listener.handleGETResponse(xhr.status,xhr.responseText);
        } else {
          listener.handleGETResponse(xhr.status,null);
        }
      }
    };
    xhr.open('GET', url, true);
    xhr.send(null);
  }
  
  requestPOST(url:string, data:object, listener:POSTResponseListener):void{
    let xhr:XMLHttpRequest = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          listener.handlePOSTResponse(xhr.status,xhr.responseText);
        } else {
          listener.handlePOSTResponse(xhr.status, null);
        }
      }
    }

    xhr.open("POST", url);
    let formData:FormData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    xhr.send(formData);

  }
}
