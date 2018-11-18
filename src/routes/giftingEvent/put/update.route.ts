import {OnPut, Request, Route} from '@hapiness/core';
import {LoggerService} from '@hapiness/logger';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {GIFTING_EVENT_PAYLOAD, GIFTING_EVENT_RESPONSE, ID_PARAMETER} from '../../../schemas';
import {GiftingEvent} from '../../../interfaces';
import {GiftingEventsService} from '../../../services/giftingEvents';


@Route({
    path: '/api/giftingEvents/{id}',
    method: 'PUT',
    config: {
        validate: {
            params: {
                id: ID_PARAMETER
            },
            payload: GIFTING_EVENT_PAYLOAD
        },
        payload: {
            output: 'data',
            allow: 'application/json',
            parse: true
        },
        response: {
            status: {
                200: GIFTING_EVENT_RESPONSE
            }
        },
        description: 'Update one giftingEvents',
        notes: 'Update the giftingEvents for the given id in path parameter and returns it',
        tags: [ 'api', 'giftingEvents' ]
    }
})

export class UpdateOneGiftingEvents implements  OnPut {

    constructor(private _giftingEventService: GiftingEventsService, private  _logger: LoggerService) {
    }


    onPut(request: Request): Observable<GiftingEvent> {
        return this._giftingEventService.update(request.params.id, request.payload)
            .pipe(
                tap( _ => this._logger.info(_))
            );
    }

}
