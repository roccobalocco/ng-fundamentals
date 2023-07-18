import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ISession } from '../shared/event.model'

@Component({
  templateUrl : "./create-session.component.html"
})
export class CreateSessionComponent{
  newSessionForm!: FormGroup

  ngOnInit(){

    this.newSessionForm = new FormGroup({
      sessionName: new FormControl("", [Validators.required]),
      presenter: new FormControl("", [Validators.required]),
      duration: new FormControl("", [Validators.required]),
      level: new FormControl("", [Validators.required]),
      abstract: new FormControl("", [Validators.required,
        Validators.maxLength(400)])
    })
  }

  saveSession(newSession: ISession){
    console.log(newSession)
  }
}
