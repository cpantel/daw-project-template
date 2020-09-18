/*=============================================================================
 * Authors: Agustin Bassi, Brian Ducca, Santiago Germino 
 * Date: Jul 2020
 * Licence: GPLV3+
 * Project: DAW - CEIoT - Project Structure
 * Brief: Main frontend file (where the logic is)
=============================================================================*/

class User{
    private _id:number;
    private _name:string;
    private _email:string;
    private _isLogged:boolean;

    constructor( id:number, name:string, email:string) {
        this._id =id;
        this._email= email;
        this._name=name;
    }
    set name(name:string) {
        this._name = name;
    }
    set email(email:string) {
        this._email = email;
    }
    set id(id:number) {
        this._id = id;
    }

    get id():number {
        return this._id;
    }

    get name():string {
        return this._name;
    }

    get email():string {
        return this._email;
    }

    printInfo():void {
        console.log("id: " +  this.id + " name: " + this.name + " email: " + this.email);
    }


}

class Main {
  constructor(){

  }
  main():void {
      let users:Array<User> = new Array<User>();
      users.push(new User(0,"Ana", "ana@gmail.com"));
      users.push(new User(1,"Beto", "beto@gmail.com"));
      users.push(new User(2,"Camila", "camila@gmail.com"));
      users.forEach( user => user.printInfo());

  }

}

window.onload = function(){
    let main:Main = new Main();
    main.main()
};
