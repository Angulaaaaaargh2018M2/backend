import {HTTPHandlerResponse, Injectable} from '@hapiness/core';
import {GiftsDocumentService} from './gifts-document.service';
import {Observable, of, throwError} from 'rxjs';
import {catchError, flatMap, map} from 'rxjs/operators';
import {Biim} from '@hapiness/biim';


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
     * @param gift to create
     *
     * @returns {Observable<HTTPHandlerResponse>}
     */
    create(gift: Gift): Observable<HTTPHandlerResponse> {
        return this._addGift(gift)
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
     * Add gift with good data in gifts list
     *
     * @param gift to add
     *
     * @returns {Observable<any>}
     *
     * @private
     */
    private _addGift(gift: Gift): Observable<any> {
        return of(gift);
    }
}
