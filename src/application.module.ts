import { HapinessModule, HttpServerService, OnError, OnStart } from '@hapiness/core';
import { LoggerModule, LoggerService } from '@hapiness/logger';
import { Observable } from 'rxjs';
import {Config} from '@hapiness/config';
import {SwagModule} from '@hapiness/swag';
import {MongoClientService, MongoModule} from '@hapiness/mongo';
import {GiftModel} from './models/gifts';
import {GiftingEventModel} from './models/events';
import {GiftsDocumentService, GiftsService} from './services/gifts';
import {GiftingEventsDocumentService, giftingEventsService} from './services/giftingEvents';

const eventsDocumentServiceFactory = (mongoClientService: MongoClientService) => new GiftingEventsDocumentService(mongoClientService);
const giftsDocumentServiceFactory = (mongoClientService: MongoClientService) => new GiftsDocumentService(mongoClientService);


@HapinessModule({
    version: '1.0.0',
    imports: [
        LoggerModule,
        MongoModule,
        SwagModule.setConfig(Config.get('swag'))
    ],
    declarations: [
        GiftModel,
        GiftingEventModel
    ],
    providers: [
        HttpServerService,
        GiftsService,
        giftingEventsService,
        { provide: GiftingEventsDocumentService, useFactory: eventsDocumentServiceFactory, deps: [ MongoClientService ] },
        { provide: GiftsDocumentService, useFactory: giftsDocumentServiceFactory, deps: [ MongoClientService ] }
        ]
})
export class ApplicationModule implements OnStart, OnError {
    /**
     * Class constructor
     *
     * @param _httpServer
     * @param {LoggerService} _logger
     */
    constructor(private _httpServer: HttpServerService, private _logger: LoggerService) {
    }

    /**
     * On start process
     *
     * @return {void | Observable<any>}
     */
    onStart(): void | Observable<any> {
        this._logger.info(`< Application.bootstrap > Server started at: ${this._httpServer.instance().info.uri}`);
    }

    /**
     * On error process
     *
     * @param {Error} error
     * @param data
     *
     * @return {void | Observable<any>}
     */
    onError(error: Error, data?: any): void | Observable<any> {
        this._logger.error('A problem occurred during application\'s lifecycle');
    }
}
