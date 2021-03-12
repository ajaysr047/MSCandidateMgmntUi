import { AddCandidateReq } from './../../model/add-candidate-req';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Chips } from 'src/app/model/chips';
import { Institution } from 'src/app/model/institution';
import { Location } from 'src/app/model/location';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/apiService/api.service';

@Component({
  selector: 'app-candidate-add',
  templateUrl: './candidate-add.component.html',
  styleUrls: ['./candidate-add.component.css'],
})
export class CandidateAddComponent implements OnInit {
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  temp: any = '';
  getLocationEndpoint: any = '';
  getInstitutionEndpoint: any = '';
  addCandidateEndpoint: any = '';
  userId: number = -1;

  skillSetStringArray: string[] = [];

  institutionData: Institution[] = [];
  locationData: Location[] = [];
  candidateData: AddCandidateReq = {
    candidateId: -1,
    name: 'nil',
    email: 'nil',
    phoneNumber: 'nil',
    description: 'nil',
    feedback: 'nil',
    skillSet: [],
    joiningLocationId: -1,
    institutionId: -1,
    createdUserId: -1,
    isActive: true,
  };

  selectedInstitutionId: number = 0;
  selectedLocationId: number = 0;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  skillChips: Chips[] = [];

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
    if (window.history.state.addCandidateEndpoint != undefined)
      localStorage.setItem(
        'addCandidateEndpoint',
        window.history.state.addCandidateEndpoint
      );

    this.getInstitutionAndLocationData();
  }

  candidateForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern('[a-zA-Z][a-zA-Z ]+'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{10}$'),
    ]),
    skills: new FormControl([], [Validators.required]),
    institution: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.minLength(20)]),
    feedback: new FormControl('', [Validators.minLength(20)]),
  });

  getInstitutionAndLocationData() {
    this.getInstitutionEndpoint = localStorage.getItem('getInstitutionURL');
    this._service.getData(this.getInstitutionEndpoint).subscribe({
      next: (response) => {
        this.institutionData = response.institutionList;

        if (this.institutionData.length > 0)
          this.selectedInstitutionId = this.institutionData[0].institutionId;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.getLocationEndpoint = localStorage.getItem('getLocationURL');
    this._service.getData(this.getLocationEndpoint).subscribe({
      next: (response) => {
        this.locationData = response.locationList;

        if (this.locationData.length > 0)
          this.selectedLocationId = this.locationData[0].locationId;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.skillChips.push({ name: value.trim() });
      this.candidateForm.get('skills')?.setValue(this.skillChips);
      this.candidateForm.get('skills')?.updateValueAndValidity();
    }

    if (input) {
      input.value = '';
    }
  }

  remove(chip: Chips): void {
    const index = this.skillChips.indexOf(chip);

    if (index >= 0) {
      this.skillChips.splice(index, 1);
      this.candidateForm.get('skills')?.updateValueAndValidity();
    }
  }

  infoSnackBar(infoText: string) {
    this._snackBar.open(infoText, 'close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  addCandidate() {
    if (this.candidateForm.valid) {
      this.temp = sessionStorage.getItem('userData');
      this.userId = JSON.parse(this.temp).userId;

      this.skillChips.forEach((skill) => {
        this.skillSetStringArray.push(skill.name);
      });

      this.addCandidateEndpoint = localStorage.getItem('addCandidateEndpoint');

      this.candidateData = {
        candidateId: -1,
        name: this.candidateForm.get('name')?.value,
        email: this.candidateForm.get('email')?.value,
        phoneNumber: this.candidateForm.get('phoneNumber')?.value,
        description: this.candidateForm.get('description')?.value,
        feedback: this.candidateForm.get('feedback')?.value,
        skillSet: this.skillSetStringArray,
        joiningLocationId: this.selectedLocationId,
        institutionId: this.selectedInstitutionId,
        createdUserId: this.userId,
        isActive: true,
      };
      this._service
        .postData(this.candidateData, this.addCandidateEndpoint)
        .subscribe({
          next: (response) => {
            console.log(response);
            this.candidateForm.reset();
            this.infoSnackBar(response.message);
          },
          error: (error) => {
            console.log(error);
            if (error.error.message) this.infoSnackBar(error.error.message);
            else this.infoSnackBar(error.error);
          },
        });
      console.log('valid!');
    } else {
      console.log('Invalid!');
    }
  }
}
