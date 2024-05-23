export interface Config{
    nomServeurCaisse: string;
    port: string;
    nomBase: string;
    nomServeurAvance: string;
    nomBaseAvance: string;
    nomServeurClient: string;
    nomBaseClient: string;
    nomServeurAvoir: string;
    nomBaseFacture: string;
    nomServeurFacture: string;
    ipServeurFloture: string;
    numCaisse: string;
    codeDepot: string;
    moduleBalance: string;
    cheminBalance: string;
    impressionAutomatique: string;
    imprimanteTicket: string;
    imprimantePat: string;
    cheminRepertoireTransfertUDPV: string;
    caissePrincipale: boolean;
    caisseDeCommande: boolean;
    deuxiemeEcran: boolean;
    RAPART : boolean;
    agentRecuperation: boolean;
}