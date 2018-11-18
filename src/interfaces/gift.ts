export interface Gift {
    id?: string;
    name: string;
    quantity: number;
    linksGifts: string[];
    listPeople: ListedPerson[];
    giftingEventId?: string;

}

export interface ListedPerson {
    mail: string;
    send: boolean;
}

