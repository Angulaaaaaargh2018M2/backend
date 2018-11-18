import {Injectable} from '@hapiness/core';
import {Config} from '@hapiness/config';

@Injectable()
export class MailsService {
    // To store mailjet credentials
    private _mailjet: any;

    constructor() {
        this._mailjet = require ('node-mailjet')
            .connect(Config.get('mailjet.key.public'), Config.get('mailjet.key.private'), {
                url: 'api.mailjet.com', // default is the API url
                version: 'v3.1', // default is '/v3'
                perform_api_call: true // used for tests. default is true
            });
    }

    testEmail() {
        let sendEmail = this._mailjet.post('send');

        let emailData = {
            'FromEmail': 'simonhajek88@gmail.com',
            'FromName': 'Mailjet Pilot',
            'Subject': 'Hello world Mailjet!',
            'Text-part': 'This is another Email',
            'Recipients': [{'Email': 'simonhajek88@gmail.com'}],
        };

        sendEmail
            .request(emailData)
            .then()
            .catch();
    }


}
