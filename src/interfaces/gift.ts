export interface Gift {
    id?: string;
    name: string;
    quantity: number;
    linksGift: string[];
    listPeople: ListedPerson[];
    eventId?: string;

}

export interface ListedPerson {
    mail: string;
    send: boolean;
}

