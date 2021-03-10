import { UpdateCandidate } from './../../model/update-candidate';
import { ApiService } from 'src/app/services/apiService/api.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Chips } from 'src/app/model/chips';
import {MatChipInputEvent} from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Institution } from 'src/app/model/institution';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CandidateDialog } from 'src/app/model/candidate-dialog';
import {AbstractControl, ValidatorFn} from '@angular/forms';


@Component({
  selector: 'app-candidate-edit-delete-dialog',
  templateUrl: './candidate-edit-delete-dialog.component.html',
  styleUrls: ['./candidate-edit-delete-dialog.component.css']
})
export class CandidateEditDeleteDialogComponent implements OnInit {

  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  institutionData: Institution[] = [];
  locationData: Location[] = [];

  isUpdateButtonHidden: boolean = false;
  isEditButtonHidden: boolean = true;
  isDeleteButtonHidden: boolean = true;
  isCancelButtonHidden: boolean = false;
  isCloseButtonHidden: boolean = true;

  isStatusFieldHidden: boolean = false;

  selectedInstitutionId: number = 0;
  selectedLocationId: number = 0;

  userRole: any = '';

  recordStatus: string[] = [
    'Active',
    'Inactive'
  ];

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  skillChips: Chips[] =[
    
  ];

  constructor(private _snackBar: MatSnackBar, private _service: ApiService, public dialogRef: MatDialogRef<CandidateEditDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CandidateDialog) { }

  ngOnInit(): void {
    this.candidateForm.disable();
    this.data.skillSet.forEach((skill) => {
      this.skillChips.push({name:  skill});
    })
    this.userRole = localStorage.getItem('userRole');
    if(this.userRole === 'ADMIN'){
      this.isStatusFieldHidden = true;
      this.isDeleteButtonHidden = false;
    }
    console.log('skill length', this.skillChips.length);
  }

  candidateForm: FormGroup = new FormGroup({
    name: new FormControl(this.data.name, [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern("[a-zA-Z][a-zA-Z ]+")],),
    email: new FormControl(this.data.email, [Validators.required, Validators.email]),
    phoneNumber: new FormControl(this.data.phoneNumber, [Validators.required, Validators.pattern("[0-9]{10}$")]),
    skills: new FormControl([], [this.customSkillSetValidator()]),
    institution: new FormControl(this.data.institution, [Validators.required]),
    location: new FormControl(this.data.joiningLocation, [Validators.required]),
    description: new FormControl(this.data.description, [Validators.minLength(20)]),
    feedback: new FormControl(this.data.feedback, [Validators.minLength(20)]),
    status: new FormControl(this.data.status)
  });

  customSkillSetValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      console.log('Length',this.skillChips.length);
      // const forbidden = this.skillChips.length > 0 ? true : false;
      return this.skillChips.length > 0  ? null : {customSkillSetValidator: {value: control.value}};
    };
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.skillChips.push({name: value.trim()});
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

  infoSnackBar(infoText: string){
    this._snackBar.open(infoText, 'close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  editCandidate(){
    this.isCancelButtonHidden = true;
    this.isDeleteButtonHidden = false;
    this.isEditButtonHidden = false;
    this.isUpdateButtonHidden = true;
    this.isCloseButtonHidden = false;

    this.candidateForm.get('skills')?.enable();
    this.candidateForm.get('feedback')?.enable();
    this.candidateForm.get('phoneNumber')?.enable();
    this.candidateForm.get('description')?.enable();

    if(this.userRole === 'ADMIN')
      this.candidateForm.get('status')?.enable();
  }

  cancelEdit(){
    
    this.skillChips = [];
    this.data.skillSet.forEach((skill) => {
      this.skillChips.push({name:  skill});
    })
    this.candidateForm.get('feedback')?.setValue(this.data.feedback);
    this.candidateForm.get('phoneNumber')?.setValue(this.data.phoneNumber);
    this.candidateForm.get('description')?.setValue(this.data.description);

    this.candidateForm.disable();

    this.isCancelButtonHidden = false;
    if(this.userRole != 'ADMIN')
      this.isDeleteButtonHidden = true;
    this.isEditButtonHidden = true;
    this.isUpdateButtonHidden = false;
    this.isCloseButtonHidden = true;

  }

  updateCandidate(){
    console.log('status:', this.candidateForm.get('status')?.value);

    if(this.candidateForm.valid && this.candidateForm.touched){
      let skillSetStringArray: string[] = [];
      this.skillChips.forEach((skill) => {
        skillSetStringArray.push(skill.name);
      });
      let updateCandidate: UpdateCandidate = {
        email: this.candidateForm.get('email')?.value,
        phoneNumber: this.candidateForm.get('phoneNumber')?.value,
        description: this.candidateForm.get('description')?.value,
        feedback: this.candidateForm.get('feedback')?.value,
        skillSet: skillSetStringArray
      };

      if(this.userRole == 'ADMIN')
        updateCandidate['isActive'] = this.candidateForm.get('status')?.value === 'Active' ? true : false;
      console.log('update:',updateCandidate['isActive']);
      console.log(updateCandidate);
      
      this._service.putData('candidate/update', updateCandidate).subscribe({
        next: response => {
          this.infoSnackBar(response.message);
          console.log(response);
        },
        error: error => {
          if(error.error.message)
            this.infoSnackBar(error.error.message);
          else
            this.infoSnackBar(error.error);
          console.log(error);
        }
      });

      console.log('update!');
      this.closeDialog();
    }else{
      this.infoSnackBar('Form values not touched!');
      console.log('Invalid!');
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }

  deleteCandidate(){
    this._service.deleteData("candidate/delete/" + this.data.candidateId).subscribe({
      next: response => {
        this.infoSnackBar(response.message);
        console.log(response);
      },
      error: error => {
        console.log(error);
          if(error.error.message)
            this.infoSnackBar(error.error.message);
          else
          this.infoSnackBar(error.error);
      }
    });
    this.closeDialog();
  }

}
