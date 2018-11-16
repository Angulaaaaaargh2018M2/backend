import {Model, MongoClientService, MongoModel} from '@hapiness/mongo';

@MongoModel({
    adapter: 'mongoose',
    collection: 'event'
})
export class EventModel extends  Model {
    readonly  schema: any;

    constructor(private _mongoClientService: MongoClientService) {

        super(EventModel);

        const dao = this._mongoClientService.getDao(this.connectionOptions);

        this.schema = new dao.Schema( {
            name: {
                type: String,
                trim: true,
                required: false
            },
            asAGift: {
                type: Boolean,
                required: true
            },
            nameEvent: {
                type: String,
                required: true,
                trim: true
            },
            date: {
                type: Date,
                required: true,
                min: Date.now()
            }

        });
    }
}
