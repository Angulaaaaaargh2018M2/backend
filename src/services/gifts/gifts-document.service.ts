import {Injectable} from '@hapiness/core';
import {MongoClientService} from '@hapiness/mongo';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {GiftModel} from '../../models/gifts';
import {MongooseDocument} from 'mongoose';
import {Gift} from '../../interfaces';


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

    /**
     * Update a gift in gifts list
     *
     * @param {string} id
     * @param {Gift} gift
     *
     * @return {Observable<Gift | void>}
     */
    findByIdAndUpdate(id: string, gift: Gift): Observable<Gift | void> {
        return from(this._document.findByIdAndUpdate(id, gift, { new: true }))
            .pipe(
                map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined)
            );
    }

    /**
     * Delete an gift in gifts list
     *
     * @param {string} id
     *
     * @return {Observable<Gift | void>}
     */
    findByIdAndRemove(id: string): Observable<Gift | void> {
        return from(this._document.findByIdAndRemove(id))
            .pipe(
                map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined)
            )
    }

    /**
     * return tab of gifts for a event with id giftingEventId
     * @param giftingEventId
     *
     * @return {Observable<Gift | void>}
     */
    allForGiftingEvent(giftingEventId: string): Observable<Gift[] | void> {
        return from(this._document.find({'giftingEventId': giftingEventId}))
            .pipe(
                map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined)
            );
    }
}
