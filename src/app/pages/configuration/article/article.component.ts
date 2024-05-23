import { NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectButtonModule } from 'primeng/selectbutton';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import 'simple-keyboard/build/css/index.css';
import { KeyboardComponent } from '../../../keyboard/keyboard.component';
import { MatDialog } from '@angular/material/dialog';
import { ArticleService } from '../../../@services/article.service';
import { Article } from '../../../models/article.model';
import { KeyboardValueService } from '../../../@services/keyboard-value.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-article',
  standalone: true,
  imports: [NgIf,CheckboxModule,SelectButtonModule,FormsModule,ReactiveFormsModule,KeyboardComponent],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent implements OnInit {
 
  clicker: boolean = false;
  articleForm: FormGroup = new FormGroup({});
  displayValue1: string = '';
  displayValue2: string = '';
  displayValue3: number = 0;
  displayValue4: number = 0;
  dispalyValue5: string = '';
    private subscription: Subscription = new Subscription;
  activeInput: 'codeProduit' | 'designation' |'prixDeVente1'|'prixDeVente2'|'commentaire' = "codeProduit"; // Default or track the last clicked

    constructor(private formBuilder: FormBuilder,private sharedDataService : KeyboardValueService, public dialog: MatDialog,private article :ArticleService) { }
  ngOnInit() {
    this.subscription = this.sharedDataService.currentDisplayValue.subscribe((value: string) => {
      if (this.activeInput === 'codeProduit') {
        this.displayValue1 = value;
      } else if(this.activeInput === 'designation'){
        this.displayValue2 = value;
      }
      else if(this.activeInput === 'prixDeVente1'){
        this.displayValue3 = parseInt(value);
      }
      else if(this.activeInput === 'prixDeVente2'){
        this.displayValue4 = parseInt(value);
      }
      else if(this.activeInput === 'commentaire'){
        this.dispalyValue5 = value;
      }
      this.updateForm();
    });
  
    this.articleForm = this.formBuilder.group({
      codeProduit: new FormControl(this.displayValue1, Validators.required),
      designation: new FormControl(this.displayValue2, Validators.required),
      options: new FormControl('', Validators.required)
    });
  }
  updateForm() {
    this.articleForm.patchValue({
      codeProduit: this.displayValue1,
      designation: this.displayValue2,
      prixDeVente1: this.displayValue3,
      prixDeVente2: this.displayValue4,
      commentaire: this.dispalyValue5
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  newArticle: Article = {
    codeProduit:'',
    designation: '',
    groupe: '',
    sousGroupe: '',
    famille: '',
    sousfamille: '',
    prixDeVente1: 0,
    prixDeVente2: 0,
    commentaire: '',
    tva: '',
    image: null, // Assuming you handle image upload separately
    prixlibre: false,
    qteDecimale: false,
    prix0: false,
    fidelite: false,
    validation: false,
    stock: false,
    personnelAutorise: false,
    articlegratuit: false,
  };
  
  onSubmit() {
    this.newArticle.codeProduit = this.displayValue1;
    this.newArticle.designation = this.displayValue2;
    this.article.create(this.newArticle).subscribe({
      next: (newArticle) => {
        console.log('Article added:', newArticle);
        // Display success alert and reload page when user clicks 'OK'
        Swal.fire({
          title: 'Article ajouté avec succès!',
          text: '',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      },
      error: (error) => {
        console.error('Error adding article:', error);
        Swal.fire({
          title: 'Erreur lors de l\'ajout de l\'article',
          text: '',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });}
  onclick(){
     this.clicker =! this.clicker;
  }
  setActiveInput(inputField: 'codeProduit' | 'designation' |'prixDeVente1'|'prixDeVente2'|'commentaire'): void {
    this.activeInput = inputField;
  }
  openDialog(inputField: 'codeProduit' | 'designation' |'prixDeVente1'|'prixDeVente2'|'commentaire'): void {
    this.setActiveInput(inputField);
    const dialogRef = this.dialog.open(KeyboardComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (this.activeInput === 'codeProduit') {
          this.displayValue1 = result;
        } else if(this.activeInput === 'designation') {
          this.displayValue2 = result;
        }else if(this.activeInput === 'prixDeVente1') {
          this.displayValue3= parseInt(result);
        }
        else if(this.activeInput === 'prixDeVente2') {
          this.displayValue4 = parseInt(result);
        }
        else if(this.activeInput === 'commentaire') {
          this.dispalyValue5 = result;
        }
        this.updateForm();
      }
    });
  }
  famillesSmartphones = [
    { value: 'Série Find', display: 'Série Find' },
    { value: 'Série Reno', display: 'Série Reno' },
    { value: 'Série A', display: 'Série A' }
  ];

  sousFamillesSmartphones = [
    { value: 'Find X5', display: 'Find X5' },
    { value: 'Find X3', display: 'Find X3' },
    { value: 'Reno7', display: 'Reno7' },
    { value: 'Reno6', display: 'Reno6' },
    { value: 'Reno5', display: 'Reno5' },
    { value: 'A95', display: 'A95' },
    { value: 'A74', display: 'A74' }
  ];

  // Cette méthode met à jour le sous-groupe sélectionné
  onSousGroupeChange(value: string) {
    this.newArticle.sousGroupe = value;
  }
}
