import { Component, OnInit } from '@angular/core';

import { LeafService } from '../services/leaf.service';

@Component({
  selector: 'bar-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  leafs = [];
  isLoading = true;
  leafByProperty = {};
  leafsAggregate = [];
  constructor(private leafService: LeafService) { }

  ngOnInit() {
    this.getLeafs();
    this.chartByColor();
  }

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  //public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartLabels: string[] = [];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  // public barChartData: any[] = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  // ];
  public barChartData: any[] = [];

  getLeafs() {
    this.leafService.getLeafs().subscribe(
      data => this.leafs = data,
      error => console.log(error)
    );
  }

  chartByColor() {
    this.leafByProperty = this.leafService.getLeafByColor().subscribe(
      data => {
        this.leafsAggregate = data;
      },
      error => console.log(error),
      () => {
        this.leafsAggregate.push({total: 0, _id: ''});
        this.barChartData = this.leafsAggregate.map(this.normalizeChartData);
        this.isLoading = false;
      }
    );
  }

  getLeafByColor(leaf) {
    return leaf.color;
  }

  normalizeChartData(leaf) {
    return { data: [leaf.total], label: String(leaf._id) }
  }

  chartBySize() {
    this.leafByProperty = this.leafService.getLeafBySize().subscribe(
      data => {
        this.leafsAggregate = data;
      },
      error => console.log(error),
      () => {
        this.leafsAggregate.push({total: 0, _id: ''});
        this.barChartData = this.leafsAggregate.map(this.normalizeChartData);
        this.isLoading = false;
      }
    );
  }

  getLeafBySize(leaf) {
    return leaf.size;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
