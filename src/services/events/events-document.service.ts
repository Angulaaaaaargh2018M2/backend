import {Injectable} from '@hapiness/core';
import {MongoClientService} from '@hapiness/mongo';


@Injectable()
export class EventsDocumentService {

    private _document: any;

    constructor(private _mongoClientService: MongoClientService){
        this._document = this._mongoClientService.getModel( {adapter: 'mongoose'}, EventModel);
    }
}