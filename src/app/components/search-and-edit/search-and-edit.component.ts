import { CandidateEditDeleteDialogComponent } from './../candidate-edit-delete-dialog/candidate-edit-delete-dialog.component';
import { CandidateTableData } from './../../model/candidate-table-data';
import { CandidateData } from '../../model/candidate-data';
import { ApiService } from 'src/app/services/apiService/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CandidateDialog } from 'src/app/model/candidate-dialog';
import { User } from 'src/app/model/user';
import { Overlay } from '@angular/cdk/overlay';



@Component({
  selector: 'app-search-and-edit',
  templateUrl: './search-and-edit.component.html',
  styleUrls: ['./search-and-edit.component.css']
})
export class SearchAndEditComponent implements OnInit {

  getCandidateEndpoint: any = '';
  getUserEndpoint: any = '';
  temp: any = '';
  userRole: any = '';
  userTableData: User[] = [];
  candidateData: CandidateData[] = [];
  tableHeader: string[] = [];
  tableDataType: string = '';
  candidateTableData: CandidateTableData[] = [];
  tableRowToolTip: string = 'Click for more info!';
  dataSource: any;
  candidateDialogData: CandidateDialog = {
    name: 'nil',
    candidateId: -1,
    email: 'nil',
    phoneNumber: 'nil',
    description: 'nil',
    feedback: 'nil',
    skillSet: [],
    joiningLocation: 'nil',
    institution: 'nil',
  }
  skillSetStringArray: string[] = [];
  isTooltipHidden: boolean = false;




  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  

  constructor(private _service: ApiService, public dialog: MatDialog, private overlay: Overlay) { }

  ngOnInit(): void {

    if( window.history.state.getCandidateEndpoint != undefined)
      localStorage.setItem('getCandidateEndpoint', window.history.state.getCandidateEndpoint);
    if(window.history.state.tableHeader != undefined)
      localStorage.setItem('tableHeader', window.history.state.tableHeader);
    if(window.history.state.dataType != undefined)
      localStorage.setItem('dataType', window.history.state.dataType);
    if( window.history.state.getUserEndpoint != undefined)
      localStorage.setItem('getUserEndpoint', window.history.state.getUserEndpoint);
    if( window.history.state.userRole != undefined)
      localStorage.setItem('userRole', window.history.state.userRole);
    
    console.log(window.history.state);

    // this.temp = sessionStorage.getItem('userData');
    // this.userData = JSON.parse(this.temp);
    this.temp = localStorage.getItem('tableHeader');
    this.tableHeader = this.temp.split(',')
    this.temp = localStorage.getItem('dataType');
    this.tableDataType = this.temp;
    this.temp = localStorage.getItem('userRole');
    this.userRole = this.temp;
    if(this.tableDataType === 'candidate')
      this.getActiveCandidates();
    else{
      this.isTooltipHidden = true;
      this.getAllUsers();
    }

    console.log(this.tableDataType);
      
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onTableRowClick(row:CandidateTableData){

    
    
    if(this.tableDataType == 'candidate'){

      this.candidateData.forEach((candidate) => {
        if(candidate.candidateId == row.candidateId){
          this.skillSetStringArray = [];
          candidate.skillSet.forEach((skill) => {
            this.skillSetStringArray.push(skill.skillName);
          })
          if(this.userRole === 'ADMIN'){
            this.candidateDialogData = {
              name: candidate.name,
              candidateId: candidate.candidateId,
              email: candidate.email,
              phoneNumber: candidate.phoneNumber,
              description: candidate.description,
              feedback: candidate.feedback,
              skillSet: this.skillSetStringArray,
              joiningLocation: candidate.location.name,
              institution: candidate.institution.name + ', ' + candidate.institution.location.name,
              status: candidate.active ? 'Active' : 'Inactive'
            }
          }
          else{
            this.candidateDialogData = {
              name: candidate.name,
              candidateId: candidate.candidateId,
              email: candidate.email,
              phoneNumber: candidate.phoneNumber,
              description: candidate.description,
              feedback: candidate.feedback,
              skillSet: this.skillSetStringArray,
              joiningLocation: candidate.location.name,
              institution: candidate.institution.name + ', ' + candidate.institution.location.name,
            }
          }
        }
      })
      // const scrollStrategy = this.overlay.scrollStrategies.reposition();
      const dialogRef = this.dialog.open(CandidateEditDeleteDialogComponent, {
        data: this.candidateDialogData,
        // autoFocus: false,
        // scrollStrategy
        maxHeight: '100vh'
      });

      dialogRef.afterClosed().subscribe({
        next: () => {

          window.location.reload();
        },
        error: error => {
          console.log(error);
        }
      });
    }
    console.log(row);
  }

  createCandidateTableData(){
    // console.log(this.CandidateData);
    this.candidateData.forEach(candidate => {
      console.log(candidate);
      if(this.userRole === 'ADMIN'){

        this.candidateTableData.push({
          candidateId: candidate.candidateId,
          name: candidate.name,
          phoneNumber: candidate.phoneNumber,
          email: candidate.email,
          joiningLocation: candidate.location.name,
          institution: candidate.institution.name + ', ' + candidate.institution.location.name,
          status: candidate.active ? 'Active' : 'Inactive'
        })
      }else{
        this.candidateTableData.push({
          candidateId: candidate.candidateId,
          name: candidate.name,
          phoneNumber: candidate.phoneNumber,
          email: candidate.email,
          joiningLocation: candidate.location.name,
          institution: candidate.institution.name + ', ' + candidate.institution.location.name
        })
      }
    });
    console.log(this.candidateTableData);
    // this.dataSource = this.candidateTableData;
    this.setCandidateTableData();
  }

  setCandidateTableData(){
    this.dataSource = new MatTableDataSource<CandidateTableData>(this.candidateTableData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getActiveCandidates(){
    this.getCandidateEndpoint = localStorage.getItem('getCandidateEndpoint');
    this._service.getData(this.getCandidateEndpoint).subscribe({
      next: response => {
        console.log(response);
        console.log(this.tableHeader);
        
        this.candidateData = response.candidateList;
        this.createCandidateTableData();
      },
      error: error => {
        console.log(error);
      }
    });
  }


  getAllUsers(){
    this.getUserEndpoint = localStorage.getItem('getUserEndpoint');
    this._service.getData(this.getUserEndpoint).subscribe({
      next: response => {
        console.log(response);
        console.log(this.tableHeader);
        this.userTableData = response.userList;
        console.log(this.userTableData);
        this.setUserTableData();
      },
      error: error => {
        console.log(error);
      }
    });
  }

  setUserTableData(){
    this.dataSource = new MatTableDataSource<User>(this.userTableData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


}

