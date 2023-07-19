import { Component, EventEmitter, Output } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ISession } from '../shared/event.model'
import { restrictedWords } from '../shared/restricted-word.validator'

@Component({
  templateUrl : "./create-session.component.html",
  selector : 'create-session',
  styles: [`
    em {float: right; color: #E05C65; padding-left: 10px;}
    .error input, .error select, .error textarea ::-webkit-input-placeholder {color: red;}
    .error input, .error select, .error textarea ::-moz-placeholder {color: red;}
    .error input, .error select, .error textarea :-moz-placeholder {color: red;}
    .error input, .error select, .error textarea :ms-input-placeholder {color: red;}
  `]
})

export class CreateSessionComponent{
  newSessionForm!: FormGroup
  isDirty: boolean = false
  @Output() saveNewSession = new EventEmitter();
  @Output() cancelAddSessions = new EventEmitter();

  ngOnInit(){

    this.newSessionForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      presenter: new FormControl("", [Validators.required]),
      duration: new FormControl("", [Validators.required]),
      level: new FormControl("", [Validators.required]),
      abstract: new FormControl("", [Validators.required,
        Validators.maxLength(400), restrictedWords(['foo', 'bar'])])
    })
  }

  cancel(){
    this.cancelAddSessions.emit()
  }

  saveSession(formValues: any){
    let session : ISession = {
      name: formValues.name,
      duration: +formValues.duration, //conversione numerica
      level: formValues.level,
      presenter: formValues.presenter,
      abstract: formValues.abstract,
      id: 0,
      voters: []
    }
    this.isDirty = true
    this.saveNewSession.emit(session)
  }

  validate(field: string): boolean{
    this.isDirty = true
    return this.newSessionForm.controls[field].invalid &&
      this.newSessionForm.controls[field].dirty
  }

}
