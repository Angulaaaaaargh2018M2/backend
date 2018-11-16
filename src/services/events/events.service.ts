import {HTTPHandlerResponse, Injectable} from '@hapiness/core';
import {Event as EventInterface} from '../../interfaces/event';
import {EventsDocumentService} from './events-document.service';
import {Observable, of, throwError} from 'rxjs';
import {Biim} from '@hapiness/biim';
import {catchError, flatMap, map} from 'rxjs/operators';

@Injectable()
export class EventsService {

    constructor(private _eventsDocumentService: EventsDocumentService) {
    }

    /**
     * Returns all existing events in the list
     *
     * @returns {Observable<Event[] | void>}
     */
    listAll(): Observable<EventInterface[] | void> {
        return this._eventsDocumentService.find();
    }

    /**
     * Returns one event of the list matching id in parameter
     *
     * @param {string} id of the events
     *
     * @returns {Observable<Event>}
     */
    one(id: string): Observable<EventInterface> {
        return this._eventsDocumentService.findById(id)
            .pipe(
                catchError(e => throwError(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        throwError(Biim.notFound(`Event with id '${id}' not found`))
                )
            );
    }

    /**
     *  add it in event list
     *
     * @param event to create
     *
     * @returns {Observable<HTTPHandlerResponse>}
     */
    create(event: EventInterface): Observable<HTTPHandlerResponse> {
        return this._addEvent(event)
            .pipe(
                flatMap(_ => this._eventsDocumentService.create(_)),
                catchError(e =>
                        throwError(Biim.preconditionFailed(e.message))
                ),
                map(_ => ({ response: _, statusCode: 201 }))
            );
    }

    /**
     * Add event with good data in events list
     *
     * @param event to add
     *
     * @returns {Observable<any>}
     *
     * @private
     */
    private _addEvent(event: EventInterface): Observable<any> {
        return of(event)
            .pipe(
                map(_ =>
                    Object.assign(
                        { date: _.date },
                        _
                    )
                )
            );
    }

    /**
     * Function to parse date and return timestamp
     *
     * @param {string} date to parse
     *
     * @returns {number} timestamp
     *
     * @private
     */
    /*
    private _parseDate(date: string): number {
        const dates = date.split('/');
        return (new Date(dates[ 2 ] + '/' + dates[ 1 ] + '/' + dates[ 0 ]).getTime());
    }
    */
}
