import {OnPut, Request, Route} from '@hapiness/core';
import {LoggerService} from '@hapiness/logger';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Gift} from '../../../interfaces';
import {GIFT_PAYLOAD, GIFT_RESPONSE} from '../../../schemas';
import {GiftsService} from '../../../services/gifts';


@Route({
    path: '/api/gifts/{id}',
    method: 'PUT',
    config: {
        validate: {
            payload: GIFT_PAYLOAD
        },
        payload: {
            output: 'data',
            allow: 'application/json',
            parse: true
        },
        response: {
            status: {
                201: GIFT_RESPONSE
            }
        },
        description: 'Update one gift',
        notes: 'Update the gift for the given id and giftingEventId in path parameter and returns it',
        tags: [ 'api', 'gifts' ]
    }
})

export class UpdateOneGiftForGiftingEvent implements OnPut {

    constructor(private _giftsService: GiftsService, private  _logger: LoggerService) {
    }


    onPut(request: Request): Observable<Gift> {
        return this._giftsService.update(request.params.id, request.payload)
            .pipe(
                tap( _ => this._logger.info(_))
            );
    }

}
