import {OnGet, Request, Route} from '@hapiness/core';
import {LoggerService} from '@hapiness/logger';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Gift} from '../../../interfaces';
import {GIFTS_RESPONSE, ID_PARAMETER} from '../../../schemas';
import {GiftsService} from '../../../services/gifts';


@Route({
    path: '/api/giftingEvents/{giftingEventId}/gifts',
    method: 'GET',
    config: {
        validate: {
            params: {
                giftingEventId: ID_PARAMETER
            }
        },
        response: {
            status: {
                200: GIFTS_RESPONSE
            }
        },
        description: 'Get all gifts for a given giftingEvent',
        notes: 'Returns all gifts for the given id and giftingEventId in path parameter',
        tags: [ 'api', 'gifts' ]
    }
})

export class GetAllGiftsForGiftingEvent implements  OnGet {

    constructor(private _giftsService: GiftsService, private  _logger: LoggerService) {
    }


    onGet(request: Request): void | Observable<Gift[] | void> {
        return this._giftsService.listAllForGiftingEvent(request.params.giftingEventId)
            .pipe(
                tap( _ => this._logger.info(_))
            );
    }

}
