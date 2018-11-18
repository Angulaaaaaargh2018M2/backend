import {HTTPHandlerResponse, Injectable} from '@hapiness/core';
import {GiftsDocumentService} from './gifts-document.service';
import {Observable, of, throwError} from 'rxjs';
import {catchError, flatMap, map} from 'rxjs/operators';
import {Biim} from '@hapiness/biim';
import {Gift} from '../../interfaces';


@Injectable()
export class GiftsService {

    constructor(private _giftsDocumentService: GiftsDocumentService) {
    }

    /**
     * Returns all existing gifts in the list
     *
     * @returns {Observable<Gift[] | void>}
     */
    listAll(): Observable<Gift[] | void> {
        return this._giftsDocumentService.find();
    }

    /**
     * Returns one gift of the list matching id in parameter
     *
     * @param {string} id of the gift
     *
     * @returns {Observable<Gift>}
     */
    one(id: string): Observable<Gift> {
        return this._giftsDocumentService.findById(id)
            .pipe(
                catchError(e => throwError(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        throwError(Biim.notFound(`Gift with id '${id}' not found`))
                )
            );
    }

    // TODO CHECK PAR NAME ET PAR EVENTID
    /**
     * Check if gift already exists (by name and by enventID) and add it in gifts list
     *
     * @param eventId refer to event
     * @param gift to create
     *
     * @returns {Observable<HTTPHandlerResponse>}
     */
    create(eventId: string, gift: Gift): Observable<HTTPHandlerResponse> {
        return this._addGift(eventId, gift)
            .pipe(
                flatMap(_ => this._giftsDocumentService.create(_)),
                catchError(e =>
                    e.code = 11000 ?
                        throwError(
                            Biim.conflict(`Gift with name '${gift.name}' and for eventID '${gift.eventId}' already exists`)
                        ) :
                        throwError(Biim.preconditionFailed(e.message))
                ),
                map(_ => ({ response: _, statusCode: 201 }))
            );
    }

    /**
     * Update a gift in gifts list
     *
     * @param {string} id of the gift to update
     * @param {gift} gift data to update
     *
     * @returns {Observable<Gift>}
     */
    update(id: string, gift: Gift): Observable<Gift> {
        return this._giftsDocumentService.findByIdAndUpdate(id, gift)
            .pipe(
                catchError(e =>
                    throwError(Biim.preconditionFailed(e.message))
                ),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        throwError(Biim.notFound(`Gift with id '${id}' not found`))
                )
            );
    }

    /**
     * Deletes one gift in gifts list
     *
     * @param {string} id of the gift to delete
     *
     * @returns {Observable<void>}
     */
    delete(id: string): Observable<void> {
        return this._giftsDocumentService.findByIdAndRemove(id)
            .pipe(
                catchError(e => throwError(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(undefined) :
                        throwError(Biim.notFound(`Gift with id '${id}' not found`))
                )
            );
    }

    /**
     * Get tab of gifts for an event with giftingEventId id
     *
     * @param giftingEventId
     *
     * @returns {Observable<Gift[] | void>}
     */
    listAllForGiftingEvent(giftingEventId: string): Observable<Gift[] | void> {
        return this._giftsDocumentService.allForGiftingEvent(giftingEventId)
            .pipe(
                catchError(e => throwError(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(undefined) :
                        throwError(Biim.notFound(`list of Gifts for event with id '${giftingEventId}' not found`))
                )
            );
    }


    /**
     * Add gift with good data in gifts list
     *
     * @param giftingEventId
     * @param gift to add
     *
     * @returns {Observable<any>}
     *
     * @private
     */
    private _addGift(giftingEventId: string, gift: Gift): Observable<any> {
        return of(gift)
            .pipe(
                map(_ =>
                    Object.assign(
                        { giftingEventId: giftingEventId },
                        _
                    )
                )
            );
    }
}
