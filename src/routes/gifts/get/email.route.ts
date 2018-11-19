import {OnGet, Request, Route} from '@hapiness/core';
import {Observable, of} from 'rxjs';
import {ID_PARAMETER} from '../../../schemas';
import {MailsService} from '../../../services/mails.service';
import {tap} from 'rxjs/operators';
import {LoggerService} from '@hapiness/logger';
import {Gift} from '../../../interfaces';


@Route({
    path: '/api/gifts/{id}/email',
    method: 'GET',
    config: {
        validate: {
            params: {
                id: ID_PARAMETER
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
        this._mailsService.testEmail(request.params.id)
            .pipe(
                tap( _ => this._logger.info(_))
            ).subscribe( (gift: Gift) => {
                    let emailList = '';
                    gift.listPeople.forEach(function(val, key, arr) {
                        if ( ! val.send) {
                            val.send = true;
                            if (! Object.is(arr.length - 1, key)) {
                                emailList += val.mail + ', ';
                            } else {
                                emailList += val.mail;
                            }
                        }
                    });
            this._mailsService.sendEmail(gift, emailList);
        });
        return of(undefined);
    }

}
