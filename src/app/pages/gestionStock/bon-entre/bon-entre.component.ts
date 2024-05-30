import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { EntreService } from '../../../@services/entre.service';
import { ArticleService } from '../../../@services/article.service';
import { Entre } from '../../../models/entree.model';

@Component({
  selector: 'app-bon-entre',
  standalone: true,
  imports: [ HttpClientModule,FormsModule,NgFor,ReactiveFormsModule],
  templateUrl: './bon-entre.component.html',
  styleUrl: './bon-entre.component.css'
})
export class BonEntreComponent {
  lines: Entre[] = [{
    date: new Date(),
    code_pro: 0,
    designation: '',
    qte: 0,
    prix: 0,
    total: 0,
    formatteDate: ''
  }];

  constructor(private entreService: EntreService, private articleService: ArticleService) { }

  ngOnInit() { }

  addLigne() {
    this.lines.push({
      date: new Date(),
      code_pro: 0,
      designation: '',
      qte: 0,
      prix: 0,
      total: 0,
      formatteDate: ''
    });
  }

  removeLigne(index: number) {
    this.lines.splice(index, 1);
  }

  find(line: {
    prix: number; code_pro: number, designation: string 
}) {
    this.articleService.find(line.code_pro).subscribe((data) => { // Update the type of 'data' to 'any'
      if (data == null) {
        Swal.fire('Article n\'existe pas');
      }
      line.designation = data.designation;
      line.prix = data.prixDeVente1; // Assuming prix_vente is available in article data
      console.log(line.designation, line.prix);
    });
  }

  onSubmit() {
    this.lines.forEach(line => {
      line.total = line.qte * line.prix;
    });

    this.entreService.addEntrees(this.lines).subscribe(data => {
      Swal.fire('Bon d\'entrée ajouté avec succès');
    }, error => {
      Swal.fire('Erreur lors de l\'ajout du bon d\'entrée');
    });
  }} 