import {HTTPHandlerResponse, OnPost, Request, Route} from '@hapiness/core';
import {giftingEventsService} from '../../../services/giftingEvents';
import {LoggerService} from '@hapiness/logger';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {GIFTING_EVENT_PAYLOAD, GIFTING_EVENT_RESPONSE} from '../../../schemas';


@Route({
    path: '/api/giftingEvents/',
    method: 'POST',
    config: {
        validate: {
            payload: GIFTING_EVENT_PAYLOAD
        },
        payload: {
            output: 'data',
            allow: 'application/json',
            parse: true
        },
        response: {
          status: {
              201: GIFTING_EVENT_RESPONSE
          }
        },
        description: 'Create one giftingEvents',
        notes: 'Create a new giftingEvents and returns it',
        tags: [ 'api', 'giftingEvents' ]
    }
})

export class CreateOneGiftingEvents implements  OnPost {

    constructor(private _giftingEventService: giftingEventsService, private  _logger: LoggerService) {
    }


    onPost(request: Request): Observable<HTTPHandlerResponse> {
        return this._giftingEventService.create(request.payload)
            .pipe(
                tap( _ => this._logger.info(_))
            );
    }

}
