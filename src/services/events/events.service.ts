import {Injectable} from '@hapiness/core';
import {EventsDocumentService} from './events-document.service';
import {Observable} from 'rxjs';


@Injectable()
export class EventsService {

    constructor(private _eventsDocumentService: EventsDocumentService) {
    }

    /**
     * Returns all existing people in the list
     *
     * @returns {Observable<Person[] | void>}
     */
    listAll(): Observable<Event[] | void> {
        return this._eventsDocumentService.find();
    }
}
