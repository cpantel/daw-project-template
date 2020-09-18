/*=============================================================================
 * Authors: Agustin Bassi, Brian Ducca, Santiago Germino 
 * Date: Jul 2020
 * Licence: GPLV3+
 * Project: DAW - CEIoT - Project Structure
 * Brief: Main frontend file (where the logic is)
=============================================================================*/

class Main {
  constructor(){

  }
  main():void {
      console.log("mensaje Main.main")
  }

}

window.onload = function(){
    let main:Main = new Main();
    main.main()
};
