import { Component } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  private loading: boolean;
  private aux: boolean = false;
  private classificacao: any;

  constructor(private appService:AppService) {}

  ngOnInit() { 
    this.loading = true;
    this.appService.getClassificacao().subscribe( res => {
      
      this.classificacao = res['standings']["0"]['table']
      console.log(this.classificacao);
      
      setTimeout( () => {
        this.loading = false
      },500) 
    })
  }

  isBg(){
    this.aux = !this.aux;
    return (this.aux ? 'light' : 'white');
  }

}
