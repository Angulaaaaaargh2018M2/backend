import {OnGet, Request, Route} from '@hapiness/core';
import {LoggerService} from '@hapiness/logger';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Gift} from '../../../interfaces';
import {GIFTS_RESPONSE} from '../../../schemas';
import {GiftsService} from '../../../services/gifts';


@Route({
    path: '/api/gifts',
    method: 'GET',
    config: {
        response: {
            status: {
                200: GIFTS_RESPONSE
            }
        },
        description: 'Get all gifts across all giftingEvents',
        notes: 'Returns an array of all gifts across all giftingEvents',
        tags: [ 'api', 'gifts' ]
    }
})

export class GetAllGifts implements  OnGet {

    constructor(private _giftsService: GiftsService, private  _logger: LoggerService) {
    }


    onGet(request: Request): void | Observable<Gift[] | void> {
        return this._giftsService.listAll()
            .pipe(
                tap( _ => this._logger.info(_))
            );
    }

}
