// * NOTE :: leave this until @hapiness/core will be migrated to rxjs v6 - This library is installed automatically
import 'rxjs-compat';
import {HapiConfig, Hapiness, HttpServerExt } from '@hapiness/core';
import { LoggerExt } from '@hapiness/logger';

import { ApplicationModule } from './application.module';
import {MongoClientExt} from '@hapiness/mongo';
import {Config} from '@hapiness/config';


// bootstrap application
Hapiness.bootstrap(ApplicationModule, [
    LoggerExt,
    HttpServerExt.setConfig(Config.get<HapiConfig>('server')),
    MongoClientExt.setConfig({
        load: [
            {
                name: 'mongoose',
                config: Config.get('mongodb')
            }
        ]
    })
])
    .catch(err => console.log(err));
