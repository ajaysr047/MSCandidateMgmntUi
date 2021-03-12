import { MatSnackBar } from '@angular/material/snack-bar';
import { CandidateData } from './../../model/candidate-data';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/apiService/api.service';
import { Institution } from 'src/app/model/institution';
import { Location } from 'src/app/model/location';
import { forkJoin } from 'rxjs';
import { SingleDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-candidate-trend',
  templateUrl: './candidate-trend.component.html',
  styleUrls: ['./candidate-trend.component.css'],
})
export class CandidateTrendComponent implements OnInit {
  pieChartLabels: Label[] = [];
  pieChartData: SingleDataSet = [];

  getLocationEndpoint: any = '';
  getInstitutionEndpoint: any = '';
  getCandidateEndpoint: any = '';

  getInstitutionIsSuccess: boolean = false;
  getLocationIsSuccess: boolean = false;

  institutionData: Institution[] = [];
  locationData: Location[] = [];
  candidateData: CandidateData[] = [];

  institutionMap: Map<string, number> = new Map();
  locationMap: Map<string, number> = new Map();

  institutionTrendLabel: string[] = [];
  institutionTrendData: number[] = [];

  locationTrendLabel: string[] = [];
  locationTrendData: number[] = [];

  constructor(private _service: ApiService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    if (window.history.state.getLocationEndpoint != undefined)
      localStorage.setItem(
        'getLocationURL',
        window.history.state.getLocationEndpoint
      );
    if (window.history.state.getInstitutionEndpoint != undefined)
      localStorage.setItem(
        'getInstitutionURL',
        window.history.state.getInstitutionEndpoint
      );
    if (window.history.state.getCandidateEndpoint != undefined)
      localStorage.setItem(
        'getCandidateEndpoint',
        window.history.state.getCandidateEndpoint
      );

    this.getData();
  }

  infoSnackBar(infoText: string) {
    this._snackBar.open(infoText, 'close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  preparePieChartData() {
    this.candidateData.forEach((candidate) => {
      let tempVal = this.locationMap.get(candidate.location.name);
      this.locationMap.set(
        candidate.location.name,
        tempVal != undefined ? tempVal + 1 : 0
      );

      tempVal = this.institutionMap.get(candidate.institution.name);
      this.institutionMap.set(
        candidate.institution.name,
        tempVal != undefined ? tempVal + 1 : 0
      );
    });
    console.log(this.locationMap);
    console.log(this.institutionMap);

    this.locationTrendLabel = [];
    this.locationTrendData = [];
    this.locationTrendLabel = [...this.locationMap.keys()];
    this.locationTrendData = [...this.locationMap.values()];

    this.institutionTrendLabel = [...this.institutionMap.keys()];
    this.institutionTrendData = [...this.institutionMap.values()];

    console.log(this.locationTrendLabel);
    console.log(this.locationTrendData);

    console.log(this.institutionTrendLabel);
    console.log(this.institutionTrendData);
  }

  setLocationTrend() {
    this.pieChartData = [];
    this.pieChartLabels = [];
    Object.assign(this.pieChartData, this.locationTrendData);
    Object.assign(this.pieChartLabels, this.locationTrendLabel);
  }

  setInstitutionTrend() {
    this.pieChartData = [];
    this.pieChartLabels = [];
    Object.assign(this.pieChartData, this.institutionTrendData);
    Object.assign(this.pieChartLabels, this.institutionTrendLabel);
  }

  getData() {
    this.getInstitutionEndpoint = localStorage.getItem('getInstitutionURL');
    this.getLocationEndpoint = localStorage.getItem('getLocationURL');
    this.getCandidateEndpoint = localStorage.getItem('getCandidateEndpoint');

    let getLocation = this._service.getData(this.getLocationEndpoint);
    let getInstitution = this._service.getData(this.getInstitutionEndpoint);
    let getCandidates = this._service.getData(this.getCandidateEndpoint);

    forkJoin([getLocation, getInstitution, getCandidates]).subscribe({
      next: (response) => {
        this.locationData = response[0].locationList;
        console.log('Location list', this.locationData);
        this.locationData.forEach((location) => {
          this.locationMap.set(location.name, 0);
        });

        this.institutionData = response[1].institutionList;
        console.log('Institution list', this.institutionData);
        this.institutionData.forEach((institution) => {
          this.institutionMap.set(institution.name, 0);
        });

        this.candidateData = response[2].candidateList;
        this.preparePieChartData();

        Object.assign(this.pieChartData, this.locationTrendData);
        Object.assign(this.pieChartLabels, this.locationTrendLabel);
      },
      error: (error) => {
        this.infoSnackBar('Some error occured! Check console.');
        console.log(error);
      },
    });
  }
}
