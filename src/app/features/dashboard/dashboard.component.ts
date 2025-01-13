import { Component, OnInit } from '@angular/core';
import { VisitorDataService } from '../../shared/services/visitorData/visitor-data.service';
import { LineChartOptions } from '../../shared/components/presentation/line-chart/line-chart.component';
import { PieChartOptions } from '../../shared/components/presentation/pie-chart/pie-chart.component';
import { ReasonCountRequest, VisitCountRequest } from '../../core/models/model-back';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public lChartOptions!: LineChartOptions;
  public pChartOptions!: PieChartOptions;
  public pieChartData: { reason: string; count: number }[] = [];

  constructor(private visitorDataService: VisitorDataService) {}

  ngOnInit(): void {
    this.fetchWeeklyStats();
    this.fetchVisitorStatsByReason();
  }

  fetchWeeklyStats(): void {
    const observer = {
      next: (data: VisitCountRequest[]) => {
        const weeks = data.map((d: any) => `Week ${d.week}`);
        const visitorCounts = data.map((d: any) => d.totalVisits);
  
        this.lChartOptions = {
          series: [
            {
              name: 'Number of Visitors by Week',
              data: visitorCounts,
            },
          ],
          chart: {
            height: 350,
            type: 'line',
            zoom: { enabled: false },
          },
          dataLabels: { enabled: false },
          stroke: { curve: 'straight' },
          title: {
            text: 'Number of Visitors per Week',
            align: 'center',
            style: { color: '#e13614' },
          },
          grid: {},
          xaxis: { categories: weeks },
          yaxis: {
            labels: {
              formatter: (value: number) => Math.round(value).toString(), // Ensure whole numbers
            },
            tickAmount: Math.max(...visitorCounts), // Number of ticks based on the max value
            min: 0, // Ensure it starts at 0
            forceNiceScale: true, // Ensures cleaner intervals
          },
        };
  
        console.log(this.lChartOptions.series);
      },
      error: (err: any) => {
        console.error('Error fetching weekly stats', err);
      },
    };
  
    this.visitorDataService.getVisitCount().subscribe(observer);
  }
  


  fetchVisitorStatsByReason(): void {
    const observer = {
      next: (data: ReasonCountRequest[]) => {
        this.pieChartData = data || [];
        this.updatePieChart();
      },
      error: (err: any) => {
        console.error('Error fetching visitor stats by reason', err);
      },
    };
  
    this.visitorDataService.getReasonCount().subscribe(observer);
  }
  


  updatePieChart(): void {
    if (this.pieChartData && this.pieChartData.length > 0) {
      const reasons  = this.pieChartData.map(data => data.reason);
     const visitorCounts = this.pieChartData.map(data => data.count);

     this.pChartOptions = {
      title: {
          text: 'Reasons for Visits',
          align: 'center',
          style: {
            color: '#e13614'
          }
      },

      chart: {
        type: 'pie',
        toolbar: {
          show: true // Enables the toolbar
        },
        width: 300,
      },
      
     responsive: [{
       breakpoint: 480,
       options: {
          chart: {
              width: 200,
          },
          legend: {
            position: 'bottom'
          }
       }
     }],

      series: visitorCounts,
      labels: reasons
     };
   }
   else {
    console.error("No visitor stats available");
   }
 }

}
