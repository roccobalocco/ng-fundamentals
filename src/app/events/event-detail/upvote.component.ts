import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'upvote',
  templateUrl: './upvote.component.html',
  styles: [`
    .votingWidgetContainer {
      padding-left:24px;
    }
    .votingWidget {
      height: 64px;
      padding-top: 7px;
      border-radius: 21px;
    }
    .votingButton {
      margin-left: -7px;
      margin-top: 1px;
      cursor:pointer;
    }
    .votingButton i {
      color: white;
    }
    .badge-inverse {
      color: #4e5d6c;
    }
    .votingCount {
      margin-left: -11px;
      margin-top: 1px;
      font-weight: bold;
      font-size: 14px;
    }
  `]
})
export class UpvoteComponent implements OnInit {
  @Output() vote = new EventEmitter();
  @Input() count!: number
  @Input() voted!: boolean
  @Input() canVote!: boolean

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.vote.emit({})
    this.voted = !this.voted
  }

  getColor(){
    if (!this.voted)
      return 'red'
    return 'black'
  }

  validVote(){
    if (!this.canVote)
      return 'none'
    return 'block'
  }

}
