import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatDialogModule, MatMenuModule, MatPaginatorModule, MatSlideToggleModule, MatSliderModule, MatDialogRef } from '@angular/material';
import { TagFeaturesModalComponent } from './tag-features-modal.component';
import * as fromRoot from '../../../../core/reducers';
import { TagManagementState, reducers } from '../../../reducers';
import { tagFeatures } from '../../../reducers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { LoadSuccess } from '../../../actions/tag-features.actions';
import { TagFeatures } from '../../../../models/tag-features';
import { tagFeaturesActions } from '../../../actions';
class MatDialogRefMock { }
const mockTagFeatures: TagFeatures[] = [{

    'featureId': 1,
    'name': 'Cookie Sync',
    'enabled': true,
    'description': 'This is cookie sync',
    'providers': [
        {
            'providerId': 100,
            'name': 'Google',
            'enabled': false
        },
        {
            'providerId': 101,
            'name': 'Quantcast',
            'enabled': false
        },
        {
            'providerId': 102,
            'name': 'Adobe',
            'enabled': false
        }
    ]


}];
describe('TagFeaturesModalComponent', () => {
    let component: TagFeaturesModalComponent;
    let fixture: ComponentFixture<TagFeaturesModalComponent>;
    let store: Store<TagManagementState>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TagFeaturesModalComponent],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                MatMenuModule,
                MatDialogModule,
                MatPaginatorModule,
                MatCardModule,
                MatSlideToggleModule,
                MatSliderModule,
                StoreModule.forRoot({
                    ...fromRoot.reducers,
                    'tagManagement': combineReducers(reducers)
                }),
                RouterTestingModule
            ],
            providers: [
                { provide: MatDialogRef, useClass: MatDialogRefMock }
            ]
        })
            .compileComponents();
    }));


    beforeEach(() => {
        store = TestBed.get(Store);
        fixture = TestBed.createComponent(TagFeaturesModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });


    it('should create TagFeaturesModalComponent', () => {
        expect(component).toBeTruthy();
    });

    describe('when a tag-features list load is successful', () => {
        beforeEach(() => { store.dispatch(new tagFeaturesActions.LoadSuccess(mockTagFeatures)); });
        it('should get tag-features list', () => {
            component.tagFeaturesState$.subscribe(p => expect(p.tagFeatures).toEqual(mockTagFeatures));
        });
    });
});
