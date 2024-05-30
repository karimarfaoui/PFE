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
import { Router } from 'express';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-article',
  standalone: true,
  imports: [NgIf,CheckboxModule,SelectButtonModule,RouterLink,FormsModule,ReactiveFormsModule,KeyboardComponent],
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
        this.displayValue3 = Number(value); // Convert value to a number
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
      prixDeVente1: new FormControl(this.displayValue3, Validators.required),
      prixDeVente2: new FormControl(this.displayValue4, Validators.required),
      commentaire: new FormControl(this.dispalyValue5, Validators.required),
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
    this.newArticle.prixDeVente1 = this.displayValue3;
    this.newArticle.prixDeVente2 = this.displayValue4;
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

data: any[] = [];  // Array to hold the fetched data

findAlldata() {
  this.article.findAll().subscribe(posts => {
    this.data = posts;  // Store the fetched data
    console.log(posts);
    this.findButton();  // Call the function to display SweetAlert after data is fetched
  });
}

  findButton() {
    Swal.fire({
      title: 'Voici les données',
      html:this.formatData(),
      icon: 'info',
      width:800,
      showConfirmButton: false,
      confirmButtonText: 'Fermer'
  });
}
formatData() {
  let html =`<table style="width:100%;">
  <tr>
    <th>Code Produit</th>
    <th>Designation</th>
    <th>groupe</th>
    <th>sousGroupe</th>
    <th>famille</th>
    <th>sousfamille</th>
    <th>Prix de vente 1</th>
    <th>Prix de vente 2</th>
  </tr>`;
  
 
  
  this.data.forEach(item => {
    html += `<tr>
      <td>${item.codeProduit}</td>
      <td>${item.designation}</td>
      <td>${item.groupe}</td>
      <td>${item.sousGroupe}</td>
      <td>${item.famille}</td>
      <td>${item.sousfamille}</td>
      <td>${item.displayValue3}</td>
      <td>${item.prixVente2}</td>
$    </tr>`;
  });

  html += `</table>`;
  return html;
}
deleteArticle(code: any) {
  this.article.delete(code).subscribe({
    next: (response) => {
      console.log('Article deleted:', response);
      Swal.fire({
        title: 'Article supprimé avec succès!',
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
      console.error('Error deleting article:', error);
      Swal.fire({
        title: 'Erreur lors de la suppression de l\'article',
        text: '',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  });

}
deletebutton() {
  Swal.fire({
    title: 'Voulez-vous supprimer cet article?',
    icon: 'warning',
    html: `<strong>Insérer le code du produit:</strong>
    <input type="text" id="code" class="swal2-input" placeholder="Code Produit">
    `,
    showCancelButton: true,
    confirmButtonText: 'Oui',
    cancelButtonText: 'Non',
  }).then((result) => {
    if (result.isConfirmed) {
      const code = (document.getElementById('code') as HTMLInputElement).value;
      this.deleteArticle(code);
    }
  });
}

}