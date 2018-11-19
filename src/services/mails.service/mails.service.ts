import {Injectable} from '@hapiness/core';
import {Config} from '@hapiness/config';
import {Observable, of, throwError} from 'rxjs';
import {GiftsDocumentService} from '../gifts';
import {catchError, flatMap, tap} from 'rxjs/operators';
import {Biim} from '@hapiness/biim';
import {Gift} from '../../interfaces';

@Injectable()
export class MailsService {
    // To store transporter nodemailer
    private _transporter: any;

    constructor(private _giftsDocumentService: GiftsDocumentService) {
        let nodemailer = require('nodemailer');
        this._transporter = nodemailer.createTransport(Config.get('mail'));
    }

    testEmail(idGift: string): Observable<Gift> {
        return this._giftsDocumentService.findById(idGift)
            .pipe(
                catchError(e => throwError(Biim.preconditionFailed(e.message))),
                flatMap(_ =>
                    !!_ ?
                        of(_) :
                        throwError(Biim.notFound(`Gift with id '${idGift}' not found`))
                )
            );
        // console.log(this._gift.name);
                /*let mailOptions = {
                    from: '"Easy Gift" <' + Config.get('mail.auth.user') + '>', // sender address
                    to: 'simonhajek88@gmail.com', // list of receivers
                    subject: this._gift.name + 'quantity : ' + this._gift.quantity, // Subject line
                    text: 'Hello world?', // plain text body
                    html: '<b>Hello world?</b>' // html body
                };

                // send mail with defined transport object
                this._transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: %s', info.messageId);

                    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                });*/
        // setup email data with unicode symbols
    }

    sendEmail(gift: Gift, emailList: string) {
        console.log(emailList);
        let mailOptions = {
            from: '"Easy Gift" <' + Config.get('mail.auth.user') + '>', // sender address
            to: emailList, // list of receivers
            subject: gift.name + 'quantity : ' + gift.quantity, // Subject line
            text: 'Hello world?', // plain text body
            html: '<b>Hello world?</b>' // html body
        };

        this._transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
        this._giftsDocumentService.findByIdAndUpdate(gift.id, gift);
    }

    prepareEmailList(gift: Gift, emailList: string): Observable<string> {
        return of(emailList)
            .pipe(
                tap( _ => {
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
                    // this._giftsDocumentService.findByIdAndUpdate(gift.id, gift);
                })
            );
    }


}
