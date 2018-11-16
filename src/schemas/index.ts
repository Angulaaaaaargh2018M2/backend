import * as Joi from 'joi';

export const ID_PARAMETER = Joi.string().alphanum().required();


export const GIFTING_EVENT = Joi.object().keys({
    name : Joi.string().min(2),
    nameEvent : Joi.string().min(2),
    asAGift : Joi.boolean(),
    date : Joi.date().required().min(Date())
});

export const GIFT = Joi.object().keys({
    name : Joi.string().min(2),
    quantity: Joi.number().min(1),
    linksGift: Joi.array(),
    listPeople: Joi.array().items({
        mail: Joi.string().email().required(),
        send: Joi.boolean()
    }),
    eventId: Joi.string()
});


export const GIFTING_EVENT_RESPONSE = Joi.object().keys({
    id: ID_PARAMETER,
    name : Joi.reach(GIFTING_EVENT, 'name'),
    nameEvent : Joi.reach(GIFTING_EVENT, 'nameEvent'),
    asAGift : Joi.reach(GIFTING_EVENT, 'asAGift'),
    date : Joi.reach(GIFTING_EVENT, 'date'),
});


export const GIFT_RESPONSE = Joi.object().keys({
    id: ID_PARAMETER,
    name : Joi.reach(GIFT, 'name'),
    quantity: Joi.reach(GIFT, 'quantity'),
    linksGift: Joi.reach(GIFT, 'linksGift'),
    listPeople: Joi.reach(GIFT, 'listPeople'),
    eventId: Joi.reach(GIFT, 'eventId')
});


export const GIFTING_EVENTS_RESPONSE = Joi.array().items(
    GIFTING_EVENT_RESPONSE
).min(1);


export const GIFTS_RESPONSE = Joi.array().items(
    GIFT_RESPONSE
).min(1);
