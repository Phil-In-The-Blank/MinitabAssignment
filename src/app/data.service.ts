import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
/**
 * Data form used for displayed table
 */
interface DataForm {
  sampleSize: number;
  sampleMean: number;
  standardDeviation: number;
  hypothesisMean: number | undefined;
}

/**
 * Manages current state of data to be displayed in table
 * and central location for clear event
 */
@Injectable({
  providedIn: 'root'
})
export class DataService {
  /**
   * Subject for table to subscribe to, if initial data input is before table initialization, allows table to still access
   */
  public tableData$!: BehaviorSubject<DataForm>;
  /**
   * Subject to emit clear event
   */
  private clearSubj$ = new Subject<void>();
  /**
   * Observable version of clear event to control where event emissions come from
   */
  public clear$ = this.clearSubj$.asObservable();
  constructor() {
  }

  /**
   * Fires clear event
   */
  public clearData(){
    this.clearSubj$.next();
  }

  /**
   * Stores data set by form
   * @param data current form values to display
   */
  public setData(data: DataForm){
    // If subject isn't initialized do so first before attempting to emit data
    if(!this.tableData$){
      this.tableData$ = new BehaviorSubject(data);
    }
    // Prevent double emission of initial value
    else{
      this.tableData$.next(data)
    }
  }
}
