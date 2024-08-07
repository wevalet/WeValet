var { Todo, Todo2, Todo3, Todo4, Todo5, Todo6, Todo7, Todo8, Todo9, Todo10, Todo15 } = require("../model/schema");
const HTTP = require("../../constant/response.constant");
var QRCode = require('qrcode')

var jwt = require("jsonwebtoken");
var path = require("path");
var bcrypt = require("bcryptjs");

const moment = require('moment-timezone');

const session = require("express-session");


var SECRET_KEY = process.env.SECRET_KEY || "YOURSECRETKEYGOESHERE";
var PUSHDATALOCATION = process.env.PUSHDATALOCATION || "https://wevalet.s3.amazonaws.com";

const os = require('os');

if (os.hostname() == "DESKTOP-796LHPC") {
    var Ip = process.env.IpAddress;
} else {
    // var Ip = "http://13.200.187.159";
    var Ip = "http://65.2.158.253";
}

const axios = require('axios');

const multer = require('multer');

const admin = require('firebase-admin');
const serviceAccount = require('../../Fcm/valet-user-app-firebase-adminsdk-ecf3t-2f1bf6948a.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const fcm = admin.messaging();

setInterval(async () => {
    try {
        // await class2.k();
        await class2.s();
    } catch (error) {
        console.error("Error occurred:", error);
    }
}, 60000);

setInterval(async () => {
    try {
        await class2.E();
    } catch (error) {
        console.error("Error occurred:", error);
    }
}, 60000);

setInterval(async () => {
    try {
        await class2.F();
    } catch (error) {
        console.error("Error occurred:", error);
    }
}, 1000);

const geolib = require('geolib');

const AWS = require("aws-sdk");
const { Console } = require("console");
require("aws-sdk/lib/maintenance_mode_message").suppress = true;

function formatPhoneNumber(number, number2) {

    const regex = /^(\d{3})(\d{3})(\d{4})$/;
    const match = number.toString().match(regex);

    if (match) {

        if (number2 == "US") {
            const formattedNumber = `+1 (${match[1]}) ${match[2]}-${match[3]}`;
            return formattedNumber;
        } else {
            const formattedNumber = `+91 ${number}`;
            return formattedNumber;
        }

    } else {

        return number;

    }

}

const twilio = require('twilio');

// const accountSid = process.env.AccountSid;
// const authToken = process.env.AuthToken;
// const client = twilio(accountSid, authToken);

class class1 {
    static a = async (req, res) => {
        try {

            var User = await Todo.findOne({ Phone: req.body.Phone })

            if (!User) {

                var User2 = await Todo.find({})

                var VehicleDetailArray = [];
                for (var i = 0; i < User2.length; i++) {

                    if (User2[i].VehicleDetail) {

                        for (var j = 0; j < User2[i].VehicleDetail.length; j++) {
                            await VehicleDetailArray.push(User2[i].VehicleDetail[j].RegistrationNumber)
                        }
                    }
                }

                if (VehicleDetailArray.includes(req.body.RegistrationNumber)) {
                    const response = { "message": "Please  choose Another RegistrationNumber", "status": HTTP.UNAUTHORIZED };
                    res.status(HTTP.UNAUTHORIZED).json(response); // status code
                } else {

                    var PictureArray = [];
                    for (var i = 0; i < req.files.length; i++) {
                        await PictureArray.push(Ip + "/public/" + req.files[i].filename)
                    }

                    if (req.body.UserName && req.body.Phone) {

                        const currentDate2 = await new Date();

                        currentDate2.setDate(currentDate2.getDate() - 1);

                        const year = await currentDate2.getFullYear();
                        const month = await currentDate2.getMonth() + 1;
                        const day = await currentDate2.getDate();

                        let PlanExpiredDate = await `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

                        if (req.body.RegistrationNumber) {

                            const suratTimezone = 'Asia/Kolkata';
                            const currentTimeInSurat = moment().tz(suratTimezone);
                            const futureTimeInSurat = currentTimeInSurat.add(-1, 'minutes');
                            const formattedFutureTime = futureTimeInSurat.format('YYYY-MM-DDTHH:mm:ss');

                            let data = new Todo({
                                UserName: req.body.UserName,
                                Email: req.body.Email,
                                Phone: req.body.Phone,
                                VehicleDetail: [
                                    {
                                        CompanyName: req.body.CompanyName,
                                        Model: req.body.Model,
                                        RegistrationNumber: req.body.RegistrationNumber,
                                        status: "",
                                        Color: req.body.Color,
                                        Year: req.body.Year,
                                        BodyType: req.body.BodyType,
                                        Picture: PictureArray,
                                        StatusChange: formattedFutureTime
                                    }
                                ],
                                TimeUpdateStatus: 0,
                                Request: 0,
                                PlanPurchase: "",
                                PlanExpiredDate: PlanExpiredDate,
                                OfficialPlanExpiredDate: "",
                                ActiveParkingUser: [req.body.UserName]
                            })
                            await data.save();

                        } else {

                            let data = new Todo({
                                UserName: req.body.UserName,
                                Email: req.body.Email,
                                Phone: formatPhoneNumber(req.body.Phone),
                                VehicleDetail: [],
                                TimeUpdateStatus: 0,
                                Request: 0,
                                PlanPurchase: "",
                                PlanExpiredDate: PlanExpiredDate,
                                OfficialPlanExpiredDate: "",
                                ActiveParkingUser: [req.body.UserName]
                            })
                            await data.save();

                        }

                        var a = { "message": "User Account Create Successfully", "status": `${HTTP.SUCCESS}` }
                        res.status(HTTP.SUCCESS).json(a);

                    } else {
                        var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                        res.status(HTTP.BAD_REQUEST).json(a);
                    }

                }

            } else {
                const response = { "message": "User Exist", "status": HTTP.UNAUTHORIZED };
                res.status(HTTP.UNAUTHORIZED).json(response); // status code
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static demo = async (req, res) => {
        try {
            var a = { "message": `Demo Api Call`, "status": `${HTTP.SUCCESS}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static qrcode = async (req, res) => {
        try {
            let number = req.body.qrnumber
            if (number) {
                QRCode.toDataURL(number, { version: 2 }, function (err, url) {
                    console.log(url)
                    var a = { "message": url, "status": `${HTTP.SUCCESS}` }
                    res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
                })
            } else {
                var a = { "message": 'Please Enter the number', "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
                res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static b = async (req, res) => {
        try {

            var User = await Todo2.findOne({ UserName: req.body.UserName })
            var User2 = await Todo2.findOne({ Phone: req.body.Phone })

            if (!User && !User2) {

                // const uploadMiddleware = multer().array("picture");

                // console.log(uploadMiddleware);

                // const uploadPromise = () => new Promise((resolve, reject) => {
                //     uploadMiddleware(req, res, (err) => {
                //         if (err instanceof multer.MulterError) {
                //             const response = { "message": "Please Set All Key Pair Value", "status": HTTP.SUCCESS };
                //             res.status(HTTP.SUCCESS).json(response);
                //             reject("MulterError");
                //         } else {
                //             resolve();
                //         }
                //     });
                // });

                // await uploadPromise();

                // const a = req.files.map(file => Ip + "/public/" + file.filename);

                var a = [];
                for (var i = 0; i < req.files.length; i++) {
                    await a.push(Ip + "/public/" + req.files[i].filename)
                }

                const Review = [];
                const ReviewBy = [];

                for (let i = 1; req.body[`Review${i}`] !== undefined; i++) {
                    Review.push(req.body[`Review${i}`]);
                }

                for (let i = 1; req.body[`ReviewBy${i}`] !== undefined; i++) {
                    ReviewBy.push(req.body[`ReviewBy${i}`]);
                }

                const result = ReviewBy.map((item, index) => ({
                    "ReviewBy": item,
                    "Review": Review[index]
                }));

                const hashedPassword = await bcrypt.hash(req.body.PassWord, 12);

                var UserWaitTimeArray = [{
                    "Monday": [
                        [
                            "",
                            "0"
                        ]
                    ],
                    "Tuesday": [
                        [
                            "",
                            "0"
                        ]
                    ],
                    "Wednesday": [
                        [
                            "",
                            "0"
                        ]
                    ],
                    "Thursday": [
                        [
                            "",
                            "0"
                        ]
                    ],
                    "Friday": [
                        [
                            "",
                            "0"
                        ]
                    ],
                    "Saturday": [
                        [
                            "",
                            "0"
                        ]
                    ],
                    "Sunday": [
                        [
                            "",
                            "0"
                        ]
                    ]
                }];

                const words1 = req.body.City.replace(/^\s+|\s+$/g, '').split(" ");
                const nonBlankArray1 = words1.filter((str) => str.trim() !== '');

                const words2 = req.body.State.replace(/^\s+|\s+$/g, '').split(" ");
                const nonBlankArray2 = words2.filter((str) => str.trim() !== '');

                let result1 = '';
                let result2 = '';

                for (let i = 0; i < nonBlankArray1.length; i++) {
                    result1 += nonBlankArray1[i].toString() + ' ';
                }

                for (let i = 0; i < nonBlankArray2.length; i++) {
                    result2 += nonBlankArray2[i].toString() + ' ';
                }

                var CityName = await result1.toUpperCase();
                var StateName = await result2.toUpperCase();

                var CityNameOfficial = await CityName.trim();
                var StateNameOfficial = await StateName.trim();

                const suratTimezone = 'Asia/Kolkata';
                const currentTimeInSurat = moment().tz(suratTimezone).format('YYYY-MM-DDTHH:mm:ss');

                const currentDate = new Date(currentTimeInSurat);

                var currentYear = await currentDate.getFullYear();
                var currentMonth;
                var currentDay;

                if (currentDate.getMonth() < 10) {
                    var currentMonth = await `0${currentDate.getMonth() + 1}`;
                } else {
                    var currentMonth = await currentDate.getMonth() + 1;
                }

                if (currentDate.getDate() < 10) {
                    var currentDay = await `0${currentDate.getDate()}`;
                } else {
                    var currentDay = await currentDate.getDate();
                }

                const formattedDateTime = `${currentYear}-${currentMonth}-${currentDay}`;

                const currentDate2 = await new Date();

                currentDate2.setDate(currentDate2.getDate() - 1);

                const year = await currentDate2.getFullYear();
                const month = await currentDate2.getMonth() + 1;
                const day = await currentDate2.getDate();

                let PlanExpiredDate = await `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

                if (req.body.Country) {
                    var Country = await req.body.Country.toUpperCase();
                } else {
                    var Country = "INDIA";
                }
                const formattedNumber = await formatPhoneNumber(req.body.Phone, Country);
                const formattedNumber2 = await formatPhoneNumber(req.body.Phone2, Country);

                const data = new Todo2({
                    UserName: await req.body.UserName.toLowerCase(),
                    ManagerName: req.body.ManagerName,
                    ManagerDestination: req.body.ManagerDestination,
                    PassWord: hashedPassword,
                    UnitName: req.body.UnitName,
                    UnitType: req.body.UnitType.toUpperCase(),
                    UnitAddress: req.body.UnitAddress,
                    latitude: req.body.latitude,
                    longitude: req.body.longitude,
                    Rating: req.body.Rating,
                    Profile: a,
                    Review: result,
                    Phone: formattedNumber,
                    Email: req.body.Email,
                    OfficialPhone: formattedNumber2,
                    ManagerName2: req.body.ManagerName2,
                    City: CityNameOfficial,
                    State: StateNameOfficial,
                    Country: Country,
                    UserWaitTime: UserWaitTimeArray,
                    AccountCreateDate: formattedDateTime,
                    PlanPurchase: "Single Payment",
                    PlanExpiredDate: PlanExpiredDate,
                });

                await data.save();

                const response = { "message": "Business Account Create Successfully", "status": HTTP.SUCCESS };
                res.status(HTTP.SUCCESS).json(response);

            } else {

                const response = { "message": "User Exist", "status": HTTP.UNAUTHORIZED };
                res.status(HTTP.UNAUTHORIZED).json(response); // status code
            }

        } catch (err) {
            console.log(err);
            var a = { "message": `${err}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static c = async (req, res) => {
        try {

            var User = await Todo.find({ Phone: req.Phone })

            if (User.length == 1) {

                // if (typeof User[0].VehicleDetail[0].CompanyName === 'undefined' && typeof User[0].VehicleDetail[0].Model === 'undefined' && typeof User[0].VehicleDetail[0].RegistrationNumber === 'undefined' && typeof User[0].VehicleDetail[0].Color === 'undefined' && User[0].VehicleDetail[0].Picture.length == 0) {
                //     User[0].VehicleDetail.shift();
                // }

                if (User[0].VehicleDetail.length < 2) {

                    var PictureArray = [];
                    for (var i = 0; i < req.files.length; i++) {
                        PictureArray.push(Ip + "/public/" + req.files[i].filename)
                    }

                    var User2 = await Todo.find({})

                    var VehicleDetailArray = [];
                    for (var i = 0; i < User2.length; i++) {


                        if (User2[i].VehicleDetail) {

                            for (var j = 0; j < User2[i].VehicleDetail.length; j++) {
                                await VehicleDetailArray.push(User2[i].VehicleDetail[j].RegistrationNumber)
                            }

                        }

                    }

                    var a = req.body.RegistrationNumber;

                    if (VehicleDetailArray.includes(a.toUpperCase())) {
                        const response = { "message": "Please choose Another RegistrationNumber", "status": HTTP.UNAUTHORIZED };
                        res.status(HTTP.UNAUTHORIZED).json(response); // status code
                    } else {

                        const suratTimezone = 'Asia/Kolkata';
                        const currentTimeInSurat = moment().tz(suratTimezone);
                        const futureTimeInSurat = currentTimeInSurat.add(-1, 'minutes');
                        const formattedFutureTime = futureTimeInSurat.format('YYYY-MM-DDTHH:mm:ss');

                        User[0].VehicleDetail.push({
                            CompanyName: req.body.CompanyName,
                            Model: req.body.Model,
                            RegistrationNumber: req.body.RegistrationNumber,
                            status: "",
                            status2: "",
                            Color: req.body.Color,
                            Year: req.body.Year,
                            BodyType: req.body.BodyType,
                            Picture: PictureArray,
                            StatusChange: formattedFutureTime
                        });
                        User[0].save();
                        var a = { "message": "Vehicle Add Successfully", "status": `${HTTP.SUCCESS}` }
                        res.status(HTTP.SUCCESS).json(a);

                    }

                } else {
                    var a = { "message": "You Can Not Add More Vehicle In This Account", "status": `${HTTP.FORBIDDEN}` }
                    res.status(HTTP.FORBIDDEN).json(a);
                }

            } else {
                var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                res.status(HTTP.NOT_FOUND).json(a);
            }

        } catch (err) {
            console.log(err);
            var a = { "message": `${err}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static d = async (req, res) => {
        try {
            if (req.body.Phone) {
                console.log(req.body.Phone)
                var user = await Todo.find({ Phone: req.body.Phone });
                if (user.length == 0) {
                    var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                    res.status(HTTP.NOT_FOUND).json(a);
                } else {

                    async function generateRandom6DigitNumber() {
                        const min = 100000;
                        const max = 999999;

                        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

                        return randomNumber;
                    }

                    const otp = await generateRandom6DigitNumber();

                    var PhoneNumberCheck = await req.body.Phone;
                    var PhoneNumberCheckOfficial = await PhoneNumberCheck.slice(0, 3);

                    var updateuser = await Todo.findOneAndUpdate({ Phone: req.body.Phone }, { $set: { otp: otp } });
                    await updateuser.save();

                    console.log("Data: " + PhoneNumberCheckOfficial)

                    if (PhoneNumberCheckOfficial == +91) {

                        console.log("Call OTP Service");
                        axios.get(`http://3.111.243.189//indexotp.php?number=${req.body.Phone}&otp=${otp}`)
                            .then((response) => {
                                var a = { "message": "Otp Send", "status": `${HTTP.SUCCESS}` }
                                res.status(HTTP.SUCCESS).json(a);
                            })
                            .catch((error) => {
                                console.error(`Error: ${error}`);
                            });

                    } else {
                        // var updateuser = await Todo.findOneAndUpdate({ Phone: req.body.Phone }, { $set: { otp: otp } });
                        // await updateuser.save();
                        async function convertPhoneNumber(Parameter1) {

                            let stringWithoutSpaces = await Parameter1.replace(/\s/g, "");
                            let stringWithoutDashes = await stringWithoutSpaces.replace(/-/g, "");

                            let cleanedNumber = await stringWithoutDashes.replace(/\D/g, '').replace(/^(\+)?1/, '');

                            // Add the country code
                            cleanedNumber = "+1" + cleanedNumber;

                            return cleanedNumber;
                        }

                        let formattedNumber = await convertPhoneNumber(PhoneNumberCheck);

                        // var TwillowPhoneNumber = process.env.PhoneNumber || '+13254426364';
                        // var PhoneNumberCheck = "+919106850877"

                        // client.messages
                        //     .create({
                        //         body: `WEVALET: ${otp} is your OTP for the login . This OTP is valid only for 2 min. 
                        //         By Apti Enterprises LLC`,
                        //         from: TwillowPhoneNumber, // Your Twilio phone number
                        //         to: PhoneNumberCheck // Recipient's phone number
                        //     })
                        //     .then((message) => {
                        //         var a = { "message": "Otp Send", "status": `${HTTP.SUCCESS}` }
                        //         res.status(HTTP.SUCCESS).json(a);
                        //     })
                        //     .catch((error) => {
                        //         console.error(`Error: ${error}`);
                        //     });

                        console.log("Formated: " + formattedNumber)

                        var Otpmessage = "WEVALET: " + otp + " is your OTP for the login . This OTP is valid only for 2 min. By Apti Enterprises LLC"

                        const headers = {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + process.env.publicKey
                        };

                        // Define the raw body data you want to send in the request
                        const rawBodyData = {
                            from: process.env.PhoneNumber,
                            to: formattedNumber,
                            text: Otpmessage
                        };

                        const requestBody = JSON.stringify(rawBodyData);
                        const apiUrl = 'https://api.telnyx.com/v2/messages';

                        axios.post(apiUrl, requestBody, { headers })
                            .then((response) => {
                                var a = { "message": "Otp Send", "status": `${HTTP.SUCCESS}` }
                                res.status(HTTP.SUCCESS).json(a);
                            })
                            .catch((error) => {
                                console.error(`Error: ${error}`);
                            });
                    }
                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }
        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static e = async (req, res) => {
        try {
            if (req.body.Phone && req.body.otp && req.body.Fcm) {

                var user = await Todo.find({ Phone: req.body.Phone });
                if (user.length == 0) {
                    var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                    res.status(HTTP.NOT_FOUND).json(a);
                } else {
                    if (user[0].otp == req.body.otp) {

                        const token = jwt.sign({ Phone: req.body.Phone }, SECRET_KEY);

                        var updateuser = await Todo.findOneAndUpdate({ Phone: req.body.Phone }, { $unset: { otp: 1 }, $set: { token: token, Fcm: req.body.Fcm } }, { new: true });

                        await updateuser.save();

                        var message2 = { "message": "Data Load Successfully", "data": `${token}`, "status": `${HTTP.SUCCESS}` }
                        res.status(HTTP.SUCCESS).json(message2);

                    } else {
                        var a = { "message": "Wrong Otp", "status": `${HTTP.UNAUTHORIZED}` }
                        res.status(HTTP.UNAUTHORIZED).json(a);
                    }

                }
            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }
        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static f = async (req, res) => {
        try {
            if (req.body.Fcm) {

                var LowerCaseUsername = await req.body.UserName.toLowerCase();

                var User = await Todo2.findOne({ UserName: LowerCaseUsername });
                var User2 = await Todo8.findOne({ Username: LowerCaseUsername });

                if (!User && !User2) {
                    var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                    res.status(HTTP.NOT_FOUND).json(a);
                } else {

                    if (User) {
                        var UserPassword = User.PassWord;
                    } else {
                        var UserPassword = User2.Password;
                    }

                    var Passwordmatch = await bcrypt.compare(req.body.Password, UserPassword);
                    if (Passwordmatch) {

                        const token = jwt.sign({ UserName: LowerCaseUsername }, SECRET_KEY);

                        function startsWithValidCountryCode(phoneNumber) {
                            const validCodes = ['+91'];
                            return validCodes.some(code => phoneNumber.startsWith(code));
                        }

                        var countryCN = "INDIA"


                        if (User) {
                            var UserPhon = User.Phone;
                            if (startsWithValidCountryCode(UserPhon)) {
                                countryCN = "INDIA"
                            } else {
                                countryCN = "USA"
                            }
                        } else {
                            var UserPhon = User2.Phone;
                            if (startsWithValidCountryCode(UserPhon)) {
                                countryCN = "INDIA"
                            } else {
                                countryCN = "USA"
                            }
                        }

                        if (User) {

                            var updateuser = await Todo2.findOneAndUpdate({ UserName: LowerCaseUsername }, { $set: { token: token, Fcm: req.body.Fcm } }, { new: true });
                            await updateuser.save();

                            var message2 = {
                                "message": "Data Load Successfully", "Type": "Business Account", "data": `${token}`,
                                "country": countryCN,
                                "status": `${HTTP.SUCCESS}`
                            }
                            res.status(HTTP.SUCCESS).json(message2);

                        } else {

                            var updateuser = await Todo8.findOneAndUpdate({ Username: LowerCaseUsername }, { $set: { token: token, Fcm: req.body.Fcm } }, { new: true });
                            await updateuser.save();

                            var message2 = {
                                "message": "Data Load Successfully", "Type": "Valet Account",
                                "country": countryCN,
                                "data": `${token}`, "status": `${HTTP.SUCCESS}`
                            }
                            res.status(HTTP.SUCCESS).json(message2);

                        }

                    } else {
                        var a = { "message": "Wrong PassWord", "status": `${HTTP.UNAUTHORIZED}` }
                        res.status(HTTP.UNAUTHORIZED).json(a);
                    }

                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }
        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static g = async (req, res) => {
        try {

            // var inputData = await Todo3.findOne({});
            var inputData2 = await Todo2.findOne({ UserName: req.body.UserName });
            var inputData3 = inputData2.UserWaitTime[0];

            const obj = inputData3._doc;

            const daysOfWeek2 = Object.keys(obj).filter(key => key !== '_id' && key !== '__v');

            const timeValueArray = daysOfWeek2.map(key => obj[key]);

            const valetTimes = {};

            for (let i = 0; i < daysOfWeek2.length; i++) {
                const day = daysOfWeek2[i];
                const timeValuePairs = timeValueArray[i];

                const dayObject = {};

                for (const [time, value] of timeValuePairs) {
                    dayObject[time] = value;
                }

                valetTimes[day] = dayObject;
            }

            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            const hours = String(currentDate.getHours()).padStart(2, '0');
            const minutes = String(currentDate.getMinutes()).padStart(2, '0');
            const seconds = String(currentDate.getSeconds()).padStart(2, '0');

            const inputDateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

            const inputDate = new Date(inputDateString);

            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const dayOfWeek = daysOfWeek[inputDate.getDay()];

            if (!dayOfWeek) {

                return res.status(HTTP.BAD_REQUEST).json(a);

            }

            const timeString = inputDate.toTimeString().substring(0, 8);

            const dayValetTimes = valetTimes[dayOfWeek];

            if (!dayValetTimes) {

                var a = { error: "Waiting times not defined for this day.", "status": `${HTTP.NOT_FOUND}` }

                return res.status(404).json(a);

            }

            let waitingTime = 0;

            for (const startTime of Object.keys(dayValetTimes)) {

                waitingTime = dayValetTimes[startTime];

            }

            var a = { "message": `${waitingTime}`, "status": `${HTTP.SUCCESS}` }
            res.status(HTTP.SUCCESS).json(a);

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static h = async (req, res) => {
        try {

            if (req.files['valetTicket'] && req.files['carPicture'] && req.UserName) {

                const headerValue = req.get('Authorization');

                var User = await Todo8.findOne({ Username: req.UserName })

                if (User) {
                    if (User.token == headerValue) {

                        const valetTicketPictures = req.files['valetTicket'].map(file => Ip + "/public/" + file.filename);
                        const carPictures = req.files['carPicture'].map(file => Ip + "/public/" + file.filename);

                        const suratTimezone = 'Asia/Kolkata';
                        const currentTimeInSurat = moment().tz(suratTimezone).format('YYYY-MM-DDTHH:mm:ss');

                        var Parklocation = await User.BusinessUnitName;

                        const postData2 = {
                            RegistrationNumber: req.body.RegistrationNumber,
                        };

                        const response = await axios.post(`${Ip}/NumberToMember`, postData2);

                        let data = new Todo4({
                            CompanyName: req.body.CompanyName,
                            Model: req.body.Model,
                            RegistrationNumber: req.body.RegistrationNumber,
                            Color: req.body.Color,
                            CarPicture: carPictures,
                            valetTicketPicture: valetTicketPictures,
                            Parklocation: Parklocation,
                            CarBringer: req.body.CarBringer,
                            CarParkBy: req.UserName,
                            ParkInTime: currentTimeInSurat,
                            status: "Parked",
                            status2: "Parked",
                            UserWaitTime: [],
                            TimeUpdateStatus: 0,
                            Member: response.data.message,
                            ParkOutTime: ""
                        });

                        await data.save();

                        let data2 = new Todo7({
                            UserName: response.data.message[0],
                            Message: "Car is parked",
                            ParkInTime: currentTimeInSurat
                        });

                        await data2.save();

                        const postData = {
                            RegistrationNumber: req.body.RegistrationNumber,
                            Status: "Parked",
                        };

                        async function fetchData() {
                            try {

                                const response = await axios.post(`${Ip}/NumberToMember`, postData);

                                if (response.status === 200) {

                                    const UserNameData = response.data.message[0];

                                    var FcmTokenUser = await Todo.find({ UserName: UserNameData })
                                    var FcmToken = await FcmTokenUser[0].Fcm;

                                    axios.post(`${Ip}/StatusChange`, postData)
                                        .then(response => {

                                            const message = {
                                                notification: {
                                                    title: 'Your Car has been parked',
                                                },
                                                android: {
                                                    notification: {
                                                        sound: 'default'
                                                    }
                                                },
                                                apns: {
                                                    payload: {
                                                        aps: {
                                                            sound: 'default'
                                                        }
                                                    }
                                                },
                                                token: FcmToken,
                                            };

                                            fcm.send(message)
                                                .then((response) => {

                                                    var a = { "message": "Valet Parked Car Sucessfully & Notification sent successfully", "status": `${HTTP.SUCCESS}` }
                                                    res.status(HTTP.SUCCESS).json(a);

                                                })
                                                .catch((error) => {

                                                    var a = { "message": "Valet Parked Car Sucessfully & Notification Does Not Send", "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
                                                    res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
                                                });


                                        })
                                        .catch(error => {
                                            console.error('Error:', error);
                                        });

                                } else {
                                    console.error('Request failed with status code:', response.status);
                                }

                            } catch (error) {
                                console.error('An error occurred:', error);
                            }

                        }

                        fetchData();

                    } else {
                        var a = { "message": "Token has expired", "status": `${HTTP.UNAUTHORIZED}` }
                        res.status(HTTP.UNAUTHORIZED).json(a);
                    }
                } else {
                    var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                    res.status(HTTP.NOT_FOUND).json(a);
                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }
        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };


    //         if (req.UserName) {

    //             const headerValue = req.get('Authorization');

    //             var User = await Todo8.findOne({ Username: req.UserName })

    //             if (User) {
    //                 if (User.token == headerValue) {

    //                     var a = [];
    //                     for (var i = 0; i < req.files.length; i++) {
    //                         await a.push(Ip + "/public/" + req.files[i].filename)
    //                     }

    //                     var Parklocation = await User.BusinessUnitName;

    //                     const postData2 = {
    //                         RegistrationNumber: req.body.RegistrationNumber,
    //                     };

    //                     const response = await axios.post(`${Ip}/NumberToMember`, postData2);

    //                     var UserDataUsername = await response.data.message[0];
    //                     var UserData = await Todo.find({ UserName: UserDataUsername })

    //                     if (UserData[0].VehicleDetail) {

    //                         if (UserData[0].VehicleDetail[0].RegistrationNumber == req.body.RegistrationNumber) {

    //                             let data = new Todo4({
    //                                 CompanyName: UserData[0].VehicleDetail[0].CompanyName,
    //                                 Model: UserData[0].VehicleDetail[0].Model,
    //                                 RegistrationNumber: req.body.RegistrationNumber,
    //                                 Color: UserData[0].VehicleDetail[0].Color,
    //                                 CarPicture: a,
    //                                 Parklocation: Parklocation,
    //                                 CarBringer: req.body.CarBringer,
    //                                 CarParkBy: req.UserName,
    //                                 status: "Parked1",
    //                                 UserWaitTime: [],
    //                                 TimeUpdateStatus: 0,
    //                                 Member: response.data.message,
    //                                 ValetStatus: 1,
    //                                 ParkOutTime: "",
    //                                 ParkInTime: ""
    //                             });

    //                             await data.save();

    //                         } else {

    //                             let data = new Todo4({
    //                                 CompanyName: UserData[0].VehicleDetail[1].CompanyName,
    //                                 Model: UserData[0].VehicleDetail[1].Model,
    //                                 RegistrationNumber: req.body.RegistrationNumber,
    //                                 Color: UserData[0].VehicleDetail[1].Color,
    //                                 CarPicture: a,
    //                                 Parklocation: Parklocation,
    //                                 CarBringer: req.body.CarBringer,
    //                                 CarParkBy: req.UserName,
    //                                 status: "Parked1",
    //                                 UserWaitTime: [],
    //                                 TimeUpdateStatus: 0,
    //                                 Member: response.data.message,
    //                                 ValetStatus: 1,
    //                                 ParkOutTime: "",
    //                                 ParkInTime: ""
    //                             });

    //                             await data.save();
    //                         }

    //                     }

    //                     const postData = {
    //                         RegistrationNumber: req.body.RegistrationNumber,
    //                         Status: "Parked1",
    //                     };

    //                     axios.post(`${Ip}/StatusChange`, postData)
    //                         .then(response => {

    //                             var a = { "message": "Valet upload Car Picture Sucessfully", "status": `${HTTP.SUCCESS}` }
    //                             res.status(HTTP.SUCCESS).json(a);

    //                         })
    //                         .catch(error => {
    //                             console.error('Error:', error);
    //                         });

    //                 } else {
    //                     var a = { "message": "Token has expired", "status": `${HTTP.UNAUTHORIZED}` }
    //                     res.status(HTTP.UNAUTHORIZED).json(a);
    //                 }
    //             } else {
    //                 var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
    //                 res.status(HTTP.NOT_FOUND).json(a);
    //             }

    //         } else {
    //             var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
    //             res.status(HTTP.BAD_REQUEST).json(a);
    //         }
    //     } catch (e) {
    //         console.log(e);
    //         var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
    //         res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
    //     }
    // };
    // static i = async (req, res) => {
    //     try {

    //         if (req.UserName) {

    //             const headerValue = req.get('Authorization');

    //             var User = await Todo8.findOne({ Username: req.UserName })

    //             if (User) {
    //                 if (User.token == headerValue) {

    //                     // var a = [];
    //                     // for (var i = 0; i < req.files.length; i++) {
    //                     //     await a.push(Ip + "/public/" + req.files[i].filename)
    //                     // }

    //                     var Parklocation = await User.BusinessUnitName;

    //                     var AwsState = await Todo2.find({ UnitName: Parklocation });
    //                     var OfficialState = await AwsState[0].State;
    //                     var OfficialCity = await AwsState[0].City;

    //                     const postData2 = {
    //                         RegistrationNumber: req.body.RegistrationNumber,
    //                     };

    //                     const response = await axios.post(`${Ip}/NumberToMember`, postData2);

    //                     var UserDataUsername = await response.data.message[0];
    //                     var UserData = await Todo.find({ UserName: UserDataUsername })

    //                     if (UserData[0].VehicleDetail) {

    //                         const currentTimestamp = Date.now();
    //                         const currentDate = new Date(currentTimestamp);

    //                         var currentYear = await currentDate.getFullYear();
    //                         var currentMonth;
    //                         var currentDay;
    //                         var currentHours;
    //                         var currentMinutes;
    //                         var currentSeconds;

    //                         if (currentDate.getMonth() < 10) {
    //                             var currentMonth = await `0${currentDate.getMonth() + 1}`;
    //                         } else {
    //                             var currentMonth = await currentDate.getMonth() + 1;
    //                         }

    //                         if (currentDate.getDate() < 10) {
    //                             var currentDay = await `0${currentDate.getDate()}`;
    //                         } else {
    //                             var currentDay = await currentDate.getDate();
    //                         }

    //                         if (currentDate.getHours() < 10) {
    //                             var currentHours = await `0${currentDate.getHours()}`;
    //                         } else {
    //                             var currentHours = await currentDate.getHours();
    //                         }

    //                         if (currentDate.getMinutes() < 10) {
    //                             var currentMinutes = await `0${currentDate.getMinutes()}`;
    //                         } else {
    //                             var currentMinutes = await currentDate.getMinutes();
    //                         }

    //                         if (currentDate.getSeconds() < 10) {
    //                             var currentSeconds = await `0${currentDate.getSeconds()}`;
    //                         } else {
    //                             var currentSeconds = await currentDate.getSeconds();
    //                         }

    //                         const formattedDateTime = `${currentYear} ${currentMonth} ${currentDay} ${currentHours} ${currentMinutes} ${currentSeconds}`;

    //                         if (UserData[0].VehicleDetail[0].RegistrationNumber == req.body.RegistrationNumber) {

    //                             const file = req.file;

    //                             const fileExt = path.extname(file.originalname);

    //                             const fileName = formattedDateTime + fileExt;

    //                             const s3 = new AWS.S3({
    //                                 accessKeyId: process.env.AWS_ACCESS_KEY,
    //                                 secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    //                             });

    //                             const params = {
    //                                 Bucket: process.env.AWS_S3_BUCKET,
    //                                 Key: `${OfficialState}/${OfficialCity}/${Parklocation}/${req.body.RegistrationNumber}/${fileName}`,
    //                                 Body: file.buffer,
    //                                 ACL: 'public-read',
    //                                 ContentType: file.mimetype,
    //                             };

    //                             s3.upload(params, async (error, data) => {
    //                                 if (error) {
    //                                     res.status(500).send(error);
    //                                 } else {

    //                                     let data2 = new Todo4({
    //                                         CompanyName: UserData[0].VehicleDetail[0].CompanyName,
    //                                         Model: UserData[0].VehicleDetail[0].Model,
    //                                         RegistrationNumber: req.body.RegistrationNumber,
    //                                         Color: UserData[0].VehicleDetail[0].Color,
    //                                         CarPicture: data.Location,
    //                                         Parklocation: Parklocation,
    //                                         CarBringer: req.body.CarBringer,
    //                                         CarParkBy: req.UserName,
    //                                         status: "Parked1",
    //                                         UserWaitTime: [],
    //                                         TimeUpdateStatus: 0,
    //                                         Member: response.data.message,
    //                                         ValetStatus: 1,
    //                                         ParkOutTime: "",
    //                                         ParkInTime: ""
    //                                     });

    //                                     await data2.save();

    //                                 }
    //                             });

    //                         } else {

    //                             const file = req.file;

    //                             const fileExt = path.extname(file.originalname);

    //                             const fileName = formattedDateTime + fileExt;

    //                             const s3 = new AWS.S3({
    //                                 accessKeyId: process.env.AWS_ACCESS_KEY,
    //                                 secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    //                             });

    //                             const params = {
    //                                 Bucket: process.env.AWS_S3_BUCKET,
    //                                 Key: `${OfficialState}/${OfficialCity}/${Parklocation}/${req.body.RegistrationNumber}/${fileName}`,
    //                                 Body: file.buffer,
    //                                 ACL: 'public-read',
    //                                 ContentType: file.mimetype,
    //                             };

    //                             s3.upload(params, async (error, data) => {
    //                                 if (error) {
    //                                     res.status(500).send(error);
    //                                 } else {

    //                                     let data2 = new Todo4({
    //                                         CompanyName: UserData[0].VehicleDetail[1].CompanyName,
    //                                         Model: UserData[0].VehicleDetail[1].Model,
    //                                         RegistrationNumber: req.body.RegistrationNumber,
    //                                         Color: UserData[0].VehicleDetail[1].Color,
    //                                         CarPicture: data.Location,
    //                                         Parklocation: Parklocation,
    //                                         CarBringer: req.body.CarBringer,
    //                                         CarParkBy: req.UserName,
    //                                         status: "Parked1",
    //                                         UserWaitTime: [],
    //                                         TimeUpdateStatus: 0,
    //                                         Member: response.data.message,
    //                                         ValetStatus: 1,
    //                                         ParkOutTime: "",
    //                                         ParkInTime: ""
    //                                     });

    //                                     await data2.save();

    //                                 }
    //                             });

    //                         }

    //                     }

    //                     const postData = {
    //                         RegistrationNumber: req.body.RegistrationNumber,
    //                         Status: "Parked1",
    //                     };

    //                     axios.post(`${Ip}/StatusChange`, postData)
    //                         .then(response => {

    //                             var a = { "message": "Valet upload Car Picture Sucessfully", "status": `${HTTP.SUCCESS}` }
    //                             res.status(HTTP.SUCCESS).json(a);

    //                         })
    //                         .catch(error => {
    //                             console.error('Error:', error);
    //                         });

    //                 } else {
    //                     var a = { "message": "Token has expired", "status": `${HTTP.UNAUTHORIZED}` }
    //                     res.status(HTTP.UNAUTHORIZED).json(a);
    //                 }
    //             } else {
    //                 var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
    //                 res.status(HTTP.NOT_FOUND).json(a);
    //             }

    //         } else {
    //             var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
    //             res.status(HTTP.BAD_REQUEST).json(a);
    //         }
    //     } catch (e) {
    //         console.log(e);
    //         var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
    //         res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
    //     }
    // };

    static tokenqrdata = async (req, res) => {
        try {
            console.log(req.body);

            let data2 = new Todo15({ vehicalnumber: req.body.vehicalnumber })

            console.log(data2);

            if (data2) {

            } else {
                let data3 = new Todo15({
                    tokennumber: req.body.tokennumber,
                    vehicalnumber: req.body.vehicalnumber,
                    randomnumber: req.body.randomnumber,
                });
                await data3.save();
                var a = { "message": `Status OK`, "status": `${HTTP.SUCCESS}` }
                res.status(HTTP.SUCCESS).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };

    static i = async (req, res) => {
        try {

            if (req.UserName) {

                const headerValue = req.get('Authorization');

                var User = await Todo8.findOne({ Username: req.UserName })

                if (User) {

                    if (User.token == headerValue) {

                        var ParkedCar11 = await Todo4.find({ RegistrationNumber: req.body.RegistrationNumber, status: "" })
                        if (ParkedCar11.length == 0) {

                            var Parklocation = await User.BusinessUnitName;

                            console.log(Parklocation)
                            var AwsState = await Todo2.find({ UnitName: Parklocation });

                            var CountryName = await AwsState[0].Country;

                            console.log(AwsState)
                            var OfficialState = await AwsState[0].State;
                            var OfficialCity = await AwsState[0].City;

                            const postData2 = {
                                RegistrationNumber: req.body.RegistrationNumber,
                            };

                            const response = await axios.post(`${Ip}/NumberToMember`, postData2);

                            var UserDataUsername = await response.data.message[0];
                            var UserData = await Todo.find({ UserName: UserDataUsername })

                            var UpdatedParklocation = [];

                            if (req.body.UpdatedParklocation) {
                                await UpdatedParklocation.push(req.body.UpdatedParklocation)
                            } else {
                                await UpdatedParklocation.push(Parklocation)
                            }

                            const locations = [];

                            if (UserData[0].VehicleDetail) {

                                const suratTimezone = 'Asia/Kolkata';
                                const currentTimeInSurat = moment().tz(suratTimezone).format('YYYY-MM-DDTHH:mm:ss');

                                const currentDate = new Date(currentTimeInSurat);

                                var currentYear = await currentDate.getFullYear();
                                var currentMonth;
                                var currentDay;
                                var currentHours;
                                var currentMinutes;
                                var currentSeconds;

                                if (currentDate.getMonth() < 10) {
                                    var currentMonth = await `0${currentDate.getMonth() + 1}`;
                                } else {
                                    var currentMonth = await currentDate.getMonth() + 1;
                                }

                                if (currentDate.getDate() < 10) {
                                    var currentDay = await `0${currentDate.getDate()}`;
                                } else {
                                    var currentDay = await currentDate.getDate();
                                }

                                if (currentDate.getHours() < 10) {
                                    var currentHours = await `0${currentDate.getHours()}`;
                                } else {
                                    var currentHours = await currentDate.getHours();
                                }

                                if (currentDate.getMinutes() < 10) {
                                    var currentMinutes = await `0${currentDate.getMinutes()}`;
                                } else {
                                    var currentMinutes = await currentDate.getMinutes();
                                }

                                if (currentDate.getSeconds() < 10) {
                                    var currentSeconds = await `0${currentDate.getSeconds()}`;
                                } else {
                                    var currentSeconds = await currentDate.getSeconds();
                                }

                                const formattedDateTime = `${currentYear} ${currentMonth} ${currentDay} ${currentHours} ${currentMinutes} ${currentSeconds}`;

                                const files = req.files;

                                for (let i = 0; i < files.length; i++) {

                                    const file = files[i];

                                    const fileExt = path.extname(file.originalname);
                                    const fileName = formattedDateTime + (i + 1) + fileExt;

                                    const s3 = new AWS.S3({
                                        accessKeyId: process.env.AWS_ACCESS_KEY,
                                        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                                    });

                                    const params = {
                                        Bucket: process.env.AWS_S3_BUCKET,
                                        Key: `${CountryName}/${OfficialState}/${OfficialCity}/${Parklocation}/${req.body.RegistrationNumber}/${fileName}`,
                                        Body: file.buffer,
                                        ACL: 'public-read',
                                        ContentType: file.mimetype,
                                    };

                                    const data = await s3.upload(params).promise();
                                    var dataKey = data.Key
                                    var pushDataLocation = `${PUSHDATALOCATION}/${dataKey}`
                                    locations.push(pushDataLocation);

                                }

                                var IsOwnerCarBringer
                                if (req.body.CarBringer == UserDataUsername) {
                                    IsOwnerCarBringer = 1
                                } else {
                                    IsOwnerCarBringer = 0
                                }

                                if (UserData[0].VehicleDetail[0].RegistrationNumber == req.body.RegistrationNumber) {

                                    let data2 = new Todo4({
                                        CompanyName: UserData[0].VehicleDetail[0].CompanyName,
                                        Model: UserData[0].VehicleDetail[0].Model,
                                        RegistrationNumber: req.body.RegistrationNumber,
                                        Color: UserData[0].VehicleDetail[0].Color,
                                        CarPicture: locations,
                                        Parklocation: Parklocation,
                                        UpdatedParklocation: UpdatedParklocation[0],
                                        CarBringer: req.body.CarBringer,
                                        IsOwnerCarBringer: IsOwnerCarBringer,
                                        CarParkBy: req.UserName,
                                        status: "",
                                        status2: "",
                                        UserWaitTime: [],
                                        TimeUpdateStatus: 0,
                                        Member: response.data.message,
                                        ValetStatus: 1,
                                        ParkOutTime: "",
                                        ParkInTime: "",
                                        WaitTime: "",
                                        CarPictureUploadStatus: "1"
                                    });

                                    await data2.save();

                                } else {

                                    let data2 = new Todo4({
                                        CompanyName: UserData[0].VehicleDetail[1].CompanyName,
                                        Model: UserData[0].VehicleDetail[1].Model,
                                        RegistrationNumber: req.body.RegistrationNumber,
                                        Color: UserData[0].VehicleDetail[1].Color,
                                        CarPicture: locations,
                                        Parklocation: Parklocation,
                                        UpdatedParklocation: UpdatedParklocation[0],
                                        CarBringer: req.body.CarBringer,
                                        IsOwnerCarBringer: IsOwnerCarBringer,
                                        CarParkBy: req.UserName,
                                        status: "",
                                        status2: "",
                                        UserWaitTime: [],
                                        TimeUpdateStatus: 0,
                                        Member: response.data.message,
                                        ValetStatus: 1,
                                        ParkOutTime: "",
                                        ParkInTime: "",
                                        WaitTime: "",
                                        CarPictureUploadStatus: "1"
                                    });

                                    await data2.save();
                                }
                            }

                            User.ValetStatus = 1;
                            await User.save();

                            const postData = {
                                RegistrationNumber: req.body.RegistrationNumber,
                                Status: "",
                            };

                            const formattedDateTime2 = `${currentYear}-${currentMonth}-${currentDay}`;
                            const formattedDateTime3 = `${currentHours}:${currentMinutes}:${currentSeconds}`;

                            let data222 = new Todo10({
                                Date: formattedDateTime2,
                                Time: formattedDateTime3,
                                Pictures: locations,
                                RegistrationNumber: req.body.RegistrationNumber,
                                UserAction: "ParkIn"
                            });

                            await data222.save();

                            axios.post(`${Ip}/StatusChange`, postData)
                                .then(response => {

                                    var a = { "message": "Car entry picture uploaded successfully.", "status": `${HTTP.SUCCESS}` }
                                    res.status(HTTP.SUCCESS).json(a);

                                })
                                .catch(error => {
                                    console.error('Error:', error);
                                });

                        } else {
                            var a = { "message": "Please Upload Valet Tickiet Picture", "status": `${HTTP.SUCCESS}` }
                            res.status(HTTP.SUCCESS).json(a);
                        }

                    } else {
                        var a = { "message": "Token has expired", "status": `${HTTP.UNAUTHORIZED}` }
                        res.status(HTTP.UNAUTHORIZED).json(a);
                    }

                } else {
                    var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                    res.status(HTTP.NOT_FOUND).json(a);
                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };

    static ione = async (req, res) => {

        try {

            var User = await Todo8.findOne({ Username: req.body.UserName })

            if (User) {

                if (User.token == headerValue) {

                    var ParkedCar11 = await Todo4.find({ RegistrationNumber: req.body.RegistrationNumber, status: "" })
                    if (ParkedCar11.length == 0) {

                        var Parklocation = await User.BusinessUnitName;

                        console.log(Parklocation)
                        var AwsState = await Todo2.find({ UnitName: Parklocation });
                        var countryName = await AwsState[0].Country;
                        console.log(AwsState)
                        var OfficialState = await AwsState[0].State;
                        var OfficialCity = await AwsState[0].City;

                        const postData2 = {
                            RegistrationNumber: req.body.RegistrationNumber,
                        };

                        const response = await axios.post(`${Ip}/NumberToMember`, postData2);

                        var UserDataUsername = await response.data.message[0];
                        var UserData = await Todo.find({ UserName: UserDataUsername })

                        var UpdatedParklocation = [];

                        if (req.body.UpdatedParklocation) {
                            await UpdatedParklocation.push(req.body.UpdatedParklocation)
                        } else {
                            await UpdatedParklocation.push(Parklocation)
                        }

                        const locations = [];

                        if (UserData[0].VehicleDetail) {

                            const suratTimezone = 'Asia/Kolkata';
                            const currentTimeInSurat = moment().tz(suratTimezone).format('YYYY-MM-DDTHH:mm:ss');

                            const currentDate = new Date(currentTimeInSurat);

                            var currentYear = await currentDate.getFullYear();
                            var currentMonth;
                            var currentDay;
                            var currentHours;
                            var currentMinutes;
                            var currentSeconds;

                            if (currentDate.getMonth() < 10) {
                                var currentMonth = await `0${currentDate.getMonth() + 1}`;
                            } else {
                                var currentMonth = await currentDate.getMonth() + 1;
                            }

                            if (currentDate.getDate() < 10) {
                                var currentDay = await `0${currentDate.getDate()}`;
                            } else {
                                var currentDay = await currentDate.getDate();
                            }

                            if (currentDate.getHours() < 10) {
                                var currentHours = await `0${currentDate.getHours()}`;
                            } else {
                                var currentHours = await currentDate.getHours();
                            }

                            if (currentDate.getMinutes() < 10) {
                                var currentMinutes = await `0${currentDate.getMinutes()}`;
                            } else {
                                var currentMinutes = await currentDate.getMinutes();
                            }

                            if (currentDate.getSeconds() < 10) {
                                var currentSeconds = await `0${currentDate.getSeconds()}`;
                            } else {
                                var currentSeconds = await currentDate.getSeconds();
                            }

                            const formattedDateTime = `${currentYear} ${currentMonth} ${currentDay} ${currentHours} ${currentMinutes} ${currentSeconds}`;

                            const files = req.files;

                            for (let i = 0; i < files.length; i++) {

                                const file = files[i];

                                const fileExt = path.extname(file.originalname);
                                const fileName = formattedDateTime + (i + 1) + fileExt;

                                const s3 = new AWS.S3({
                                    accessKeyId: process.env.AWS_ACCESS_KEY,
                                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                                });

                                const params = {
                                    Bucket: process.env.AWS_S3_BUCKET,
                                    Key: `${countryName}/${OfficialState}/${OfficialCity}/${Parklocation}/${req.body.RegistrationNumber}/${fileName}`,
                                    Body: file.buffer,
                                    ACL: 'public-read',
                                    ContentType: file.mimetype,
                                };

                                const data = await s3.upload(params).promise();
                                var dataKey = data.Key
                                var pushDataLocation = `${PUSHDATALOCATION}/${dataKey}`
                                locations.push(pushDataLocation);

                            }

                            var IsOwnerCarBringer
                            if (req.body.CarBringer == UserDataUsername) {
                                IsOwnerCarBringer = 1
                            } else {
                                IsOwnerCarBringer = 0
                            }

                            if (UserData[0].VehicleDetail[0].RegistrationNumber == req.body.RegistrationNumber) {

                                let data2 = new Todo4({
                                    CompanyName: UserData[0].VehicleDetail[0].CompanyName,
                                    Model: UserData[0].VehicleDetail[0].Model,
                                    RegistrationNumber: req.body.RegistrationNumber,
                                    Color: UserData[0].VehicleDetail[0].Color,
                                    CarPicture: locations,
                                    Parklocation: Parklocation,
                                    UpdatedParklocation: UpdatedParklocation[0],
                                    CarBringer: req.body.CarBringer,
                                    IsOwnerCarBringer: IsOwnerCarBringer,
                                    CarParkBy: req.UserName,
                                    status: "",
                                    status2: "",
                                    UserWaitTime: [],
                                    TimeUpdateStatus: 0,
                                    Member: response.data.message,
                                    ValetStatus: 1,
                                    ParkOutTime: "",
                                    ParkInTime: "",
                                    WaitTime: "",
                                    CarPictureUploadStatus: "1"
                                });

                                await data2.save();

                            } else {

                                let data2 = new Todo4({
                                    CompanyName: UserData[0].VehicleDetail[1].CompanyName,
                                    Model: UserData[0].VehicleDetail[1].Model,
                                    RegistrationNumber: req.body.RegistrationNumber,
                                    Color: UserData[0].VehicleDetail[1].Color,
                                    CarPicture: locations,
                                    Parklocation: Parklocation,
                                    UpdatedParklocation: UpdatedParklocation[0],
                                    CarBringer: req.body.CarBringer,
                                    IsOwnerCarBringer: IsOwnerCarBringer,
                                    CarParkBy: req.UserName,
                                    status: "",
                                    status2: "",
                                    UserWaitTime: [],
                                    TimeUpdateStatus: 0,
                                    Member: response.data.message,
                                    ValetStatus: 1,
                                    ParkOutTime: "",
                                    ParkInTime: "",
                                    WaitTime: "",
                                    CarPictureUploadStatus: "1"
                                });

                                await data2.save();

                            }

                        }

                        User.ValetStatus = 1;
                        await User.save();

                        const postData = {
                            RegistrationNumber: req.body.RegistrationNumber,
                            Status: "",
                        };

                        const formattedDateTime2 = `${currentYear}-${currentMonth}-${currentDay}`;
                        const formattedDateTime3 = `${currentHours}:${currentMinutes}:${currentSeconds}`;

                        let data222 = new Todo10({
                            Date: formattedDateTime2,
                            Time: formattedDateTime3,
                            Pictures: locations,
                            RegistrationNumber: req.body.RegistrationNumber,
                            UserAction: "ParkIn"
                        });

                        await data222.save();

                        axios.post(`${Ip}/StatusChange`, postData)
                            .then(response => {

                                var a = { "message": "Valet upload Car Picture Sucessfully", "status": `${HTTP.SUCCESS}` }
                                res.status(HTTP.SUCCESS).json(a);

                            })
                            .catch(error => {
                                console.error('Error:', error);
                            });

                    } else {
                        var a = { "message": "Please Upload Valet Tickiet Picture", "status": `${HTTP.SUCCESS}` }
                        res.status(HTTP.SUCCESS).json(a);
                    }

                } else {
                    var a = { "message": "Token has expired", "status": `${HTTP.UNAUTHORIZED}` }
                    res.status(HTTP.UNAUTHORIZED).json(a);
                }

            } else {
                var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                res.status(HTTP.NOT_FOUND).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };

    static j = async (req, res) => {
        try {

            console.log("User Name: " + req.UserName)
            if (req.UserName) {

                const headerValue = req.get('Authorization');

                var User = await Todo8.findOne({ Username: req.UserName })

                if (User) {

                    if (User.token == headerValue) {

                        // var a = [];
                        // for (var i = 0; i < req.files.length; i++) {
                        //     await a.push(Ip + "/public/" + req.files[i].filename)
                        // }

                        var Parklocation = await User.BusinessUnitName;


                        var AwsState = await Todo2.find({ UnitName: Parklocation });

                        var countryName = await AwsState[0].Country;
                        var OfficialState = await AwsState[0].State;
                        var OfficialCity = await AwsState[0].City;

                        const suratTimezone = 'Asia/Kolkata';
                        const currentTimeInSurat = moment().tz(suratTimezone).format('YYYY-MM-DDTHH:mm:ss');

                        const currentDate = new Date(currentTimeInSurat);

                        var currentYear = await currentDate.getFullYear();
                        var currentMonth;
                        var currentDay;
                        var currentHours;
                        var currentMinutes;
                        var currentSeconds;

                        if (currentDate.getMonth() < 10) {
                            var currentMonth = await `0${currentDate.getMonth() + 1}`;
                        } else {
                            var currentMonth = await currentDate.getMonth() + 1;
                        }

                        if (currentDate.getDate() < 10) {
                            var currentDay = await `0${currentDate.getDate()}`;
                        } else {
                            var currentDay = await currentDate.getDate();
                        }

                        if (currentDate.getHours() < 10) {
                            var currentHours = await `0${currentDate.getHours()}`;
                        } else {
                            var currentHours = await currentDate.getHours();
                        }

                        if (currentDate.getMinutes() < 10) {
                            var currentMinutes = await `0${currentDate.getMinutes()}`;
                        } else {
                            var currentMinutes = await currentDate.getMinutes();
                        }

                        if (currentDate.getSeconds() < 10) {
                            var currentSeconds = await `0${currentDate.getSeconds()}`;
                        } else {
                            var currentSeconds = await currentDate.getSeconds();
                        }

                        const formattedDateTime = `${currentYear} ${currentMonth} ${currentDay} ${currentHours} ${currentMinutes} ${currentSeconds}`;

                        const files = req.files;

                        const locations = [];

                        for (let i = 0; i < files.length; i++) {

                            const file = files[i];

                            const fileExt = path.extname(file.originalname);
                            const fileName = formattedDateTime + (i + 1) + fileExt;

                            const s3 = new AWS.S3({
                                accessKeyId: process.env.AWS_ACCESS_KEY,
                                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                            });

                            const params = {
                                Bucket: process.env.AWS_S3_BUCKET,
                                Key: `${countryName}/${OfficialState}/${OfficialCity}/${Parklocation}/${req.body.RegistrationNumber}/${fileName}`,
                                Body: file.buffer,
                                ACL: 'public-read',
                                ContentType: file.mimetype,
                            };

                            const data = await s3.upload(params).promise();
                            var dataKey = data.Key
                            var pushDataLocation = `${PUSHDATALOCATION}/${dataKey}`
                            locations.push(pushDataLocation);
                        }

                        const postData2 = {
                            RegistrationNumber: req.body.RegistrationNumber,
                        };

                        const response = await axios.post(`${Ip}/NumberToMember`, postData2);

                        const postData = {
                            RegistrationNumber: req.body.RegistrationNumber,
                            Status: "Parked",
                            Status2: "",
                        };

                        var ParkedCar1 = await Todo4.find({ RegistrationNumber: req.body.RegistrationNumber, status: "", CarPictureUploadStatus: "1" })

                        if (ParkedCar1.length == 0) {

                            var Parklocation = await User.BusinessUnitName;

                            var AwsState = await Todo2.find({ UnitName: Parklocation });

                            var OfficialState = await AwsState[0].State;
                            var OfficialCity = await AwsState[0].City;

                            const postData2 = {
                                RegistrationNumber: req.body.RegistrationNumber,
                            };

                            const response = await axios.post(`${Ip}/NumberToMember`, postData2);

                            var UserDataUsername = await response.data.message[0];
                            var UserData = await Todo.find({ UserName: UserDataUsername })

                            var UpdatedParklocation = [];

                            if (req.body.UpdatedParklocation) {
                                await UpdatedParklocation.push(req.body.UpdatedParklocation)
                            } else {
                                await UpdatedParklocation.push(Parklocation)
                            }

                            const locations = [];

                            if (UserData[0].VehicleDetail) {

                                const suratTimezone = 'Asia/Kolkata';
                                const currentTimeInSurat = moment().tz(suratTimezone).format('YYYY-MM-DDTHH:mm:ss');

                                const currentDate = new Date(currentTimeInSurat);

                                var currentYear = await currentDate.getFullYear();
                                var currentMonth;
                                var currentDay;
                                var currentHours;
                                var currentMinutes;
                                var currentSeconds;

                                if (currentDate.getMonth() < 10) {
                                    var currentMonth = await `0${currentDate.getMonth() + 1}`;
                                } else {
                                    var currentMonth = await currentDate.getMonth() + 1;
                                }

                                if (currentDate.getDate() < 10) {
                                    var currentDay = await `0${currentDate.getDate()}`;
                                } else {
                                    var currentDay = await currentDate.getDate();
                                }

                                if (currentDate.getHours() < 10) {
                                    var currentHours = await `0${currentDate.getHours()}`;
                                } else {
                                    var currentHours = await currentDate.getHours();
                                }

                                if (currentDate.getMinutes() < 10) {
                                    var currentMinutes = await `0${currentDate.getMinutes()}`;
                                } else {
                                    var currentMinutes = await currentDate.getMinutes();
                                }

                                if (currentDate.getSeconds() < 10) {
                                    var currentSeconds = await `0${currentDate.getSeconds()}`;
                                } else {
                                    var currentSeconds = await currentDate.getSeconds();
                                }

                                var IsOwnerCarBringer
                                if (req.body.CarBringer == UserDataUsername) {
                                    IsOwnerCarBringer = 1
                                } else {
                                    IsOwnerCarBringer = 0
                                }

                                if (UserData[0].VehicleDetail[0].RegistrationNumber == req.body.RegistrationNumber) {

                                    let data2 = new Todo4({
                                        CompanyName: UserData[0].VehicleDetail[0].CompanyName,
                                        Model: UserData[0].VehicleDetail[0].Model,
                                        RegistrationNumber: req.body.RegistrationNumber,
                                        Color: UserData[0].VehicleDetail[0].Color,
                                        CarPicture: [],
                                        Parklocation: Parklocation,
                                        UpdatedParklocation: UpdatedParklocation[0],
                                        CarBringer: req.body.CarBringer,
                                        IsOwnerCarBringer: IsOwnerCarBringer,
                                        CarParkBy: req.UserName,
                                        status: "",
                                        status2: "",
                                        UserWaitTime: [],
                                        TimeUpdateStatus: 0,
                                        Member: response.data.message,
                                        ValetStatus: 1,
                                        ParkOutTime: "",
                                        ParkInTime: "",
                                        WaitTime: "",
                                        CarPictureUploadStatus: "1"
                                    });

                                    await data2.save();

                                } else {

                                    let data2 = new Todo4({
                                        CompanyName: UserData[0].VehicleDetail[1].CompanyName,
                                        Model: UserData[0].VehicleDetail[1].Model,
                                        RegistrationNumber: req.body.RegistrationNumber,
                                        Color: UserData[0].VehicleDetail[1].Color,
                                        CarPicture: [],
                                        Parklocation: Parklocation,
                                        UpdatedParklocation: UpdatedParklocation[0],
                                        CarBringer: req.body.CarBringer,
                                        IsOwnerCarBringer: IsOwnerCarBringer,
                                        CarParkBy: req.UserName,
                                        status: "",
                                        status2: "",
                                        UserWaitTime: [],
                                        TimeUpdateStatus: 0,
                                        Member: response.data.message,
                                        ValetStatus: 1,
                                        ParkOutTime: "",
                                        ParkInTime: "",
                                        WaitTime: "",
                                        CarPictureUploadStatus: "1"
                                    });

                                    await data2.save();
                                }
                            }

                            User.ValetStatus = 1;
                            await User.save();

                            const postData = {
                                RegistrationNumber: req.body.RegistrationNumber,
                                Status: "",
                            };

                            const formattedDateTime2 = `${currentYear}-${currentMonth}-${currentDay}`;
                            const formattedDateTime3 = `${currentHours}:${currentMinutes}:${currentSeconds}`;

                            let data222 = new Todo10({
                                Date: formattedDateTime2,
                                Time: formattedDateTime3,
                                Pictures: locations,
                                RegistrationNumber: req.body.RegistrationNumber,
                                UserAction: "ParkIn"
                            });

                            await data222.save();

                            axios.post(`${Ip}/StatusChange`, postData)
                                .then(response => {

                                })
                                .catch(error => {
                                    console.error('Error:', error);
                                });
                        }

                        if (ParkedCar1.length !== 0) {

                            await Todo8.findOneAndUpdate({ Username: req.UserName }, {
                                $set: {
                                    ValetStatus: 0
                                }
                            }, { returnOriginal: false })

                            // ParkedCar1[0].valetTicketPicture = a;
                            ParkedCar1[0].valetTicketPicture = locations;
                            ParkedCar1[0].ParkInTime = currentTimeInSurat;
                            ParkedCar1[0].status = "Parked";
                            // ParkedCar1[0].status2 = "Parked";
                            ParkedCar1[0].CarPictureUploadStatus = "0"

                            ParkedCar1[0].save();

                            let data2 = new Todo7({
                                UserName: response.data.message[0],
                                Message: "Car is parked",
                                ParkInTime: currentTimeInSurat
                            });

                            await data2.save();

                            async function fetchData() {
                                try {

                                    const response = await axios.post(`${Ip}/NumberToMember`, postData);

                                    if (response.status === 200) {

                                        const UserNameData = response.data.message[0];

                                        var FcmTokenUser = await Todo.find({ UserName: UserNameData })

                                        var array1 = await FcmTokenUser[0].ActiveParkingUser;
                                        var RemoveElement = await ParkedCar1[0].CarBringer;

                                        FcmTokenUser[0].ActiveParkingUser = array1.filter(function (item) {
                                            return item !== RemoveElement
                                        })

                                        await FcmTokenUser[0].save();

                                        // var ActivePushParkingUser = await FcmTokenUser[0].UserName;
                                        // FcmTokenUser[0].ActiveParkingUser.push(ActivePushParkingUser);
                                        // await FcmTokenUser[0].save();

                                        var FcmToken = await FcmTokenUser[0].Fcm;

                                        axios.post(`${Ip}/StatusChange`, postData)
                                            .then(response => {

                                                const message = {
                                                    notification: {
                                                        title: 'Your vehicle is parked, Thank You',
                                                        sound: 'default'
                                                    },
                                                    android: {
                                                        notification: {
                                                            sound: 'default'
                                                        }
                                                    },
                                                    apns: {
                                                        payload: {
                                                            aps: {
                                                                sound: 'default'
                                                            }
                                                        }
                                                    },
                                                    token: FcmToken,
                                                };

                                                fcm.send(message)
                                                    .then((response) => {

                                                        var a = { "message": "Valet ticket uploaded successfully & notification sent to customer", "status": `${HTTP.SUCCESS}` }
                                                        res.status(HTTP.SUCCESS).json(a);

                                                    })
                                                    .catch((error) => {

                                                        var a = { "message": "Valet ticket uploaded successfully & notification sent to customer", "status": `${HTTP.SUCCESS}` }
                                                        res.status(HTTP.SUCCESS).json(a);
                                                    });


                                            })
                                            .catch(error => {
                                                console.error('Error:', error);
                                            });

                                    } else {
                                        console.error('Request failed with status code:', response.status);
                                    }

                                } catch (error) {
                                    console.error('An error occurred:', error);
                                }
                            }
                            fetchData();
                        } else {

                            var a = { "message": "Car Not Find IN Intermediate Parking Mode", "status": `${HTTP.NOT_FOUND}` }
                            res.status(HTTP.NOT_FOUND).json(a);
                        }

                        // var ParkedCar1 = await Todo4.find({ RegistrationNumber: req.body.RegistrationNumber })

                        // await Todo8.findOneAndUpdate({ Username: req.UserName }, {
                        //     $set: {
                        //         ValetStatus: 0
                        //     }
                        // }, { returnOriginal: false })

                        // // ParkedCar1[0].valetTicketPicture = a;
                        // ParkedCar1[0].valetTicketPicture = locations;
                        // ParkedCar1[0].ParkInTime = currentTimeInSurat;
                        // ParkedCar1[0].status = "Parked";
                        // // ParkedCar1[0].status2 = "Parked";
                        // ParkedCar1[0].CarPictureUploadStatus = "0"

                        // ParkedCar1[0].save();

                        // let data2 = new Todo7({
                        //     UserName: response.data.message[0],
                        //     Message: "Car is parked",
                        //     ParkInTime: currentTimeInSurat
                        // });

                        // await data2.save();

                        // async function fetchData() {
                        //     try {

                        //         const response = await axios.post(`${Ip}/NumberToMember`, postData);

                        //         if (response.status === 200) {

                        //             const UserNameData = response.data.message[0];

                        //             var FcmTokenUser = await Todo.find({ UserName: UserNameData })

                        //             var array1 = await FcmTokenUser[0].ActiveParkingUser;
                        //             var RemoveElement = await ParkedCar1[0].CarBringer;

                        //             FcmTokenUser[0].ActiveParkingUser = array1.filter(function (item) {
                        //                 return item !== RemoveElement
                        //             })

                        //             await FcmTokenUser[0].save();

                        //             // var ActivePushParkingUser = await FcmTokenUser[0].UserName;
                        //             // FcmTokenUser[0].ActiveParkingUser.push(ActivePushParkingUser);
                        //             // await FcmTokenUser[0].save();

                        //             var FcmToken = await FcmTokenUser[0].Fcm;

                        //             axios.post(`${Ip}/StatusChange`, postData)
                        //                 .then(response => {

                        //                     const message = {
                        //                         notification: {
                        //                             title: 'Your vehicle is parked, Thank You',
                        //                             sound: 'default'
                        //                         },
                        //                         android: {
                        //                             notification: {
                        //                                 sound: 'default'
                        //                             }
                        //                         },
                        //                         apns: {
                        //                             payload: {
                        //                                 aps: {
                        //                                     sound: 'default'
                        //                                 }
                        //                             }
                        //                         },
                        //                         token: FcmToken,
                        //                     };

                        //                     fcm.send(message)
                        //                         .then((response) => {
                        //                             var a = { "message": "Valet ticket uploaded successfully & notification sent to customer", "status": `${HTTP.SUCCESS}` }
                        //                             res.status(HTTP.SUCCESS).json(a);

                        //                         })
                        //                         .catch((error) => {
                        //                             var a = { "message": "Valet ticket uploaded successfully & notification sent to customer", "status": `${HTTP.SUCCESS}` }
                        //                             res.status(HTTP.SUCCESS).json(a);
                        //                         });

                        //                 })
                        //                 .catch(error => {
                        //                     console.error('Error:', error);
                        //                 });

                        //         } else {
                        //             console.error('Request failed with status code:', response.status);
                        //         }

                        //     } catch (error) {
                        //         console.error('An error occurred:', error);
                        //     }
                        // }

                        // fetchData();


                    } else {
                        var a = { "message": "Token has expired", "status": `${HTTP.UNAUTHORIZED}` }
                        res.status(HTTP.UNAUTHORIZED).json(a);
                    }

                } else {
                    var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                    res.status(HTTP.NOT_FOUND).json(a);
                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };

    static k = async (req, res) => {
        try {

            if (req.UserName && req.body.RegistrationNumber) {

                const headerValue = req.get('Authorization');

                var User = await Todo8.findOne({ Username: req.UserName })

                if (User) {
                    if (User.token == headerValue) {

                        const postData = {
                            RegistrationNumber: req.body.RegistrationNumber,
                        };

                        const response = await axios.post(`${Ip}/NumberToMember`, postData);

                        var UserDataUsername = await response.data.message[0];

                        var FcmTokenUser = await Todo.find({ UserName: UserDataUsername })

                        var ParkedStatus = "";

                        if (FcmTokenUser[0].VehicleDetail) {

                            if (FcmTokenUser[0].VehicleDetail[0].RegistrationNumber == req.body.RegistrationNumber) {
                                var ParkedStatus = FcmTokenUser[0].VehicleDetail[0].status;
                            } else {
                                var ParkedStatus = FcmTokenUser[0].VehicleDetail[1].status;
                            }

                        }

                        if (ParkedStatus == "Parked") {

                            async function myAsyncFunction() {

                                const postData = {
                                    RegistrationNumber: req.body.RegistrationNumber,
                                    Status: "Parked",
                                    Status2: "Parked",
                                };

                                await axios.post(`${Ip}/StatusChange`, postData);

                                User.ValetStatus = 0;
                                await User.save();

                                var ParkedCar = await Todo4.find({ RegistrationNumber: req.body.RegistrationNumber })

                                if (req.body.UpdatedParklocation) {
                                    ParkedCar[ParkedCar.length - 1].UpdatedParklocation = req.body.UpdatedParklocation;
                                } else {
                                    await UpdatedParklocation.push(Parklocation)
                                }

                                ParkedCar[ParkedCar.length - 1].status2 = "Parked";
                                await ParkedCar[ParkedCar.length - 1].save();

                            }

                            await myAsyncFunction();

                        }

                        var a = { "message": "Car Status Updated", "status": `${HTTP.SUCCESS}` }
                        res.status(HTTP.SUCCESS).json(a);

                    } else {
                        var a = { "message": "Token has expired", "status": `${HTTP.UNAUTHORIZED}` }
                        res.status(HTTP.UNAUTHORIZED).json(a);
                    }
                } else {
                    var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                    res.status(HTTP.NOT_FOUND).json(a);
                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static l = async (req, res) => {
        try {

            var ParkedCar = await Todo4.find({ RegistrationNumber: req.body.RegistrationNumber, status: "Parked" })

            console.log(ParkedCar)

            if (ParkedCar.length !== 0) {

                const headerValue = req.get('Authorization');

                var User = await Todo.findOne({ Phone: req.Phone })

                if (User) {

                    if (headerValue == User.token && ParkedCar[0].Member.includes(User.UserName)) {

                        var VehicleParkBusiness = await Todo8.findOne({ Username: ParkedCar[ParkedCar.length - 1].CarParkBy })
                        var VehicleParkBusinessUserName = VehicleParkBusiness.BusinessManagerUserName;

                        var VehicleParkBusinessUserNameFullData = await Todo8.find({ BusinessManagerUserName: VehicleParkBusinessUserName })

                        var registrationTokens = [];
                        for (var i = 0; i < VehicleParkBusinessUserNameFullData.length; i++) {

                            if (VehicleParkBusinessUserNameFullData[i].Fcm) {
                                await registrationTokens.push(VehicleParkBusinessUserNameFullData[i].Fcm);
                            }

                        }

                        const postData2 = {
                            UserName: VehicleParkBusinessUserName
                        };

                        async function myAsyncFunction() {
                            try {
                                const response = await axios.post(`${Ip}/WaitTime`, postData2);
                                const data = response.data;
                                return data;
                            } catch (error) {
                                console.error("An error occurred:", error);
                                throw error;
                            }
                        }

                        const result = await myAsyncFunction();

                        ParkedCar[0].UserWaitTime[0] = result.message;
                        ParkedCar[0].status = 'Requested';
                        ParkedCar[0].status2 = 'Requested';
                        await ParkedCar[0].save();

                        var NotificationUserFcm = await ParkedCar[0].CarParkBy;

                        var NotificationUser = await Todo8.find({ Username: NotificationUserFcm })

                        var NotificationUserFcm3 = NotificationUser[0].Fcm;
                        var NotificationUserFcm2 = User.Fcm;

                        var VehicleParkedBusinessManagerUserName = NotificationUser[0].BusinessManagerUserName;
                        var VehicleOwnerUserName = await ParkedCar[0].Member[0];
                        const postData = {
                            // RegistrationNumber: VehicleParkedBusinessManagerUserName,
                            RegistrationNumber: req.body.RegistrationNumber,
                            Status: "Requested",
                        };

                        const suratTimezone = 'Asia/Kolkata';
                        const currentTimeInSurat2 = moment().tz(suratTimezone).format('YYYY-MM-DDTHH:mm:ss')
                        const currentTimeInSurat = moment().tz(suratTimezone);
                        const futureTimeInSurat = currentTimeInSurat.add(5, 'minutes');
                        const formattedFutureTime = futureTimeInSurat.format('YYYY-MM-DDTHH:mm:ss');

                        let data2 = new Todo7({
                            UserName: VehicleOwnerUserName,
                            // Message: `Car is on the way , waiting time is : ${result.message} min`,
                            // ParkInTime: currentTimeInSurat2,
                            NotificationRemainingTime: formattedFutureTime,
                            RegistrationNumber: req.body.RegistrationNumber,
                            BusinessUserName: VehicleParkBusinessUserName,
                            ParkInTime: ""
                        });

                        await data2.save();

                        // var UserRequest = await Todo.findOne({ UserName: VehicleOwnerUserName })
                        // UserRequest.Request = UserRequest.Request + 1;
                        // UserRequest.save();

                        axios.post(`${Ip}/StatusChange`, postData)
                            .then(response => {

                                fcm.send({
                                    notification: {
                                        // title: `Your request has been accepted with wait time: ${result.message} Second`,
                                        title: `Your request has been forwarded to Valet for acceptance`,
                                    },
                                    android: {
                                        notification: {
                                            sound: 'default'
                                        }
                                    },
                                    apns: {
                                        payload: {
                                            aps: {
                                                sound: 'default'
                                            }
                                        }
                                    },
                                    token: NotificationUserFcm2,
                                })
                                    .then((response) => {

                                        const message2 = {
                                            notification: {
                                                title: `${User.UserName} has requested for Car`,
                                            },
                                            android: {
                                                notification: {
                                                    sound: 'default'
                                                }
                                            },
                                            apns: {
                                                payload: {
                                                    aps: {
                                                        sound: 'default'
                                                    }
                                                }
                                            },
                                            tokens: registrationTokens,
                                        };

                                        fcm.sendMulticast(message2)
                                            .then((response) => {

                                                // var a = { "message": "User Can Send Request Sucessfully & Notification Send Sucessfully", "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
                                                // res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);

                                                var a = { "message": "User Request sent successfully to Valet for Acceptance", "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
                                                res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);

                                            })
                                            .catch((error) => {

                                                console.error('Error sending notifications:', error);

                                                var a = { "message": "Vehicle request sent successfully", "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
                                                res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);

                                            });

                                    })
                                    .catch((error) => {
                                        var a = { "message": "Vehicle request sent successfully", "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
                                        res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
                                    });

                            })
                            .catch(error => {
                                console.error('Error:', error);
                            });

                    } else {
                        var a = { "message": "Token has expired", "status": `${HTTP.UNAUTHORIZED}` }
                        res.status(HTTP.UNAUTHORIZED).json(a);
                    }

                } else {
                    var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                    res.status(HTTP.NOT_FOUND).json(a);
                }

            } else {
                var a = { "message": "Car Not Find IN Parking Area", "status": `${HTTP.NOT_FOUND}` }
                res.status(HTTP.NOT_FOUND).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static m = async (req, res) => {
        try {
            var ParkedCar = await Todo4.find({ RegistrationNumber: req.body.RegistrationNumber, status: "Requested" })
            if (ParkedCar.length !== 0) {
                const headerValue = req.get('Authorization');

                var User = await Todo8.findOne({ Username: req.UserName })

                if (User) {

                    if (headerValue == User.token) {

                        var User2 = await Todo8.findOne({ Username: req.UserName })

                        const suratTimezone = 'Asia/Kolkata';
                        const currentTimeInSurat2 = moment().tz(suratTimezone).format('YYYY-MM-DDTHH:mm:ss')
                        const currentTimeInSurat = moment().tz(suratTimezone);
                        const currentTimeInSurat22 = moment().tz(suratTimezone);
                        const currentTimeInSurat222 = moment().tz(suratTimezone);
                        const futureTimeInSurat = currentTimeInSurat.add(-1, 'minutes');
                        const formattedFutureTime = futureTimeInSurat.format('YYYY-MM-DDTHH:mm:ss');

                        var FindAndUpdateMany = await Todo7.find({ RegistrationNumber: req.body.RegistrationNumber });
                        FindAndUpdateMany[FindAndUpdateMany.length - 1].NotificationRemainingTime = formattedFutureTime;
                        await FindAndUpdateMany[FindAndUpdateMany.length - 1].save();

                        if (ParkedCar[0].UserWaitTime.length == 1) {

                            const currentDate22 = new Date();
                            const futureDate22 = new Date(currentDate22.getTime() + (ParkedCar[0].UserWaitTime[0] * 1000));
                            const formattedDate = futureDate22.toISOString().slice(0, 19).replace("T", " ");

                            await ParkedCar[0].UserWaitTime.push(formattedDate);

                        }

                        ParkedCar[0].RequestTimeDate = req.body.Date;  // 3
                        ParkedCar[0].status = req.body.Action;
                        ParkedCar[0].status2 = req.body.Action;
                        await ParkedCar[0].save();

                        const postData = {
                            RegistrationNumber: req.body.RegistrationNumber,
                            Status: req.body.Action,
                        };

                        async function fetchData() {
                            try {

                                const response = await axios.post(`${Ip}/NumberToMember`, postData);

                                if (response.status === 200) {

                                    const UserNameData = response.data.message[0];

                                    var FcmTokenUser = await Todo.find({ UserName: UserNameData })

                                    var FcmToken = await FcmTokenUser[0].Fcm;

                                    var VehicleParkBusiness = await Todo8.findOne({ Username: ParkedCar[ParkedCar.length - 1].CarParkBy })
                                    var VehicleParkBusinessUserName = VehicleParkBusiness.BusinessManagerUserName;

                                    const postData2 = {
                                        UserName: VehicleParkBusinessUserName,
                                        RegistrationNumber: req.body.RegistrationNumber
                                    };

                                    var result2 = await Todo4.findOne({ RegistrationNumber: req.body.RegistrationNumber, status: "Accepted" })

                                    if (result2.UserWaitTime.length == 3) {
                                        var result = {
                                            "message": await result2.UserWaitTime[2] / 60
                                        }
                                    } else {
                                        var result = {
                                            "message": await result2.UserWaitTime[0] / 60
                                        }
                                    }

                                    // async function myAsyncFunction() {
                                    //     try {
                                    //         const response = await axios.post(`${Ip}/WaitTime`, postData2);
                                    //         const data = response.data;
                                    //         return data;
                                    //     } catch (error) {
                                    //         console.error("An error occurred:", error);
                                    //         throw error;
                                    //     }
                                    // }

                                    // const result = await myAsyncFunction();

                                    let data22 = new Todo7({
                                        UserName: UserNameData,
                                        Message: `Car is on the way , waiting time is : ${result.message} min`,
                                        ParkInTime: currentTimeInSurat2,
                                    });

                                    await data22.save();

                                    // const currentTimeInSurat3 = moment().tz(suratTimezone);
                                    const futureTimeInSurat3 = currentTimeInSurat22.add(result.message, 'minutes');
                                    const formattedFutureTime3 = futureTimeInSurat3.format('YYYY-MM-DDTHH:mm:ss');

                                    let data222 = new Todo7({
                                        UserName: UserNameData,
                                        Message: "Your vehicle is now available for pickup at the gate. Thank you",
                                        ParkInTime: "",
                                        NotificationRemainingTime: formattedFutureTime3
                                    });

                                    await data222.save();

                                    if (result.message > 5) {

                                        const futureTimeInSurat32 = currentTimeInSurat222.add(+3, 'minutes');
                                        const formattedFutureTime32 = futureTimeInSurat32.format('YYYY-MM-DDTHH:mm:ss');

                                        let data2222 = new Todo7({
                                            UserName: UserNameData,
                                            Message: "Your vehicle is on the way, Thank You",
                                            ParkInTime: "",
                                            NotificationRemainingTime: formattedFutureTime32
                                        });

                                        await data2222.save();

                                    } else {

                                        const futureTimeInSurat32 = currentTimeInSurat222.add(+1, 'minutes');
                                        const formattedFutureTime32 = futureTimeInSurat32.format('YYYY-MM-DDTHH:mm:ss');

                                        let data2222 = new Todo7({
                                            UserName: UserNameData,
                                            Message: "Your vehicle is on the way, Thank You",
                                            ParkInTime: "",
                                            NotificationRemainingTime: formattedFutureTime32
                                        });

                                        await data2222.save();

                                    }

                                    User2.ValetStatus = 2;
                                    await User2.save();

                                    axios.post(`${Ip}/StatusChange`, postData)
                                        .then(response => {

                                            const message = {
                                                notification: {
                                                    title: 'Your request has been accepted, Thank You',
                                                },
                                                android: {
                                                    notification: {
                                                        sound: 'default'
                                                    }
                                                },
                                                apns: {
                                                    payload: {
                                                        aps: {
                                                            sound: 'default'
                                                        }
                                                    }
                                                },
                                                token: FcmToken,
                                            };

                                            fcm.send(message)
                                                .then((response) => {

                                                    var a = { "message": "Your request has been accepted. Thank you", "status": `${HTTP.SUCCESS}` }
                                                    res.status(HTTP.SUCCESS).json(a);

                                                })
                                                .catch((error) => {
                                                    var a = { "message": "Wallet Can Take Action Sucessfully & Notification Does Not Send", "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
                                                    res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
                                                });


                                        })
                                        .catch(error => {
                                            console.error('Error:', error);
                                        });

                                } else {
                                    console.error('Request failed with status code:', response.status);
                                }

                            } catch (error) {
                                console.error('An error occurred:', error);
                            }
                        }

                        fetchData();

                    } else {
                        var a = { "message": "Token has expired", "status": `${HTTP.UNAUTHORIZED}` }
                        res.status(HTTP.UNAUTHORIZED).json(a);
                    }

                } else {
                    var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                    res.status(HTTP.NOT_FOUND).json(a);
                }

            } else {
                var a = { "message": "Car Not Find IN Parking Area", "status": `${HTTP.NOT_FOUND}` }
                res.status(HTTP.NOT_FOUND).json(a);
            }
        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static n = async (req, res) => {
        try {
            var ParkedCar = await Todo4.find({ RegistrationNumber: req.body.RegistrationNumber, status: "Requested" })

            if (ParkedCar.length !== 0) {

                const headerValue = req.get('Authorization');

                var User = await Todo8.findOne({ Username: req.UserName })

                if (User) {

                    ParkedCar[0].leaveTimeCounter = req.body.leaveTimeCounter;

                    if (headerValue == User.token) {

                        const currentTime = new Date();

                        const currentDate22 = new Date();
                        const futureDate22 = new Date(currentDate22.getTime() + (req.body.UpdateTime * 1000));
                        const formattedDate = futureDate22.toISOString().slice(0, 19).replace("T", " ");

                        ParkedCar[0].UpdateTimeDate = req.body.Date;
                        ParkedCar[0].UserWaitTime[1] = formattedDate;
                        ParkedCar[0].UserWaitTime[2] = req.body.UpdateTime;
                        ParkedCar[0].TimeUpdateStatus = 1;
                        await ParkedCar[0].save();

                        await Todo8.findOneAndUpdate({ Username: req.UserName }, {
                            $set: {
                                ValetStatus: 2
                            }
                        }, { returnOriginal: false })

                        var a = { "message": "Customer wait time updated successfully", "status": `${HTTP.SUCCESS}` }
                        res.status(HTTP.SUCCESS).json(a);
                    } else {
                        var a = { "message": "Token has expired", "status": `${HTTP.UNAUTHORIZED}` }
                        res.status(HTTP.UNAUTHORIZED).json(a);
                    }

                } else {
                    var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                    res.status(HTTP.NOT_FOUND).json(a);
                }

            } else {
                var a = { "message": "Car Not Find IN Parking Area", "status": `${HTTP.NOT_FOUND}` }
                res.status(HTTP.NOT_FOUND).json(a);
            }
        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static o = async (req, res) => {
        try {

            var ParkedCar = await Todo4.find({ RegistrationNumber: req.body.RegistrationNumber })

            if (ParkedCar.length !== 0) {

                if (ParkedCar[ParkedCar.length - 1].UserWaitTime.length == 0) {

                    const postData = {
                        UserName: req.body.UserName
                    };

                    async function myAsyncFunction() {
                        try {
                            const response = await axios.post(`${Ip}/WaitTime`, postData);
                            const data = response.data;
                            return data;
                        } catch (error) {
                            console.error("An error occurred:", error);
                            throw error;
                        }
                    }

                    const response = await myAsyncFunction();
                    response.TimeStatus = '0';
                    res.status(HTTP.SUCCESS).json(response);

                    // const response = await axios.get(`${Ip}/WaitTime`);
                    // const data = response.data;

                    // data.TimeStatus = '0';

                    // res.status(HTTP.SUCCESS).json(data);

                } else if (ParkedCar[ParkedCar.length - 1].UserWaitTime.length == 1) {
                    var waitingTime = ParkedCar[ParkedCar.length - 1].UserWaitTime[0];
                    var a = { "TimeStatus": "0", "message": `${waitingTime}`, "status": `${HTTP.SUCCESS}` }
                    res.status(HTTP.SUCCESS).json(a);
                } else if (ParkedCar[ParkedCar.length - 1].status == 'Accepted') {
                    const originalDateString = ParkedCar[ParkedCar.length - 1].UserWaitTime[1];
                    const originalDate = new Date(originalDateString);

                    const year = originalDate.getFullYear();
                    const month = String(originalDate.getMonth() + 1).padStart(2, '0');
                    const day = String(originalDate.getDate()).padStart(2, '0');
                    const hours = String(originalDate.getHours()).padStart(2, '0');
                    const minutes = String(originalDate.getMinutes()).padStart(2, '0');
                    const seconds = String(originalDate.getSeconds()).padStart(2, '0');

                    const inputDateStringOfficial = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

                    const currentDate = new Date();
                    const inputDateStringOfficial2 = currentDate.toISOString().slice(0, 19).replace("T", " ");;

                    const date1 = new Date(inputDateStringOfficial);
                    const date2 = new Date(inputDateStringOfficial2);

                    const timeDifferenceInMilliseconds = date1 - date2;

                    var waitingTime = timeDifferenceInMilliseconds / 1000;

                    if (waitingTime < 0) {
                        waitingTime = 0;
                    }

                    var a = { "TimeStatus": "1", "message": `${waitingTime}`, "status": `${HTTP.SUCCESS}` }
                    res.status(HTTP.SUCCESS).json(a);
                } else {
                    var waitingTime = ParkedCar[ParkedCar.length - 1].UserWaitTime[2];
                    var a = { "TimeStatus": "0", "message": `${waitingTime}`, "status": `${HTTP.SUCCESS}` }
                    res.status(HTTP.SUCCESS).json(a);
                }

            } else {

                const postData = {
                    UserName: req.body.UserName
                };

                async function myAsyncFunction() {
                    try {
                        const response = await axios.post(`${Ip}/WaitTime`, postData);
                        const data = response.data;
                        return data;
                    } catch (error) {
                        console.error("An error occurred:", error);
                        throw error;
                    }
                }

                const response = await myAsyncFunction();

                res.status(HTTP.SUCCESS).json(response);

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    // static o = async (req, res) => {
    //     try {
    //         var User = await Todo.find({})
    //         var message = { "data": User, "status": `${HTTP.SUCCESS}` }
    //         res.status(HTTP.SUCCESS).json({ message });
    //     } catch (e) {
    //         console.log(e);
    //         var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
    //         res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
    //     }
    // };
    // static p = async (req, res) => {
    //     try {
    //         var User = await Todo2.find({})
    //         var message = { "message": "Data Load Successfully", "data": User, "status": `${HTTP.SUCCESS}` }
    //         res.status(HTTP.SUCCESS).json(message);
    //     } catch (e) {
    //         console.log(e);
    //         var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
    //         res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
    //     }
    // };
    static p = async (req, res) => {
        try {
            res.render("Login");
        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static q = async (req, res) => {
        try {

            var User = await Todo3.findOne({ Username: req.body.UsernameEmail });

            if (!User) {
                var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                res.status(HTTP.NOT_FOUND).json(a);
            } else {

                var Password = await User.PassWord;

                var Passwordmatch = await bcrypt.compare(req.body.password, Password);

                if (Passwordmatch) {

                    var signuptoken = await jwt.sign({ username: req.body.UsernameEmail }, SECRET_KEY);

                    var sessionstore = req.session;
                    sessionstore.userid = signuptoken;
                    sessionstore.save();

                    console.log(sessionstore);

                    User.signuptoken = await signuptoken;
                    await User.save();

                    var a = '';
                    var conditionMet = false;

                    if (User.Access1 == 1 && !conditionMet) {
                        var a = 'DashBoard';
                        conditionMet = true;
                    } else if (User.Access2 == 1 && !conditionMet) {
                        var a = 'User';
                        conditionMet = true;
                    } else if (User.Access3 == 1 && !conditionMet) {
                        var a = 'Customer';
                        conditionMet = true;
                    } else if (User.Access5 == 1 && !conditionMet) {
                        var a = 'Parking';
                        conditionMet = true;
                    } else if (User.Access7 == 1 && !conditionMet) {
                        var a = 'Hotel';
                        conditionMet = true;
                    } else if (User.Access9 == 1 && !conditionMet) {
                        var a = 'Restaurant';
                        conditionMet = true;
                    } else if (User.Access11 == 1 && !conditionMet) {
                        var a = 'Mall';
                        conditionMet = true;
                    } else if (User.Access13 == 1 && !conditionMet) {
                        var a = 'Other';
                        conditionMet = true;
                    } else {
                        var a = 'Payment';
                    }

                    var message2 = { "message": "Data Load Successfully", "data": `${a}`, "status": `${HTTP.SUCCESS}` }
                    res.status(HTTP.SUCCESS).json(message2);

                } else {
                    var a = { "message": "Wrong PassWord", "status": `${HTTP.UNAUTHORIZED}` }
                    res.status(HTTP.UNAUTHORIZED).json(a);
                }

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static r = async (req, res) => {
        try {

            req.session.destroy();
            res.redirect('/Login');

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static s = async (req, res) => {
        try {

            if (req.session.userid) {

                var User2 = await Todo3.findOne({ signuptoken: req.session.userid });

                var Access1 = await User2.Access1;
                var Access2 = await User2.Access2;
                var Access3 = await User2.Access3;
                var Access4 = await User2.Access4;
                var Access5 = await User2.Access5;
                var Access6 = await User2.Access6;
                var Access7 = await User2.Access7;
                var Access8 = await User2.Access8;
                var Access9 = await User2.Access9;
                var Access10 = await User2.Access10;
                var Access11 = await User2.Access11;
                var Access12 = await User2.Access12;
                var Access13 = await User2.Access13;
                var Access14 = await User2.Access14;
                var Access15 = await User2.Access15;
                var Access16 = await User2.Access16;

                res.render("First", { User2, Access1, Access2, Access3, Access4, Access5, Access6, Access7, Access8, Access9, Access10, Access11, Access12, Access13, Access14, Access15, Access16 });

            } else {

                res.redirect('/Login');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static t = async (req, res) => {
        try {

            if (req.session.userid) {

                var User = await Todo3.find({});

                var User2 = await Todo3.findOne({ signuptoken: req.session.userid });

                var Access1 = await User2.Access1;
                var Access2 = await User2.Access2;
                var Access3 = await User2.Access3;
                var Access4 = await User2.Access4;
                var Access5 = await User2.Access5;
                var Access6 = await User2.Access6;
                var Access7 = await User2.Access7;
                var Access8 = await User2.Access8;
                var Access9 = await User2.Access9;
                var Access10 = await User2.Access10;
                var Access11 = await User2.Access11;
                var Access12 = await User2.Access12;
                var Access13 = await User2.Access13;
                var Access14 = await User2.Access14;
                var Access15 = await User2.Access15;
                var Access16 = await User2.Access16;

                res.render("User", { User2, User, Ip, Access1, Access2, Access3, Access4, Access5, Access6, Access7, Access8, Access9, Access10, Access11, Access12, Access13, Access14, Access15, Access16 });

            } else {

                res.redirect('/Login');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static u = async (req, res) => {
        try {

            if (req.session.userid) {

                const hashedPassword = await bcrypt.hash(req.body.Password, 12);

                if (req.body.Country) {
                    var Country = await req.body.Country.toUpperCase();
                } else {
                    var Country = "INDIA";
                }

                const formattedNumber = await formatPhoneNumber(req.body.PhoneNumber, Country);

                const data = new Todo3({
                    Name: req.body.Name,
                    Phone: formattedNumber,
                    Username: req.body.UserName,
                    PassWord: hashedPassword,
                    Access1: req.body.BusinessRegistration,
                    Access2: req.body.User,
                    Access3: req.body.ParkingView,
                    Access4: req.body.ParkingEdit,
                    Access5: req.body.CustomerView,
                    Access6: req.body.CustomerEdit,
                    Access7: req.body.HotelView,
                    Access8: req.body.HotelEdit,
                    Access9: req.body.RestaurantView,
                    Access10: req.body.RestaurantEdit,
                    Access11: req.body.ShoppingMallView,
                    Access12: req.body.ShoppigMallEdit,
                    Access13: req.body.OtherView,
                    Access14: req.body.OtherEdit,
                    Access15: req.body.PaymentView,
                    Access16: req.body.PaymentEdit,
                });

                await data.save();

                const response = { "message": "Admin Panel User Account Create Successfully", "status": HTTP.SUCCESS };
                res.status(HTTP.SUCCESS).json(response);

            } else {

                res.redirect('/Login');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static v = async (req, res) => {
        try {

            if (req.session.userid) {

                var User = await Todo.find({});

                var User2 = await Todo3.findOne({ signuptoken: req.session.userid });

                var Access1 = await User2.Access1;
                var Access2 = await User2.Access2;
                var Access3 = await User2.Access3;
                var Access4 = await User2.Access4;
                var Access5 = await User2.Access5;
                var Access6 = await User2.Access6;
                var Access7 = await User2.Access7;
                var Access8 = await User2.Access8;
                var Access9 = await User2.Access9;
                var Access10 = await User2.Access10;
                var Access11 = await User2.Access11;
                var Access12 = await User2.Access12;
                var Access13 = await User2.Access13;
                var Access14 = await User2.Access14;
                var Access15 = await User2.Access15;
                var Access16 = await User2.Access16;

                var exampleValue = 1;

                res.render("Customer", { User2, User, Ip, Access1, Access2, Access3, Access4, Access5, Access6, Access7, Access8, Access9, Access10, Access11, Access12, Access13, Access14, Access15, exampleValue, Access16 });

            } else {

                res.redirect('/Login');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static w = async (req, res) => {
        try {

            if (req.session.userid) {

                if (req.params.id1.indexOf('0') !== -1) {
                    var Name = await req.params.id1.slice(0, -1);
                }

                if (Name) {
                    var User = await Todo.find({ UserName: Name });
                } else {
                    var User = await Todo.find({});
                }

                var User2 = await Todo3.findOne({ signuptoken: req.session.userid });

                var Access1 = await User2.Access1;
                var Access2 = await User2.Access2;
                var Access3 = await User2.Access3;
                var Access4 = await User2.Access4;
                var Access5 = await User2.Access5;
                var Access6 = await User2.Access6;
                var Access7 = await User2.Access7;
                var Access8 = await User2.Access8;
                var Access9 = await User2.Access9;
                var Access10 = await User2.Access10;
                var Access11 = await User2.Access11;
                var Access12 = await User2.Access12;
                var Access13 = await User2.Access13;
                var Access14 = await User2.Access14;
                var Access15 = await User2.Access15;
                var Access16 = await User2.Access16;

                res.render("Customer", { User2, User, Ip, Access1, Access2, Access3, Access4, Access5, Access6, Access7, Access8, Access9, Access10, Access11, Access12, Access13, Access14, Access15, Access16 });

            } else {

                res.redirect('/Login');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static v2 = async (req, res) => {
        try {

            if (req.session.userid) {

                var UpdatedUserIndex = await Number(req.body.ClassValue);

                var User = await Todo.find({});

                if (User[UpdatedUserIndex].Request == 0) {
                    User[UpdatedUserIndex].Request = await 1
                } else {
                    User[UpdatedUserIndex].Request = await 0
                }

                await User[UpdatedUserIndex].save();

                const response = { "message": "Data Modified", "status": HTTP.SUCCESS };
                res.status(HTTP.SUCCESS).json(response);

            } else {

                res.redirect('/Login');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static w2 = async (req, res) => {
        try {

            if (req.session.userid) {

                var UpdatedUserIndex = await Number(req.body.ClassValue);

                var User = await Todo.find({});

                if (User[UpdatedUserIndex].Request == 0) {
                    User[UpdatedUserIndex].Request = await 1
                } else {
                    User[UpdatedUserIndex].Request = await 0
                }

                await User[UpdatedUserIndex].save();

                const response = { "message": "Data Modified", "status": HTTP.SUCCESS };
                res.status(HTTP.SUCCESS).json(response);

            } else {

                res.redirect('/Login');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static x = async (req, res) => {
        try {

            if (req.session.userid) {

                var a = [];

                var User = await Todo2.find({});

                for (var i = 0; i < User.length; i++) {

                    var User2 = await Todo4.find({ Parklocation: User[i].UnitName, status: "Parked" });
                    var b = {
                        "UserName": User[i].UnitName,
                        "Parked": await User2.length,
                    }
                    await a.push(b);
                }

                var User2 = await Todo3.findOne({ signuptoken: req.session.userid });

                var Access1 = await User2.Access1;
                var Access2 = await User2.Access2;
                var Access3 = await User2.Access3;
                var Access4 = await User2.Access4;
                var Access5 = await User2.Access5;
                var Access6 = await User2.Access6;
                var Access7 = await User2.Access7;
                var Access8 = await User2.Access8;
                var Access9 = await User2.Access9;
                var Access10 = await User2.Access10;
                var Access11 = await User2.Access11;
                var Access12 = await User2.Access12;
                var Access13 = await User2.Access13;
                var Access14 = await User2.Access14;
                var Access15 = await User2.Access15;
                var Access16 = await User2.Access16;

                const currentDate = new Date();
                const year = currentDate.getFullYear();
                const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                const day = String(currentDate.getDate()).padStart(2, '0');

                const formattedDateTime = `${year}-${month}-${day}`;

                res.render("Parking", { User2, a, Ip, Access1, Access2, Access3, Access4, Access5, Access6, Access7, Access8, Access9, Access10, Access11, Access12, Access13, Access14, Access15, formattedDateTime, Access16 });

            } else {

                res.redirect('/Login');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static y = async (req, res) => {

        try {

            if (req.session.userid) {

                var a = [];

                if (req.params.id1.indexOf('0') !== -1) {
                    var City = await req.params.id1.slice(0, -1).toUpperCase();
                }

                if (req.params.id2.indexOf('0') !== -1) {
                    var State = await req.params.id2.slice(0, -1).toUpperCase();
                }

                if (req.params.id3.indexOf('0') !== -1) {
                    var Name = await req.params.id3.slice(0, -1);
                }

                if (City && State && Name) {
                    var User = await Todo2.find({ City: City, State: State, UnitName: Name });
                } else if (State && Name) {
                    var User = await Todo2.find({ UnitName: Name, State: State });
                } else if (City && Name) {
                    var User = await Todo2.find({ City: City, UnitName: Name });
                } else if (City && State) {
                    var User = await Todo2.find({ City: City, State: State });
                } else if (City) {
                    var User = await Todo2.find({ City: City });
                } else if (State) {
                    var User = await Todo2.find({ State: State });
                } else if (Name) {
                    var User = await Todo2.find({ UnitName: Name });
                } else {
                    var User = await Todo2.find({});
                }

                const currentDate = new Date();

                const year = currentDate.getFullYear();
                const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                const day = String(currentDate.getDate()).padStart(2, '0');

                const formattedDateTime = `${year}-${month}-${day}`;

                // if (req.params.id4 == "All") {

                //     for (var i = 0; i < User.length; i++) {
                //         var User2 = await Todo4.find({ Parklocation: User[i].UnitName, status: "Parked" });
                //         var b = {
                //             "UserName": User[i].UnitName,
                //             "Parked": await User2.length,
                //         }
                //         await a.push(b);
                //     }

                // } else if (req.params.id4 == formattedDateTime) {

                //     // for (var i = 0; i < User.length; i++) {

                //     //     var User2 = await Todo4.find({ Parklocation: User[i].UnitName, status: "Parked" });

                //     //     var User3 = [];

                //     //     for (var j = 0; j < User2.length; j++) {

                //     //         var dateObject = new Date(User2[j].ParkInTime);

                //     //         var year2 = dateObject.getFullYear();
                //     //         var month2 = (dateObject.getMonth() + 1).toString().padStart(2, '0');
                //     //         var day2 = dateObject.getDate().toString().padStart(2, '0');

                //     //         var formattedDateString = `${year2}-${month2}-${day2}`;

                //     //         if (formattedDateTime == formattedDateString) {
                //     //             await User3.push(User2[j]);
                //     //         }

                //     //     }

                //     //     var b = {
                //     //         "UserName": User[i].UnitName,
                //     //         "Parked": await User3.length,
                //     //     }

                //     //     await a.push(b);

                //     // }

                // } else {

                //     // for (var i = 0; i < User.length; i++) {

                //     //     var User2 = await Todo4.find({ Parklocation: User[i].UnitName, status: "Deliver" });

                //     //     var User3 = [];

                //     //     for (var j = 0; j < User2.length; j++) {

                //     //         var dateObject = new Date(User2[j].ParkInTime);

                //     //         var year2 = dateObject.getFullYear();
                //     //         var month2 = (dateObject.getMonth() + 1).toString().padStart(2, '0');
                //     //         var day2 = dateObject.getDate().toString().padStart(2, '0');

                //     //         var formattedDateString = `${year2}-${month2}-${day2}`;

                //     //         if (req.params.id4 == formattedDateString) {
                //     //             await User3.push(User2[j]);
                //     //         }

                //     //     }

                //     //     var b = {
                //     //         "UserName": User[i].UnitName,
                //     //         "Parked": await User3.length,
                //     //     }

                //     //     await a.push(b);

                //     // }

                // }


                if (req.params.id4 == "All") {

                    for (var i = 0; i < User.length; i++) {
                        var User2 = await Todo4.find({ Parklocation: User[i].UnitName, status: "Parked" });
                        var b = {
                            "UserName": User[i].UnitName,
                            "Parked": await User2.length,
                        }
                        await a.push(b);
                    }

                } else if (req.params.id5 == formattedDateTime) {

                    for (var i = 0; i < User.length; i++) {

                        var User3 = [];

                        var User2 = await Todo4.find({ Parklocation: User[i].UnitName, status: "Deliver" });

                        for (var j = 0; j < User2.length; j++) {

                            var dateObject = new Date(User2[j].ParkInTime);

                            var year2 = dateObject.getFullYear();
                            var month2 = (dateObject.getMonth() + 1).toString().padStart(2, '0');
                            var day2 = dateObject.getDate().toString().padStart(2, '0');

                            var formattedDateString = `${year2}-${month2}-${day2}`;

                            function isDateInRange(dateToCheck, startDate, endDate) {
                                return dateToCheck >= startDate && dateToCheck <= endDate;
                            }

                            if (isDateInRange(formattedDateString, req.params.id4, req.params.id5)) {
                                await User3.push(User2[j]);
                            }

                        }

                        var User22 = await Todo4.find({ Parklocation: User[i].UnitName, status: "Parked" });

                        for (var j = 0; j < User22.length; j++) {

                            const dateObject2 = new Date(formattedDateTime);

                            const year2 = dateObject2.getFullYear();
                            const month2 = String(dateObject2.getMonth() + 1).padStart(2, '0');
                            const day2 = String(dateObject2.getDate()).padStart(2, '0');

                            const formattedDateString2 = `${year2}-${month2}-${day2}`;

                            if (formattedDateString2 == formattedDateTime) {

                                await User3.push(User22[j]);

                            }

                        }

                        var b = {
                            "UserName": User[i].UnitName,
                            "Parked": await User3.length,
                        }

                        await a.push(b);

                    }

                } else {

                    for (var i = 0; i < User.length; i++) {

                        var User2 = await Todo4.find({ Parklocation: User[i].UnitName, status: "Deliver" });

                        var User3 = [];

                        for (var j = 0; j < User2.length; j++) {

                            var dateObject = new Date(User2[j].ParkInTime);

                            var year2 = dateObject.getFullYear();
                            var month2 = (dateObject.getMonth() + 1).toString().padStart(2, '0');
                            var day2 = dateObject.getDate().toString().padStart(2, '0');

                            var formattedDateString = `${year2}-${month2}-${day2}`;

                            function isDateInRange(dateToCheck, startDate, endDate) {
                                return dateToCheck >= startDate && dateToCheck <= endDate;
                            }

                            if (isDateInRange(formattedDateString, req.params.id4, req.params.id5)) {
                                await User3.push(User2[j]);
                            }

                        }

                        var b = {
                            "UserName": User[i].UnitName,
                            "Parked": await User3.length,
                        }

                        await a.push(b);

                    }

                }

                var User2 = await Todo3.findOne({ signuptoken: req.session.userid });

                var Access1 = await User2.Access1;
                var Access2 = await User2.Access2;
                var Access3 = await User2.Access3;
                var Access4 = await User2.Access4;
                var Access5 = await User2.Access5;
                var Access6 = await User2.Access6;
                var Access7 = await User2.Access7;
                var Access8 = await User2.Access8;
                var Access9 = await User2.Access9;
                var Access10 = await User2.Access10;
                var Access11 = await User2.Access11;
                var Access12 = await User2.Access12;
                var Access13 = await User2.Access13;
                var Access14 = await User2.Access14;
                var Access15 = await User2.Access15;
                var Access16 = await User2.Access16;

                res.render("Parking", { User2, a, Ip, Access1, Access2, Access3, Access4, Access5, Access6, Access7, Access8, Access9, Access10, Access11, Access12, Access13, Access14, Access15, formattedDateTime, Access16 });

            } else {

                res.redirect('/Login');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static z = async (req, res) => {
        try {

            if (req.session.userid) {

                var User = await Todo2.find({ UnitType: "HOTEL" });

                var User2 = await Todo3.findOne({ signuptoken: req.session.userid });

                var Access1 = await User2.Access1;
                var Access2 = await User2.Access2;
                var Access3 = await User2.Access3;
                var Access4 = await User2.Access4;
                var Access5 = await User2.Access5;
                var Access6 = await User2.Access6;
                var Access7 = await User2.Access7;
                var Access8 = await User2.Access8;
                var Access9 = await User2.Access9;
                var Access10 = await User2.Access10;
                var Access11 = await User2.Access11;
                var Access12 = await User2.Access12;
                var Access13 = await User2.Access13;
                var Access14 = await User2.Access14;
                var Access15 = await User2.Access15;
                var Access16 = await User2.Access16;

                res.render("Hotel", { User2, User, Ip, Access1, Access2, Access3, Access4, Access5, Access6, Access7, Access8, Access9, Access10, Access11, Access12, Access13, Access14, Access15, Access16 });

            } else {

                res.redirect('/Login');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static A = async (req, res) => {
        try {

            if (req.session.userid) {

                if (req.params.id1.indexOf('0') !== -1) {
                    var City = await req.params.id1.slice(0, -1).toUpperCase();
                }

                if (req.params.id2.indexOf('0') !== -1) {
                    var State = await req.params.id2.slice(0, -1).toUpperCase();
                }

                if (City && State) {
                    var User3 = await Todo2.find({ UnitType: "Hotel", City: City, State: State });
                } else if (City) {
                    var User3 = await Todo2.find({ UnitType: "Hotel", City: City });
                } else if (State) {
                    var User3 = await Todo2.find({ UnitType: "Hotel", State: State });
                } else {
                    var User3 = await Todo2.find({ UnitType: "Hotel" });
                }

                if (req.params.id3 == "All") {
                    var User = await User3;
                } else {

                    var User = [];

                    for (var i = 0; i < User3.length; i++) {

                        if (User3[i].AccountCreateDate < req.params.id3) {
                            await User.push(User3[i])
                        }

                    }

                }

                var User2 = await Todo3.findOne({ signuptoken: req.session.userid });

                var Access1 = await User2.Access1;
                var Access2 = await User2.Access2;
                var Access3 = await User2.Access3;
                var Access4 = await User2.Access4;
                var Access5 = await User2.Access5;
                var Access6 = await User2.Access6;
                var Access7 = await User2.Access7;
                var Access8 = await User2.Access8;
                var Access9 = await User2.Access9;
                var Access10 = await User2.Access10;
                var Access11 = await User2.Access11;
                var Access12 = await User2.Access12;
                var Access13 = await User2.Access13;
                var Access14 = await User2.Access14;
                var Access15 = await User2.Access15;
                var Access16 = await User2.Access16;

                res.render("Hotel", { User2, User, Ip, Access1, Access2, Access3, Access4, Access5, Access6, Access7, Access8, Access9, Access10, Access11, Access12, Access13, Access14, Access15, Access16 });

            } else {

                res.redirect('/Login');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static B = async (req, res) => {
        try {

            if (req.session.userid) {

                var User = await Todo2.find({ UnitType: "RESTAURANT" });

                var User2 = await Todo3.findOne({ signuptoken: req.session.userid });

                var Access1 = await User2.Access1;
                var Access2 = await User2.Access2;
                var Access3 = await User2.Access3;
                var Access4 = await User2.Access4;
                var Access5 = await User2.Access5;
                var Access6 = await User2.Access6;
                var Access7 = await User2.Access7;
                var Access8 = await User2.Access8;
                var Access9 = await User2.Access9;
                var Access10 = await User2.Access10;
                var Access11 = await User2.Access11;
                var Access12 = await User2.Access12;
                var Access13 = await User2.Access13;
                var Access14 = await User2.Access14;
                var Access15 = await User2.Access15;
                var Access16 = await User2.Access16;

                res.render("Restaurant", { User2, User, Ip, Access1, Access2, Access3, Access4, Access5, Access6, Access7, Access8, Access9, Access10, Access11, Access12, Access13, Access14, Access15, Access16 });

            } else {

                res.redirect('/Login');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static C = async (req, res) => {
        try {

            if (req.session.userid) {

                if (req.params.id1.indexOf('0') !== -1) {
                    var City = await req.params.id1.slice(0, -1).toUpperCase();
                }

                if (req.params.id2.indexOf('0') !== -1) {
                    var State = await req.params.id2.slice(0, -1).toUpperCase();
                }

                if (City && State) {
                    var User3 = await Todo2.find({ UnitType: "Restaurant", City: City, State: State });
                } else if (City) {
                    var User3 = await Todo2.find({ UnitType: "Restaurant", City: City });
                } else if (State) {
                    var User3 = await Todo2.find({ UnitType: "Restaurant", State: State });
                } else {
                    var User3 = await Todo2.find({ UnitType: "Restaurant" });
                }

                if (req.params.id3 == "All") {
                    var User = await User3;
                } else {

                    var User = [];

                    for (var i = 0; i < User3.length; i++) {

                        if (User3[i].AccountCreateDate < req.params.id3) {
                            await User.push(User3[i])
                        }

                    }

                }

                var User2 = await Todo3.findOne({ signuptoken: req.session.userid });

                var Access1 = await User2.Access1;
                var Access2 = await User2.Access2;
                var Access3 = await User2.Access3;
                var Access4 = await User2.Access4;
                var Access5 = await User2.Access5;
                var Access6 = await User2.Access6;
                var Access7 = await User2.Access7;
                var Access8 = await User2.Access8;
                var Access9 = await User2.Access9;
                var Access10 = await User2.Access10;
                var Access11 = await User2.Access11;
                var Access12 = await User2.Access12;
                var Access13 = await User2.Access13;
                var Access14 = await User2.Access14;
                var Access15 = await User2.Access15;
                var Access16 = await User2.Access16;

                res.render("Restaurant", { User2, User, Ip, Access1, Access2, Access3, Access4, Access5, Access6, Access7, Access8, Access9, Access10, Access11, Access12, Access13, Access14, Access15, Access16 });

            } else {

                res.redirect('/Login');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static D = async (req, res) => {
        try {

            if (req.session.userid) {

                var User = await Todo2.find({ UnitType: "MALL" });

                var User2 = await Todo3.findOne({ signuptoken: req.session.userid });

                var Access1 = await User2.Access1;
                var Access2 = await User2.Access2;
                var Access3 = await User2.Access3;
                var Access4 = await User2.Access4;
                var Access5 = await User2.Access5;
                var Access6 = await User2.Access6;
                var Access7 = await User2.Access7;
                var Access8 = await User2.Access8;
                var Access9 = await User2.Access9;
                var Access10 = await User2.Access10;
                var Access11 = await User2.Access11;
                var Access12 = await User2.Access12;
                var Access13 = await User2.Access13;
                var Access14 = await User2.Access14;
                var Access15 = await User2.Access15;
                var Access16 = await User2.Access16;

                res.render("Mall", { User2, User, Ip, Access1, Access2, Access3, Access4, Access5, Access6, Access7, Access8, Access9, Access10, Access11, Access12, Access13, Access14, Access15, Access16 });

            } else {

                res.redirect('/Login');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static E = async (req, res) => {
        try {

            if (req.session.userid) {

                if (req.params.id1.indexOf('0') !== -1) {
                    var City = await req.params.id1.slice(0, -1).toUpperCase();
                }

                if (req.params.id2.indexOf('0') !== -1) {
                    var State = await req.params.id2.slice(0, -1).toUpperCase();
                }

                if (City && State) {
                    var User3 = await Todo2.find({ UnitType: "Mall", City: City, State: State });
                } else if (City) {
                    var User3 = await Todo2.find({ UnitType: "Mall", City: City });
                } else if (State) {
                    var User3 = await Todo2.find({ UnitType: "Mall", State: State });
                } else {
                    var User3 = await Todo2.find({ UnitType: "Mall" });
                }

                if (req.params.id3 == "All") {
                    var User = await User3;
                } else {

                    var User = [];

                    for (var i = 0; i < User3.length; i++) {

                        if (User3[i].AccountCreateDate < req.params.id3) {
                            await User.push(User3[i])
                        }

                    }

                }

                var User2 = await Todo3.findOne({ signuptoken: req.session.userid });

                var Access1 = await User2.Access1;
                var Access2 = await User2.Access2;
                var Access3 = await User2.Access3;
                var Access4 = await User2.Access4;
                var Access5 = await User2.Access5;
                var Access6 = await User2.Access6;
                var Access7 = await User2.Access7;
                var Access8 = await User2.Access8;
                var Access9 = await User2.Access9;
                var Access10 = await User2.Access10;
                var Access11 = await User2.Access11;
                var Access12 = await User2.Access12;
                var Access13 = await User2.Access13;
                var Access14 = await User2.Access14;
                var Access15 = await User2.Access15;
                var Access16 = await User2.Access16;

                res.render("Mall", { User2, User, Ip, Access1, Access2, Access3, Access4, Access5, Access6, Access7, Access8, Access9, Access10, Access11, Access12, Access13, Access14, Access15, Access16 });

            } else {

                res.redirect('/Login');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static F = async (req, res) => {
        try {

            if (req.session.userid) {

                var filteredArray = ["HOTEL", "RESTAURANT", "MALL"];

                var User = await Todo2.find({ UnitType: { $nin: filteredArray } });

                var User2 = await Todo3.findOne({ signuptoken: req.session.userid });

                var Access1 = await User2.Access1;
                var Access2 = await User2.Access2;
                var Access3 = await User2.Access3;
                var Access4 = await User2.Access4;
                var Access5 = await User2.Access5;
                var Access6 = await User2.Access6;
                var Access7 = await User2.Access7;
                var Access8 = await User2.Access8;
                var Access9 = await User2.Access9;
                var Access10 = await User2.Access10;
                var Access11 = await User2.Access11;
                var Access12 = await User2.Access12;
                var Access13 = await User2.Access13;
                var Access14 = await User2.Access14;
                var Access15 = await User2.Access15;
                var Access16 = await User2.Access16;

                res.render("Other", { User2, User, Ip, Access1, Access2, Access3, Access4, Access5, Access6, Access7, Access8, Access9, Access10, Access11, Access12, Access13, Access14, Access15, Access16 });

            } else {

                res.redirect('/Login');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static G = async (req, res) => {
        try {

            if (req.session.userid) {

                if (req.params.id1.indexOf('0') !== -1) {
                    var City = await req.params.id1.slice(0, -1).toUpperCase();
                }

                if (req.params.id2.indexOf('0') !== -1) {
                    var State = await req.params.id2.slice(0, -1).toUpperCase();
                }

                var filteredArray = ["HOTEL", "RESTAURANT", "MALL"];

                if (City && State) {
                    var User3 = await Todo2.find({ UnitType: { $nin: filteredArray }, City: City, State: State });
                } else if (City) {
                    var User3 = await Todo2.find({ UnitType: { $nin: filteredArray }, City: City });
                } else if (State) {
                    var User3 = await Todo2.find({ UnitType: { $nin: filteredArray }, State: State });
                } else {
                    var User3 = await Todo2.find({ UnitType: { $nin: filteredArray } });
                }

                if (req.params.id3 == "All") {
                    var User = await User3;
                } else {

                    var User = [];

                    for (var i = 0; i < User3.length; i++) {

                        if (User3[i].AccountCreateDate <= req.params.id3) {
                            await User.push(User3[i])
                        }

                    }

                }

                var User2 = await Todo3.findOne({ signuptoken: req.session.userid });

                var Access1 = await User2.Access1;
                var Access2 = await User2.Access2;
                var Access3 = await User2.Access3;
                var Access4 = await User2.Access4;
                var Access5 = await User2.Access5;
                var Access6 = await User2.Access6;
                var Access7 = await User2.Access7;
                var Access8 = await User2.Access8;
                var Access9 = await User2.Access9;
                var Access10 = await User2.Access10;
                var Access11 = await User2.Access11;
                var Access12 = await User2.Access12;
                var Access13 = await User2.Access13;
                var Access14 = await User2.Access14;
                var Access15 = await User2.Access15;
                var Access16 = await User2.Access16;

                res.render("Other", { User2, User, Ip, Access1, Access2, Access3, Access4, Access5, Access6, Access7, Access8, Access9, Access10, Access11, Access12, Access13, Access14, Access15, Access16 });

            } else {

                res.redirect('/Login');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static H = async (req, res) => {
        try {

            var PetLogic3 = await Todo.findOne({ Phone: req.Phone })

            if (PetLogic3 && req.body.latitude && req.body.longitude) {

                const headerValue = req.get('Authorization');

                if (headerValue == PetLogic3.token) {

                    const data = await Todo2.find({});

                    function compareDates(inputDate, inputDate2) {

                        const inputDateTime = new Date(inputDate);
                        const inputDateTime2 = new Date(inputDate2);

                        const inputYear = inputDateTime.getFullYear();
                        const inputMonth = inputDateTime.getMonth() + 1;
                        const inputDay = inputDateTime.getDate();

                        const inputYear2 = inputDateTime2.getFullYear();
                        const inputMonth2 = inputDateTime2.getMonth() + 1;
                        const inputDay2 = inputDateTime2.getDate();

                        if (inputYear > inputYear2 || (inputYear === inputYear2 && inputMonth > inputMonth2) || (inputYear === inputYear2 && inputMonth === inputMonth2 && inputDay > inputDay2)) {
                            //   return "Future"
                            return 1
                        } else if (inputYear === inputYear2 && inputMonth === inputMonth2 && inputDay === inputDay2) {
                            //   return "Current"
                            return 0
                        } else {
                            //   return "Past"
                            return -1
                        }

                    }

                    const data2 = await Todo.find({ Phone: req.Phone });

                    const inputDateTime = await data2[0].PlanExpiredDate;

                    const inputDateTime2 = new Date();

                    const year = inputDateTime2.getFullYear();
                    const month = inputDateTime2.getMonth() + 1;
                    const day = inputDateTime2.getDate();

                    let inputDateTime3 = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

                    var a = await compareDates(inputDateTime, inputDateTime3);

                    var Data3
                    if (-1 < a) {
                        Data3 = 1;
                    } else {
                        Data3 = 0;
                    }

                    const transformedData = data.map(item => ({
                        _id: item._id.toString(),
                        UserName: item.UserName,
                        ManagerName: item.ManagerName,
                        ManagerDestination: item.ManagerDestination,
                        PassWord: item.PassWord,
                        UnitName: item.UnitName,
                        UnitType: item.UnitType,
                        UnitAddress: item.UnitAddress,
                        Profile: item.Profile,
                        Rating: item.Rating,
                        Review: item.Review,
                        location: {
                            latitude: parseFloat(item.latitude),
                            longitude: parseFloat(item.longitude)
                        },
                        __v: item.__v,
                        Active: Data3
                    }));

                    const targetLocation = req.body;

                    transformedData.forEach((element) => {
                        element.kilometer = geolib.getDistance(targetLocation, element.location) / 1000;
                    });

                    transformedData.sort((a, b) => a.kilometer - b.kilometer);

                    var DataArray = [];

                    for (var i = 0; i < transformedData.length; i++) {

                        if (transformedData[i].kilometer <= 2) {
                            await DataArray.push(transformedData[i]);
                        }
                    }

                    const message = { "data": DataArray, "status": `${HTTP.SUCCESS}`, "Active": Data3 }
                    res.status(HTTP.SUCCESS).json({ message });

                } else {
                    var a = { "message": "Token has expired", "status": `${HTTP.UNAUTHORIZED}` }
                    res.status(HTTP.UNAUTHORIZED).json(a);
                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static I = async (req, res) => {
        try {

            var PetLogic3 = await Todo.findOne({ Phone: req.Phone })

            if (PetLogic3 && req.body.latitude && req.body.longitude) {

                const headerValue = req.get('Authorization');

                if (headerValue == PetLogic3.token) {

                    const data = await Todo2.find({});

                    function compareDates(inputDate, inputDate2) {

                        const inputDateTime = new Date(inputDate);
                        const inputDateTime2 = new Date(inputDate2);

                        const inputYear = inputDateTime.getFullYear();
                        const inputMonth = inputDateTime.getMonth() + 1;
                        const inputDay = inputDateTime.getDate();

                        const inputYear2 = inputDateTime2.getFullYear();
                        const inputMonth2 = inputDateTime2.getMonth() + 1;
                        const inputDay2 = inputDateTime2.getDate();

                        if (inputYear > inputYear2 || (inputYear === inputYear2 && inputMonth > inputMonth2) || (inputYear === inputYear2 && inputMonth === inputMonth2 && inputDay > inputDay2)) {
                            //   return "Future"
                            return 1
                        } else if (inputYear === inputYear2 && inputMonth === inputMonth2 && inputDay === inputDay2) {
                            //   return "Current"
                            return 0
                        } else {
                            //   return "Past"
                            return -1
                        }

                    }

                    const data2 = await Todo.find({ Phone: req.Phone });

                    const inputDateTime = await data2[0].PlanExpiredDate;

                    const inputDateTime2 = new Date();

                    const year = inputDateTime2.getFullYear();
                    const month = inputDateTime2.getMonth() + 1;
                    const day = inputDateTime2.getDate();

                    let inputDateTime3 = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

                    var a = await compareDates(inputDateTime, inputDateTime3);

                    var Data3
                    if (-1 < a) {
                        Data3 = 1;
                    } else {
                        Data3 = 0;
                    }

                    const transformedData = data.map(item => ({
                        _id: item._id.toString(),
                        UserName: item.UserName,
                        ManagerName: item.ManagerName,
                        ManagerDestination: item.ManagerDestination,
                        PassWord: item.PassWord,
                        UnitName: item.UnitName,
                        UnitType: item.UnitType,
                        UnitAddress: item.UnitAddress,
                        Profile: item.Profile,
                        Rating: item.Rating,
                        Review: item.Review,
                        Country: item.Country,
                        location: {
                            latitude: parseFloat(item.latitude),
                            longitude: parseFloat(item.longitude)
                        },
                        __v: item.__v,
                        Active: Data3
                    }));

                    const targetLocation = req.body;

                    transformedData.forEach((element) => {

                        if (element.Country !== "INDIA") {
                            element.kilometer = geolib.getDistance(targetLocation, element.location) / 1609.34;
                            element.Distance = element.kilometer.toFixed(2) + " Miles";
                        } else {
                            element.kilometer = geolib.getDistance(targetLocation, element.location) / 1000;
                            element.Distance = element.kilometer.toFixed(2) + " KM";
                        }
                    });

                    var DataArray = [];

                    for (var i = 0; i < transformedData.length; i++) {

                        if (transformedData[i].kilometer <= 100) {

                            if (0 < transformedData[i].kilometer) {
                                await DataArray.push(transformedData[i]);
                            }
                        }
                    }

                    transformedData.sort((a, b) => a.kilometer - b.kilometer);

                    const message = { "data": DataArray, "status": `${HTTP.SUCCESS}`, "Active": Data3 }
                    res.status(HTTP.SUCCESS).json({ message });

                } else {
                    var a = { "message": "Token has expired", "status": `${HTTP.UNAUTHORIZED}` }
                    res.status(HTTP.UNAUTHORIZED).json(a);
                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static J = async (req, res) => {
        try {

            if (req.UserName) {

                var ValetData = await Todo8.findOne({ Username: req.UserName })

                var BusinessData = await Todo2.findOne({ UnitName: ValetData.BusinessUnitName });

                var User = await Todo4.find({ status: "Requested", Parklocation: BusinessData.UnitName })

                // var User = await Todo4.find({ status: "Requested" })

                var SendData = [];
                var SendData2 = [];

                for (var i = 0; i < User.length; i++) {

                    var User2 = await Todo2.find({ UnitName: User[i].Parklocation });

                    const postData = {
                        RegistrationNumber: User[i].RegistrationNumber,
                        UserName: User2[0].UserName
                    };

                    async function myAsyncFunction() {
                        try {
                            const response = await axios.post(`${Ip}/UserWaitTime`, postData);
                            const data = response.data.message;
                            return data;
                        } catch (error) {
                            console.error("An error occurred:", error);
                            throw error;
                        }
                    }

                    const result = await myAsyncFunction();

                    var UserData = await User[i].Member[0];
                    var UserOfficial = await Todo.find({ UserName: UserData });

                    if (User[i].RegistrationNumber == UserOfficial[0].VehicleDetail[0].RegistrationNumber) {
                        var CarPictureofficial = await UserOfficial[0].VehicleDetail[0].Picture;
                        User[i].CarPictureofficial = CarPictureofficial;
                    } else {
                        var CarPictureofficial = await UserOfficial[0].VehicleDetail[1].Picture;
                        User[i].CarPictureofficial = CarPictureofficial;
                    }

                    User[i].WaitTime = result;
                    // User[i].UpdatedParklocation = result;
                    User[i].Request = await UserOfficial[0].Request;
                    await User[i].save();

                    if (User[i].Request == 1) {
                        await SendData.push(User[i]);
                    } else {
                        await SendData2.push(User[i]);
                    }

                }

                var SendData3 = await SendData.reverse();
                var SendData4 = await SendData2.reverse();

                var SendData5 = [];

                for (var i = 0; i < SendData3.length; i++) {
                    await SendData5.push(SendData3[i]);
                }

                for (var i = 0; i < SendData4.length; i++) {
                    await SendData5.push(SendData4[i]);
                }

                // const SendData3 = await SendData.sort((a, b) => b.Request - a.Request);

                var message = { "message": "Data Load Successfully", "data": SendData5, "status": `${HTTP.SUCCESS}` }
                res.status(HTTP.SUCCESS).json(message);

            } else {
                var a = { "message": "Please Choose Another Account Token", "status": `${HTTP.UNAUTHORIZED}` }
                res.status(HTTP.UNAUTHORIZED).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static K = async (req, res) => {
        try {

            if (req.UserName) {

                var ValetData = await Todo8.findOne({ Username: req.UserName })
                var BusinessData = await Todo2.findOne({ UnitName: ValetData.BusinessUnitName });

                var User2 = await Todo4.find({ status: "Accepted", Parklocation: BusinessData.UnitName })

                var SendData = [];

                for (var j = 0; j < User2.length; j++) {

                    var User3 = await Todo2.find({ UnitName: User2[j].Parklocation });

                    const postData = {
                        RegistrationNumber: User2[j].RegistrationNumber,
                        UserName: User3[0].UserName
                    };

                    async function myAsyncFunction() {
                        try {
                            const response = await axios.post(`${Ip}/UserWaitTime`, postData);
                            const data = response.data.message;
                            return data;
                        } catch (error) {
                            console.error("An error occurred:", error);
                            throw error;
                        }
                    }

                    const result = await myAsyncFunction();

                    const postData2 = {
                        RegistrationNumber: User2[j].RegistrationNumber
                    };

                    async function myAsyncFunction2() {
                        try {
                            const response = await axios.post(`${Ip}/NumberToMember`, postData2);
                            const data = response.data.message;
                            return data;
                        } catch (error) {
                            console.error("An error occurred:", error);
                            throw error;
                        }
                    }

                    const result2 = await myAsyncFunction2();

                    var UserData = await User2[j].Member[0];
                    var UserOfficial = await Todo.find({ UserName: UserData });

                    if (User2[j].RegistrationNumber == UserOfficial[0].VehicleDetail[0].RegistrationNumber) {
                        var CarPictureofficial = await UserOfficial[0].VehicleDetail[0].Picture;
                        User2[j].CarPictureofficial = CarPictureofficial;
                    } else {
                        var CarPictureofficial = await UserOfficial[0].VehicleDetail[1].Picture;
                        User2[j].CarPictureofficial = CarPictureofficial;
                    }

                    User2[j].WaitTime = result;
                    User2[j].Member = result2;
                    await User2[j].save();

                    await SendData.push(User2[j]);

                }

                var message = { "message": "Data Load Successfully", "data": SendData, "status": `${HTTP.SUCCESS}` }
                res.status(HTTP.SUCCESS).json(message);

            } else {
                var a = { "message": "Please Choose Another Account Token", "status": `${HTTP.UNAUTHORIZED}` }
                res.status(HTTP.UNAUTHORIZED).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static L = async (req, res) => {
        try {
            if (req.UserName) {
                var User = await Todo4.find({ RegistrationNumber: req.body.RegistrationNumber, status: "Requested" })
                var message = { "message": "Data Load Successfully", "data": User, "status": `${HTTP.SUCCESS}` }
                res.status(HTTP.SUCCESS).json(message);
            } else {
                var a = { "message": "Please Choose Another Account Token", "status": `${HTTP.UNAUTHORIZED}` }
                res.status(HTTP.UNAUTHORIZED).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };

    static M = async (req, res) => {
        try {
            if (req.Phone) {
                var User = await Todo.find({ Phone: req.Phone });
                var Vehicles = [];

                if (User[0].VehicleDetail) {

                    if (User[0].VehicleDetail[0]) {
                        await Vehicles.push(User[0].VehicleDetail[0].RegistrationNumber);
                    }

                    if (User[0].VehicleDetail[1]) {
                        await Vehicles.push(User[0].VehicleDetail[1].RegistrationNumber);
                    }
                }

                const filteredArray = Vehicles.filter((item) => {
                    return Boolean(item);
                });

                var User2 = await Todo4.find({ RegistrationNumber: { $in: filteredArray } })

                var User3 = await User2.reverse();

                var message2 = { "message": "Data Load Successfully", "data": User3, "status": `${HTTP.SUCCESS}` }
                res.status(HTTP.SUCCESS).json(message2);

            } else {
                var a = { "message": "Please Provide User Account Token", "status": `${HTTP.UNAUTHORIZED}` }
                res.status(HTTP.UNAUTHORIZED).json(a);
            }
        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static N = async (req, res) => {
        try {

            if (req.Phone) {

                var User = await Todo.find({ Phone: req.Phone });

                var Vehicles = [];

                if (User[0].VehicleDetail) {

                    if (User[0].VehicleDetail[0]) {


                        if (User[0].VehicleDetail[0].status.trim() !== "") {

                            var ParkedCar = await Todo4.find({ RegistrationNumber: User[0].VehicleDetail[0].RegistrationNumber });

                            if (!ParkedCar[ParkedCar.length - 1].WaitTime) {

                                var User2 = await Todo2.find({ UnitName: ParkedCar[ParkedCar.length - 1].Parklocation });

                                const postData = {
                                    RegistrationNumber: User[0].VehicleDetail[0].RegistrationNumber,
                                    UserName: User2[0].UserName,
                                };

                                const response = await axios.post(`${Ip}/UserWaitTime`, postData);
                                const data = response.data.message;

                                ParkedCar[ParkedCar.length - 1].WaitTime = data;

                                var User22 = await ParkedCar[ParkedCar.length - 1].CarParkBy;
                                var User222 = await Todo8.find({ Username: User22 });
                                var User2222 = await User222[0].Name;
                                ParkedCar[ParkedCar.length - 1].CarParkBy = User2222;

                            } else {

                                var User2 = await Todo2.find({ UnitName: ParkedCar[ParkedCar.length - 1].Parklocation });

                                const postData = {
                                    RegistrationNumber: User[0].VehicleDetail[0].RegistrationNumber,
                                    UserName: User2[0].UserName,
                                };

                                const response = await axios.post(`${Ip}/UserWaitTime`, postData);
                                const data = response.data.message;

                                ParkedCar[ParkedCar.length - 1].WaitTime = data;

                                var User22 = await ParkedCar[ParkedCar.length - 1].CarParkBy;
                                var User222 = await Todo8.find({ Username: User22 });
                                var User2222 = await User222[0].Name;
                                ParkedCar[ParkedCar.length - 1].CarParkBy = User2222;

                            }

                            function compareDates(inputDate, inputDate2) {

                                const inputDateTime = new Date(inputDate);
                                const inputDateTime2 = new Date(inputDate2);

                                const inputYear = inputDateTime.getFullYear();
                                const inputMonth = inputDateTime.getMonth() + 1;
                                const inputDay = inputDateTime.getDate();

                                const inputYear2 = inputDateTime2.getFullYear();
                                const inputMonth2 = inputDateTime2.getMonth() + 1;
                                const inputDay2 = inputDateTime2.getDate();

                                if (inputYear > inputYear2 || (inputYear === inputYear2 && inputMonth > inputMonth2) || (inputYear === inputYear2 && inputMonth === inputMonth2 && inputDay > inputDay2)) {
                                    //   return "Future"
                                    return 1
                                } else if (inputYear === inputYear2 && inputMonth === inputMonth2 && inputDay === inputDay2) {
                                    //   return "Current"
                                    return 0
                                } else {
                                    //   return "Past"
                                    return -1
                                }

                            }

                            const inputDateTime = await User[0].PlanExpiredDate;

                            const inputDateTime2 = new Date();

                            const year = inputDateTime2.getFullYear();
                            const month = inputDateTime2.getMonth() + 1;
                            const day = inputDateTime2.getDate();

                            let inputDateTime3 = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

                            var a = await compareDates(inputDateTime, inputDateTime3);

                            var Data3
                            if (-1 < a) {
                                Data3 = 1;
                            } else {
                                Data3 = 0;
                            }

                            var a = {
                                "Data": User[0].VehicleDetail[0],
                                "Status": ParkedCar[ParkedCar.length - 1],
                                "FeatureStatus": Data3
                            }

                            await Vehicles.push(a);

                        }

                    }

                    if (User[0].VehicleDetail[1]) {

                        if (User[0].VehicleDetail[1].status.trim() !== "") {

                            var ParkedCar = await Todo4.find({ RegistrationNumber: User[0].VehicleDetail[1].RegistrationNumber });

                            if (!ParkedCar[ParkedCar.length - 1].WaitTime) {

                                var User2 = await Todo2.find({ UnitName: ParkedCar[ParkedCar.length - 1].Parklocation });

                                const postData = {
                                    RegistrationNumber: User[0].VehicleDetail[1].RegistrationNumber,
                                    UserName: User2[0].UserName,
                                };

                                const response = await axios.post(`${Ip}/UserWaitTime`, postData);
                                const data = response.data.message;

                                ParkedCar[ParkedCar.length - 1].WaitTime = data;

                            } else {

                                var User2 = await Todo2.find({ UnitName: ParkedCar[ParkedCar.length - 1].Parklocation });

                                const postData = {
                                    RegistrationNumber: User[0].VehicleDetail[1].RegistrationNumber,
                                    UserName: User2[0].UserName,
                                };

                                const response = await axios.post(`${Ip}/UserWaitTime`, postData);
                                const data = response.data.message;

                                ParkedCar[ParkedCar.length - 1].WaitTime = data;

                            }

                            var a = {
                                "Data": User[0].VehicleDetail[1],
                                "Status": ParkedCar[ParkedCar.length - 1]
                            }
                            await Vehicles.push(a);

                        }

                    }

                }

                var message2 = { "message": "Data Load Successfully", "data": Vehicles, "status": `${HTTP.SUCCESS}` }
                res.status(HTTP.SUCCESS).json(message2);

            } else {
                var a = { "message": "Please Provide User Account Token", "status": `${HTTP.UNAUTHORIZED}` }
                res.status(HTTP.UNAUTHORIZED).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static O = async (req, res) => {
        try {
            var userName = ""
            if (req.UserName) {

                var User = await Todo.find({});

                var Vehicles = [];
                var Vehicles2 = [];
                var AllMember = [];

                for (var i = 0; i < User.length; i++) {

                    var Member = [];

                    if (User[i].Member) {

                        // await Member.push(User[i].UserName);
                        // console.log(User[i].UserName)
                        // User[i].UserName

                        for (var j = 0; j < User[i].VehicleDetail.length; j++) {
                            // await Member.push(User[i].Member[j][0].Name);
                            if (User[i].VehicleDetail[j].RegistrationNumber == req.body.RegistrationNumber) {
                                userName = User[i].UserName
                                AllMember.push(userName)
                                // console.log(userName)
                                for (var l = 0; l < User[i].ActiveParkingUser.length; l++) {

                                    if (userName != User[i].ActiveParkingUser[l]) {
                                        console.log("Inner Array: " + User[i].ActiveParkingUser[l])
                                        await AllMember.push(User[i].ActiveParkingUser[l])
                                    }

                                    // if (User[i].Member[l].name === 'undefined') {
                                    //     await AllMember.push(User[i].Member[l].name)
                                    // } else {
                                    //     // console.log(User[i].Member[l].name)

                                    // }
                                }
                            }
                        }

                    }

                    var Member = await User[i].ActiveParkingUser

                    if (User[i].VehicleDetail) {

                        if (User[i].VehicleDetail[0]) {
                            await Vehicles.push(User[i].VehicleDetail[0].RegistrationNumber);
                            User[i].VehicleDetail[0].Member = AllMember;
                            await Vehicles2.push(User[i].VehicleDetail[0]);
                        }

                        if (User[i].VehicleDetail[1]) {
                            await Vehicles.push(User[i].VehicleDetail[1].RegistrationNumber);
                            User[i].VehicleDetail[1].Member = AllMember;
                            await Vehicles2.push(User[i].VehicleDetail[1]);
                        }
                    }
                }

                if (Vehicles.includes(req.body.RegistrationNumber)) {

                    function findIndexInArray(array, value) {
                        for (let i = 0; i < array.length; i++) {
                            if (array[i] === value) {
                                return i;
                            }
                        }
                        return -1;
                    }

                    const index = findIndexInArray(Vehicles, req.body.RegistrationNumber);

                    var data = Vehicles2[index];

                    console.log(AllMember)

                    var message2 = { "message": "Valid Car", "data": data, "status": `${HTTP.SUCCESS}` }
                    res.status(HTTP.SUCCESS).json(message2);
                } else {

                    var message2 = { "message": "InValid Car", "status": `${HTTP.NOT_FOUND}` }
                    res.status(HTTP.NOT_FOUND).json(message2);
                }

            } else {
                var a = { "message": "Please Choose Another Account Token", "status": `${HTTP.UNAUTHORIZED}` }
                res.status(HTTP.UNAUTHORIZED).json(a);
            }
        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static P = async (req, res) => {
        try {

            var User = await Todo.find({});

            for (var i = 0; i < User.length; i++) {

                if (User[i].VehicleDetail) {

                    if (User[i].VehicleDetail[0]) {

                        if (User[i].VehicleDetail[0].RegistrationNumber == req.body.RegistrationNumber) {

                            User[i].VehicleDetail[0].status = req.body.Status;

                            User[i].VehicleDetail[0].status2 = req.body.Status2;

                            // if(req.body.Status2){
                            //     User[i].VehicleDetail[0].status2 = req.body.Status2;
                            // }

                            await User[i].save();

                        }

                    }

                    if (User[i].VehicleDetail[1]) {

                        if (User[i].VehicleDetail[1].RegistrationNumber == req.body.RegistrationNumber) {

                            User[i].VehicleDetail[1].status = req.body.Status;

                            User[i].VehicleDetail[1].status2 = req.body.Status2;

                            // if(req.body.Status2){
                            //     User[i].VehicleDetail[1].status2 = req.body.Status2;
                            // }

                            await User[i].save();

                        }
                    }
                }
            }

            var message2 = { "message": "Data Load Successfully", "status": `${HTTP.SUCCESS}` }
            res.status(HTTP.SUCCESS).json(message2);

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    // static J = async (req, res) => {
    //     try {

    //         if (req.files && req.UserName) {

    //             const headerValue = req.get('Authorization');

    //             var User = await Todo8.find({ Username: req.UserName })

    //             if (User[0].token == headerValue) {

    //                 var carPictures = [];

    //                 for (var i = 0; i < req.files.length; i++) {
    //                     await carPictures.push(Ip + "/public/" + req.files[i].filename)
    //                 }

    //                 const currentDate = new Date();
    //                 const year = currentDate.getFullYear();
    //                 const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    //                 const day = String(currentDate.getDate()).padStart(2, '0');
    //                 const hours = String(currentDate.getHours()).padStart(2, '0');
    //                 const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    //                 const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    //                 const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

    //                 var ParkedCar2 = await Todo4.find({ RegistrationNumber: req.body.RegistrationNumber, status: "Accepted" })

    //                 ParkedCar2[0].CarDeliverPicture = carPictures;

    //                 await ParkedCar2[0].save();

    //                 var a = { "message": "Vehicle Deliver Picture Upload Sucessfully", "status": `${HTTP.SUCCESS}` }
    //                 res.status(HTTP.SUCCESS).json(a);

    //             } else {
    //                 var a = { "message": "Token has expired", "status": `${HTTP.UNAUTHORIZED}` }
    //                 res.status(HTTP.UNAUTHORIZED).json(a);
    //             }

    //         } else {
    //             var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
    //             res.status(HTTP.BAD_REQUEST).json(a);
    //         }

    //     } catch (e) {
    //         console.log(e);
    //         var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
    //         res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
    //     }
    // };
    static Q = async (req, res) => {
        try {

            if (req.UserName) {

                const headerValue = req.get('Authorization');

                var User = await Todo8.find({ Username: req.UserName })

                if (User[0].token == headerValue) {

                    // var carPictures = [];

                    // for (var i = 0; i < req.files.length; i++) {
                    //     await carPictures.push(Ip + "/public/" + req.files[i].filename)
                    // }

                    const suratTimezone = 'Asia/Kolkata';
                    const currentTimeInSurat = moment().tz(suratTimezone).format('YYYY-MM-DDTHH:mm:ss');

                    const currentDate = new Date(currentTimeInSurat);

                    var currentYear = await currentDate.getFullYear();
                    var currentMonth;
                    var currentDay;
                    var currentHours;
                    var currentMinutes;
                    var currentSeconds;

                    if (currentDate.getMonth() < 10) {
                        var currentMonth = await `0${currentDate.getMonth() + 1}`;
                    } else {
                        var currentMonth = await currentDate.getMonth() + 1;
                    }

                    if (currentDate.getDate() < 10) {
                        var currentDay = await `0${currentDate.getDate()}`;
                    } else {
                        var currentDay = await currentDate.getDate();
                    }

                    if (currentDate.getHours() < 10) {
                        var currentHours = await `0${currentDate.getHours()}`;
                    } else {
                        var currentHours = await currentDate.getHours();
                    }

                    if (currentDate.getMinutes() < 10) {
                        var currentMinutes = await `0${currentDate.getMinutes()}`;
                    } else {
                        var currentMinutes = await currentDate.getMinutes();
                    }

                    if (currentDate.getSeconds() < 10) {
                        var currentSeconds = await `0${currentDate.getSeconds()}`;
                    } else {
                        var currentSeconds = await currentDate.getSeconds();
                    }

                    const formattedDateTime = `${currentYear} ${currentMonth} ${currentDay} ${currentHours} ${currentMinutes} ${currentSeconds}`;
                    const formattedDateTime2 = `${currentYear}-${currentMonth}-${currentDay}`;
                    const formattedDateTime3 = `${currentHours}:${currentMinutes}:${currentSeconds}`;

                    const files = req.files;

                    const locations = [];

                    var ParkedCar2 = await Todo4.find({ RegistrationNumber: req.body.RegistrationNumber, status: "Accepted" })

                    var AwsState = await Todo2.find({ UnitName: ParkedCar2[0].Parklocation });

                    var countryName = await AwsState[0].Country;
                    var OfficialState = AwsState[0].State;
                    var OfficialCity = AwsState[0].City;
                    var Parklocation = ParkedCar2[0].Parklocation;

                    for (let i = 0; i < files.length; i++) {

                        const file = files[i];

                        const fileExt = path.extname(file.originalname);
                        const fileName = formattedDateTime + (i + 1) + fileExt;

                        const s3 = new AWS.S3({
                            accessKeyId: process.env.AWS_ACCESS_KEY,
                            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                        });

                        const params = {
                            Bucket: process.env.AWS_S3_BUCKET,
                            Key: `${countryName}/${OfficialState}/${OfficialCity}/${Parklocation}/${req.body.RegistrationNumber}/${fileName}`,
                            Body: file.buffer,
                            ACL: 'public-read',
                            ContentType: file.mimetype,
                        };

                        const data = await s3.upload(params).promise();
                        var dataKey = data.Key
                        var pushDataLocation = `${PUSHDATALOCATION}/${dataKey}`
                        locations.push(pushDataLocation);

                    }

                    // ParkedCar2[0].CarDeliverPicture = carPictures;
                    ParkedCar2[0].CarDeliverPicture = locations;

                    await ParkedCar2[0].save();

                    let data222 = new Todo10({
                        Date: formattedDateTime2,
                        Time: formattedDateTime3,
                        Pictures: locations,
                        RegistrationNumber: req.body.RegistrationNumber,
                        UserAction: "ParkOut"
                    });

                    await data222.save();

                    var a = { "message": "Vehicle Deliver Picture Upload Sucessfully", "status": `${HTTP.SUCCESS}` }
                    res.status(HTTP.SUCCESS).json(a);

                } else {
                    var a = { "message": "Token has expired", "status": `${HTTP.UNAUTHORIZED}` }
                    res.status(HTTP.UNAUTHORIZED).json(a);
                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static R = async (req, res) => {
        try {

            if (req.UserName) {

                const headerValue = req.get('Authorization');

                var User = await Todo8.find({ Username: req.UserName })

                if (User[0].token == headerValue) {

                    const suratTimezone = 'Asia/Kolkata';
                    const currentTimeInSurat = moment().tz(suratTimezone).format('YYYY-MM-DDTHH:mm:ss');

                    const currentDate = new Date(currentTimeInSurat);

                    // const currentDate = new Date();

                    const year = currentDate.getFullYear();
                    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                    const day = String(currentDate.getDate()).padStart(2, '0');
                    const hours = String(currentDate.getHours()).padStart(2, '0');
                    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
                    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

                    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

                    const registerNumber = req.body.RegistrationNumber

                    // var ParkedCar2 = await Todo4.findOne()
                    // var ParkedCar2 = await Todo4.findOne({ RegistrationNumber: { RegistrationNumber: req.body.RegistrationNumber, status: "Accepted" }registerNumber, status: "Accepted" })
                    const ParkedCar2 = await Todo4.findOneAndUpdate({ RegistrationNumber: registerNumber, status: "Accepted" }, {
                        $set: {
                            ParkOutlocation: req.body.Parklocation,
                            CarPickBy: req.body.CarPickBy,
                            CarDeliverkBy: req.UserName,
                            ParkOutTime: formattedDateTime,
                            status: "Deliver",
                            status2: "Deliver"
                        }
                    }, { returnOriginal: false })

                    await Todo8.findOneAndUpdate({ Username: req.UserName }, {
                        $set: {
                            ValetStatus: 0
                        }
                    }, { returnOriginal: false })

                    const postData = {
                        RegistrationNumber: req.body.RegistrationNumber,
                        Status: "",
                    };

                    const postData2 = {
                        RegistrationNumber: req.body.RegistrationNumber,
                        Status: "Deliver",
                    };

                    async function fetchData() {
                        try {

                            const response = await axios.post(`${Ip}/NumberToMember`, postData);

                            if (response.status === 200) {

                                const UserNameData = response.data.message[0];

                                var FcmTokenUser = await Todo.find({ UserName: UserNameData })

                                var array1 = await FcmTokenUser[0].ActiveParkingUser;
                                var RemoveElement = await ParkedCar2.CarBringer;
                                var Position = await ParkedCar2.IsOwnerCarBringer;

                                if (Position == 1) {
                                    array1.unshift(RemoveElement);
                                } else {
                                    array1.push(RemoveElement);
                                }

                                await FcmTokenUser[0].save();

                                var FcmToken = await FcmTokenUser[0].Fcm;
                                var FcmTokenUserName = await FcmTokenUser[0].UserName;

                                let data2 = new Todo7({
                                    UserName: FcmTokenUserName,
                                    Message: "Car has been delivered",
                                    ParkInTime: formattedDateTime
                                });

                                await data2.save();

                                axios.post(`${Ip}/StatusChange2`, postData2)
                                    .then(response => {

                                        const message = {
                                            notification: {
                                                title: 'Car has been delivered',
                                            },
                                            android: {
                                                notification: {
                                                    sound: 'default'
                                                }
                                            },
                                            apns: {
                                                payload: {
                                                    aps: {
                                                        sound: 'default'
                                                    }
                                                }
                                            },
                                            token: FcmToken,
                                        };

                                        fcm.send(message)
                                            .then((response) => {

                                                var a = { "message": "Vehicle Delivered", "status": `${HTTP.SUCCESS}` }
                                                res.status(HTTP.SUCCESS).json(a);

                                            })
                                            .catch((error) => {
                                                var a = { "message": "Vehicle Delivered", "status": `${HTTP.SUCCESS}` }
                                                res.status(HTTP.SUCCESS).json(a);
                                            });

                                    })
                                    .catch(error => {
                                        console.error('Error:', error);
                                    });

                            } else {
                                console.error('Request failed with status code:', response.status);
                            }

                        } catch (error) {
                            console.error('An error occurred:', error);
                        }
                    }

                    fetchData();

                    // axios.post(`${Ip}/StatusChange`, postData)
                    //     .then(response => {

                    // var a = { "message": "Vehicle Deliver", "status": `${HTTP.SUCCESS}` }
                    // res.status(HTTP.SUCCESS).json(a);

                    //     })
                    //     .catch(error => {
                    //         console.error('Error:', error);
                    //     });

                } else {
                    var a = { "message": "Token has expired", "status": `${HTTP.UNAUTHORIZED}` }
                    res.status(HTTP.UNAUTHORIZED).json(a);
                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static S = async (req, res) => {
        try {

            var ParkedCar = await Todo4.find({ RegistrationNumber: req.body.RegistrationNumber, status: "Requested" })

            if (ParkedCar.length !== 0) {

                const headerValue = req.get('Authorization');

                var User = await Todo.findOne({ Phone: req.Phone })

                if (User) {

                    if (headerValue == User.token) {

                        const suratTimezone = 'Asia/Kolkata';
                        const currentTimeInSurat2 = moment().tz(suratTimezone).format('YYYY-MM-DDTHH:mm:ss')
                        const currentTimeInSurat = moment().tz(suratTimezone);
                        const futureTimeInSurat = currentTimeInSurat.add(-1, 'minutes');
                        const formattedFutureTime = futureTimeInSurat.format('YYYY-MM-DDTHH:mm:ss');

                        var FindAndUpdateMany = await Todo7.find({ RegistrationNumber: req.body.RegistrationNumber });
                        FindAndUpdateMany[FindAndUpdateMany.length - 1].NotificationRemainingTime = formattedFutureTime;
                        await FindAndUpdateMany[FindAndUpdateMany.length - 1].save();

                        var VehicleParkBusiness = await Todo8.findOne({ Username: ParkedCar[ParkedCar.length - 1].CarParkBy })
                        var VehicleParkBusinessUserName = VehicleParkBusiness.BusinessManagerUserName;

                        var VehicleParkBusinessUserNameFullData = await Todo8.find({ BusinessManagerUserName: VehicleParkBusinessUserName })

                        var registrationTokens = [];
                        for (var i = 0; i < VehicleParkBusinessUserNameFullData.length; i++) {

                            if (VehicleParkBusinessUserNameFullData[i].Fcm) {
                                await registrationTokens.push(VehicleParkBusinessUserNameFullData[i].Fcm);
                            }

                        }

                        ParkedCar[ParkedCar.length - 1].UserWaitTime = [];
                        ParkedCar[ParkedCar.length - 1].status = 'Parked';
                        ParkedCar[ParkedCar.length - 1].status2 = '';
                        ParkedCar[ParkedCar.length - 1].TimeUpdateStatus = 0;
                        await ParkedCar[ParkedCar.length - 1].save();

                        const postData = {
                            RegistrationNumber: req.body.RegistrationNumber,
                            Status: "Parked",
                            Status2: "",
                        };

                        var User1 = await Todo8.find({ Username: ParkedCar[0].CarParkBy })
                        var FcmToken = User1[0].Fcm;

                        // var UserWaitTime = await ParkedCar[0].UserWaitTime[0];
                        // var UserWaitTimeArray = await [];
                        // await UserWaitTimeArray.push(UserWaitTime);
                        // ParkedCar[0].UserWaitTime = await UserWaitTimeArray;
                        // ParkedCar[0].TimeUpdateStatus = 0;
                        // ParkedCar[0].save();

                        axios.post(`${Ip}/StatusChange`, postData)
                            .then(response => {

                                const message2 = {
                                    notification: {
                                        title: ` ${User.UserName} has cancelled the car request `,
                                    },
                                    android: {
                                        notification: {
                                            sound: 'default'
                                        }
                                    },
                                    apns: {
                                        payload: {
                                            aps: {
                                                sound: 'default'
                                            }
                                        }
                                    },
                                    tokens: registrationTokens,
                                };

                                fcm.sendMulticast(message2)
                                    .then((response) => {

                                        // var a = { "message": "Request Cancle Sucessfully & Notification Send Sucessfully", "status": `${HTTP.SUCCESS}` }
                                        // res.status(HTTP.SUCCESS).json(a);

                                        var a = { "message": "Request Cancelled Successfully", "status": `${HTTP.SUCCESS}` }
                                        res.status(HTTP.SUCCESS).json(a);

                                    })
                                    .catch((error) => {

                                        console.error('Error sending notifications:', error);

                                        var a = { "message": "Request Cancle Sucessfully & Notification Does Not Send", "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
                                        res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);

                                    });

                            })
                            .catch(error => {
                                console.error('Error:', error);
                            });

                    } else {
                        var a = { "message": "Token has expired", "status": `${HTTP.UNAUTHORIZED}` }
                        res.status(HTTP.UNAUTHORIZED).json(a);
                    }

                } else {
                    var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                    res.status(HTTP.NOT_FOUND).json(a);
                }

            } else {

                // var a = { "message": "Does Not Find Any Request", "status": `${HTTP.NOT_FOUND}` }
                // res.status(HTTP.NOT_FOUND).json(a);

                const postData = {
                    Phone: req.Phone,
                    RegistrationNumber: req.body.RegistrationNumber,
                };

                axios.post(`${Ip}/RequestCancleByCustomer2`, postData)
                    .then(response => {

                        var a = { "message": `${response.data.message}`, "status": `${response.data.status}` }
                        res.status(Number(response.data.status)).json(a);

                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static T = async (req, res) => {
        try {

            var ParkedCar = await Todo4.find({ RegistrationNumber: req.body.RegistrationNumber, status: "Accepted" })

            if (ParkedCar.length !== 0) {

                var User = await Todo.findOne({ Phone: req.body.Phone })

                if (User) {

                    // Phase 1 start //

                    const suratTimezone = 'Asia/Kolkata';
                    const currentTimeInSurat2 = moment().tz(suratTimezone).format('YYYY-MM-DDTHH:mm:ss')
                    const currentTimeInSurat = moment().tz(suratTimezone);
                    const futureTimeInSurat = currentTimeInSurat.add(-1, 'minutes');
                    const formattedFutureTime = futureTimeInSurat.format('YYYY-MM-DDTHH:mm:ss');

                    var FindAndUpdateMany = await Todo7.find({ RegistrationNumber: req.body.RegistrationNumber });
                    FindAndUpdateMany[FindAndUpdateMany.length - 1].NotificationRemainingTime = formattedFutureTime;
                    await FindAndUpdateMany[FindAndUpdateMany.length - 1].save();

                    // Phase 1 completed //
                    // Phase 2 start //

                    ParkedCar[ParkedCar.length - 1].UserWaitTime = [];
                    ParkedCar[ParkedCar.length - 1].status = 'Parked';
                    ParkedCar[ParkedCar.length - 1].status2 = '';
                    ParkedCar[ParkedCar.length - 1].TimeUpdateStatus = 0;
                    await ParkedCar[ParkedCar.length - 1].save();

                    // Phase 2 completed //
                    // Phase 3 Start //

                    const postData2 = {
                        RegistrationNumber: req.body.RegistrationNumber,
                        Status: "Parked",
                        Status2: "",
                    };

                    await axios.post(`${Ip}/StatusChange`, postData2);

                    // Phase 3 completed //
                    // Phase 4 Start //

                    var VehicleParkBusiness = await Todo8.findOne({ Username: ParkedCar[ParkedCar.length - 1].CarParkBy })
                    var VehicleParkBusinessUserName = VehicleParkBusiness.BusinessManagerUserName;

                    var VehicleParkBusinessUserNameFullData = await Todo8.find({ BusinessManagerUserName: VehicleParkBusinessUserName })

                    var registrationTokens = [];
                    for (var i = 0; i < VehicleParkBusinessUserNameFullData.length; i++) {

                        if (VehicleParkBusinessUserNameFullData[i].Fcm) {
                            await registrationTokens.push(VehicleParkBusinessUserNameFullData[i].Fcm);
                        }

                    }

                    // var VehicleParkBusinessUserName = VehicleParkBusiness.Fcm;
                    // var registrationTokens = [];
                    // await registrationTokens.push(VehicleParkBusinessUserName); // Error

                    const message2 = {
                        notification: {
                            title: ` ${User.UserName} has cancelled the car request `,
                        },
                        android: {
                            notification: {
                                sound: 'default'
                            }
                        },
                        apns: {
                            payload: {
                                aps: {
                                    sound: 'default'
                                }
                            }
                        },
                        tokens: registrationTokens,
                    };

                    fcm.sendMulticast(message2)
                        .then((response) => { })
                        .catch((error) => { });

                    // Phase 4 complete // 

                    // var a = { "message": "Request Cancle Sucessfully & Notification Send Sucessfully", "status": `${HTTP.SUCCESS}` }
                    // res.status(HTTP.SUCCESS).json(a);

                    var a = { "message": "Request Cancelled Successfully", "status": `${HTTP.SUCCESS}` }
                    res.status(HTTP.SUCCESS).json(a);

                } else {
                    var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                    res.status(HTTP.SUCCESS).json(a);
                }

            } else {
                var a = { "message": "Does Not Find Any Request", "status": `${HTTP.NOT_FOUND}` }
                res.status(HTTP.SUCCESS).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.SUCCESS).json(a);
        }
    };
    static U = async (req, res) => {
        try {

            const message = {
                notification: {
                    title: 'Notification Title',
                    body: 'Notification Body',
                },
                android: {
                    notification: {
                        sound: 'default'
                    }
                },
                apns: {
                    payload: {
                        aps: {
                            sound: 'default'
                        }
                    }
                },
                token: 'DEVICE_FCM_TOKEN',
            };

            fcm.send(message)
                .then((response) => {
                    console.log('Successfully sent message:', response);
                })
                .catch((error) => {
                    console.error('Error sending message:', error);
                });

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static V = async (req, res) => {
        try {
            var Company = await Todo5.find({});
            var CompanyName = [];
            for (var i = 0; i < Company.length; i++) {
                await CompanyName.push(Company[i].CompanyName)
            }
            await CompanyName.sort();
            var message2 = { "message": "Data Load Successfully", "data": CompanyName, "status": `${HTTP.SUCCESS}` }
            res.status(HTTP.SUCCESS).json(message2);
        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static W = async (req, res) => {
        try {

            var Model = await Todo5.find({ CompanyName: req.body.CompanyName });

            var CompanyModel = await Model[0].Model;
            await CompanyModel.sort();
            var message2 = { "message": "Data Load Successfully", "data": CompanyModel, "status": `${HTTP.SUCCESS}` }
            res.status(HTTP.SUCCESS).json(message2);

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static X = async (req, res) => {
        try {

            if (req.body.Phone) {

                var User = await Todo2.findOne({ Phone: req.body.Phone });
                var User2 = await Todo8.findOne({ Phone: req.body.Phone });

                function generateRandom6DigitNumber() {
                    const min = 100000;
                    const max = 999999;

                    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

                    return randomNumber;
                }

                const otp = generateRandom6DigitNumber();

                if (User2) {
                    User2.ForgetPasswordOtp = otp;
                    await User2.save();
                } else if (User) {
                    User.ForgetPasswordOtp = otp;
                    await User.save();
                } else {
                    var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                    res.status(HTTP.NOT_FOUND).json(a);
                }

                axios.get(`http://3.109.217.93/index.php?number=${req.body.Phone}&otp=${otp}`)
                    .then((response) => {

                        var a = { "message": "Otp Send", "status": `${HTTP.SUCCESS}` }
                        res.status(HTTP.SUCCESS).json(a);

                    })
                    .catch((error) => {
                        console.error(`Error: ${error}`);
                    });



            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static Y = async (req, res) => {
        try {

            if (req.body.otp && req.body.Phone) {

                var User = await Todo2.findOne({ Phone: req.body.Phone });
                var User2 = await Todo8.findOne({ Phone: req.body.Phone });

                if (User2) {

                    if (User2.ForgetPasswordOtp == req.body.otp) {

                        var a = { "message": "Password Forget Sucessfully", "status": `${HTTP.SUCCESS}` }
                        res.status(HTTP.SUCCESS).json(a);

                    } else {
                        var a = { "message": "Wrong Otp", "status": `${HTTP.UNAUTHORIZED}` }
                        res.status(HTTP.UNAUTHORIZED).json(a);
                    }

                } else if (User) {

                    if (User.ForgetPasswordOtp == req.body.otp) {

                        var a = { "message": "Password Forget Sucessfully", "status": `${HTTP.SUCCESS}` }
                        res.status(HTTP.SUCCESS).json(a);

                    } else {
                        var a = { "message": "Wrong Otp", "status": `${HTTP.UNAUTHORIZED}` }
                        res.status(HTTP.UNAUTHORIZED).json(a);
                    }

                } else {
                    var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                    res.status(HTTP.NOT_FOUND).json(a);
                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static Z = async (req, res) => {
        try {

            if (req.body.otp && req.body.Phone && req.body.Password) {

                var User = await Todo2.findOne({ Phone: req.body.Phone });
                var User2 = await Todo8.findOne({ Phone: req.body.Phone });

                if (User) {

                    if (User.ForgetPasswordOtp == req.body.otp) {

                        const hashedPassword = await bcrypt.hash(req.body.Password, 12);

                        var updateuser = await Todo2.findOneAndUpdate({ Phone: req.body.Phone }, { $unset: { ForgetPasswordOtp: 1 }, $set: { PassWord: hashedPassword } }, { new: true });

                        await updateuser.save();

                        var a = { "message": "New Password Set Sucessfully", "status": `${HTTP.SUCCESS}` }
                        res.status(HTTP.SUCCESS).json(a);

                    } else {
                        var a = { "message": "Wrong Otp", "status": `${HTTP.UNAUTHORIZED}` }
                        res.status(HTTP.UNAUTHORIZED).json(a);
                    }

                } else if (User2) {

                    if (User2.ForgetPasswordOtp == req.body.otp) {

                        const hashedPassword = await bcrypt.hash(req.body.Password, 12);

                        var updateuser = await Todo8.findOneAndUpdate({ Phone: req.body.Phone }, { $unset: { ForgetPasswordOtp: 1 }, $set: { Password: hashedPassword } }, { new: true });

                        await updateuser.save();

                        var a = { "message": "New Password Set Sucessfully", "status": `${HTTP.SUCCESS}` }
                        res.status(HTTP.SUCCESS).json(a);

                    } else {
                        var a = { "message": "Wrong Otp", "status": `${HTTP.UNAUTHORIZED}` }
                        res.status(HTTP.UNAUTHORIZED).json(a);
                    }

                } else {
                    var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                    res.status(HTTP.NOT_FOUND).json(a);
                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    // static S = async (req, res) => {
    //     try {

    //         if (req.body.Phone && req.Phone && req.body.Name) {

    //             var user = await Todo.find({ Phone: req.body.Phone });

    //             if (user.length == 1) {

    //                 var User2 = await Todo.find({ Phone: req.Phone })

    //                 const headerValue = req.get('Authorization');

    //                 if (User2[0].token == headerValue) {

    //                     if (User2[0].Member.length < 5) {

    //                         var Array = [
    //                             {
    //                                 "Phone": req.body.Phone,
    //                                 "Name": req.body.Name
    //                             }
    //                         ];

    //                         User2[0].Member.push(Array);
    //                         await User2[0].save();

    //                         var a = { "message": "Member Add Successfully", "status": `${HTTP.SUCCESS}` }
    //                         res.status(HTTP.SUCCESS).json(a);

    //                     } else {
    //                         var a = { "message": "You Can Not Add More Member In This Account", "status": `${HTTP.FORBIDDEN}` }
    //                         res.status(HTTP.FORBIDDEN).json(a);
    //                     }

    //                 } else {
    //                     var a = { "message": "Token has expired", "status": `${HTTP.UNAUTHORIZED}` }
    //                     res.status(HTTP.UNAUTHORIZED).json(a);
    //                 }

    //             } else {
    //                 var a = { "message": `Does NOT Exist Any User Account With ${req.body.Phone} Number`, "status": `${HTTP.NOT_ALLOWED}` }
    //                 res.status(HTTP.NOT_ALLOWED).json(a);
    //             }

    //         } else {
    //             var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
    //             res.status(HTTP.BAD_REQUEST).json(a);
    //         }

    //     } catch (e) {
    //         console.log(e);
    //         var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
    //         res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
    //     }
    // };
}

class class2 {
    static a = async (req, res) => {
        try {

            if (req.body.Phone && req.Phone && req.body.Name) {

                var User2 = await Todo.find({ Phone: req.Phone })

                const headerValue = req.get('Authorization');

                if (User2[0].token == headerValue) {

                    if (User2[0].Member.length < 5) {

                        var Array = [
                            {
                                "Phone": req.body.Phone,
                                "Name": req.body.Name
                            }
                        ];

                        User2[0].Member.push(Array);
                        User2[0].ActiveParkingUser.push(req.body.Name);
                        await User2[0].save();

                        var a = { "message": "Member Add Successfully", "status": `${HTTP.SUCCESS}` }
                        res.status(HTTP.SUCCESS).json(a);

                    } else {
                        var a = { "message": "You Can Not Add More Member In This Account", "status": `${HTTP.FORBIDDEN}` }
                        res.status(HTTP.FORBIDDEN).json(a);
                    }

                } else {
                    var a = { "message": "Token has expired", "status": `${HTTP.UNAUTHORIZED}` }
                    res.status(HTTP.UNAUTHORIZED).json(a);
                }



            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static b = async (req, res) => {
        try {

            if (req.body.Date && req.Phone && req.body.Time && req.body.BusinessUserName) {

                const currentDate = new Date();

                const year = currentDate.getFullYear();
                const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                const day = String(currentDate.getDate()).padStart(2, '0');
                var hours = String(currentDate.getHours()).padStart(2, '0');
                const minutes = String(currentDate.getMinutes()).padStart(2, '0');
                const seconds = String(currentDate.getSeconds()).padStart(2, '0');

                const formattedDateTime = `${year}:${month}:${day}`;
                const formattedDateTime2 = `${hours}:${minutes}:${seconds}`;

                var User2 = await Todo.find({ Phone: req.Phone });

                let data = new Todo6({
                    Date: req.body.Date,
                    Time: req.body.Time,
                    NotiFicationGetDate: formattedDateTime,
                    NotiFicationGetTime: formattedDateTime2,
                    Phone: req.Phone,
                    ReceiverUserName: req.body.BusinessUserName,
                    SenderUserName: User2[0].UserName
                })
                await data.save();

                var a = { "message": "Notification sent successfully", "status": `${HTTP.SUCCESS}` }
                res.status(HTTP.SUCCESS).json(a);

                // var User = await Todo.find({ UserName: User2[0].UserName });

                // var FcmToken = await User[0].Fcm;

                // const message = {
                //     notification: {
                //         title: 'Notification Title',
                //         body: 'Notification Body',
                //     },
                // android: {
                //     notification: {
                //         sound: 'default'
                //     }
                // },
                // apns: {
                //     payload: {
                //       aps: {
                //         sound: 'default'
                //       }
                //     }
                //   },
                //     token: FcmToken,
                // };

                // fcm.send(message)
                //     .then((response) => {

                //         var a = { "message": "Notification Send Sucessfully", "status": `${HTTP.SUCCESS}` }
                //         res.status(HTTP.SUCCESS).json(a);

                //     })
                //     .catch((error) => {
                //         var a = { "message": "Notification Does Not Send", "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
                //         res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
                //     });

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static c = async (req, res) => {
        try {

            if (req.Phone) {

                var User = await Todo.find({ Phone: req.Phone });

                var a = [];

                for (var i = 0; i < User[0].Member.length; i++) {
                    await a.push(User[0].Member[i][0]);
                }

                var SendData = User
                SendData[0].Member = a;

                var message2 = { "message": "Data Load Successfully", "data": SendData, "status": `${HTTP.SUCCESS}` }
                res.status(HTTP.SUCCESS).json(message2);

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static d = async (req, res) => {
        try {

            if (req.Phone) {

                var User = await Todo.find({ Phone: req.Phone });

                var Member = [];

                await Member.push(User[0].UserName);

                for (var i = 0; i < User[0].Member.length; i++) {
                    await Member.push(User[0].Member[i][0].Name);
                }

                var message2 = { "message": "Data Load Successfully", "data": Member, "status": `${HTTP.SUCCESS}` }
                res.status(HTTP.SUCCESS).json(message2);

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static e = async (req, res) => {
        try {

            var User = await Todo2.findOne({ UserName: req.UserName })
            var User2 = await Todo8.findOne({ Username: req.UserName })

            if (User) {
                var User3 = await User
            } else {
                var User3 = await User2
            }

            if (req.UserName && User3) {

                const headerValue = req.get('Authorization');

                if (headerValue == User3.token) {

                    var SendData = [User3];

                    var message2 = { "message": "Data Load Successfully", "data": SendData, "status": `${HTTP.SUCCESS}` }
                    res.status(HTTP.SUCCESS).json(message2);

                } else {
                    var a = { "message": "Token has expired", "status": `${HTTP.UNAUTHORIZED}` }
                    res.status(HTTP.UNAUTHORIZED).json(a);
                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static f = async (req, res) => {
        try {

            if (req.UserName) {

                const headerValue = req.get('Authorization');

                var User = await Todo2.find({ UserName: req.UserName })

                if (User[0].token == headerValue) {

                    var User22 = await Todo6.find({ ReceiverUserName: req.UserName })
                    var User2 = await User22.reverse()
                    var message2 = { "message": "Data Load Successfully", "data": User2, "status": `${HTTP.SUCCESS}` }
                    res.status(HTTP.SUCCESS).json(message2);

                } else {
                    var a = { "message": "Token has expired", "status": `${HTTP.UNAUTHORIZED}` }
                    res.status(HTTP.UNAUTHORIZED).json(a);
                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static g = async (req, res) => {
        try {

            if (req.body.RegistrationNumber) {

                var Member = [];
                var Vehicle = [];
                var SendDataDetail = [];
                var User3 = await Todo.find({});

                for (var i = 0; i < User3.length; i++) {

                    var a = [];
                    if (User3[i].VehicleDetail) {

                        for (var k = 0; k < User3[i].VehicleDetail.length; k++) {
                            await a.push(User3[i].VehicleDetail[k].RegistrationNumber);
                        }

                        Vehicle.push(a)

                    }

                }

                for (var i = 0; i < User3.length; i++) {

                    var b = [];

                    if (typeof User3[i].UserName === 'undefined') {
                        await b.push("Default Username");
                    } else {
                        await b.push(User3[i].UserName);
                    }

                    if (User3[i].Member) {

                        for (var j = 0; j < User3[i].Member.length; j++) {

                            await b.push(User3[i].Member[j][0].Name);

                        }

                    }

                    Member.push(b);
                }

                for (var i = 0; i < Vehicle.length; i++) {

                    if (Vehicle[i].includes(req.body.RegistrationNumber)) {

                        for (var k = 0; k < Member[i].length; k++) {
                            SendDataDetail.push(Member[i][k])
                        }

                    }

                }

                var a = { "message": SendDataDetail, "status": `${HTTP.SUCCESS}` }
                res.status(HTTP.SUCCESS).json(a);

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static h = async (req, res) => {
        try {

            if (req.body.Search && req.Phone) {

                const headerValue = req.get('Authorization');

                var User = await Todo.find({ Phone: req.Phone })
                if (headerValue == User[0].token) {

                    const words = req.body.Search.replace(/^\s+|\s+$/g, '').split(" ");
                    const nonBlankArray = words.filter((str) => str.trim() !== '');

                    var a = req.body.Search.toUpperCase().split("IN ").length;

                    if (a > 1) {

                        var CityOrState = await req.body.Search.toUpperCase().split("IN ")[1].replace(/^\s+|\s+$/g, '');

                        var User2 = await Todo2.find({
                            $or: [
                                { State: CityOrState },
                                { City: CityOrState }
                            ]
                        });

                        var User3 = []

                        for (var i = 0; i < User2.length; i++) {

                            if (User2[i].UnitType == nonBlankArray[0].toUpperCase()) {
                                await User3.push(User2[i]);
                            }

                        }

                        var message2 = { "message": "Data Load Successfully", "data": User3, "status": `${HTTP.SUCCESS}` }
                        res.status(HTTP.SUCCESS).json(message2);

                    } else {
                        var User2 = [];
                        var message2 = { "message": "Data Load Successfully", "data": User2, "status": `${HTTP.SUCCESS}` }
                        res.status(HTTP.SUCCESS).json(message2);
                    }

                } else {
                    var a = { "message": "Token has expired", "status": `${HTTP.UNAUTHORIZED}` }
                    res.status(HTTP.UNAUTHORIZED).json(a);
                }



            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static i = async (req, res) => {
        try {

            if (req.body.Name && req.body.Phone && req.body.Username && req.body.Password && req.UserName) {

                const headerValue = req.get('Authorization');

                var User = await Todo2.find({ UserName: req.UserName })
                if (headerValue == User[0].token) {

                    var LowerCaseUsername = await req.body.Name.toLowerCase();

                    var User1 = await Todo8.findOne({ Username: LowerCaseUsername })
                    var User2 = await Todo8.findOne({ Phone: req.body.Phone })

                    if (!User1 && !User2) {

                        var UserData = await Todo2.findOne({ UserName: LowerCaseUsername })

                        if (UserData) {
                            const response = { "message": "Please Choose Another UserName", "status": HTTP.UNAUTHORIZED };
                            res.status(HTTP.UNAUTHORIZED).json(response);
                        } else {

                            const currentDate2 = await new Date();

                            currentDate2.setDate(currentDate2.getDate() - 1);

                            const year = await currentDate2.getFullYear();
                            const month = await currentDate2.getMonth() + 1;
                            const day = await currentDate2.getDate();

                            let PlanExpiredDate = await `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

                            const hashedPassword = await bcrypt.hash(req.body.Password, 12);
                            var UnitName = User[0].UnitName;

                            let data = new Todo8({
                                Name: req.body.Username,
                                Phone: req.body.Phone,
                                Username: LowerCaseUsername,
                                Password: hashedPassword,
                                BusinessManagerUserName: req.UserName,
                                BusinessUnitName: UnitName,
                                Fcm: "",
                                token: "",
                                ValetStatus: 0,
                                Profile: [],
                                PlanPurchase: "Single Payment",
                                PlanExpiredDate: PlanExpiredDate,
                            })
                            await data.save();

                            await User[0].Valets.push(LowerCaseUsername)
                            await User[0].save();

                            const response = { "message": "valet Account Create Successfully", "status": HTTP.SUCCESS };
                            res.status(HTTP.SUCCESS).json(response);

                        }

                    } else if (!User2) {
                        const response = { "message": "Please Choose Another UserName", "status": HTTP.UNAUTHORIZED };
                        res.status(HTTP.UNAUTHORIZED).json(response);
                    } else {
                        const response = { "message": "Please Choose Another Phone Number", "status": HTTP.UNAUTHORIZED };
                        res.status(HTTP.UNAUTHORIZED).json(response);
                    }

                } else {
                    var a = { "message": "Token has expired", "status": `${HTTP.UNAUTHORIZED}` }
                    res.status(HTTP.UNAUTHORIZED).json(a);
                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static j = async (req, res) => {
        try {

            if (req.UserName) {

                const headerValue = req.get('Authorization');

                var User = await Todo2.find({ UserName: req.UserName })

                if (headerValue == User[0].token) {

                    var User2 = await Todo8.find({ BusinessManagerUserName: req.UserName })
                    var User = await User2.reverse();

                    var message2 = { "message": "Data Load Successfully", "data": User, "status": `${HTTP.SUCCESS}` }
                    res.status(HTTP.SUCCESS).json(message2);

                } else {
                    var a = { "message": "Token has expired", "status": `${HTTP.UNAUTHORIZED}` }
                    res.status(HTTP.UNAUTHORIZED).json(a);
                }



            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static k = async (req, res) => {
        try {

            if (req.UserName && req.body.UserName) {

                const headerValue = req.get('Authorization');

                var User = await Todo2.findOne({ UserName: req.UserName })

                if (User) {

                    if (headerValue == User.token) {

                        var User2 = await Todo8.find({ Username: req.body.UserName })

                        if (User.UserName == User2[0].BusinessManagerUserName) {

                            await Todo8.find({ Username: req.body.UserName }).deleteMany();

                            var LowerCaseUsername = await req.body.UserName.toLowerCase();

                            let index = await User.Valets.indexOf(LowerCaseUsername);

                            if (index !== -1) {
                                await User.Valets.splice(index, 1);
                            }

                            await User.save();

                        }

                        var message2 = { "message": "Valet Delete Successfully", "status": `${HTTP.SUCCESS}` }
                        res.status(HTTP.SUCCESS).json(message2);

                    } else {
                        var a = { "message": "Token has expired", "status": `${HTTP.UNAUTHORIZED}` }
                        res.status(HTTP.UNAUTHORIZED).json(a);
                    }

                } else {
                    var message2 = { "message": "Valet Delete Successfully", "status": `${HTTP.SUCCESS}` }
                    res.status(HTTP.SUCCESS).json(message2);
                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static l = async (req, res) => {
        try {

            if (req.UserName) {

                const headerValue = req.get('Authorization');

                var User = await Todo2.findOne({ UserName: req.UserName })

                if (User) {

                    if (headerValue == User.token) {

                        var User2 = await Todo8.find({ _id: req.body._id })

                        if (User.UserName == User2[0].BusinessManagerUserName) {

                            for (var i = 0; i < req.files.length; i++) {
                                await User2[0].Profile.unshift(Ip + "/public/" + req.files[i].filename)
                            }

                            if (req.body.Username || req.body.Phone) {

                                if (req.body.Username && req.body.Phone) {

                                    var LowerCaseUsername = await req.body.Username.toLowerCase();
                                    const token = jwt.sign({ UserName: LowerCaseUsername }, SECRET_KEY);

                                    var a = await req.body.Username.toLowerCase();

                                    var User3 = await Todo2.findOne({ Phone: req.body.Phone })
                                    var User4 = await Todo8.findOne({ Phone: req.body.Phone })
                                    var User5 = await Todo2.findOne({ UserName: a })
                                    var User6 = await Todo8.findOne({ Username: a })

                                    if (!User3 && !User4 && !User5 && !User6) {

                                        if (req.body.Name) {
                                            User2[0].Name = req.body.Name;
                                        }

                                        if (req.body.Password) {
                                            var hashedPassword = await bcrypt.hash(req.body.Password, 12);
                                            User2[0].Password = hashedPassword;
                                        }

                                        User2[0].Phone = req.body.Phone;
                                        User2[0].Username = a;
                                        User2[0].token = token;
                                        User2[0].save();

                                        var message2 = { "message": "Valet Update Successfully", "status": `${HTTP.SUCCESS}` }
                                        res.status(HTTP.SUCCESS).json(message2);

                                    } else {

                                        if ((User3 || User4) && (User5 || User6)) {
                                            var message2 = { "message": "Please Choose Another Phone Number And Username", "status": `${HTTP.NOT_ALLOWED}` }
                                            res.status(HTTP.NOT_ALLOWED).json(message2);
                                        } else if ((User3 || User4)) {
                                            var message2 = { "message": "Please Choose Another Phone Number", "status": `${HTTP.NOT_ALLOWED}` }
                                            res.status(HTTP.NOT_ALLOWED).json(message2);
                                        } else {
                                            var message2 = { "message": "Please Choose Another UserName", "status": `${HTTP.NOT_ALLOWED}` }
                                            res.status(HTTP.NOT_ALLOWED).json(message2);
                                        }

                                    }

                                } else if (req.body.Username) {

                                    var LowerCaseUsername = await req.body.Username.toLowerCase();
                                    const token = jwt.sign({ UserName: LowerCaseUsername }, SECRET_KEY);

                                    var a = await req.body.Username.toLowerCase();
                                    var User3 = await Todo2.findOne({ UserName: a })
                                    var User4 = await Todo8.findOne({ Username: a })

                                    if (!User3 && !User4) {

                                        if (req.body.Name) {
                                            User2[0].Name = req.body.Name;
                                        }

                                        if (req.body.Password) {
                                            var hashedPassword = await bcrypt.hash(req.body.Password, 12);
                                            User2[0].Password = hashedPassword;
                                        }

                                        User2[0].Username = a;
                                        User2[0].token = token;
                                        User2[0].save();

                                        var message2 = { "message": "Valet Update Successfully", "status": `${HTTP.SUCCESS}` }
                                        res.status(HTTP.SUCCESS).json(message2);

                                    } else {
                                        var message2 = { "message": "Please Choose Another UserName", "status": `${HTTP.NOT_ALLOWED}` }
                                        res.status(HTTP.NOT_ALLOWED).json(message2);
                                    }

                                } else {

                                    var User3 = await Todo2.findOne({ Phone: req.body.Phone })
                                    var User4 = await Todo8.findOne({ Phone: req.body.Phone })

                                    if (!User3 && !User4) {

                                        if (req.body.Name) {
                                            User2[0].Name = req.body.Name;
                                        }

                                        if (req.body.Password) {
                                            var hashedPassword = await bcrypt.hash(req.body.Password, 12);
                                            User2[0].Password = hashedPassword;
                                        }

                                        User2[0].Phone = req.body.Phone;
                                        User2[0].save();

                                        var message2 = { "message": "Valet Update Successfully", "status": `${HTTP.SUCCESS}` }
                                        res.status(HTTP.SUCCESS).json(message2);

                                    } else {
                                        var message2 = { "message": "Please Choose Another Phone Number", "status": `${HTTP.NOT_ALLOWED}` }
                                        res.status(HTTP.NOT_ALLOWED).json(message2);
                                    }

                                }

                            } else {

                                if (req.body.Name) {
                                    User2[0].Name = req.body.Name;
                                    // User2[0].Profile = b;
                                    User2[0].save();
                                }

                                if (req.body.Password) {
                                    var hashedPassword = await bcrypt.hash(req.body.Password, 12);
                                    User2[0].Password = hashedPassword;
                                    // User2[0].Profile = b;
                                    User2[0].save();
                                }

                                var message2 = { "message": "Valet Update Successfully", "status": `${HTTP.SUCCESS}` }
                                res.status(HTTP.SUCCESS).json(message2);

                            }

                        } else {
                            var message2 = { "message": "Please Choose Another Token", "status": `${HTTP.NOT_ALLOWED}` }
                            res.status(HTTP.NOT_ALLOWED).json(message2);
                        }

                    } else {
                        var a = { "message": "Token has expired", "status": `${HTTP.UNAUTHORIZED}` }
                        res.status(HTTP.UNAUTHORIZED).json(a);
                    }

                } else {
                    var message2 = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                    res.status(HTTP.NOT_FOUND).json(message2);
                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static m = async (req, res) => {
        try {

            var PetLogic1 = await Todo.findOne({ Phone: req.Phone })
            var PetLogic2 = await Todo2.findOne({ UserName: req.UserName })

            if (PetLogic1) {
                var PetLogic3 = await PetLogic1
            } else {
                // var User = await PetLogic1
                var PetLogic3 = await PetLogic2
            }

            if (PetLogic3) {

                const headerValue = req.get('Authorization');

                // var User = await Todo.findOne({ Phone: req.Phone })

                if (headerValue == PetLogic3.token) {

                    var User2 = await Todo7.find({ UserName: PetLogic3.UserName, ParkInTime: { $ne: "" } })

                    var User3 = [];

                    for (var i = 0; i < User2.length; i++) {

                        const inputDate = new Date(User2[i].ParkInTime);
                        const options = { month: 'long' };
                        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(inputDate);

                        const year = inputDate.getFullYear();
                        const month = String(inputDate.getMonth() + 1).padStart(2, '0');
                        const day = String(inputDate.getDate()).padStart(2, '0');
                        const hours = String(inputDate.getHours()).padStart(2, '0');
                        const minutes = String(inputDate.getMinutes()).padStart(2, '0');
                        const seconds = String(inputDate.getSeconds()).padStart(2, '0');

                        function addSuffix(number) {

                            if (number % 100 >= 11 && number % 100 <= 13) {
                                return number + "th";
                            }

                            switch (number % 10) {
                                case 1:
                                    return number + "st";
                                case 2:
                                    return number + "nd";
                                case 3:
                                    return number + "rd";
                                default:
                                    return number + "th";
                            }

                        }

                        const formattedTime3 = inputDate.toISOString().slice(0, 19).replace('T', ' ');

                        const FinalFormattedDate = `${formattedDate} ${addSuffix(day)}, ${hours}:${minutes}`;

                        var a = {
                            "_id": User2[i]._id,
                            "UserName": User2[i].UserName,
                            "Message": User2[i].Message,
                            "ParkInTime": User2[i].ParkInTime,
                            "__v": User2[i].__v
                        }

                        await User3.push(a);

                    }

                    var User4 = await User3.reverse();

                    var message = { "message": "Data Load Successfully", "data": User4, "status": `${HTTP.SUCCESS}` }
                    res.status(HTTP.SUCCESS).json(message);

                } else {
                    var a = { "message": "Token has expired", "status": `${HTTP.UNAUTHORIZED}` }
                    res.status(HTTP.UNAUTHORIZED).json(a);
                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static n = async (req, res) => {
        try {

            if (req.UserName) {

                const headerValue = req.get('Authorization');

                var User = await Todo2.findOne({ UserName: req.UserName })

                if (User) {

                    if (headerValue == User.token) {

                        var User2 = await Todo4.find({ Parklocation: User.UnitName, status: "Parked" })
                        var SendData = [];

                        for (var i = 0; i < User2.length; i++) {

                            var User3 = await Todo.find({ UserName: User2[i].Member[0] })

                            if (User3[0].VehicleDetail[0].RegistrationNumber == User2[i].RegistrationNumber) {
                                var PushData = User3[0].VehicleDetail[0];
                            } else {
                                var PushData = User3[0].VehicleDetail[1];
                            }

                            await SendData.push({
                                "Name1": User2[i].CarParkBy,
                                "Name2": User2[i].Member[0],
                                "RegistrationNumber": User2[i].RegistrationNumber,
                                "Make": PushData.CompanyName,
                                "Model": PushData.Model
                            })

                        }

                        var SendData2 = SendData.reverse();

                        var message2 = { "message": "Data Load Successfully", "data": SendData2, "status": `${HTTP.SUCCESS}` }
                        res.status(HTTP.SUCCESS).json(message2);

                    } else {
                        var a = { "message": "Token has expired", "status": `${HTTP.UNAUTHORIZED}` }
                        res.status(HTTP.UNAUTHORIZED).json(a);
                    }

                } else {
                    var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                    res.status(HTTP.NOT_FOUND).json(a);
                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static o = async (req, res) => {
        try {

            if (req.UserName) {

                const headerValue = req.get('Authorization');

                var User = await Todo2.findOne({ UserName: req.UserName })

                if (User) {

                    if (headerValue == User.token) {

                        var User2 = await Todo4.find({ Parklocation: User.UnitName, status: "Requested" })
                        var SendData = [];

                        for (var i = 0; i < User2.length; i++) {

                            var User3 = await Todo.find({ UserName: User2[i].Member[0] })

                            if (User3[0].VehicleDetail[0].RegistrationNumber == User2[i].RegistrationNumber) {
                                var PushData = User3[0].VehicleDetail[0];
                            } else {
                                var PushData = User3[0].VehicleDetail[1];
                            }

                            if (User2[i].UserWaitTime.length == 1) {
                                var Time = User2[i].UserWaitTime[0];
                            } else {
                                var Time = User2[i].UserWaitTime[2];
                            }

                            await SendData.push({
                                "Name1": User2[i].CarParkBy,
                                "Name2": User2[i].Member[0],
                                "RegistrationNumber": User2[i].RegistrationNumber,
                                "Make": PushData.CompanyName,
                                "Time": Time,
                                "Model": PushData.Model,
                                "Request": User3[0].Request
                            })

                        }

                        // var SendData2 = await SendData.reverse();
                        const SendData2 = await SendData.sort((a, b) => b.Request - a.Request);

                        var message2 = { "message": "Data Load Successfully", "data": SendData2, "status": `${HTTP.SUCCESS}` }
                        res.status(HTTP.SUCCESS).json(message2);

                    } else {
                        var a = { "message": "Token has expired", "status": `${HTTP.UNAUTHORIZED}` }
                        res.status(HTTP.UNAUTHORIZED).json(a);
                    }

                } else {
                    var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                    res.status(HTTP.NOT_FOUND).json(a);
                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static p = async (req, res) => {
        try {

            if (req.UserName) {

                const headerValue = req.get('Authorization');

                var User = await Todo2.findOne({ UserName: req.UserName })

                if (User) {

                    if (headerValue == User.token) {

                        var data = await [User.UserWaitTime[0].Monday[0][1], User.UserWaitTime[0].Tuesday[0][1], User.UserWaitTime[0].Wednesday[0][1], User.UserWaitTime[0].Thursday[0][1], User.UserWaitTime[0].Friday[0][1], User.UserWaitTime[0].Saturday[0][1], User.UserWaitTime[0].Sunday[0][1]]
                        var message2 = { "message": "Data Load Successfully", "data": data, "status": `${HTTP.SUCCESS}` }
                        res.status(HTTP.SUCCESS).json(message2);

                    } else {
                        var a = { "message": "Token has expired", "status": `${HTTP.UNAUTHORIZED}` }
                        res.status(HTTP.UNAUTHORIZED).json(a);
                    }

                } else {
                    var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                    res.status(HTTP.NOT_FOUND).json(a);
                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static q = async (req, res) => {
        try {

            if (req.UserName && req.body.Day1 && req.body.Day2 && req.body.Day3 && req.body.Day4 && req.body.Day5 && req.body.Day6 && req.body.Day7) {

                const headerValue = req.get('Authorization');

                var User = await Todo2.findOne({ UserName: req.UserName })

                if (User) {

                    if (headerValue == User.token) {

                        var UserWaitTimeArray = [{
                            "Monday": [
                                [
                                    "",
                                    req.body.Day1
                                ]
                            ],
                            "Tuesday": [
                                [
                                    "",
                                    req.body.Day2
                                ]
                            ],
                            "Wednesday": [
                                [
                                    "",
                                    req.body.Day3
                                ]
                            ],
                            "Thursday": [
                                [
                                    "",
                                    req.body.Day4
                                ]
                            ],
                            "Friday": [
                                [
                                    "",
                                    req.body.Day5
                                ]
                            ],
                            "Saturday": [
                                [
                                    "",
                                    req.body.Day6
                                ]
                            ],
                            "Sunday": [
                                [
                                    "",
                                    req.body.Day7
                                ]
                            ]
                        }];

                        User.UserWaitTime = await UserWaitTimeArray;
                        User.save();

                        var a = { "message": "Data Update Sucessfully", "status": `${HTTP.SUCCESS}` }
                        res.status(HTTP.SUCCESS).json(a);

                    } else {
                        var a = { "message": "Token has expired", "status": `${HTTP.UNAUTHORIZED}` }
                        res.status(HTTP.UNAUTHORIZED).json(a);
                    }

                } else {
                    var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                    res.status(HTTP.NOT_FOUND).json(a);
                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static r = async (req, res) => {
        try {

            if (req.UserName) {

                const headerValue = req.get('Authorization');

                var User = await Todo2.findOne({ UserName: req.UserName })

                if (User) {

                    if (headerValue == User.token) {

                        var SendData = [];

                        var User2 = await Todo4.find({ Parklocation: User.UnitName, status: "Parked" })
                        if (User2.length !== 0) {

                            var User6 = await Todo.find({ UserName: User2[User2.length - 1].Member[0] })

                            if (User6[User6.length - 1].VehicleDetail[0].RegistrationNumber == User2[User2.length - 1].RegistrationNumber) {
                                var PushData = User6[User6.length - 1].VehicleDetail[0];
                            } else {
                                var PushData = User6[User6.length - 1].VehicleDetail[1];
                            }

                            await SendData.push({
                                "Name1": User2[User2.length - 1].CarParkBy,
                                "Name2": User2[User2.length - 1].Member[0],
                                "RegistrationNumber": User2[User2.length - 1].RegistrationNumber,
                                "Make": PushData.CompanyName,
                                "Model": PushData.Model,
                                "TotleParkRRequestedLength": User2.length
                            })

                        } else {
                            await SendData.push({
                                "TotleParkRRequestedLength": 0
                            });
                        }

                        var User3 = await Todo4.find({ Parklocation: User.UnitName, status: "Requested" })
                        if (User3.length !== 0) {

                            var SendData4 = [];

                            for (var i = 0; i < User3.length; i++) {

                                var User33 = await Todo.find({ UserName: User3[i].Member[0] })

                                if (User33[0].VehicleDetail[0].RegistrationNumber == User3[i].RegistrationNumber) {
                                    var PushData = User33[0].VehicleDetail[0];
                                } else {
                                    var PushData = User33[0].VehicleDetail[1];
                                }

                                if (User3[i].UserWaitTime.length == 1) {
                                    var Time = User3[i].UserWaitTime[0];
                                } else {
                                    var Time = User3[i].UserWaitTime[2];
                                }

                                await SendData4.push({
                                    "Name1": User3[i].CarParkBy,
                                    "Name2": User3[i].Member[0],
                                    "RegistrationNumber": User3[i].RegistrationNumber,
                                    "Make": PushData.CompanyName,
                                    "Time": Time,
                                    "Model": PushData.Model,
                                    "TotleParkRRequestedLength": User3.length
                                })

                            }

                            // var SendData3 = await SendData4.reverse();
                            const SendData3 = await SendData4.sort((a, b) => b.Request - a.Request);

                            await SendData.push(SendData3[0])

                            // var User7 = await Todo.find({ UserName: User3[User3.length - 1].Member[0] })

                            // if (User7[User7.length - 1].VehicleDetail[0].RegistrationNumber == User3[User3.length - 1].RegistrationNumber) {
                            //     var PushData = User7[User7.length - 1].VehicleDetail[0];
                            // } else {
                            //     var PushData = User7[User7.length - 1].VehicleDetail[1];
                            // }

                            // await SendData.push({
                            //     "Name1": User3[User3.length - 1].CarParkBy,
                            //     "Name2": User3[User3.length - 1].Member[0],
                            //     "RegistrationNumber": User3[User3.length - 1].RegistrationNumber,
                            //     "Make": PushData.CompanyName,
                            //     "Model": PushData.Model,
                            //     "TotleParkRRequestedLength": User3.length,
                            //     "Time": User3[User3.length - 1].UserWaitTime[User3[User3.length - 1].UserWaitTime.length - 1]
                            // })

                        } else {
                            await SendData.push({
                                "TotleParkRRequestedLength": 0
                            });
                        }

                        var User4 = await Todo8.find({ BusinessManagerUserName: req.UserName })
                        if (User4.length !== 0) {
                            User4[User4.length - 1].TotleParkRRequestedLength = User4.length;
                            SendData.push(User4[User4.length - 1]);
                        } else {
                            SendData.push({
                                "TotleParkRRequestedLength": 0
                            });
                        }

                        var User5 = await Todo6.find({ ReceiverUserName: req.UserName })
                        if (User5.length !== 0) {
                            User5[User5.length - 1].TotleParkRRequestedLength = User5.length;
                            SendData.push(User5[User5.length - 1]);
                        } else {
                            SendData.push({
                                "TotleParkRRequestedLength": 0
                            });
                        }

                        var SendData2 = {
                            "Parked": SendData[0],
                            "Requested": SendData[1],
                            "Valet": SendData[2],
                            "Intimate": SendData[3]
                        }
                        var message2 = { "message": "Data Load Successfully", "data": SendData2, "status": `${HTTP.SUCCESS}` }
                        res.status(HTTP.SUCCESS).json(message2);

                    } else {
                        var a = { "message": "Token has expired", "status": `${HTTP.UNAUTHORIZED}` }
                        res.status(HTTP.UNAUTHORIZED).json(a);
                    }

                } else {
                    var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                    res.status(HTTP.NOT_FOUND).json(a);
                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static s = async (req, res) => {
        try {

            var User = await Todo7.find({})

            const suratTimezone = 'Asia/Kolkata';

            const currentTimeInSurat2 = moment().tz(suratTimezone).format('YYYY-MM-DDTHH:mm:ss')

            async function checkDateStatus(inputDate, inputDate2, inputDate3) {

                const currentTimeInSurat2 = moment().tz(suratTimezone).format('YYYY-MM-DDTHH:mm:ss')
                const currentDate = moment(currentTimeInSurat2);
                const inputDateTime = moment(inputDate);

                if (inputDateTime.isSame(currentDate, 'minute')) {

                    var User = await Todo2.findOne({ UserName: inputDate3 })

                    let data2 = new Todo7({
                        UserName: User.UserName,
                        Message: `${inputDate2} is waiting for someone to accept the car request`,
                        ParkInTime: currentTimeInSurat2
                    });

                    await data2.save();

                    const message = {
                        notification: {
                            title: `${inputDate2} is waiting for someone to accept the car request`,
                        },
                        android: {
                            notification: {
                                sound: 'default'
                            }
                        },
                        apns: {
                            payload: {
                                aps: {
                                    sound: 'default'
                                }
                            }
                        },
                        token: User.Fcm,
                    };

                    fcm.send(message)
                        .then((response) => {

                        })
                        .catch((error) => {
                            console.log(error);
                        });

                }

            }

            for (var i = 0; i < User.length; i++) {

                if (User[i].NotificationRemainingTime && User[i].BusinessUserName) {

                    const inputDate = User[i].NotificationRemainingTime;
                    const inputDate2 = User[i].UserName;
                    const inputDate3 = User[i].BusinessUserName;

                    checkDateStatus(inputDate, inputDate2, inputDate3);

                }

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static t = async (req, res) => {
        try {

            if (req.UserName) {

                const headerValue = req.get('Authorization');

                var User = await Todo8.findOne({ Username: req.UserName })

                if (User) {

                    if (headerValue == User.token) {

                        var User2 = await Todo8.find({ _id: req.body._id })

                        for (var i = 0; i < req.files.length; i++) {
                            await User2[0].Profile.unshift(Ip + "/public/" + req.files[i].filename);
                            User2[0].save();
                        }

                        if (req.body.Username || req.body.Phone) {

                            if (req.body.Username && req.body.Phone) {

                                var LowerCaseUsername = await req.body.Username.toLowerCase();
                                const token = jwt.sign({ UserName: LowerCaseUsername }, SECRET_KEY);

                                var a = await req.body.Username.toLowerCase();

                                var User3 = await Todo2.findOne({ Phone: req.body.Phone })
                                var User4 = await Todo8.findOne({ Phone: req.body.Phone })
                                var User5 = await Todo2.findOne({ UserName: a })
                                var User6 = await Todo8.findOne({ Username: a })

                                if (!User3 && !User4 && !User5 && !User6) {

                                    if (req.body.Name) {
                                        User2[0].Name = req.body.Name;
                                    }

                                    if (req.body.Password) {
                                        var hashedPassword = await bcrypt.hash(req.body.Password, 12);
                                        User2[0].Password = hashedPassword;
                                    }

                                    User2[0].Phone = req.body.Phone;
                                    User2[0].Username = a;
                                    User2[0].token = token;
                                    User2[0].save();

                                    var message2 = { "message": "Valet Update Successfully", "status": `${HTTP.SUCCESS}` }
                                    res.status(HTTP.SUCCESS).json(message2);

                                } else {

                                    if ((User3 || User4) && (User5 || User6)) {
                                        var message2 = { "message": "Please Choose Another Phone Number And Username", "status": `${HTTP.NOT_ALLOWED}` }
                                        res.status(HTTP.NOT_ALLOWED).json(message2);
                                    } else if ((User3 || User4)) {
                                        var message2 = { "message": "Please Choose Another Phone Number", "status": `${HTTP.NOT_ALLOWED}` }
                                        res.status(HTTP.NOT_ALLOWED).json(message2);
                                    } else {
                                        var message2 = { "message": "Please Choose Another UserName", "status": `${HTTP.NOT_ALLOWED}` }
                                        res.status(HTTP.NOT_ALLOWED).json(message2);
                                    }

                                }

                            } else if (req.body.Username) {

                                var LowerCaseUsername = await req.body.Username.toLowerCase();
                                const token = jwt.sign({ UserName: LowerCaseUsername }, SECRET_KEY);

                                var a = await req.body.Username.toLowerCase();
                                var User3 = await Todo2.findOne({ UserName: a })
                                var User4 = await Todo8.findOne({ Username: a })

                                if (!User3 && !User4) {

                                    if (req.body.Name) {
                                        User2[0].Name = req.body.Name;
                                    }

                                    if (req.body.Password) {
                                        var hashedPassword = await bcrypt.hash(req.body.Password, 12);
                                        User2[0].Password = hashedPassword;
                                    }

                                    User2[0].Username = a;
                                    User2[0].token = token;
                                    User2[0].save();

                                    var message2 = { "message": "Valet Update Successfully", "status": `${HTTP.SUCCESS}` }
                                    res.status(HTTP.SUCCESS).json(message2);

                                } else {
                                    var message2 = { "message": "Please Choose Another UserName", "status": `${HTTP.NOT_ALLOWED}` }
                                    res.status(HTTP.NOT_ALLOWED).json(message2);
                                }

                            } else {

                                var User3 = await Todo2.findOne({ Phone: req.body.Phone })
                                var User4 = await Todo8.findOne({ Phone: req.body.Phone })

                                if (!User3 && !User4) {

                                    if (req.body.Name) {
                                        User2[0].Name = req.body.Name;
                                    }

                                    if (req.body.Password) {
                                        var hashedPassword = await bcrypt.hash(req.body.Password, 12);
                                        User2[0].Password = hashedPassword;
                                    }

                                    User2[0].Phone = req.body.Phone;
                                    User2[0].save();

                                    var message2 = { "message": "Valet Update Successfully", "status": `${HTTP.SUCCESS}` }
                                    res.status(HTTP.SUCCESS).json(message2);

                                } else {
                                    var message2 = { "message": "Please Choose Another Phone Number", "status": `${HTTP.NOT_ALLOWED}` }
                                    res.status(HTTP.NOT_ALLOWED).json(message2);
                                }

                            }

                        } else {

                            if (req.body.Name) {
                                User2[0].Name = req.body.Name;
                                // User2[0].Profile = b;
                                User2[0].save();
                            }

                            if (req.body.Password) {
                                var hashedPassword = await bcrypt.hash(req.body.Password, 12);
                                User2[0].Password = hashedPassword;
                                // User2[0].Profile = b;
                                User2[0].save();
                            }

                            var message2 = { "message": "Valet Update Successfully", "status": `${HTTP.SUCCESS}` }
                            res.status(HTTP.SUCCESS).json(message2);

                        }

                    } else {
                        var a = { "message": "Token has expired", "status": `${HTTP.UNAUTHORIZED}` }
                        res.status(HTTP.UNAUTHORIZED).json(a);
                    }

                } else {
                    var message2 = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                    res.status(HTTP.NOT_FOUND).json(message2);
                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static u = async (req, res) => {
        try {
            const response = await axios.get("https://script.googleusercontent.com/macros/echo?user_content_key=obXmgEiZR-BfQMcwCsdgbNnPzHN1kHwmtbkNVY2-PR7G2srDn3hVTDPy2b0veNEhmvhHKn12tJPdYO6W_VUjFmqfg--ElfwRm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnJaYWBhz5wfVLkgtTUwDnLLdIDBSWzbBsMVHTq6y-K-r-K-WpWL0s9kMxkR_CFfV78kchrJTgzmq9E15cQuEZj83w8ye-O6D1Q&lib=Mz_e7_X4Ey1qyKl-o3h_jvVScKf4pGqo7");
            var Company = await Todo5.find({});

            for (var i = 0; i < response.data.length; i++) {

                Company[i].CompanyName = await response.data[i].Company;
                Company[i].Model = await response.data[i].Model;

                await Company[i].save();

            }

            res.send("Data Modified")

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static v = async (req, res) => {
        try {

            if (req.session.userid) {

                var User2 = await Todo3.findOne({ signuptoken: req.session.userid });

                res.render("Change", { User2 });

            } else {

                res.redirect('/Login');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static v = async (req, res) => {
        try {

            if (req.session.userid) {

                var User2 = await Todo3.findOne({ signuptoken: req.session.userid });

                res.render("Change", { User2 });

            } else {

                res.redirect('/Login');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };

    static qrcode = async (req, res) => {
        try {

            var User2 = await Todo3.findOne({ signuptoken: req.session.userid });
            var User = await Todo3.findOne({ signuptoken: req.session.userid });

            var Access1 = await User2.Access1;
            var Access2 = await User2.Access2;
            var Access3 = await User2.Access3;
            var Access4 = await User2.Access4;
            var Access5 = await User2.Access5;
            var Access6 = await User2.Access6;
            var Access7 = await User2.Access7;
            var Access8 = await User2.Access8;
            var Access9 = await User2.Access9;
            var Access10 = await User2.Access10;
            var Access11 = await User2.Access11;
            var Access12 = await User2.Access12;
            var Access13 = await User2.Access13;
            var Access14 = await User2.Access14;
            var Access15 = await User2.Access15;
            var Access16 = await User2.Access16;

            var User3 = await Todo9.find({});

            res.render("QRCode", { User3, User2, User, Ip, Access1, Access2, Access3, Access4, Access5, Access6, Access7, Access8, Access9, Access10, Access11, Access12, Access13, Access14, Access15, Access16 });

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };

    static w = async (req, res) => {
        try {

            if (req.session.userid) {

                var User2 = await Todo3.findOne({ signuptoken: req.session.userid });

                const hashedPassword = await bcrypt.hash(req.body.NewPassword, 12);

                User2.PassWord = hashedPassword;
                await User2.save();

                var message2 = { "message": "New Password Set Sucessfully", "data": `${User2}`, "status": `${HTTP.SUCCESS}` }
                res.status(HTTP.SUCCESS).json(message2);

            } else {

                res.redirect('/Login');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static x = async (req, res) => {
        try {

            // var SendData = await Todo9.find({});
            // var SendData2 = []; 

            if (req.Phone) {

                const convertedPhoneNumber = await req.Phone.slice(0, 3);

                if (convertedPhoneNumber == +91) {
                    var User = await "Indian"
                } else {
                    var User = await "US"
                }

                var SendData = await Todo9.find({ User: User });

                var SendData2 = [];

                var User = await Todo.findOne({ Phone: req.Phone })

                if (User) {

                    function compareDates(inputDate, inputDate2) {

                        const inputDateTime = new Date(inputDate);
                        const inputDateTime2 = new Date(inputDate2);

                        const inputYear = inputDateTime.getFullYear();
                        const inputMonth = inputDateTime.getMonth() + 1;
                        const inputDay = inputDateTime.getDate();

                        const inputYear2 = inputDateTime2.getFullYear();
                        const inputMonth2 = inputDateTime2.getMonth() + 1;
                        const inputDay2 = inputDateTime2.getDate();

                        if (inputYear > inputYear2 || (inputYear === inputYear2 && inputMonth > inputMonth2) || (inputYear === inputYear2 && inputMonth === inputMonth2 && inputDay > inputDay2)) {
                            //   return "Future"
                            return 1
                        } else if (inputYear === inputYear2 && inputMonth === inputMonth2 && inputDay === inputDay2) {
                            //   return "Current"
                            return 0
                        } else {
                            //   return "Past"
                            return -1
                        }
                    }

                    const inputDateTime = await User.PlanExpiredDate;

                    const inputDateTime2 = new Date();

                    const year = inputDateTime2.getFullYear();
                    const month = inputDateTime2.getMonth() + 1;
                    const day = inputDateTime2.getDate();

                    let inputDateTime3 = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

                    var a = await compareDates(inputDateTime, inputDateTime3);

                    if (-1 < a) {

                        for (var i = 0; i < SendData.length; i++) {

                            if (SendData[i].Plan == User.PlanPurchase) {

                                var ab = {
                                    "Plan": SendData[i].Plan,
                                    "PlanAmount": SendData[i].PlanAmount,
                                    "ActualPrice": SendData[i].ActualPrice,
                                    "Message": SendData[i].Message,
                                    "OffAmount": SendData[i].OffAmount,
                                    "Active": 1
                                }
                            } else {

                                var ab = {
                                    "Plan": SendData[i].Plan,
                                    "PlanAmount": SendData[i].PlanAmount,
                                    "ActualPrice": SendData[i].ActualPrice,
                                    "Message": SendData[i].Message,
                                    "OffAmount": SendData[i].OffAmount,
                                    "Active": 0
                                }

                            }
                            await SendData2.push(ab);
                        }

                        var message = { "message": "Data Load Successfully", "data": SendData2, "status": `${HTTP.SUCCESS}` }
                        res.status(HTTP.SUCCESS).json(message);

                    } else {

                        for (var i = 0; i < SendData.length; i++) {

                            var ab = {
                                "Plan": SendData[i].Plan,
                                "PlanAmount": SendData[i].PlanAmount,
                                "ActualPrice": SendData[i].ActualPrice,
                                "Message": SendData[i].Message,
                                "OffAmount": SendData[i].OffAmount,
                                "Active": 0
                            }

                            await SendData2.push(ab);
                        }

                        var newsortarray = [];

                        newsortarray.push(SendData2[2])
                        newsortarray.push(SendData2[0])
                        newsortarray.push(SendData2[1])

                        var message = { "message": "Data Load Successfully", "data": newsortarray, "status": `${HTTP.SUCCESS}` }
                        res.status(HTTP.SUCCESS).json(message);
                    }

                } else {
                    var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                    res.status(HTTP.NOT_FOUND).json(a);
                }

            } else if (req.UserName) {

                var User = await Todo8.findOne({ Username: req.UserName })
                var User2 = await Todo2.findOne({ UserName: req.UserName })

                if (User) {
                    var User3 = await User
                } else {
                    var User3 = await User2
                }

                if (User3) {

                    function compareDates(inputDate, inputDate2) {

                        const inputDateTime = new Date(inputDate);
                        const inputDateTime2 = new Date(inputDate2);

                        const inputYear = inputDateTime.getFullYear();
                        const inputMonth = inputDateTime.getMonth() + 1;
                        const inputDay = inputDateTime.getDate();

                        const inputYear2 = inputDateTime2.getFullYear();
                        const inputMonth2 = inputDateTime2.getMonth() + 1;
                        const inputDay2 = inputDateTime2.getDate();

                        if (inputYear > inputYear2 || (inputYear === inputYear2 && inputMonth > inputMonth2) || (inputYear === inputYear2 && inputMonth === inputMonth2 && inputDay > inputDay2)) {
                            //   return "Future"
                            return 1
                        } else if (inputYear === inputYear2 && inputMonth === inputMonth2 && inputDay === inputDay2) {
                            //   return "Current"
                            return 0
                        } else {
                            //   return "Past"
                            return -1
                        }

                    }

                    var User4 = await Todo9.find({ Plan: User3.PlanPurchase });

                    const inputDateTime = await User3.PlanExpiredDate;

                    const inputDateTime2 = new Date();

                    const year = inputDateTime2.getFullYear();
                    const month = inputDateTime2.getMonth() + 1;
                    const day = inputDateTime2.getDate();

                    let inputDateTime3 = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

                    var a = await compareDates(inputDateTime, inputDateTime3);

                    if (-1 < a) {

                        for (var i = 0; i < SendData.length; i++) {

                            if (SendData[i].Plan == User3.PlanPurchase) {

                                var ab = {
                                    "Plan": SendData[i].Plan,
                                    "PlanAmount": SendData[i].PlanAmount,
                                    "ActualPrice": SendData[i].ActualPrice,
                                    "Message": SendData[i].Message,
                                    "OffAmount": SendData[i].OffAmount,
                                    "Active": 1
                                }

                            } else {

                                var ab = {
                                    "Plan": SendData[i].Plan,
                                    "PlanAmount": SendData[i].PlanAmount,
                                    "ActualPrice": SendData[i].ActualPrice,
                                    "Message": SendData[i].Message,
                                    "OffAmount": SendData[i].OffAmount,
                                    "Active": 0
                                }

                            }

                            await SendData2.push(ab);

                        }

                        var message = { "message": "Data Load Successfully", "data": SendData2, "status": `${HTTP.SUCCESS}` }
                        res.status(HTTP.SUCCESS).json(message);

                    } else {

                        for (var i = 0; i < SendData.length; i++) {

                            var ab = {
                                "Plan": SendData[i].Plan,
                                "PlanAmount": SendData[i].PlanAmount,
                                "ActualPrice": SendData[i].ActualPrice,
                                "Message": SendData[i].Message,
                                "OffAmount": SendData[i].OffAmount,
                                "Active": 0
                            }

                            await SendData2.push(ab);

                        }

                        var message = { "message": "Data Load Successfully", "data": SendData2, "status": `${HTTP.SUCCESS}` }
                        res.status(HTTP.SUCCESS).json(message);

                    }

                } else {

                    var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                    res.status(HTTP.NOT_FOUND).json(a);

                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static y = async (req, res) => {
        try {

            const currentDate = await new Date();
            const currentDate2 = await new Date();

            if (req.body.PlanType == "Single Payment") {
                await currentDate.setMonth(currentDate.getMonth());
            } else if (req.body.PlanType == "Half Yearly Payment") {
                await currentDate.setMonth(currentDate.getMonth() + 6);
            } else {
                await currentDate.setMonth(currentDate.getMonth() + 12);
            }

            let year = await currentDate.getFullYear();
            let month = await currentDate.getMonth() + 1;
            let day = await currentDate.getDate();

            let PlanExpiredDate = await `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

            if (req.Phone && req.body.PlanType) {

                var User = await Todo.findOne({ Phone: req.Phone })

                if (User) {

                    User.PlanPurchase = req.body.PlanType;
                    User.PlanExpiredDate = await PlanExpiredDate;
                    User.OfficialPlanExpiredDate = await PlanExpiredDate;

                    await User.save();

                    var a = { "message": "Plan Purchase", "status": `${HTTP.SUCCESS}` }
                    res.status(HTTP.SUCCESS).json(a);

                } else {

                    var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                    res.status(HTTP.NOT_FOUND).json(a);

                }

            } else if (req.UserName && req.body.PlanType) {

                var User = await Todo8.findOne({ Username: req.UserName })
                var User2 = await Todo2.findOne({ UserName: req.UserName })

                if (User) {
                    var User3 = await User
                } else {
                    var User3 = await User2
                }

                if (User3) {

                    User3.PlanPurchase = req.body.PlanType;
                    User3.PlanExpiredDate = await PlanExpiredDate;
                    User3.OfficialPlanExpiredDate = await PlanExpiredDate;

                    await User3.save();

                    var a = { "message": "Plan Purchase", "status": `${HTTP.SUCCESS}` }
                    res.status(HTTP.SUCCESS).json(a);

                } else {

                    var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                    res.status(HTTP.NOT_FOUND).json(a);

                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static z = async (req, res) => {
        try {

            if (req.Phone) {

                const headerValue = req.get('Authorization');

                var User = await Todo.findOne({ Phone: req.Phone })

                if (headerValue == User.token) {

                    var FindAndDeleteMany = await Todo7.find({ UserName: User.UserName });

                    for (var i = 0; i < FindAndDeleteMany.length; i++) {

                        if (FindAndDeleteMany[i].NotificationRemainingTime) {
                        } else {
                            await FindAndDeleteMany[i].deleteOne();
                        }

                    }

                    var message = { "message": "Delete All Notification Successfully", "status": `${HTTP.SUCCESS}` }
                    res.status(HTTP.SUCCESS).json(message);

                } else {
                    var a = { "message": "Token has expired", "status": `${HTTP.UNAUTHORIZED}` }
                    res.status(HTTP.UNAUTHORIZED).json(a);
                }



            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static A = async (req, res) => {
        try {

            if (req.UserName) {

                const headerValue = req.get('Authorization');

                var User = await Todo2.findOne({ UserName: req.UserName })

                if (headerValue == User.token) {

                    var User2 = await Todo7.find({ UserName: User.UserName, ParkInTime: { $ne: "" } })

                    var User3 = [];

                    for (var i = 0; i < User2.length; i++) {

                        const inputDate = new Date(User2[i].ParkInTime);
                        const options = { month: 'long' };
                        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(inputDate);

                        const year = inputDate.getFullYear();
                        const month = String(inputDate.getMonth() + 1).padStart(2, '0');
                        const day = String(inputDate.getDate()).padStart(2, '0');
                        const hours = String(inputDate.getHours()).padStart(2, '0');
                        const minutes = String(inputDate.getMinutes()).padStart(2, '0');
                        const seconds = String(inputDate.getSeconds()).padStart(2, '0');

                        function addSuffix(number) {

                            if (number % 100 >= 11 && number % 100 <= 13) {
                                return number + "th";
                            }

                            switch (number % 10) {
                                case 1:
                                    return number + "st";
                                case 2:
                                    return number + "nd";
                                case 3:
                                    return number + "rd";
                                default:
                                    return number + "th";
                            }

                        }

                        const formattedTime3 = inputDate.toISOString().slice(0, 19).replace('T', ' ');

                        const FinalFormattedDate = `${formattedDate} ${addSuffix(day)}, ${hours}:${minutes}`;

                        var a = {
                            "_id": User2[i]._id,
                            "UserName": User2[i].UserName,
                            "Message": User2[i].Message,
                            "ParkInTime": FinalFormattedDate,
                            "__v": User2[i].__v
                        }

                        await User3.push(a);

                    }

                    var User4 = await User3.reverse();

                    var message = { "message": "Data Load Successfully", "data": User4, "status": `${HTTP.SUCCESS}` }
                    res.status(HTTP.SUCCESS).json(message);

                } else {
                    var a = { "message": "Token has expired", "status": `${HTTP.UNAUTHORIZED}` }
                    res.status(HTTP.UNAUTHORIZED).json(a);
                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static B = async (req, res) => {
        try {

            if (req.session.userid) {

                var User = await Todo3.find({});

                var User2 = await Todo3.findOne({ signuptoken: req.session.userid });

                var Access1 = await User2.Access1;
                var Access2 = await User2.Access2;
                var Access3 = await User2.Access3;
                var Access4 = await User2.Access4;
                var Access5 = await User2.Access5;
                var Access6 = await User2.Access6;
                var Access7 = await User2.Access7;
                var Access8 = await User2.Access8;
                var Access9 = await User2.Access9;
                var Access10 = await User2.Access10;
                var Access11 = await User2.Access11;
                var Access12 = await User2.Access12;
                var Access13 = await User2.Access13;
                var Access14 = await User2.Access14;
                var Access15 = await User2.Access15;
                var Access16 = await User2.Access16;

                var User3 = await Todo9.find({});

                res.render("Payment", { User3, User2, User, Ip, Access1, Access2, Access3, Access4, Access5, Access6, Access7, Access8, Access9, Access10, Access11, Access12, Access13, Access14, Access15, Access16 });

            } else {

                res.redirect('/Login');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static C = async (req, res) => {
        try {

            if (req.session.userid) {

                var User = await Todo9.find({});
                var DataaValueArray = await req.body.DataArray;

                for (var i = 0; i < User.length; i++) {

                    User[i].PlanAmount = await DataaValueArray[i]
                    await User[i].save();
                }

                const response = { "message": "Payment Related Data Update Successfully", "status": HTTP.SUCCESS };
                res.status(HTTP.SUCCESS).json(response);

            } else {

                res.redirect('/Login');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static D = async (req, res) => {
        try {

            var User = await Todo.find({});

            for (var i = 0; i < User.length; i++) {

                if (User[i].VehicleDetail) {

                    const suratTimezone = 'Asia/Kolkata';
                    const currentTimeInSurat = moment().tz(suratTimezone);
                    const futureTimeInSurat = currentTimeInSurat.add(5, 'minutes');
                    const formattedFutureTime = futureTimeInSurat.format('YYYY-MM-DDTHH:mm');

                    if (User[i].VehicleDetail[0]) {

                        if (User[i].VehicleDetail[0].RegistrationNumber == req.body.RegistrationNumber) {

                            User[i].VehicleDetail[0].status = req.body.Status;
                            User[i].VehicleDetail[0].StatusChange = formattedFutureTime;
                            User[i].VehicleDetail[0].status2 = req.body.Status2;

                            // if(req.body.Status2){
                            //     User[i].VehicleDetail[0].status2 = req.body.Status2;
                            // }

                            await User[i].save();

                        }

                    }

                    if (User[i].VehicleDetail[1]) {

                        if (User[i].VehicleDetail[1].RegistrationNumber == req.body.RegistrationNumber) {

                            User[i].VehicleDetail[1].status = req.body.Status;
                            User[i].VehicleDetail[1].StatusChange = formattedFutureTime;
                            User[i].VehicleDetail[1].status2 = req.body.Status2;

                            // if(req.body.Status2){
                            //     User[i].VehicleDetail[1].status2 = req.body.Status2;
                            // }

                            await User[i].save();

                        }

                    }

                }

            }

            var message2 = { "message": "Data Load Successfully", "status": `${HTTP.SUCCESS}` }
            res.status(HTTP.SUCCESS).json(message2);

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static E = async (req, res) => {
        try {

            var User = await Todo.find({});

            const suratTimezone = 'Asia/Kolkata';
            const currentTimeInSurat = moment().tz(suratTimezone).format('YYYY-MM-DDTHH:mm');

            for (var i = 0; i < User.length; i++) {

                if (User[i].VehicleDetail) {

                    const currentTimeInSurat2 = moment().tz(suratTimezone);
                    const futureTimeInSurat = currentTimeInSurat2.add(-1, 'minutes');
                    const formattedFutureTime = futureTimeInSurat.format('YYYY-MM-DDTHH:mm');

                    if (User[i].VehicleDetail[0]) {

                        if (User[i].VehicleDetail[0].status == "Deliver" && User[i].VehicleDetail[0].StatusChange == currentTimeInSurat) {

                            User[i].VehicleDetail[0].status = " ";
                            User[i].VehicleDetail[0].StatusChange = formattedFutureTime;
                            await User[i].save();

                        }

                    }

                    if (User[i].VehicleDetail[1]) {

                        if (User[i].VehicleDetail[1].status == "Deliver" && User[i].VehicleDetail[1].StatusChange == currentTimeInSurat) {

                            User[i].VehicleDetail[1].status = " ";
                            User[i].VehicleDetail[1].StatusChange = formattedFutureTime;
                            await User[i].save();

                        }

                    }

                }

            }

            // var message2 = { "message": "Data Load Successfully", "status": `${HTTP.SUCCESS}` }
            // res.status(HTTP.SUCCESS).json(message2);

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static F = async (req, res) => {
        try {

            const suratTimezone = 'Asia/Kolkata';
            const currentTimeInSurat2 = moment().tz(suratTimezone).format('YYYY-MM-DDTHH:mm:ss')

            var User = await Todo7.find({ ParkInTime: "", NotificationRemainingTime: currentTimeInSurat2 });

            for (var i = 0; i < User.length; i++) {

                User[i].ParkInTime = await User[i].NotificationRemainingTime
                User[i].NotificationRemainingTime = await undefined

                await User[i].save();

                var User2 = await Todo.find({ UserName: User[i].UserName });

                var FcmToken = await User2[0].Fcm;
                var SendingMessage = await User[i].Message;

                const message = {
                    notification: {
                        title: SendingMessage
                    },
                    android: {
                        notification: {
                            sound: 'default'
                        }
                    },
                    apns: {
                        payload: {
                            aps: {
                                sound: 'default'
                            }
                        }
                    },
                    token: FcmToken,
                };

                fcm.send(message)
                    .then((response) => {

                        // var a = { "message": "Notification Send Sucessfully", "status": `${HTTP.SUCCESS}` }
                        // res.status(HTTP.SUCCESS).json(a);

                    })
                    .catch((error) => {

                        // var a = { "message": "Notification Does Not Send", "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
                        // res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);

                    });

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static G = async (req, res) => {
        try {

            const address = req.body.Address;

            axios.get(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`)
                .then(async (response) => {

                    if (response.status === 200) {

                        const data = response.data;

                        if (data.length > 0) {

                            const latitude = await data[0].lat;
                            const longitude = await data[0].lon;

                            const SendData = {
                                "latitude": latitude,
                                "longitude": longitude,
                                "ApiCallStatus": 1,
                            }

                            res.send(SendData);

                        } else {

                            const SendData = {
                                "message": "Address not found",
                                "ApiCallStatus": 0,
                            }

                            res.send(SendData);


                        }

                    } else {

                        const SendData = {
                            "message": "Unexpected status code",
                            "ApiCallStatus": 0,
                        }

                        res.send(SendData);


                    }

                })
                .catch((error) => {

                    const SendData = {
                        "message": "Error",
                        "ApiCallStatus": 0,
                    }

                    res.send(SendData);

                });

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static H = async (req, res) => {
        try {
            res.render("index");
        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static I = async (req, res) => {
        try {
            var User = await Todo.findOne({ _id: req.params.id })
            if (User.Phone) {

                var User2 = await Todo.findOne({ Phone: User.Phone })

                if (User2) {

                    var User3 = await Todo.findOne({ Phone: User.Phone })

                    var DeleteStatus = 0;

                    for (var i = 0; i < User3.VehicleDetail.length; i++) {

                        if (User3.VehicleDetail[i].status) {

                            if (User3.VehicleDetail[i].status !== "") {
                                var DeleteStatus = 1;
                            }

                        }

                        if (User3.VehicleDetail[i].status2) {

                            if (User3.VehicleDetail[i].status2 !== "") {
                                var DeleteStatus = 1;
                            }

                        }

                    }

                    if (DeleteStatus == 0) {

                        await Todo.findOne({ Phone: User.Phone }).deleteMany();

                        var a = { "message": "Customer Delete Successfully", "status": `${HTTP.SUCCESS}` }
                        res.status(HTTP.SUCCESS).json(a);
                    } else {
                        var a = { "message": "Customer Does Not Delete", "status": `${HTTP.UNAUTHORIZED}` }
                        res.status(HTTP.UNAUTHORIZED).json(a);
                    }

                } else {

                    var a = { "message": "Customer Delete Successfully", "status": `${HTTP.SUCCESS}` }
                    res.status(HTTP.SUCCESS).json(a);
                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static J = async (req, res) => {
        try {

            if (req.Phone) {

                var User = await Todo.findOne({ Phone: req.Phone })

                if (User) {

                    const headerValue = req.get('Authorization');

                    if (User.token == headerValue) {

                        const currentDate2 = await new Date();

                        currentDate2.setDate(currentDate2.getDate() - 1);

                        const year = await currentDate2.getFullYear();
                        const month = await currentDate2.getMonth() + 1;
                        const day = await currentDate2.getDate();

                        let PlanExpiredDate = await `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

                        User.PlanExpiredDate = await PlanExpiredDate;
                        User.OfficialPlanExpiredDate = await PlanExpiredDate;
                        // // User.PlanPurchase = await "";

                        await User.save();

                        var a = { "message": "Plan Cancle", "status": `${HTTP.SUCCESS}` }
                        res.status(HTTP.SUCCESS).json(a);

                    } else {
                        var a = { "message": "Token has expired", "status": `${HTTP.UNAUTHORIZED}` }
                        res.status(HTTP.UNAUTHORIZED).json(a);
                    }

                } else {

                    var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                    res.status(HTTP.NOT_FOUND).json(a);

                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static K = async (req, res) => {
        try {

            if (req.Phone && req.body.Date) {

                var User = await Todo.findOne({ Phone: req.Phone })

                if (User) {

                    const headerValue = req.get('Authorization');

                    if (User.token == headerValue) {

                        var VehicleDetailArray = [];

                        if (User.VehicleDetail) {

                            for (var j = 0; j < User.VehicleDetail.length; j++) {

                                var PushVehicle = User.VehicleDetail[j];

                                var User2 = await Todo10.find({ Date: req.body.Date, RegistrationNumber: PushVehicle.RegistrationNumber, UserAction: "ParkIn" })
                                var User3 = await Todo10.find({ Date: req.body.Date, RegistrationNumber: PushVehicle.RegistrationNumber, UserAction: "ParkOut" })

                                var User2Length
                                var User3Length

                                if (User2.length == 0) {
                                    User2Length = 0
                                } else {
                                    User2Length = 1
                                }

                                if (User3.length == 0) {
                                    User3Length = 0
                                } else {
                                    User3Length = 1
                                }


                                await VehicleDetailArray.push({
                                    RegistrationNumber: PushVehicle.RegistrationNumber,
                                    ParkIn: User2Length,
                                    ParkOut: User3Length
                                })

                            }

                        }

                        var message2 = { "message": "Data Load Successfully", "data": VehicleDetailArray, "status": `${HTTP.SUCCESS}` }
                        res.status(HTTP.SUCCESS).json(message2);

                    } else {
                        var a = { "message": "Token has expired", "status": `${HTTP.UNAUTHORIZED}` }
                        res.status(HTTP.UNAUTHORIZED).json(a);
                    }

                } else {

                    var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                    res.status(HTTP.NOT_FOUND).json(a);

                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static M = async (req, res) => {
        try {

            if (req.Phone && req.body.Date && req.body.RegistrationNumber && req.body.UserAction) {

                var User = await Todo.findOne({ Phone: req.Phone })

                if (User) {

                    const headerValue = req.get('Authorization');

                    if (User.token == headerValue) {

                        var User2 = await Todo10.find({ Date: req.body.Date, RegistrationNumber: req.body.RegistrationNumber, UserAction: req.body.UserAction })

                        // var locations = [];

                        // for(var i=0;i<User2.length;i++){

                        //     for(var j=0;j<User2[i].Pictures.length;j++){
                        //         await locations.push(User2[i].Pictures[j])
                        //     }

                        // }

                        var message2 = { "message": "Data Load Successfully", "data": User2, "status": `${HTTP.SUCCESS}` }
                        res.status(HTTP.SUCCESS).json(message2);

                    } else {
                        var a = { "message": "Token has expired", "status": `${HTTP.UNAUTHORIZED}` }
                        res.status(HTTP.UNAUTHORIZED).json(a);
                    }

                } else {

                    var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                    res.status(HTTP.NOT_FOUND).json(a);

                }

            } else {
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
}

module.exports = { class1, class2 };

