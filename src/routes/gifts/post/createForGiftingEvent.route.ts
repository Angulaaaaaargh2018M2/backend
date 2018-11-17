import {HTTPHandlerResponse, OnPost, Request, Route} from '@hapiness/core';
import {GiftsService} from '../../../services/giftingEvents';
import {LoggerService} from '@hapiness/logger';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {GIFT_PAYLOAD, GIFT_RESPONSE, ID_PARAMETER} from '../../../schemas';


@Route({
    path: '/api/giftingEvents/{giftingEventId}/gifts/',
    method: 'POST',
    config: {
        validate: {
            params: {
                giftingEventId: ID_PARAMETER
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
        description: 'Create one gift',
        notes: 'Create a new gift for the given id and giftingEventId in path parameter and returns it',
        tags: [ 'api', 'gifts' ]
    }
})

export class CreateOneGiftForGiftingEvent implements OnPost {

    constructor(private _giftsService: GiftsService, private  _logger: LoggerService) {
    }


    onPost(request: Request): Observable<HTTPHandlerResponse> {
        return this._giftsService.createForGiftingEvent(request.params.giftingEventId, request.payload)
            .pipe(
                tap( _ => this._logger.info(_))
            );
    }

}