import {OnGet, Request, Route} from '@hapiness/core';
import {Observable, of} from 'rxjs';
import {EMAIL, ID_PARAMETER} from '../../../schemas';
import {MailsService} from '../../../services/mails.service';
import {tap} from 'rxjs/operators';
import {LoggerService} from '@hapiness/logger';
import {Gift} from '../../../interfaces';


@Route({
    path: '/api/gifts/{id}/email/{email}',
    method: 'GET',
    config: {
        validate: {
            params: {
                id: ID_PARAMETER,
                email: EMAIL
            }
        },
        description: 'Send email for one gift to one link email',
        notes: 'Returns 200 if ok',
        tags: [ 'api', 'gifts' ]
    }
})

export class SendOneEmail implements  OnGet {

    constructor(private _mailsService: MailsService, private  _logger: LoggerService) {
    }


    onGet(request: Request): Observable<void> {
        this._mailsService.testEmail(request.params.id)
            .pipe(
                tap( _ => this._logger.info(_))
            ).subscribe( (gift: Gift) => {
            let emailList = request.params.email;
            this._mailsService.sendEmail(gift, emailList);
        });
        return of(undefined);
    }

}
