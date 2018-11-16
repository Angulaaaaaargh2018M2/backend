import {Injectable} from '@hapiness/core';
import {EventsDocumentService} from './events-document.service';


@Injectable()
export class EventsService {

    constructor(private _eventsDocumentService: EventsDocumentService) {
    }
}