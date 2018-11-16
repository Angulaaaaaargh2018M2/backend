import {Injectable} from '@hapiness/core';
import {GiftsDocumentService} from './gifts-document.service';
import {Observable} from 'rxjs';


@Injectable()
export class GiftsService {

    constructor(private _giftsDocumentService: GiftsDocumentService) {
    }

    /**
     * Returns all existing gifts in the list
     *
     * @returns {Observable<Gift[] | void>}
     */
    listAll(): Observable<Gift[] | void> {
        return this._giftsDocumentService.find();
    }
}
