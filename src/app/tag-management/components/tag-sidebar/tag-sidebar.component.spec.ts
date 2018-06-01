import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {Store, StoreModule} from '@ngrx/store';
import {TagSidebarComponent} from './tag-sidebar.component';
import {RouterTestingModule} from '@angular/router/testing';
import {reducers, ruleset} from '../../reducers';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('TagSidebarComponent', () => {
  let component: TagSidebarComponent;
  let fixture: ComponentFixture<TagSidebarComponent>;
  let store: Store<ruleset.RulesetState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        StoreModule.forRoot(reducers),
      ],
      declarations: [TagSidebarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(TagSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create TagSidebarComponent', () => {
    expect(component).toBeTruthy();
  });

});
