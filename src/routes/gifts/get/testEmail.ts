import {OnGet, Request, Route} from '@hapiness/core';
import {Observable, of} from 'rxjs';
import {GIFT_RESPONSE, ID_PARAMETER} from '../../../schemas';
import {MailsService} from '../../../services/mails.service';


@Route({
    path: '/api/gifts/email',
    method: 'GET',
    config: {
        validate: {
            params: {
                id: ID_PARAMETER
            }
        },
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

export class GetOneGift implements  OnGet {

    constructor(private _mailsService: MailsService) {
    }


    onGet(request: Request): Observable<void> {
        this._mailsService.testEmail();
        return of(undefined);
    }

}
