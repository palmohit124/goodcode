import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';

import {Observable} from 'rxjs/Observable';
import {UserProfile} from '../../../../models/user-profile';
import {ClientState, getProfile} from '../../../reducers';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user$: Observable<UserProfile>;

  constructor(private state: Store<ClientState>) {
    this.user$ = this.state.select(getProfile);
  }

  ngOnInit() {
  }

}
