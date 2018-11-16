import {EVENTS_RESPONSE} from '../../../schemas';
import {OnGet, Route} from '@hapiness/core';
import {EventsService} from '../../../services/events';
import {LoggerService} from '@hapiness/logger';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';


@Route({
    path: '/api/events',
    method: 'GET',
    config: {
        response: {
            status: {
                200: EVENTS_RESPONSE
            }
        },
        description: 'Get all events',
        notes: 'Returns an array of events',
        tags: [ 'api', 'events' ]
    }
})

export class GetAllEvents implements  OnGet {

    constructor(private _eventService: EventsService, private  _logger: LoggerService){
    }


    onGet(request: Request): void | Observable<Event[] | void> {
        return this._eventService.listAll()
            .pipe(
                tap( _ => this._logger.info(_))
            );
    }

}