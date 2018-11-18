import {Model, MongoClientService, MongoModel} from '@hapiness/mongo';

@MongoModel({
    adapter: 'mongoose',
    collection: 'giftingEvent',
    collectionName: 'giftingEvents'
})
export class GiftingEventModel extends  Model {
    readonly  schema: any;

    constructor(private _mongoClientService: MongoClientService) {

        super(GiftingEventModel);

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
        this.schema.set('toJSON', {
                virtuals: true,
                transform: function (doc, ret) {
                    delete ret._id;
                    return ret;
                }
            }
        );
    }
}
