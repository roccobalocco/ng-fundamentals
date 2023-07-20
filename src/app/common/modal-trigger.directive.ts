import { Directive, OnInit, Inject, ElementRef, Input } from '@angular/core';
import { JQUERY_TOKEN } from './jquery.service';
import { Router } from '@angular/router';

@Directive({
  selector: '[modal-trigger]'
})

export class ModalTriggerDirective implements OnInit{
  private el: HTMLElement
  @Input('modal-trigger') modalId?: string

  constructor(el: ElementRef, @Inject(JQUERY_TOKEN) private $ : any, private router: Router) {
    this.el = el.nativeElement;
  }

  ngOnInit(){
    this.el.addEventListener('click', e => {
      this.$(`#${this.modalId}`).modal("show")
    })
  }

}
