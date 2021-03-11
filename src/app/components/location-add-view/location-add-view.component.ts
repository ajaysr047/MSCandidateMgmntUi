import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { Location } from 'src/app/model/location';
import { ApiService } from 'src/app/services/apiService/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-location-add-view',
  templateUrl: './location-add-view.component.html',
  styleUrls: ['./location-add-view.component.css']
})
export class LocationAddViewComponent implements OnInit {

  tableHeader: string[] = [
    'locationId', 'name'
  ]
  dataSource: any;
  locationTableData: Location[] = [];
  getLocationEndpoint: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  locationForm: FormGroup = new FormGroup({
    locationName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern("[a-zA-Z][a-zA-Z ]+")])
  })

  constructor(private _service: ApiService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if( window.history.state.getLocationEndpoint != undefined)
      localStorage.setItem('getLocationURL', window.history.state.getLocationEndpoint);
    this.getLocationData();
  }

  infoSnackBar(infoText: string){
    this._snackBar.open(infoText, 'close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  addLocation(){
    if(this.locationForm.valid){

      this._service.postData({
        name: this.locationForm.get('locationName')?.value
      }, 'location/add').subscribe({
        next: response => {
          console.log(response);
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
    }else{
      console.log('Invalid!');
    }

  }

  getLocationData(){
    this.getLocationEndpoint = localStorage.getItem('getLocationURL');
    this._service.getData(this.getLocationEndpoint).subscribe({
      next: response => {
        this.locationTableData = response.locationList;
        console.log(this.locationTableData);
        this.dataSource = new MatTableDataSource<Location>(this.locationTableData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
