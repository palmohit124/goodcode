import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'omni-search',
  templateUrl: './omni-search.component.html',
  styleUrls: ['./omni-search.component.scss'],
})
export class OmniSearchComponent {

  @Output() search = new EventEmitter();

  term = new FormControl();

  constructor() {
    this.term.valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(term => this.search.emit(term));
  }
}
