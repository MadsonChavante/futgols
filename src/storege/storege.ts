import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { LocalUser } from 'src/models/local_user';

@Injectable({
  providedIn: 'root'
})
export class StoregeProvider {

  public localUser: LocalUser;
  private currentLocalUserSubject: BehaviorSubject<LocalUser>;
  public currentLocalUser: Observable<LocalUser>;

  constructor() {
    this.currentLocalUserSubject= new BehaviorSubject<LocalUser>(JSON.parse(localStorage.getItem('LocalUser')));
    this.currentLocalUser = this.currentLocalUserSubject.asObservable();
  }

  public get currentLocalUserValue(): LocalUser {
    return this.currentLocalUserSubject.value;
  }

  setLocalUser(obj: LocalUser) {
    if (obj == null) {
      localStorage.removeItem("LocalUser");
    }
    else {
      this.currentLocalUserSubject.next(obj);
      localStorage.setItem("LocalUser", JSON.stringify(obj));
    }
  }


}