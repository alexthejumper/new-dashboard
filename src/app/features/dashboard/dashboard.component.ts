import { Component, OnInit } from '@angular/core';
import { VisitorDataService } from '../../shared/services/visitorData/visitor-data.service';
import { LineChartOptions } from '../../shared/components/presentation/line-chart/line-chart.component';
import { PieChartOptions } from '../../shared/components/presentation/pie-chart/pie-chart.component';

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
    this.visitorDataService.getVisitCount().subscribe(
      (data) => {
        //console.log(data);
        const weeks = data.map((d) => `Week ${d.week}`);
        const visitorCounts = data.map((d) => d.totalVisits);
  
        this.lChartOptions = {
          series: [
            {
              name: 'Number of Visitors by week',
              data: visitorCounts
            }
          ],
          chart: {
            height: 350,
            type: 'line',
            zoom: { enabled: false }
          },
          dataLabels: { enabled: false },
          stroke: { curve: 'straight' },
          title: {
            text: 'Number of Visitors per Week',
            align: 'center',
            style: { color: '#e13614' }
          },
          grid: {},

          xaxis: { categories: weeks },
          yaxis: {
            labels: {
              formatter: (value: number) => Math.round(value).toString() // Ensure whole numbers
            },
            tickAmount: Math.max(...visitorCounts), // Number of ticks based on the max value
            min: 0, // Ensure it starts at 0
            forceNiceScale: true // Ensures cleaner intervals
          }
        };

        console.log(this.lChartOptions.series);
      },
      (error) => {
        console.error('Error fetching weekly stats', error);
      }
    );
  }
  


  fetchVisitorStatsByReason(): void {
    this.visitorDataService.getReasonCount().subscribe((data => {
      this.pieChartData = data || [];
      this.updatePieChart();
    }))
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
