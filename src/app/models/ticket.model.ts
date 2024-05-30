import { UUID } from "crypto";

export interface Ticket {
    id: number;
    ticketId:UUID;
    designation: string;
    clientName:string;
    quantity: string;
    isActive: string;
    createdDate: Date;
    prix: String;
    total: string;
    type_solde: number;
    caissier: string | null;
}