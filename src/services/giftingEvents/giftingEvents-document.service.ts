import {Injectable} from '@hapiness/core';
import {MongoClientService} from '@hapiness/mongo';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MongooseDocument} from 'mongoose';
import {GiftingEventModel} from '../../models/events';
import {GiftingEvent} from '../../interfaces';

@Injectable()
export class GiftingEventsDocumentService {

    private _document: any;

    constructor(private _mongoClientService: MongoClientService){
        this._document = this._mongoClientService.getModel( {adapter: 'mongoose'}, GiftingEventModel);
    }

    /**
     * Call mongoose method, call toJSON on each result and returns GiftingEvent[] or undefined
     *
     * @return {Observable<Person[] | void>}
     */
    find(): Observable<GiftingEvent[] | void> {
        return from(this._document.find({}))
            .pipe(
                map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined)
            );
    }

    /**
     * Returns one event of the list matching id in parameter
     *
     * @param {string} id of the event in the db
     *
     * @return {Observable<Event | void>}
     */
    findById(id: string): Observable<GiftingEvent | void> {
        return from(this._document.findById(id))
            .pipe(
                map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined)
            );
    }

    /**
     * add event in giftingEvents list
     *
     * @param {Event} event to create
     *
     * @return {Observable<Event>}
     */
    create(event: GiftingEvent): Observable<GiftingEvent> {
        return from(this._document.create(event))
            .pipe(
                map((doc: MongooseDocument) => doc.toJSON())
            );
    }

    /**
     * Update an event in events list
     *
     * @param {string} id
     * @param {GiftingEvent} event
     *
     * @return {Observable<GiftingEvent | void>}
     */
    findByIdAndUpdate(id: string, event: GiftingEvent): Observable<GiftingEvent | void> {
        return from(this._document.findByIdAndUpdate(id, event, { new: true }))
            .pipe(
                map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined)
            );
    }

    /**
     * Delete an event in events list
     *
     * @param {string} id
     *
     * @return {Observable<GiftingEvent | void>}
     */
    findByIdAndRemove(id: string): Observable<GiftingEvent | void> {
        return from(this._document.findByIdAndRemove(id))
            .pipe(
                map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined)
            )
    }
}
