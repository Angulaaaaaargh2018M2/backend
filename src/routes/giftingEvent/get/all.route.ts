import {OnGet, Request, Route} from '@hapiness/core';
import {giftingEventsService} from '../../../services/giftingEvents';
import {LoggerService} from '@hapiness/logger';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {GiftingEvent} from '../../../interfaces';
import {GIFTING_EVENTS_RESPONSE} from '../../../schemas';


@Route({
    path: '/api/giftingEvents',
    method: 'GET',
    config: {
        response: {
            status: {
                200: GIFTING_EVENTS_RESPONSE
            }
        },
        description: 'Get all giftingEvents',
        notes: 'Returns an array of giftingEvents',
        tags: [ 'api', 'giftingEvents' ]
    }
})

export class GetAllGiftingEvents implements  OnGet {

    constructor(private _eventService: giftingEventsService, private  _logger: LoggerService) {
    }


    onGet(request: Request): void | Observable<GiftingEvent[] | void> {
        return this._eventService.listAll()
            .pipe(
                tap( _ => this._logger.info(_))
            );
    }

}
