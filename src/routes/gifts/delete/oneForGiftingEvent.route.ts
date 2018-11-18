import {OnDelete, Request, Route} from '@hapiness/core';
import {LoggerService} from '@hapiness/logger';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ID_PARAMETER} from '../../../schemas';
import {GiftsService} from '../../../services/gifts';


@Route({
    path: '/api/giftingEvents/{giftingEventId}/gifts/{id}',
    method: 'DELETE',
    config: {
        validate: {
            params: {
                id: ID_PARAMETER,
                giftingEventId: ID_PARAMETER
            }
        },
        description: 'Delete one gift',
        notes: 'Delete one gift for the given id and giftingEventId in path parameter',
        tags: [ 'api', 'gifts' ]
    }
})

export class DeleteOneGiftForGiftingEvent implements  OnDelete {

    constructor(private _giftsService: GiftsService, private  _logger: LoggerService) {
    }


    onDelete(request: Request): Observable<void> {
        return this._giftsService.delete(request.params.id)
            .pipe(
                tap( _ => this._logger.info(_))
            );
    }

}
