import {Injectable} from '@hapiness/core';
import {MongoClientService} from '@hapiness/mongo';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GiftModel} from '../../models/gifts';
import {MongooseDocument} from 'mongoose';


@Injectable()
export class GiftsDocumentService {

    private _document: any;

    constructor(private _mongoClientService: MongoClientService){
        this._document = this._mongoClientService.getModel( {adapter: 'mongoose'}, GiftModel);
    }


    /**
     * Call mongoose method, call toJSON on each result and returns Gifts[] or undefined
     *
     * @return {Observable<Gift[] | void>}
     */
    find(): Observable<Gift[] | void> {
        return from(this._document.find({}))
            .pipe(
                map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined)
            );
    }

    /**
     * Returns one gift of the list matching id in parameter
     *
     * @param {string} id of the gift in the db
     *
     * @return {Observable<Gift | void>}
     */
    findById(id: string): Observable<Gift | void> {
        return from(this._document.findById(id))
            .pipe(
                map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined)
            );
    }

    /**
     * Check if gift already exists (by name and eventId) and add it in gifts list
     *
     * @param {Gift} event to create
     *
     * @return {Observable<Gift>}
     */
    create(gift: Gift): Observable<Gift> {
        return from(this._document.create(gift))
            .pipe(
                map((doc: MongooseDocument) => doc.toJSON())
            );
    }
}
