import { HapinessModule, OnError, OnStart } from '@hapiness/core';
import { LoggerModule, LoggerService } from '@hapiness/logger';
import { Observable } from 'rxjs';

@HapinessModule({
    version: '1.0.0',
    imports: [
        LoggerModule
    ],
    declarations: [],
    providers: []
})
export class ApplicationModule implements OnStart, OnError {
    /**
     * Class constructor
     *
     * @param {LoggerService} _logger
     */
    constructor(private _logger: LoggerService) {
    }

    /**
     * On start process
     *
     * @return {void | Observable<any>}
     */
    onStart(): void | Observable<any> {
        this._logger.info('Application started with success');
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
