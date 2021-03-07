import { CandidateTableData } from './../../model/candidate-table-data';
import { CandidateData } from '../../model/candidate-data';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-search-and-edit',
  templateUrl: './search-and-edit.component.html',
  styleUrls: ['./search-and-edit.component.css']
})
export class SearchAndEditComponent implements OnInit {

  getDataEndpoint: any = '';
  userData: any = {};
  temp: any = '';
  candidateData: CandidateData[] = [];
  tableHeader: string[] = [];
  tableDataType: string = '';
  candidateTableData: CandidateTableData[] = [];
  tableRowToolTip: string = 'Click for more info!';
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _service: ApiService) { }

  ngOnInit(): void {
    if( window.history.state.getEndpoint != undefined)
      localStorage.setItem('getDataURL', window.history.state.getEndpoint);
    if(window.history.state.tableHeader != undefined)
      localStorage.setItem('tableHeader', window.history.state.tableHeader);
    if(window.history.state.dataType != undefined)
      localStorage.setItem('dataType', window.history.state.dataType);
    
    console.log(window.history.state);

    this.temp = sessionStorage.getItem('userData');
    this.userData = JSON.parse(this.temp);
    this.temp = localStorage.getItem('tableHeader');
    this.tableHeader = this.temp.split(',')
    this.temp = localStorage.getItem('dataType');
    this.tableDataType = this.temp;
    this.getActiveCandidates();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onTableRowClick(row:any){
    console.log(row);
  }

  setCandidateTableData(){
    // console.log(this.CandidateData);
    this.candidateData.forEach(candidate => {
      console.log(candidate);
      this.candidateTableData.push({
        candidateId: candidate.candidateId,
        name: candidate.name,
        phoneNumber: candidate.phoneNumber,
        email: candidate.email,
        location: candidate.location.name,
        institution: candidate.institution.name
      })
    });
    console.log(this.candidateTableData);
    // this.dataSource = this.candidateTableData;
    this.dataSource = new MatTableDataSource<CandidateTableData>(this.candidateTableData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  extractUserHeaders(){
    
  }

  getActiveCandidates(){
    this.getDataEndpoint = localStorage.getItem('getDataURL');
    this._service.getData(this.getDataEndpoint).subscribe({
      next: response => {
        console.log(response);
        console.log(this.tableHeader);
        if(this.tableDataType == 'candidate'){
          this.candidateData = response.candidateList;

          this.setCandidateTableData();
        }else{
          this.extractUserHeaders();
        }
      },

      error: error => {
        console.log(error);
      }
      
    });
  }

}
