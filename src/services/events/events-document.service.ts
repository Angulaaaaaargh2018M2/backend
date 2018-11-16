import {Injectable} from '@hapiness/core';
import {MongoClientService} from '@hapiness/mongo';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MongooseDocument} from 'mongoose';
import {EventModel} from '../../models/events';
import {Event as EventInterface} from '../../interfaces/event';


@Injectable()
export class EventsDocumentService {

    private _document: any;

    constructor(private _mongoClientService: MongoClientService){
        this._document = this._mongoClientService.getModel( {adapter: 'mongoose'}, EventModel);
    }

    /**
     * Call mongoose method, call toJSON on each result and returns Event[] or undefined
     *
     * @return {Observable<Person[] | void>}
     */
    find(): Observable<EventInterface[] | void> {
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
    findById(id: string): Observable<EventInterface | void> {
        return from(this._document.findById(id))
            .pipe(
                map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined)
            );
    }

    /**
     * add event in events list
     *
     * @param {Event} event to create
     *
     * @return {Observable<Event>}
     */
    create(event: EventInterface): Observable<EventInterface> {
        return from(this._document.create(event))
            .pipe(
                map((doc: MongooseDocument) => doc.toJSON())
            );
    }
}
