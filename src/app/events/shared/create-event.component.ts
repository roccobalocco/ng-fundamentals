import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IEvent } from './event.model';
import { Router } from '@angular/router';

@Component({
  templateUrl: './create-event.component.html',
  styles: [`
  em {float: right; color: #E05C65; padding-left: 10px;}
  .error ::-webkit-input-placeholder {color: red;}
  .error ::-moz-placeholder {color: red;}
  .error :-moz-placeholder {color: red;}
  .error :ms-input-placeholder {color: red;}
  `]
})
export class CreateEventComponent{
  isDirty: boolean = false
  eventForm!: FormGroup
  name!: FormControl
  date!: FormControl
  time!: FormControl
  price!: FormControl
  imageUrl!: FormControl
  address!: FormControl
  city!: FormControl
  country!: FormControl
  onlineUrl!: FormControl
  newEvent!: IEvent

  constructor(private router: Router){}

  ngOnInit(): void{
    this.name = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z].*')])
    this.date = new FormControl('', Validators.required)
    this.time = new FormControl('', Validators.required)
    this.price = new FormControl('', Validators.required)
    this.imageUrl = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z].*')])
    this.address = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z].*')]);
    this.city = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z].*')]);
    this.country = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z].*')]);
    this.onlineUrl = new FormControl('', Validators.required);

    this.eventForm = new FormGroup({
      name: this.name,
      date: this.date,
      time: this.time,
      price: this.price,
      imageUrl: this.imageUrl,
      address: this.address,
      city: this.city,
      country: this.country,
      onlineUrl: this.onlineUrl,
    })
  }

  createEvent(newEvent: IEvent): void {
    console.log("event created")

  }


  validate(field: string){
    this.isDirty = true
    return this.eventForm.controls[field].invalid
    && this.eventForm.controls[field].touched;
  }

  pattern(field: string){
    return this.eventForm.controls[field].hasError('pattern')
  }

  cancel(){
    this.router.navigate(['/events']);
  }
}
