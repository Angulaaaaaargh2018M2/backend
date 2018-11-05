// * NOTE :: leave this until @hapiness/core will be migrated to rxjs v6 - This library is installed automatically
import 'rxjs-compat';
import { Hapiness } from '@hapiness/core';

import { ApplicationModule } from './application.module';

// bootstrap application
Hapiness.bootstrap(ApplicationModule)
    .catch(err => console.log(err));
