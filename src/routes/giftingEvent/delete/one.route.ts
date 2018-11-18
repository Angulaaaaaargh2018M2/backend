import {OnDelete, Request, Route} from '@hapiness/core';
import {LoggerService} from '@hapiness/logger';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import { ID_PARAMETER} from '../../../schemas';
import {GiftingEventsService} from '../../../services/giftingEvents';


@Route({
    path: '/api/giftingEvents/{id}',
    method: 'DELETE',
    config: {
        validate: {
            params: {
                id: ID_PARAMETER
            }
        },
        description: 'Delete one giftingEvents',
        notes: 'Delete one giftingEvents for the given id in path parameter',
        tags: [ 'api', 'giftingEvents' ]
    }
})

export class DeleteOneGiftingEvent implements  OnDelete {

    constructor(private _giftingEventService: GiftingEventsService, private  _logger: LoggerService) {
    }


    onDelete(request: Request): Observable<void> {
        return this._giftingEventService.delete(request.params.id)
            .pipe(
                tap( _ => this._logger.info(_))
            );
    }

}
