import { JQUERY_TOKEN } from './jquery.service';
import { Component, ElementRef, Inject, Input, ViewChild } from '@angular/core'

@Component({
    selector: 'simple-modal',
    template: `
      <div id="{{elementId}}" #modalContainer class="modal fade" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header bg-dark text-light">
              <h4 class="modal-title">{{title}}</h4>
              <button type="button" class="btn-close btn-close-white" data-dismiss='modal' (click)="closeModal()"></button>
            </div>
            <div class="modal.body" (click)="closeModal()">
              <ng-content ></ng-content>
            </div>
          </div>
        </div>
      </div>
    `,
    styles: [`
      .modal-body { height: 250px; overflow-y: scroll; }
    `]
})

export class SimpleModalComponent{
  @Input() title?: string
  @Input() elementId?: string
  @Input() closeOnBodyClick?: string
  @ViewChild('modalContainer') containerEl?: ElementRef

  constructor(@Inject(JQUERY_TOKEN) private $ : any) {
  }

  closeModal(){
    if (this.closeOnBodyClick?.toLocaleLowerCase() == "true")
      this.$(this.containerEl?.nativeElement).modal('hide')
  }

}
