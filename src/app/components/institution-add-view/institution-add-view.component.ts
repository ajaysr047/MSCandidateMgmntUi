import { element } from 'protractor';
import { InstitutionTable } from './../../model/institution-table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { ApiService } from 'src/app/services/apiService/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Institution } from 'src/app/model/institution';
import { Location } from 'src/app/model/location';
import { MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-institution-add-view',
  templateUrl: './institution-add-view.component.html',
  styleUrls: ['./institution-add-view.component.css']
})
export class InstitutionAddViewComponent implements OnInit {

  tableHeader: string[] = [
    'institutionId', 'name', 'location'
  ]
  dataSource: any;
  institutionData: Institution[] = [];
  institutionTableData: InstitutionTable[] = [];
  getInstitutionEndpoint: any;
  getLocationEndpoint: any;
  addInstitutionEndpoint: any;
  locationData: Location[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  institutionForm: FormGroup = new FormGroup({
    institutionName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern("[a-zA-Z][a-zA-Z ]+")]),
    location: new FormControl('', [Validators.required]),
  })

  constructor(private _service: ApiService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if( window.history.state.getLocationEndpoint != undefined)
      localStorage.setItem('getLocationURL', window.history.state.getLocationEndpoint);
    if( window.history.state.getInstitutionEndpoint != undefined)
      localStorage.setItem('getInstitutionURL', window.history.state.getInstitutionEndpoint);
    if( window.history.state.addInstitutionEndpoint != undefined)
      localStorage.setItem('addInstitutionEndpoint', window.history.state.addInstitutionEndpoint);

    this.getData();
  }

  infoSnackBar(infoText: string){
    this._snackBar.open(infoText, 'close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getLocationName(locationId: number): string{
    let locationName: string = 'nil';
    this.locationData.forEach((location) => {
      if(location.locationId === locationId){
        locationName = location.name;
      }
    });
    return locationName;
  }

  addInstitution(){
    this.addInstitutionEndpoint = localStorage.getItem('addInstitutionEndpoint');

    if(this.institutionForm.valid){
      this._service.postData({
        name: this.institutionForm.get('institutionName')?.value,
        locationName: this.getLocationName(this.institutionForm.get('location')?.value)
      },
      this.addInstitutionEndpoint).subscribe({
        next: response => {
          this.infoSnackBar(response.message);
          window.location.reload();
        },
        error: error => {
          console.log(error);
          if(error.error.message)
            this.infoSnackBar(error.error.message);
          else
          this.infoSnackBar(error.error);
        }
      });
    }
  }

  getData(){
    this.getInstitutionEndpoint = localStorage.getItem('getInstitutionURL');
    this.getLocationEndpoint = localStorage.getItem('getLocationURL');

    this._service.getData(this.getInstitutionEndpoint).subscribe({
      next: response => {
        console.log(response);
        this.institutionData = response.institutionList;
        this.institutionData.forEach((institution) => {
          this.institutionTableData.push({
            name: institution.name,
            institutionId: institution.institutionId,
            location: institution.location.name
          })
        })
        this.dataSource = new MatTableDataSource<InstitutionTable>(this.institutionTableData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: error => {
        console.log(error);
      }
    });

    this._service.getData(this.getLocationEndpoint).subscribe({
      next: response => {
        console.log(response);
        this.locationData = response.locationList;
        if(this.locationData.length > 0)
          this.institutionForm.get('location')?.setValue(this.locationData[0].locationId);
      },
      error: error => {
        console.log(error);
      }
    })
  }

}
