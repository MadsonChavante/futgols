import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { StoregeProvider } from 'src/storege/storege';
import { LocalUser } from 'src/models/local_user';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  private loading: boolean;
  private aux: boolean = false;
  private classificacao: any;

  constructor(
    private appService:AppService,
    private storegeService:StoregeProvider
    ) {}

  ngOnInit() { 
    this.loading = true;
    this.appService.getClassificacao().subscribe( res => {
      var localUser:LocalUser = new LocalUser();
      localUser.currentMatchday = res['season']['currentMatchday'];

      this.storegeService.setLocalUser(localUser);
      
      this.classificacao = res['standings']["0"]['table']
      console.log(this.classificacao);
      
      this.loading = false
    })
  }



}
