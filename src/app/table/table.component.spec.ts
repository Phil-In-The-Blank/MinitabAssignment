import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataService } from '../data.service';

import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      declarations: [ TableComponent ]
    })
    .compileComponents();
    const dataService = TestBed.inject(DataService);
    dataService.setData(
      {
        sampleSize: 3,
        sampleMean: -4,
        standardDeviation: 5.5,
        hypothesisMean: undefined,
      }
    );

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
