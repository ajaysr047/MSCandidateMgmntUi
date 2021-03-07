import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { Chips } from 'src/app/model/chips';
import { Institution } from 'src/app/model/institution';
import { Location } from 'src/app/model/location';

@Component({
  selector: 'app-candidate-add',
  templateUrl: './candidate-add.component.html',
  styleUrls: ['./candidate-add.component.css']
})
export class CandidateAddComponent implements OnInit {

  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  getLocationEndpoint: any = '';
  getInstitutionEndpoint: any = '';
  addCandidateEndpoint: any = '';

  institutionData: Institution[] = [];
  locationData: Location[] = [];

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  skillChips: Chips[] =[
    {name: "C++"}
  ];

  constructor(private _service: ApiService) { }

  ngOnInit(): void {
    if( window.history.state.getLocationEndpoint != undefined)
      localStorage.setItem('getLocationURL', window.history.state.getLocationEndpoint);
    if( window.history.state.getInstitutionEndpoint != undefined)
      localStorage.setItem('getInstitutionURL', window.history.state.getInstitutionEndpoint);

      this.getInstitutionAndLocationData();
  }

  getInstitutionAndLocationData(){
    this.getInstitutionEndpoint = localStorage.getItem('getInstitutionURL');
    this._service.getData(this.getInstitutionEndpoint).subscribe({
      next: response => {
        this.institutionData = response.institutionList;
        console.log(this.institutionData);
      },
      error: error => {
        console.log(error);
      }
    });

    this.getLocationEndpoint = localStorage.getItem('getLocationURL');
    this._service.getData(this.getLocationEndpoint).subscribe({
      next: response => {
        this.locationData = response.locationList;
        console.log(this.locationData);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.skillChips.push({name: value.trim()});
    }

    if (input) {
      input.value = '';
    }
  }

  remove(chip: Chips): void {
    const index = this.skillChips.indexOf(chip);

    if (index >= 0) {
      this.skillChips.splice(index, 1);
    }
  }

}
