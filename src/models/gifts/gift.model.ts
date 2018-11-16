import {Model, MongoClientService, MongoModel} from '@hapiness/mongo';
import * as mongoose from "mongoose";

@MongoModel({
    adapter: 'mongoose',
    collection: 'person'
})
export class GiftModel extends  Model {
    readonly  schema: any;

    constructor(private _mongoClientService: MongoClientService) {

        super(GiftModel);

        const dao = this._mongoClientService.getDao(this.connectionOptions);

        this.schema = new dao.Schema( {
            name: {
                type: String,
                trim: true,
                required: false
            },
            quantity: {
                type: Number,
                required: true
            },
            linksGifts: {
                type: [String],
                required: true,
                trim: true
            },
            listPeople: {
                type: [{
                    email: {
                        type: String,
                        trim: true,
                    },
                    send: {
                        type: Boolean
                    }
                }]
            },
            eventId: {
                type: mongoose.Schema.Types.ObjectId
            }

        });
        this.schema.set('toJSON', {
                virtuals: true,
                transform: function (doc, ret) {
                    delete ret._id;
                    if (!!ret.eventId) {
                        ret.eventId = doc.eventId.toString();
                    }
                    return ret;
                }
            }
        );
    }
}