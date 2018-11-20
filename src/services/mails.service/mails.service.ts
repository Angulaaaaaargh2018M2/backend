import {Injectable} from '@hapiness/core';
import {Config} from '@hapiness/config';
import {Observable, of, throwError} from 'rxjs';
import {GiftsDocumentService} from '../gifts';
import {catchError, flatMap} from 'rxjs/operators';
import {Biim} from '@hapiness/biim';
import {Gift, GiftingEvent} from '../../interfaces';
import {GiftingEventsService} from '../giftingEvents';

@Injectable()
export class MailsService {
    // To store transporter nodemailer
    private _transporter: any;

    constructor(private _giftsDocumentService: GiftsDocumentService, private _giftingEventsService: GiftingEventsService) {
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
    }

    sendEmail(gift: Gift, emailList: string) {
        this._giftingEventsService.one(gift.giftingEventId).subscribe((giftEvent: GiftingEvent) => {
            let mailOptions = {
                from: '"Easy Gift" <' + Config.get('mail.auth.user') + '>', // sender address
                to: emailList, // list of receivers
                subject: giftEvent.nameEvent + ' C\'est pour bientôt !!' , // Subject line
                html: '<div><p>Bonjour, comme ' + (emailList.split(', ').length > 1 ? 'vous le savez, ' : 'tu le sais')  +
                    giftEvent.nameEvent + ' approche à grands pas ! C\'est le ' +
                    new Date(giftEvent.date).getDay() + '/' + new Date(giftEvent.date).getMonth() + '/' +
                    new Date(giftEvent.date).getFullYear() + ' <br>C\'est pourquoi je ' + (emailList.split(', ').length > 1 ?
                        'vous ' : 't\'') + 'envoie ce que je veux avoir :<br>' +
                    gift.name + ' en : ' + gift.quantity + ' fois. ( ' + gift.linksGifts.join('<br>ou : ') + ' )</p>' +
                    '<p>Je compte sur ' + (emailList.split(', ').length > 1 ? 'vous pour vous arranger ' : 'toi ') +
                    ' et me faire plaisir.</p>A bientôt !</div>' // html body
            };

            this._transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.toString());
            });
            this._giftsDocumentService.findByIdAndUpdate(gift.id, gift).subscribe( (gift2: Gift) => {

            });
        });

    }

}
