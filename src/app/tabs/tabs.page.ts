import { Component } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private appService:AppService) {}

  ngOnInit() { 
    this.appService.abrirExtrato().subscribe( res => {
      console.log(res);      
    })
  }

}
