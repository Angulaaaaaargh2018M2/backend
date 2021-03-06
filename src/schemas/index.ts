import * as Joi from 'joi';

export const ID_PARAMETER = Joi.string().alphanum().required();
export const EMAIL = Joi.string().email().required();


export const GIFTING_EVENT_PAYLOAD = Joi.object().keys({
    name : Joi.string().min(2),
    nameEvent : Joi.string().min(2),
    asAGift : Joi.boolean(),
    date : Joi.date().required().min(Date())
}).options({stripUnknown: true});

export const GIFT_PAYLOAD = Joi.object().keys({
    name : Joi.string().min(2),
    quantity: Joi.number().min(1),
    linksGifts: Joi.array(),
    listPeople: Joi.array().items({
        mail: Joi.string().email().required(),
        send: Joi.boolean()
    }),
    giftingEventId: Joi.string()
}).options({stripUnknown: true});


export const GIFTING_EVENT_RESPONSE = Joi.object().keys({
    id: ID_PARAMETER,
    name : Joi.reach(GIFTING_EVENT_PAYLOAD, 'name'),
    nameEvent : Joi.reach(GIFTING_EVENT_PAYLOAD, 'nameEvent'),
    asAGift : Joi.reach(GIFTING_EVENT_PAYLOAD, 'asAGift'),
    date : Joi.date().required()
});


export const GIFT_RESPONSE = Joi.object().keys({
    id: ID_PARAMETER,
    name : Joi.reach(GIFT_PAYLOAD, 'name'),
    quantity: Joi.reach(GIFT_PAYLOAD, 'quantity'),
    linksGifts: Joi.reach(GIFT_PAYLOAD, 'linksGifts'),
    listPeople: Joi.reach(GIFT_PAYLOAD, 'listPeople'),
    giftingEventId: Joi.reach(GIFT_PAYLOAD, 'giftingEventId')
});


export const GIFTING_EVENTS_RESPONSE = Joi.array().items(
    GIFTING_EVENT_RESPONSE
).min(1);


export const GIFTS_RESPONSE = Joi.array().items(
    GIFT_RESPONSE
).min(1);
