import { DashboardService, DashboardResponse } from './../../services/admin/dashboard.service';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  pagePostNew: number = 1;
  pageCommentNew: number = 1;
  pagePostHot: number = 1;
  myChart: Chart;
  arrName: Array<string> = [] as Array<string>;
  arrCount: Array<number> = [] as Array<number>;
  dashBoardInit: DashboardResponse = {} as DashboardResponse;
  constructor(private title: Title, private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.title.setTitle("Dashboard | Admin | Mini Blog");
    this.LoadDashboard();
    this.loadChart();
  }

  LoadDashboard() {
    this.dashboardService.LoadDashboard().subscribe(result => {
      if (result.errorCode === 0) {
        this.dashBoardInit.lstPostHot = result.lstPostHot;
        this.dashBoardInit.lstCommentNew = result.lstCommentNew;
        this.dashBoardInit.lstPostNew = result.lstPostNew;
        this.dashBoardInit.countCategory = result.countCategory;
        this.dashBoardInit.countGuest = result.countGuest;
        this.dashBoardInit.countPost = result.countPost;
        this.dashBoardInit.countMember = result.countMember;
      }
      else {
        console.log(result.message);
      }
    })
  }

  loadChart() {
    this.dashboardService.LoadDashboardChart().subscribe(result => {
      if (result.errorCode === 0) {
        result.data.forEach(row => {
          this.arrName.push(row.subCateName);
          this.arrCount.push(row.countPost);
        })
        this.insertChart();
      }
      else {
        console.log(result.message);
      }
    })

  }

  insertChart() {
    this.myChart = new Chart(document.getElementById('chartDashboard'), {
      type: 'bar',
      data: {
        labels: this.arrName,
        datasets: [{
          label: 'post count',
          data: this.arrCount,
          backgroundColor: 'rgba(33, 212, 241, 1)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Post of Sub-Category'
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}
