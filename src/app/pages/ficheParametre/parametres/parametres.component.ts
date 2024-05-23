import { FicheParam } from './../../../models/ficheparam.model';
import { FicheparamService } from './../../../@services/ficheparam.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToggleButtonModule } from 'primeng/togglebutton';

import { MatDialog } from '@angular/material/dialog';
import { KeyboardComponent } from '../../../keyboard/keyboard.component';
import Swal from 'sweetalert2';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { KeyboardValueService } from '../../../@services/keyboard-value.service';
@Component({
  selector: 'app-parametres',
  standalone: true,
  imports: [NgIf,ReactiveFormsModule,ToggleButtonModule,KeyboardComponent,FormsModule],
  templateUrl: './parametres.component.html',
  styleUrl: './parametres.component.css'
})
export class ParametresComponent implements OnInit{
  clicker: boolean=false;
  constructor(public dialog: MatDialog,private sharedDataService : KeyboardValueService,
     private FicheparamService:FicheparamService) { }

  private subscription: Subscription = new Subscription;
  parametersForm : FormGroup = new FormGroup({});
  ngOnInit(): void {
    this.subscription = this.sharedDataService.currentDisplayValue.subscribe((value: string) => {
      if (this.activeInput === 'entete1') {
        this.displayValue1 = value;
      } else if(this.activeInput === 'entete2'){
        this.displayValue2 = value;
      }
      else if(this.activeInput === 'entete3'){
        this.displayValue3 = value;
      }
      else if(this.activeInput === 'basePage1'){
        this.displayValue4 = value;
      }
      else if(this.activeInput === 'basePage2'){
        this.displayValue5 = value;
      }
      else if(this.activeInput === 'codePV'){
        this.displayValue6 = value;
      }
      else if(this.activeInput === 'masqueCte'){
        this.displayValue7 = value;
      }
      else if(this.activeInput === 'nComAfficheur'){
        this.displayValue8 = value;
      }
      else if(this.activeInput === 'nComTitle'){
        this.displayValue9 = value;
      }
      else if(this.activeInput === 'tauxTVA'){
        this.displayValue10 = value;
      }
      else if(this.activeInput === 'heureFermeture'){
        this.displayValue11= value;
      }
      else if(this.activeInput === 'nombreDecimal'){
        this.displayValue12 = value;
      }
      else if(this.activeInput === 'timbre'){
        this.displayValue13= value;
      }
      else if(this.activeInput === 'montantPour1Point'){
        this.displayValue14 = value;
      }
      else if(this.activeInput === 'nbrePointMin'){
        this.displayValue15= value;
      }
      else if(this.activeInput === 'valPoint'){
        this.displayValue16 = value;
      }
      this.updateForm();
    });

    this.parametersForm = new FormGroup({
    entete1: new FormControl(this.displayValue1, Validators.required),
    entete2: new FormControl(this.displayValue2, Validators.required),
    entete3: new FormControl(this.displayValue3, Validators.required),
    basePage1: new FormControl(this.displayValue4, Validators.required),
    basePage2: new FormControl(this.displayValue5, Validators.required),
    codePV: new FormControl(this.displayValue6, Validators.required),
    nComAfficheur: new FormControl(this.displayValue7, Validators.required),
    nComTitle: new FormControl(this.displayValue8, Validators.required),
    tauxTVA: new FormControl(this.displayValue9, Validators.required),
    heureFermeture: new FormControl(this.displayValue10, Validators.required),
    nombreDecimal: new FormControl(this.displayValue11, Validators.required),
    timbre: new FormControl(this.displayValue12, Validators.required),
    montantPour1Point: new FormControl(this.displayValue13, Validators.required),
    nbrePointMin: new FormControl(this.displayValue14, Validators.required),
    valPoint: new FormControl(this.displayValue15, Validators.required)
  });
}
updateForm() {
  this.parametersForm.patchValue({
    entete1: this.displayValue1,
    entete2: this.displayValue2,
    entete3: this.displayValue3,
    basePage1: this.displayValue4,
    basePage2: this.displayValue5,
    codePV: this.displayValue6,
    masqueCte: this.displayValue7,
    nComAfficheur: this.displayValue8,
    nComTitle: this.displayValue9,
    tauxTVA: this.displayValue10,
    heureFermeture: this.displayValue11,
    timbre: this.displayValue12,
    nombreDecimal: this.displayValue13,
    montantPour1Point: this.displayValue14,
    nbrePointMin: this.displayValue15,
    valPoint: this.displayValue16
  }); 
}
ngOnDestroy(): void {
  this.subscription.unsubscribe();
}
  activeInput:'entete1' | 'entete2' | 'entete3' | 'basePage1' | 'basePage2' | 'codePV' | 'masqueCte' | 'nComAfficheur' | 'nComTitle' | 'tauxTVA' | 'heureFermeture' | 'nombreDecimal' | 'timbre' | 'montantPour1Point' | 'nbrePointMin' | 'valPoint' = 'entete1';
  articleForm: FormGroup = new FormGroup({});
  displayValue1: string = '';
  displayValue2: string ='';
  displayValue3: string='';
  displayValue4: string='';
  displayValue5: string='';
  displayValue6: string='';
  displayValue7: string='';
  displayValue8: string=''; 
  displayValue9: string='';
  displayValue10: string='';
  displayValue11: string='';
  displayValue12: string='';
  displayValue13: string='';
  displayValue14: string='';
  displayValue15: string='';
  displayValue16: string='';
newData:FicheParam = {
  entete1: '',
  entete2: '',
  entete3: '',
  basePage1: '',
  basePage2: '',
  codePV: '',
  masqueCte: '',
  nComAfficheur: '',
  nComTitle: '',
  tauxTVA: 0,
  heureFermeture: '',
  timbre: '',
  nombreDecimal: 0,
  startTime: '',
  montantPour1Point: 0,
  nbrePointMin: 0,
  valPoint: 0,
  afficheur: false,
  offreRapFinance: false,
  tableObligatoire: false,
  duplicateTicket: false,
  categorie: false,
  logo: false,
  ticketObligatoire: false,
  talon: false,
  ficheClient: false,
  tva: false,
  affRapportRap: false,
  codeWifi: false,
  pager: false,
  ruptureTicket: false,
  offreArticle: false,
  rapportFinance: '',
  tickBalance: '',
  balance: ''
}
  onSubmit() { 
    this.FicheparamService.create(this.newData).subscribe({
      next: (newData) => {
        Swal.fire('Success', 'Data saved successfully', 'success');
      },
      error: (error) => {
        Swal.fire('Error', 'An error occurred', 'error');
      }
    });
    }
  
