export interface Article {
    id?: number;  // The '?' makes the 'id' optional
    codeProduit: string; // Using non-null assertion since these are initialized by Sequelize
    designation: string;
    groupe: string;
    sousGroupe: string;
    famille: string;
    sousfamille: string;
    prixDeVente1: number;
    prixDeVente2: number;
    commentaire: string;
    tva: string;
    image: Buffer | null;
    prixlibre: boolean;
    qteDecimale: boolean;
    prix0: boolean;
    fidelite: boolean;
    validation: boolean;
    stock: boolean;
    personnelAutorise: boolean;
    articlegratuit: boolean;

}