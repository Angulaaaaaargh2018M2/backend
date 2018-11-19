import {OnGet, Request, Route} from '@hapiness/core';
import {Observable, of} from 'rxjs';
import {GIFT_RESPONSE} from '../../../schemas';
import {MailsService} from '../../../services/mails.service';


@Route({
    path: '/api/gifts/email',
    method: 'GET',
    config: {
        response: {
            status: {
                200: GIFT_RESPONSE
            }
        },
        description: 'Get one gift',
        notes: 'Returns one gift for the given id in path parameter',
        tags: [ 'api', 'gifts' ]
    }
})

export class SendEmail implements  OnGet {

    constructor(private _mailsService: MailsService) {
    }


    onGet(request: Request): Observable<void> {
        console.log('test');
        this._mailsService.testEmail();
        return of(undefined);
    }

}
