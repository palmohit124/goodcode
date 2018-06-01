import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { TagManagementState } from '../../../reducers';
import { getAccount } from '../../../reducers';
import { TagScriptService } from '../../../services/tag-script-snippet/tag-script.service';

@Component({
  selector: 'omni-code-snippet-modal',
  templateUrl: './code-snippet-modal.component.html',
  styleUrls: ['./code-snippet-modal.component.scss']
})

export class CodeSnippetModalComponent implements OnInit, OnDestroy {
  accountId: string;
  scriptData: string;
  accountSubscription: Subscription;

  constructor(public dialogRef: MatDialogRef<CodeSnippetModalComponent>,
    private store: Store<TagManagementState>,
    private tagScriptService: TagScriptService) {

    this.accountSubscription = this.store.select(getAccount)
      .filter(state => state !== null)
      .subscribe(accountId => {
        this.accountId = accountId;
        this.tagScriptService.loadTagScriptSnippet(this.accountId).subscribe((response) => {
          this.scriptData = `<!-- Start Omni Tag Snippet -->\n`
            + response.snippet +
            `\n <!-- End Omni Tag Snippet -->`;
        });
      });

  }


  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.accountSubscription) {
      this.accountSubscription.unsubscribe();
    }
  }
}
