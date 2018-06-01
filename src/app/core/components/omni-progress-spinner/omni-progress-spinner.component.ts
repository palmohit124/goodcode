import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ClientState, getShowSpinner } from '../../../core/reducers/index';

@Component({
  selector: 'omni-progress-spinner',
  templateUrl: './omni-progress-spinner.component.html',
  styleUrls: ['./omni-progress-spinner.component.scss']
})
export class OmniProgressSpinnerComponent implements OnInit {

  showSpinner$: Observable<boolean>;

  constructor(private store: Store<ClientState>) {
  }

  ngOnInit() {
    this.showSpinner$ = this.store.select(getShowSpinner);
  }

}
