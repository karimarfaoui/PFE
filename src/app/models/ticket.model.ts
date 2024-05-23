import { UUID } from "crypto";
import { FLOAT } from "html2canvas/dist/types/css/property-descriptors/float";

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
}