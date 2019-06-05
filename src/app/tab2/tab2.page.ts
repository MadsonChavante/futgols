import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { StoregeProvider } from 'src/storege/storege';
import { LocalUser } from 'src/models/local_user';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  private grupos: any;

  constructor(
    private appService:AppService,
    private storegeService:StoregeProvider
  ) {}

  ngOnInit() {
    var localUser:LocalUser = this.storegeService.currentLocalUserValue;
    this.appService.getMatchs(localUser.currentMatchday).subscribe( res => {
      
      this.grupos = this.groupBy(res['matches'],"utcDate");
      this.grupos = Object.entries(this.grupos);
      console.log(this.grupos);
      

      
    })
  }

  groupBy(arr, property) {
    var isso =  this;
    return arr.reduce(function(memo, x) {
      var p = isso.convertDate(x[property]);
      if (!memo[p]) { memo[p] = []; }
      memo[p].push(x);
      return memo;
    }, {});
  }


  convertDate(date){
    var today  = new Date(date);    
    return today.toLocaleDateString("pt-BR",{
      hour: '2-digit',
      minute:'2-digit'
    }).replace("/2019 "," - ");
  }

}
