import {OnGet, Request, Route} from '@hapiness/core';
import {GiftsService} from '../../../services/giftingEvents';
import {LoggerService} from '@hapiness/logger';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Gift} from '../../../interfaces';
import {GIFT_RESPONSE, ID_PARAMETER} from '../../../schemas';


@Route({
    path: '/api/gifts/{id}',
    method: 'GET',
    config: {
        validate: {
            params: {
                id: ID_PARAMETER
            }
        },
        response: {
            status: {
                200: GIFT_RESPONSE
            }
        },
        description: 'Get one gift',
        notes: 'Returns one gift for the given id in path parameter',
        tags: [ 'api', 'gifts' ]
    }
})

export class GetOneGift implements  OnGet {

    constructor(private _giftsService: GiftsService, private  _logger: LoggerService) {
    }


    onGet(request: Request): Observable<Gift> {
        return this._giftsService.listAllForGiftingEvent(request.params.id)
            .pipe(
                tap( _ => this._logger.info(_))
            );
    }

}
