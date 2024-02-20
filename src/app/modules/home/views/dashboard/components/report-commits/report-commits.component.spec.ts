import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCommitsComponent } from './report-commits.component';

describe('ReportCommitsComponent', () => {
  let component: ReportCommitsComponent;
  let fixture: ComponentFixture<ReportCommitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCommitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportCommitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
