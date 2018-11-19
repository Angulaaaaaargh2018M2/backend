import {OnGet, Request, Route} from '@hapiness/core';
import {Observable} from 'rxjs';
import {ID_PARAMETER} from '../../../schemas';
import {MailsService} from '../../../services/mails.service';
import {tap} from 'rxjs/operators';
import {LoggerService} from '@hapiness/logger';


@Route({
    path: '/api/gifts/{id}/email',
    method: 'GET',
    config: {
        validate: {
            params: {
                id: ID_PARAMETER
            }
        },
        response: {
            status: {
                200: undefined
            }
        },
        description: 'Send email for one gift to all link email from the gift',
        notes: 'Returns 200 if ok',
        tags: [ 'api', 'gifts' ]
    }
})

export class SendEmail implements  OnGet {

    constructor(private _mailsService: MailsService, private  _logger: LoggerService) {
    }


    onGet(request: Request): Observable<void> {
        return this._mailsService.testEmail(request.params.id)
            .pipe(
                tap( _ => this._logger.info(_))
            );
    }

}
