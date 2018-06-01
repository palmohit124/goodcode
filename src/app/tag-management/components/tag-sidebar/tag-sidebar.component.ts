import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { getAccount, TagManagementState } from '../../reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'omni-tag-sidebar',
  templateUrl: './tag-sidebar.component.html',
  styleUrls: ['./tag-sidebar.component.scss'],
})
export class TagSidebarComponent {
  showSidebar: Boolean = false;
  accountState$: Observable<string>;

  constructor(private store: Store<TagManagementState>) {
    this.accountState$ = this.store.select(getAccount);
  }

}
