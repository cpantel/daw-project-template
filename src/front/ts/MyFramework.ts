class MyFramework {
  getElementById(id:string):HTMLElement {
    let e:HTMLElement;
    e = document.getElementById(id);
    return e;
  }

  configClick(id:string, callback:Function):void {
 
      let b:HTMLElement = document.getElementById(id);

      b.addEventListener("click", callback);
  } 


}
