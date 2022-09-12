import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /**
   * Form values
   */
  sampleSize: number | undefined;
  sampleMean: number | undefined;
  standardDeviation: number | undefined;
  hypothesisMean: number | undefined;

  /**
   * Form value validity
   */
  sizeInvalid = false;
  meanInvalid = false;
  deviationInvalid = false;
  hypoMeanInvalid = false;

  /**
   * Full form validity
   */
  formValid = false;

  /**
   * Enables hypothesis input and validation
   */
  hypothesisEnabled = false;

  /**
   * Flag to display table component
   */
  tableGenerated = false;

  /**
   * Displayed error message
   */
  formErrorMessage = ''

  /**
   * Dependency Injection
   */
  constructor(private dataService: DataService){}

  /**
   * Setters for form values and validity
   */
  public updateSampleSize(value: number){
    this.sampleSize = value;
    this.validateForm();
  }

  public updateSizeInvalid(value: boolean){
    this.sizeInvalid = value;
    this.validateForm();
  }

  public updateSampleMean(value: number){
    this.sampleMean = value;
    this.validateForm();
  }

  public updateMeanInvalid(value: boolean){
    this.meanInvalid = value;
    this.validateForm();
  }

  public updateStandardDeviation(value: number){
    this.standardDeviation = value;
    this.validateForm();
  }

  public updateDeviationInvalid(value:boolean){
    this.deviationInvalid = value;
    this.validateForm();
  }

  public updateHypoMean(value: number){
    this.hypothesisMean = value;
    this.validateForm();
  }

  public updateHypoMeanInvalid(value: boolean){
    this.hypoMeanInvalid = value;
    this.validateForm();
  }

  /**
   * Sets table generated flag and passes saved data to data service to be read by table component
   * Sets error message if form is not valid
   */
  public generateTable(){
    if(this.formValid){
      this.formErrorMessage = '';
      const dataForm = {sampleSize: this.sampleSize as number,
        sampleMean: this.sampleMean as number,
        standardDeviation: this.standardDeviation as number,
        hypothesisMean: this.hypothesisEnabled ? this.hypothesisMean : undefined}
      
      this.dataService.setData(dataForm)
      this.tableGenerated = true;
    }
    else{
      
    }
  }

  /**
   * Ensure all enabled inputs are valid and set necessary error message
   * TODO: hypothesis breaks validation once cleared
   */
  public validateForm(){
    const checkMean = this.sampleMean !== undefined;
    const checkSize = this.sampleSize !== undefined;
    const checkDeviation = this.standardDeviation !== undefined;
    let savedDataValid = checkMean && checkSize && checkDeviation;
    let isInvalid = this.sizeInvalid || this.meanInvalid || this.deviationInvalid

    if(this.hypothesisEnabled){
      isInvalid = isInvalid || this.hypoMeanInvalid;
      savedDataValid = savedDataValid && this.hypothesisMean !== undefined;
    }
    this.formValid = !isInvalid && savedDataValid;

    if(this.formValid){
      this.formErrorMessage = '';
    }
    else{
      this.formErrorMessage = 'Please make sure all enabled inputs have valid data before generating table';
    }
  }
  
  /**
   * Enable hypothesis mean input
   */
  public enableHypothesis(){
    this.hypothesisEnabled = !this.hypothesisEnabled;
    this.validateForm();
  }

  /**
   * Clear all data and hide table component
   * TODO: Disable generate table button
   */
  public clearAll(){
    this.dataService.clearData();
    this.tableGenerated = false;
    this.hypothesisEnabled = false;
    this.validateForm();
  }
}
