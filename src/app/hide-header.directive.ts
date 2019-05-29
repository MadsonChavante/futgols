import { Directive, Input, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[hide-header]', // Attribute selector
  host: {
    '(ionScroll)': 'onContentScroll($event)'
  }
})
export class HideHeaderDirective {

  @Input("header") header: any;
  headerHeight;
  scrollContent;

  constructor(public element: ElementRef, public renderer: Renderer) {

    console.log('Hello HideHeaderDirective Directive');
  }

  ngOnInit(){ 
    console.log(this.renderer);
    if(this.renderer){
      this.headerHeight = this.header.clientHeight;
      this.renderer.setElementStyle(this.header.el, 'webkitTransition', 'top 700ms');
      this.scrollContent = document.getElementById("scroll-content");
      this.renderer.setElementStyle(this.scrollContent, 'webkitTransition', 'margin-top 700ms');
    }
  }

  onContentScroll(event){
    if(event.detail.scrollTop > 40){
      this.renderer.setElementStyle(this.header.el, "top", "-56px")
      this.renderer.setElementStyle(this.header.el, "transition", "500ms")
      this.renderer.setElementStyle(this.header.el, "margin-top", "-56px")
      this.renderer.setElementStyle(this.scrollContent, "margin-top", "0px")
    } else {
      this.renderer.setElementStyle(this.header.el, "top", "0px");
      this.renderer.setElementStyle(this.header.el, "transition", "500ms")
      this.renderer.setElementStyle(this.header.el, "margin-top", "0px")
      this.renderer.setElementStyle(this.scrollContent, "margin-top", "56px")
    }
  }

}