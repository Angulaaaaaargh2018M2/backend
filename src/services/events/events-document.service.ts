import {Injectable} from '@hapiness/core';
import {MongoClientService} from '@hapiness/mongo';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MongooseDocument} from 'mongoose';
import {EventModel} from '../../models/events';


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
    find(): Observable<Event[] | void> {
        return from(this._document.find({}))
            .pipe(
                map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined)
            );
    }
}
