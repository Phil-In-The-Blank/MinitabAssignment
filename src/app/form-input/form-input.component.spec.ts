import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';

import { FormInputComponent } from './form-input.component';

describe('FormInputComponent', () => {
  let component: FormInputComponent;
  let fixture: ComponentFixture<FormInputComponent>;
  let dataService: DataService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInputComponent ],
      imports: [
        FormsModule
      ],
    })
    .compileComponents();
    dataService = TestBed.inject(DataService);
    fixture = TestBed.createComponent(FormInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('validation', () => {
    it('should allow decimals when wholeNumber is disabled', fakeAsync(() => {
      component.wholeNumber = false;
      component.updateValue(3.7);
      expect(component.isImproperValue).toBe(false);
    }));
    it('should not allow decimals when wholeNumber is enable', fakeAsync(() => {
      component.wholeNumber = true;
      component.updateValue(3.7);
      expect(component.isImproperValue).toBe(true);
      component.updateValue(3)
      expect(component.isImproperValue).toBe(false);
    }));
    it('should enforce minimum value when minimumVal is set and eqMinimumVal is true', fakeAsync(() => {
      component.minimumVal = 2;
      component.eqMinimumVal = false;
      component.updateValue(3);
      expect(component.isImproperValue).toBe(false);
      component.updateValue(2);
      expect(component.isImproperValue).toBe(true);
    }));
    it('should enforce minimum value when minimumVal is set and eqMinimumVal is true', fakeAsync(() => {
      component.minimumVal = 2;
      component.updateValue(1);
      expect(component.isImproperValue).toBe(true);
      component.updateValue(2);
      expect(component.isImproperValue).toBe(false);
    }));
    it('should emit when validation state changes', fakeAsync(() => {
      const spy = spyOn(component.invalidInput, 'emit')
      component.wholeNumber = true
      component.updateValue(2.3);
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledWith(true);
      spy.calls.reset()
      component.updateValue(2);
      fixture.detectChanges();
      expect(spy).toHaveBeenCalledWith(false);
    }));
  });

  describe('error message', () => {
    it('should set error message when value should be a whole number', fakeAsync(() => {
      component.wholeNumber = true;
      component.updateValue(2.7)
      expect(component.errorText).toBe('Please enter a whole number');
    }));
    it('should set error message when value should be >= minimum', fakeAsync(() => {
      component.minimumVal = 2;
      component.updateValue(1);
      expect(component.errorText).toBe('The value must be greater than or equal to 2');
      component.updateValue(2);
      expect(component.errorText).toBe('');
    }));
    it('should set error message when value should be > minimum', fakeAsync(() => {
      component.minimumVal = 0;
      component.eqMinimumVal = false;
      component.updateValue(0);
      expect(component.errorText).toBe('The value must be greater than 0');
    }));
  });
  describe('clear data event', () => {
    it('should reset the input value', fakeAsync(() => {
      component.updateValue(3);
      expect(component.inputVal).toBe(3);
      dataService.clearData();
      expect(component.inputVal).toBe(undefined);
    }))
    it('should reset any error text', fakeAsync(() =>{
      component.wholeNumber = true;
      component.updateValue(3.2)
      expect(component.errorText).toBeTruthy();
      dataService.clearData();
      expect(component.errorText).toBe('');
    }))
    it('should emit invalid value status', fakeAsync(() => {
      const spy = spyOn(component.invalidInput, 'emit')
      component.updateValue(3);
      expect(spy).toHaveBeenCalledWith(false);
      spy.calls.reset()
      dataService.clearData();
      expect(spy).toHaveBeenCalledWith(true);
    }))
  })
});
