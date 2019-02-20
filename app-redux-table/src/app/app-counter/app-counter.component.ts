import { Component, OnInit, OnChanges, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './app-counter.component.html',
  styleUrls: ['./app-counter.component.css']
})
export class AppCounterComponent implements OnInit, OnChanges {

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    //console.log("=== CHANGES / APP-COUNTER ===");
    //console.log(changes);
  }

  @Input() counter: number;

  @Output() increment: EventEmitter<any> = new EventEmitter();
  @Output() decrement: EventEmitter<any> = new EventEmitter();
  @Output() restart: EventEmitter<any> = new EventEmitter();

  private incrementCounter() {
  	this.increment.emit();
  }

  private decrementCounter() {
  	this.decrement.emit();
  }

  private restartCounter() {
  	this.restart.emit();
  }

}
