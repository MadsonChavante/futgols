import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { StoregeProvider } from 'src/storege/storege';
import { LocalUser } from 'src/models/local_user';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  private grupos: any;
  currentMatchday;

  constructor(
    private appService: AppService,
    private storegeService: StoregeProvider,
    private platform: Platform,
  ) { }

  ngOnInit() {
    
    var localUser: LocalUser = this.storegeService.currentLocalUserValue;
    this.currentMatchday = localUser.currentMatchday;
    this.getMatchs(true);
    
  }

  getMatchs(scroll = false){
    this.appService.getMatchs(this.currentMatchday).subscribe(res => {

      this.grupos = this.groupBy(res['matches'], "utcDate");
      this.grupos = Object.entries(this.grupos);
      
      if(scroll){
        this.scroll();
      }

    })
  }

  scroll() {
    
    this.platform.ready().then((readySource) => {
      
      var w = this.platform.width();
      var x = Math.trunc(w / 90);
      var y = this.currentMatchday - x;
      if (y > 0) {
        var scroll = y * 90;
        var teste = document.getElementById("segment");
        teste.scrollTo(scroll + 90, 0);
      }

    });
  }

  changeSegment(el) {
    this.currentMatchday = +el.detail.value;
    this.grupos = null;
    this.getMatchs();
  }

  groupBy(arr, property) {
    var isso = this;
    return arr.reduce(function (memo, x) {
      var p = isso.convertDate(x[property]);
      if (!memo[p]) { memo[p] = []; }
      memo[p].push(x);
      return memo;
    }, {});
  }


  convertDate(date) {
    var today = new Date(date);
    return today.toLocaleDateString("pt-BR", {
      hour: '2-digit',
      minute: '2-digit'
    }).replace("/2019 ", " - ");
  }

}
