import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatCardModule, MatButtonModule, MatDialogRef } from '@angular/material';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { ClipboardModule } from 'ngx-clipboard';
import { TagManagementState, reducers } from '../../../reducers';
import * as fromRoot from '../../../../core/reducers';
import { CodeSnippetModalComponent } from './code-snippet-modal.component';
import { rulesetActions } from '../../../actions';
import { TagScriptService } from '../../../services/tag-script-snippet/tag-script.service';
import { Observable } from 'rxjs/Observable';

describe('CodeSnippetModalComponent', () => {
  let component: CodeSnippetModalComponent;
  let fixture: ComponentFixture<CodeSnippetModalComponent>;
  let store: Store<TagManagementState>;
  const AccountId = '34H4726U3';

  beforeEach(async(() => {

    const TagScriptServiceStub = {
      loadTagScriptSnippet () {
        return Observable.of({snippet: ''});
      }
   };

    TestBed.configureTestingModule({
      declarations: [CodeSnippetModalComponent],
      imports: [
        MatCardModule,
        MatDialogModule,
        MatButtonModule,
        ClipboardModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'tagManagement': combineReducers(reducers)
        }),
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: TagScriptService, useValue: TagScriptServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(CodeSnippetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create CodeSnippetModalComponent', () => {
    expect(component).toBeTruthy();
  });

  describe('when the dispatched action is add account', () => {
    beforeEach(() => { store.dispatch(new rulesetActions.AddAccount(AccountId)); });
    it('should return component as loaded with account id', () => {
      expect(component.accountId).toEqual(AccountId);
    });
  });
});
