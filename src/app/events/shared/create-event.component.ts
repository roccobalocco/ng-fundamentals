import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IEvent } from './event.model';
import { Router } from '@angular/router';
import { EventService } from './event.service';

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
  newEvent!: IEvent

  constructor(private router: Router, private eventService:EventService){}

  ngOnInit(): void{
    this.newEvent = {
      id: 998,
      sessions: [],
      name: 'Ng Spectacular',
      date: new Date('08/08/2020'),
      time: '10am',
      price: 100.00,
      location: {
        address: '456 Happy St',
        city: 'FeliCity',
        country: 'Angularistan'
      },
      onlineUrl: 'http://ngSpectacular.com',
      imageUrl: 'https://colinstodd.com/images/posts/angular.png'
    }
    this.eventForm = new FormGroup({
      name: new FormControl(this.newEvent.name, [Validators.required, Validators.pattern('[a-zA-Z].*')]),
      date: new FormControl(this.newEvent.date.toLocaleDateString(), Validators.required),
      time: new FormControl(this.newEvent.time, Validators.required),
      price: new FormControl(this.newEvent.price, Validators.required),
      imageUrl: new FormControl(this.newEvent.imageUrl, [Validators.required, Validators.pattern('[a-zA-Z].*')]),
      address: new FormControl(this.newEvent.location?.address, [Validators.required]),
      city: new FormControl(this.newEvent.location?.city, [Validators.required, Validators.pattern('[a-zA-Z].*')]),
      country: new FormControl(this.newEvent.location?.country, [Validators.required, Validators.pattern('[a-zA-Z].*')]),
      onlineUrl: new FormControl(this.newEvent.onlineUrl, Validators.required)
    })
  }

  createEvent(eventForm: FormGroup): void {
    const eventToSave : IEvent = (eventForm.value);
    eventToSave.location = {
      address: eventForm.value.address,
      city: eventForm.value.city,
      country: eventForm.value.country
    }
    this.eventService.saveEvent(eventToSave).subscribe(() => {
      this.router.navigate(['/events'])
      this.isDirty = false
    })
  }


  validate(field: string){
    this.isDirty = true
    return this.eventForm.controls[field].invalid;
  }

  pattern(field: string){
    return this.eventForm.controls[field].hasError('pattern')
  }

  isValid(field: string){
    return this.eventForm.controls[field].valid
  }


  cancel(){
    this.router.navigate(['/events']);
  }
}
