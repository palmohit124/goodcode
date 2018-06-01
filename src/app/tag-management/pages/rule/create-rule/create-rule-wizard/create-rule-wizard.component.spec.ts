import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatDialogRef, MAT_DIALOG_DATA , MatCardModule,  MatSelectModule,  MatInputModule, MatDialogModule } from '@angular/material';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { CreateRuleWizardComponent } from './create-rule-wizard.component';
import { TagManagementState, reducers } from '../../../../reducers';
import * as fromRoot from '../../../../../core/reducers';
import { RewriteCampaignService } from '../../../../services/rewrite-campaign/rewrite-campaign.service';

describe('CreateRuleWizardComponent', () => {
  let component: CreateRuleWizardComponent;
  let fixture: ComponentFixture<CreateRuleWizardComponent>;
  let store: Store<TagManagementState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRuleWizardComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: RewriteCampaignService, useValue: {} },
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatCardModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'tagManagement': combineReducers(reducers)
        }),
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(CreateRuleWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create CreateRuleWizardComponent', () => {
    expect(component).toBeTruthy();
  });
});