  onclick(){
     this.clicker =! this.clicker;
  }
  setActiveInput(input: 'entete1' | 'entete2' | 'entete3' | 'basePage1' | 'basePage2' | 'codePV'| 'masqueCte'  | 'nComAfficheur' | 'nComTitle' | 'tauxTVA' | 'heureFermeture' | 'nombreDecimal' |'timbre'| 'montantPour1Point' | 'nbrePointMin' | 'valPoint') {
    this.activeInput = input;
  }
  openDialog(input: 'entete1' | 'entete2' | 'entete3' | 'basePage1' | 'basePage2' | 'codePV'| 'masqueCte' | 'nComAfficheur' | 'nComTitle' | 'tauxTVA' | 'heureFermeture' | 'nombreDecimal' | 'timbre' | 'montantPour1Point' | 'nbrePointMin' | 'valPoint') {
    this.setActiveInput(input);
    this.dialog.open(KeyboardComponent);
    MatDialog.prototype.afterAllClosed.subscribe(result => {
      if (result !== undefined) {
        if (this.activeInput === 'entete1') {
          this.displayValue1 = result;
        } else if(this.activeInput === 'entete2') {
          this.displayValue2 = result;
        }else if(this.activeInput === 'entete3') {
          this.displayValue3 = result;
        }else if(this.activeInput === 'basePage1') {
          this.displayValue4 = result;
        }else if(this.activeInput === 'basePage2') {
          this.displayValue5 = result;
        }else if(this.activeInput === 'codePV') {
          this.displayValue6 = result;
        }else if(this.activeInput === 'masqueCte') {
          this.displayValue7 = result;
        }else if(this.activeInput === 'nComAfficheur') {
          this.displayValue8 = result;
        }else if(this.activeInput === 'nComTitle') {
          this.displayValue9 = result;
        }else if(this.activeInput === 'tauxTVA') {
          this.displayValue10 = result;
        }else if(this.activeInput === 'heureFermeture') {
          this.displayValue11 = result;
        }else if(this.activeInput === 'nombreDecimal') {
          this.displayValue13 = result;
        }else if(this.activeInput === 'timbre') {
          this.displayValue12 = result;
        }else if(this.activeInput === 'montantPour1Point') {
          this.displayValue14 = result;
        }else if(this.activeInput === 'nbrePointMin') {
          this.displayValue15 = result;
        }else if (this.activeInput === 'valPoint') {
          this.displayValue16 = result;
        }
        this.updateForm();
      }
    });
  }
}