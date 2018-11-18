import {HTTPHandlerResponse, Injectable} from '@hapiness/core';
import {GiftingEvent} from '../../interfaces/giftingEvent';
import {GiftingEventsDocumentService} from './giftingEvents-document.service';
import {Observable, of, throwError} from 'rxjs';
import {Biim} from '@hapiness/biim';
import {catchError, flatMap, map} from 'rxjs/operators';

@Injectable()
export class GiftingEventsService {

    constructor(private _eventsDocumentService: GiftingEventsDocumentService) {
    }

    /**
     * Returns all existing giftingEvents in the list
     *
     * @returns {Observable<Event[] | void>}
     */
    listAll(): Observable<GiftingEvent[] | void> {
        return this._eventsDocumentService.find();
    }

    /**
     * Returns one event of the list matching id in parameter
     *
     * @param {string} id of the giftingEvents
     *
     * @returns {Observable<Event>}
     */
    one(id: string): Observable<GiftingEvent> {
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
    create(event: GiftingEvent): Observable<HTTPHandlerResponse> {
        return of(event)
            .pipe(
                flatMap(_ => this._eventsDocumentService.create(_)),
                catchError(e =>
                        throwError(Biim.preconditionFailed(e.message))
                ),
                map(_ => ({ response: _, statusCode: 201 }))
            );
    }

    /**
     * Update an event in events list
     *
     * @param {string} id of the event to update
     * @param {GiftingEvent} event data to update
     *
     * @returns {Observable<GiftingEvent>}
     */
    update(id: string, event: GiftingEvent): Observable<GiftingEvent> {
        return this._eventsDocumentService.findByIdAndUpdate(id, event)
            .pipe(
                catchError(e =>
                    throwError(Biim.preconditionFailed(e.message))
                ),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        throwError(Biim.notFound(`Event with id '${id}' not found`))
                )
            );
    }

    /**
     * Deletes one event in events list
     *
     * @param {string} id of the event to delete
     *
     * @returns {Observable<void>}
     */
    delete(id: string): Observable<void> {
        return this._eventsDocumentService.findByIdAndRemove(id)
            .pipe(
                catchError(e => throwError(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(undefined) :
                        throwError(Biim.notFound(`Event with id '${id}' not found`))
                )
            );
    }

    /**
     * Add event with good data in giftingEvents list
     *
     * @param event to add
     *
     * @returns {Observable<any>}
     *
     * @private
     */
    /*private _addEvent(event: EventInterface): Observable<any> {
        return of(event)
            .pipe(
                map(_ =>
                    Object.assign(
                        { date: _.date },
                        _
                    )
                )
            );
    }*/

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
