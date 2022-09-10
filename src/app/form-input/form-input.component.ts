import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DataService } from '../data.service';

/**
 * Generic Input for a numeric input with a text label, minimum value, and differentiates between integer and rational numbers.
 */
@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements OnInit {

  /**
   * Output when a valid value is entered
   */
  @Output() valueChange = new EventEmitter<number>();
  /**
   * Output when validity of input has changed
   */
  @Output() invalidInput = new EventEmitter<boolean>()

  /**
   * Minimum value input must be set to
   */
  @Input() minimumVal: number | undefined;

  /**
   * Determines if minimum value is compared with >= or >
   */
  @Input() eqMinimumVal: boolean = true;

  /**
   * Determines if input must be an integer or rational number
   */
  @Input() wholeNumber: boolean = false;

  /**
   * Label for input box
   */
  @Input() inputText: string = '';

  /**
   * Is input enabled
   */
  @Input() enabled: boolean = true;

  /**
   * Current value input is set to
   */
  public inputVal: number | undefined;
  /**
   * Whether input is truly a number, default is true to allow initial empty state
   */
  public isNumber = true

  /**
   * Error message to be displayed when improper values are entered
   */
  public errorText = '';

  /**
   * Is input value a number within constraints
   */
  isImproperValue = false

  /**
   * Dependency injection
   * @param dataService Service to manage when to clear inputs
   */
  constructor(private dataService: DataService) { }

  /**
   * Initialization
   */
  ngOnInit(): void {
    // Subscribe to clear data event
    this.dataService.clear$.subscribe( () => {
      this.inputVal = undefined;
      this.invalidInput.emit(true);
      this.errorText = '';
    })
    this.invalidInput.emit(true);
  }

  /**
   * Update and emit new input value if valid
   * @param value current input value
   */
  //Todo: 3.x validates
  updateValue(value: any){
    this.inputVal = value
    
    this.isImproperValue = value !== '' && ((this.isBelowMinimum(value) || !this.isWholeNumber(value)));
    if(!this.isImproperValue){
      const out = this.wholeNumber ? parseInt(value) : parseFloat(value);
      this.valueChange.emit(out);
      this.invalidInput.emit(false);
      this.errorText = '';
    }
    else if(value !== undefined && value !== null){
      this.invalidInput.emit(true)
      this.generateErrorText(value)
    }
    if(value === ''){
      this.invalidInput.emit(true)
    }
  }

  /**
   * Checks input is above minimum
   * @param value Current input value
   * @returns False if no minimum or above, true if below set minimum
   * TODO: standard deviation > 0 not >= 0
   */
  isBelowMinimum(value: number){
    if(this.minimumVal !== undefined){
    if(this.eqMinimumVal)
    {
      return value < this.minimumVal;
    }
    else{
      return value <= this.minimumVal;
    }
    }
    return false;
  }

  /**
   * Attempts to parse both an integer and float and if both are the same then it is an integer value
   * @param value Current input value
   * @returns true if whole number check is not required, compares values otherwise
   */
  isWholeNumber(value: string){
    const float = parseFloat(value);
    const int = parseInt(value);
    const compare = float === int;
    return this.wholeNumber ? compare : true;
  }

  /**
   * Checks if input value can be parsed as a number
   * @param value Current input value
   * @returns true if value is a number, false if any other text is parsed.
   */
  checkIsNumber(value: any){
    const type = typeof(value);
    this.isNumber = !!parseFloat(value) || parseFloat(value) === 0
    return this.isNumber;
  }

  /**
   * Sets error text based on failed validation condition
   * @param input Input value that failed validation
   */
  generateErrorText(input : number){
    if(this.isBelowMinimum(input)){
      const eqText = this.eqMinimumVal ? 'or equal to ' : '';
      this.errorText = `The value must be greater than ${eqText}${this.minimumVal}`
    }
    else{
      this.errorText = 'Please enter a whole number'
    }
  }
}
