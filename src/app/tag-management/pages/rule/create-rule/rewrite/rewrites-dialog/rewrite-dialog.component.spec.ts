import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Store, StoreModule, combineReducers} from '@ngrx/store';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatDialogRef, MAT_DIALOG_DATA , MatCardModule,  MatSelectModule,  MatInputModule} from '@angular/material';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { RewritesDialogComponent } from './rewrites-dialog.component';
import { TagManagementState, reducers } from '../../../../../reducers';
import { RewriteCampaignService } from '../../../../../services/rewrite-campaign/rewrite-campaign.service';
import * as fromRoot from '../../../../../../core/reducers';


describe('RewriteDialogComponent', () => {
    let component: RewritesDialogComponent;
    let fixture: ComponentFixture<RewritesDialogComponent>;
    let store: Store<TagManagementState>;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          FormsModule,
          ReactiveFormsModule,
          MatCardModule,
          MatSelectModule,
          MatInputModule,
          BrowserAnimationsModule,
          StoreModule.forRoot({
            ...fromRoot.reducers,
            'tagManagement': combineReducers(reducers)
          }),
        ],
        declarations: [RewritesDialogComponent],
        providers: [
          { provide: MAT_DIALOG_DATA, useValue: {} },
          { provide: MatDialogRef, useValue: {} },
          { provide: RewriteCampaignService, useValue: {} }
        ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      store = TestBed.get(Store);
      fixture = TestBed.createComponent(RewritesDialogComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create RewriteDialogComponent', () => {
      expect(component).toBeTruthy();
    });
});
