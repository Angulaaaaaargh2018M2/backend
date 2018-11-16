import {Injectable} from '@hapiness/core';
import {GiftsDocumentService} from './gifts-document.service';


@Injectable()
export class GiftsService {

    constructor(private _giftsDocumentService: GiftsDocumentService) {

    }
}