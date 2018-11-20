
use angulaaaaaargh
db.createCollection("giftingevents");
db.createCollection("gifts");

db.giftingevents.insertMany([
    {
        "name": "Ma première liste",
        "nameEvent": "Noël",
        "asAGift": false,
        "date": ISODate("2018-12-25T23:00:00.000Z")
    },
    {
        "name": "Anniversaire Simon",
        "nameEvent": "Anniversaire",
        "asAGift": true,
        "date": ISODate("2019-03-21T23:00:00.000Z")
    }
]);


db.gifts.insertMany([
    {
        "name": "Pastèque",
        "quantity": 1,
        "linksGifts": [
            "https://www.willemsefrance.fr/PBSCProduct.asp?ItmID=24625956&AccID=126284&gclid=CjwKCAiA8rnfBRB3EiwAhrhBGvrUNzCTSdbBocPVMlp10E%2Dl%2DVMztSqHATp7ZHim9xPwU97c14K5GBoCzNMQAvD%5FBwE&st_izi=21&ct_izi=MTk4&c_izi=d2lsbGVtc2VmcmFuY2U%3D&s_izi=Z29vZ2xlc2hvcHBpbmc%3D",
            "https://www.willemsefrance.fr/PBSCProduct.asp?ItmID=24625956&AccID=126284&gclid=CjwKCAiA8rnfBRB3EiwAhrhBGvrUNzCTSdbBocPVMlp10E%2Dl%2DVMztSqHATp7ZHim9xPwU97c14K5GBoCzNMQAvD%5FBwE&st_izi=21&ct_izi=MTk4&c_izi=d2lsbGVtc2VmcmFuY2U%3D&s_izi=Z29vZ2xlc2hvcHBpbmc%3D",
        ],
        "listPeople": [
            {
                "mail": "horatiu.cirstea@plop.com",
                "send": false
            },
            {
                "mail": "emmanuel.jeandel@plop.com",
                "send": false
            }
        ]
    },
    {
        "name": "Orange",
        "quantity": 2,
        "linksGifts": [
            "https://www.mon-marche.fr/fruits/les-agrumes/les-oranges-a-jus/m_33_f_2286_p_194.php?gclid=CjwKCAiA8rnfBRB3EiwAhrhBGoa0djZ_m1ONUsDHttBT0O13Amyc0jQVWhnw71HkG7u0sGEnphRQ0xoCs3AQAvD_BwE",
        ],
        "listPeople": [
            {
                "mail": "simonhajek88@gmail.com",
                "send": false
            },
            {
                "mail": "emmanuel.jeandel@plop.com",
                "send": false
            }
        ]
    }
]);



var idAnniv = db.giftingevents.findOne({"nameEvent": "Anniversaire"}, {_id:1});

var idNoel =  db.giftingevents.findOne({"nameEvent": "Noël"}, {_id:1});

db.gifts.update({"name": "Pastèque"}, {$set: { "giftingEventId": idNoel._id }});
db.gifts.update({"name": "Orange"}, {$set: { "giftingEventId": idAnniv._id }});


