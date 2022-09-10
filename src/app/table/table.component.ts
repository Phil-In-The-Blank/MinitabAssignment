import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  sampleSize: number | undefined;
  sampleMean: number | undefined;
  standardDeviation: number | undefined;
  hypothesisMean: number | undefined;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.tableData$.subscribe( data => {
      this.sampleSize = data.sampleSize;
      this.sampleMean = data.sampleMean;
      this.standardDeviation = data.standardDeviation;
      this.hypothesisMean = data.hypothesisMean;
    })
    this.dataService.clear$.subscribe( () => {
      this.sampleMean = undefined;
      this.sampleSize = undefined;
      this.standardDeviation = undefined;
      this.hypothesisMean = undefined;
    })
  }

}
