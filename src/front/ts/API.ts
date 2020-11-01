interface PATCHResponseListener{
  handlePATCHResponse(status:number, response:string):void;
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
  
  requestPATCH(url:string, data:object, listener:PATCHResponseListener):void{
    let xhr:XMLHttpRequest = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          listener.handlePATCHResponse(xhr.status,xhr.responseText);
        } else {
          listener.handlePATCHResponse(xhr.status, null);
        }
      }
    }

    xhr.open("PATCH", url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
  }
}
