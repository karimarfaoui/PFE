// src/app/models/caisse-client.model.ts

export interface CaisseClient {
    code_client: number;
    client_name: string;
    client_addresse: string;
    client_ville: string;
    client_email: string;
    client_ob: string;
    client_tel: string;
    client_fax: string;
    client_mf: string;
    bloque: boolean;
    client_date: Date;
    type_carte: boolean;
    type_fidelite: boolean;
    type_credit: boolean;
    type_prix2: boolean;
    type_fidelete_point: boolean;
    type_type7: boolean;
    type_type8: boolean;
    type_vente: boolean;
    type_solde: number;
    type_ancien_solde: number;
  }
  