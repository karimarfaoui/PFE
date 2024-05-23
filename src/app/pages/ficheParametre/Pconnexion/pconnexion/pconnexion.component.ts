import { Subscription } from 'rxjs';
import { config } from './../../../../app.config.server';
import { Component, OnInit } from '@angular/core';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { KeyboardComponent } from '../../../../keyboard/keyboard.component';
import { MatDialog } from '@angular/material/dialog';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ParameterConnexionService } from '../../../../@services/parameter-connexion.service';
import { Config } from '../../../../models/config.model';
import { KeyboardValueService } from '../../../../@services/keyboard-value.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pconnexion',
  standalone: true,
  imports: [ToggleButtonModule,KeyboardComponent,NgIf,ReactiveFormsModule,FormsModule,HttpClientModule],
  templateUrl: './pconnexion.component.html',
  styleUrl: './pconnexion.component.css'
})
export class PconnexionComponent implements OnInit{
  parametresForm: FormGroup = new FormGroup({});
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
  displayValue17: string='';
  displayValue18: string='';
  displayValue19: string='';
  private subscription: Subscription = new Subscription;
  activeInput: 'nomServeurCaisse' | 'port' | 'nomBase' | 'nomServeurAvance' | 'nomBaseAvance' | 'nomServeurClient' | 'nomBaseClient' | 'nomServeurAvoir' | 'nomBaseFacture' | 'nomServeurFacture' | 'ipServeurFloture' | 'numCaisse' | 'codeDepot' | 'moduleBalance' | 'cheminBalance' | 'impressionAutomatique' | 'imprimanteTicket' | 'imprimantePat' | 'cheminRepertoireTransfertUDPV' = "nomServeurCaisse"; // Default or track the last clicked
  constructor(public dialog: MatDialog,private sharedDataService : KeyboardValueService, private config:ParameterConnexionService) { }
  ngOnInit(): void {
    this.subscription = this.sharedDataService.currentDisplayValue.subscribe((value: string) => {
      if (this.activeInput === 'nomServeurCaisse') {
        this.displayValue1 = value;
      } else if(this.activeInput === 'port'){
        this.displayValue2 = value;
      }
      else if(this.activeInput === 'nomBase'){
        this.displayValue3 = value;
      }
      else if(this.activeInput === 'nomServeurAvance'){
        this.displayValue4 = value;
      }
      else if(this.activeInput === 'nomBaseAvance'){
        this.displayValue5 = value;
      }
      else if(this.activeInput === 'nomServeurClient'){
        this.displayValue6 = value;
      }
      else if(this.activeInput === 'nomBaseClient'){
        this.displayValue7 = value;
      }
      else if(this.activeInput === 'nomServeurAvoir'){
        this.displayValue8 = value;
      }
      else if(this.activeInput === 'nomBaseFacture'){
        this.displayValue9 = value;
      }
      else if(this.activeInput === 'nomServeurFacture'){
        this.displayValue10 = value;
      }
      else if(this.activeInput === 'ipServeurFloture'){
        this.displayValue11 = value;
      }
      else if(this.activeInput === 'numCaisse'){
        this.displayValue12 = value;
      }
      else if(this.activeInput === 'codeDepot'){
        this.displayValue13 = value;
      }
      else if(this.activeInput === 'moduleBalance'){
        this.displayValue14 = value;
      }
      else if(this.activeInput === 'cheminBalance'){
        this.displayValue15 = value;
      }
      else if(this.activeInput === 'impressionAutomatique'){
        this.displayValue16 = value;
      }
      else if(this.activeInput === 'imprimanteTicket'){
        this.displayValue17 = value;
      }
      else if(this.activeInput === 'imprimantePat'){
        this.displayValue18 = value;
      }
      else if(this.activeInput === 'cheminRepertoireTransfertUDPV'){
        this.displayValue19 = value;
      }
      this.updateForm();
    });
    this.parametresForm = new FormGroup({
      nomServeurCaisse: new FormControl(this.displayValue1, Validators.required),
      port: new FormControl(this.displayValue2, Validators.required),
      nomBase: new FormControl(this.displayValue3, Validators.required),
      nomServeurAvance: new FormControl(this.displayValue4, Validators.required),
      nomBaseAvance: new FormControl(this.displayValue5, Validators.required),
      nomServeurClient: new FormControl(this.displayValue6, Validators.required),
      nomBaseClient: new FormControl(this.displayValue7, Validators.required),
      nomServeurAvoir: new FormControl(this.displayValue8, Validators.required),
      nomBaseFacture: new FormControl(this.displayValue9, Validators.required),
      nomServeurFacture: new FormControl(this.displayValue10, Validators.required),
      ipServeurFloture: new FormControl(this.displayValue11, Validators.required),
      numCaisse: new FormControl(this.displayValue12, Validators.required),
      codeDepot: new FormControl(this.displayValue13, Validators.required),
      moduleBalance: new FormControl(this.displayValue14, Validators.required),
      cheminBalance: new FormControl(this.displayValue15, Validators.required),
      impressionAutomatique: new FormControl(this.displayValue16, Validators.required),
      imprimanteTicket: new FormControl(this.displayValue17, Validators.required),
      imprimantePat: new FormControl(this.displayValue18, Validators.required),
      cheminRepertoireTransfertUDPV: new FormControl(this.displayValue19, Validators.required)
    });
  }
updateForm() {
  this.parametresForm.patchValue({
    nomServeurCaisse: this.displayValue1,
    port: this.displayValue2,
    nomBase: this.displayValue3,
    nomServeurAvance: this.displayValue4,
    nomBaseAvance: this.displayValue5,
    nomServeurClient: this.displayValue6,
    nomBaseClient: this.displayValue7,
    nomServeurAvoir: this.displayValue8,
    nomBaseFacture: this.displayValue9,
    nomServeurFacture: this.displayValue10,
    ipServeurFloture: this.displayValue11,
    numCaisse: this.displayValue12,
    codeDepot: this.displayValue13,
    moduleBalance: this.displayValue14,
    cheminBalance: this.displayValue15,
    impressionAutomatique: this.displayValue16,
    imprimanteTicket: this.displayValue17,
    imprimantePat: this.displayValue18,
    cheminRepertoireTransfertUDPV: this.displayValue19
  });
}
ngOnDestroy(): void {
  this.subscription.unsubscribe();
}
setActiveInput(input: 'nomServeurCaisse' | 'port' | 'nomBase' | 'nomServeurAvance' | 'nomBaseAvance' | 'nomServeurClient' | 'nomBaseClient' | 'nomServeurAvoir' | 'nomBaseFacture' | 'nomServeurFacture' | 'ipServeurFloture' | 'numCaisse' | 'codeDepot' | 'moduleBalance' | 'cheminBalance' | 'impressionAutomatique' | 'imprimanteTicket' | 'imprimantePat' | 'cheminRepertoireTransfertUDPV') {
  this.activeInput = input;
}
openDialog(inputField: 'nomServeurCaisse' | 'port' | 'nomBase' | 'nomServeurAvance' | 'nomBaseAvance' | 'nomServeurClient' | 'nomBaseClient' | 'nomServeurAvoir' | 'nomBaseFacture' | 'nomServeurFacture' | 'ipServeurFloture' | 'numCaisse' | 'codeDepot' | 'moduleBalance' | 'cheminBalance' | 'impressionAutomatique' | 'imprimanteTicket' | 'imprimantePat' | 'cheminRepertoireTransfertUDPV') {
  this.activeInput = inputField;
  this.dialog.open(KeyboardComponent);
  MatDialogRef.prototype.afterClosed().subscribe((result: string | undefined) => {
    if(result !== undefined) {
      if (inputField === 'nomServeurCaisse') {
        this.displayValue1 = result;
      } else if(inputField === 'port'){
        this.displayValue2 = result;
      }else if(inputField === 'nomBase'){
        this.displayValue3 = result;
      } else if(inputField === 'nomServeurAvance'){
        this.displayValue4 = result;
      } else if(inputField === 'nomBaseAvance'){
        this.displayValue5 = result;
      } else if(inputField === 'nomServeurClient'){
        this.displayValue6 = result;
      } else if(inputField === 'nomBaseClient'){
        this.displayValue7 = result;
      } else if(inputField === 'nomServeurAvoir'){
        this.displayValue8 = result;
      } else if(inputField === 'nomBaseFacture'){
        this.displayValue9 = result;
      } else if(inputField === 'nomServeurFacture'){
        this.displayValue10 = result;
      } else if(inputField === 'ipServeurFloture'){
        this.displayValue11 = result;
      } else if(inputField === 'numCaisse'){
        this.displayValue12 = result;
      } else if(inputField === 'codeDepot'){
        this.displayValue13 = result;
      } else if(inputField === 'moduleBalance'){
        this.displayValue14 = result;
      }
      else if(inputField === 'cheminBalance'){
        this.displayValue15 = result;
      }
      else if(inputField === 'impressionAutomatique'){
        this.displayValue16 = result;
      }
      else if(inputField === 'imprimanteTicket'){
        this.displayValue17 = result;
      }
      else if(inputField === 'imprimantePat'){
        this.displayValue18 = result;
      }
      else if(inputField === 'cheminRepertoireTransfertUDPV'){
        this.displayValue19 = result;
      }
      this.updateForm();
    }
  });
}
newData : Config ={
  nomServeurCaisse: '',
  port: '',
  nomBase: '',
  nomServeurAvance: '',
  nomBaseAvance: '',
  nomServeurClient: '',
  nomBaseClient: '',
  nomServeurAvoir: '',
  nomBaseFacture: '',
  nomServeurFacture: '',
  ipServeurFloture: '',
  numCaisse: '',
  codeDepot: '',
  moduleBalance: '',
  cheminBalance: '',
  impressionAutomatique: '',
  imprimanteTicket: '',
  imprimantePat: '',
  cheminRepertoireTransfertUDPV: '',
  caissePrincipale: false,
  caisseDeCommande: false,
  deuxiemeEcran: false,
  RAPART: false,
  agentRecuperation: false
};
onSubmit() { 
  this.config.create(this.newData).subscribe({
    next: (response) => {
      console.log('Data created successfully:', response);
      Swal.fire({
        icon: 'success',
        title: 'Enregistré avec succès',
        showConfirmButton: false,
        timer: 2000      });
      // Additional logic after successful creation, if necessary
    },
    error: (error) => {
      console.error('Error creating data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erreur lors de l\'enregistrement',
        showConfirmButton: false,
        timer: 2000
      });
      // Additional error handling logic
    }
  });
 
}
}
