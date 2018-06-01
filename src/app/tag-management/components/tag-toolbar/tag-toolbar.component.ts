import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { UserProfile } from '../../../models/user-profile';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ClientState } from '../../../core/reducers';
import { getAccount, TagManagementState } from '../../reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'omni-tag-toolbar',
  templateUrl: './tag-toolbar.component.html',
  styleUrls: ['./tag-toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TagToolbarComponent {
  @Input() user: UserProfile;
  @Output() logoutAction: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  accountState$: Observable<string>;

  constructor(public dialog: MatDialog,
    private state: Store<ClientState>,
    private tagmStore: Store<TagManagementState>) {
    this.accountState$ = this.tagmStore.select(getAccount);
  }

  logout(event: MouseEvent) {
    this.logoutAction.emit(event);
  }
}


