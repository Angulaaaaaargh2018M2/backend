import {OnPut, Request, Route} from '@hapiness/core';
import {GiftsService} from '../../../services/giftingEvents';
import {LoggerService} from '@hapiness/logger';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Gift} from '../../../interfaces';
import {GIFT_PAYLOAD, GIFT_RESPONSE, ID_PARAMETER} from '../../../schemas';


@Route({
    path: '/api/giftingEvents/{giftingEventId}/gifts/{id}',
    method: 'PUT',
    config: {
        validate: {
            params: {
                giftingEventId: ID_PARAMETER,
                id: ID_PARAMETER
            },
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
        return this._giftsService.updateForGiftingEvent(request.params.giftingEventId, request.params.id, request.payload)
            .pipe(
                tap( _ => this._logger.info(_))
            );
    }

}
