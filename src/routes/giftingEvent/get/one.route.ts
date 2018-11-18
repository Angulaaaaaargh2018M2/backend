import {OnGet, Request, Route} from '@hapiness/core';
import {LoggerService} from '@hapiness/logger';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {GiftingEvent} from '../../../interfaces';
import {GIFTING_EVENT_RESPONSE, ID_PARAMETER} from '../../../schemas';
import {GiftingEventsService} from '../../../services/giftingEvents';


@Route({
    path: '/api/giftingEvents/{id}',
    method: 'GET',
    config: {
        validate: {
            params: {
                id: ID_PARAMETER
            }
        },
        response: {
            status: {
                200: GIFTING_EVENT_RESPONSE
            }
        },
        description: 'Get one giftingEvents',
        notes: 'Returns one giftingEvents for the given id in path parameter',
        tags: [ 'api', 'giftingEvents' ]
    }
})

export class GetOneGiftingEvent implements  OnGet {

    constructor(private _giftingEventService: GiftingEventsService, private  _logger: LoggerService) {
    }


    onGet(request: Request): Observable<GiftingEvent> {
        return this._giftingEventService.one(request.params.id)
            .pipe(
                tap( _ => this._logger.info(_))
            );
    }

}
