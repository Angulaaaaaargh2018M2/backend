import {Model, MongoClientService, MongoModel} from '@hapiness/mongo';
import * as mongoose from 'mongoose';

@MongoModel({
    adapter: 'mongoose',
    collection: 'gift'
})
export class GiftModel extends  Model {
    readonly  schema: any;
    readonly schemaListPerson: any

    constructor(private _mongoClientService: MongoClientService) {

        super(GiftModel);

        const dao = this._mongoClientService.getDao(this.connectionOptions);

        this.schemaListPerson = new dao.Schema({
            mail: {
                type: String,
                    trim: true,
                required: true
            },
            send: {
                type: Boolean,
                    required: true
            }
        }, {
            _id : false
            }
        );

        this.schema = new dao.Schema( {
            name: {
                type: String,
                trim: true,
                required: false
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            linksGifts: {
                type: [String],
                required: true,
                trim: true
            },
            listPeople: {
                type: [this.schemaListPerson]
            },
            giftingEventId: {
                type: mongoose.Schema.Types.ObjectId
            }

        }, {
            versionKey: false
        });
        this.schema.set('toJSON', {
                virtuals: true,
                transform: function (doc, ret) {
                    delete ret._id;
                    if (!!ret.giftingEventId) {
                        ret.giftingEventId = doc.giftingEventId.toString();
                    }
                    return ret;
                }
            }
        );
    }
}
