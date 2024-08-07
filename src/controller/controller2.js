var { Todo, Todo2, Todo3, Todo4, Todo5, Todo6, Todo7, Todo8 } = require("../model/schema");
const HTTP = require("../../constant/response.constant");

var jwt = require("jsonwebtoken");
var path = require("path");
var bcrypt = require("bcryptjs");

const moment = require('moment-timezone');

const session = require("express-session");

var SECRET_KEY = process.env.SECRET_KEY || "YOURSECRETKEYGOESHERE";

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
        await class1.U();
    } catch (error) {
        console.error("Error occurred:", error);
    }
}, 60000);

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
                    const response = { "message": "Please choose Another RegistrationNumber", "status": HTTP.UNAUTHORIZED };
                    res.status(HTTP.UNAUTHORIZED).json(response); // status code
                } else {

                    var PictureArray = [];
                    for (var i = 0; i < req.files.length; i++) {
                        await PictureArray.push(process.env.Ip + "/public/" + req.files[i].filename)
                    }

                    if (req.body.UserName && req.body.Phone) {

                        if (req.body.RegistrationNumber) {

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
                                    }
                                ],
                                TimeUpdateStatus: 0
                            })
                            await data.save();

                        } else {

                            let data = new Todo({
                                UserName: req.body.UserName,
                                Email: req.body.Email,
                                Phone: req.body.Phone,
                                VehicleDetail: [],
                                TimeUpdateStatus: 0
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
            var a = { "message": `${err}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
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

                // const a = req.files.map(file => process.env.Ip + "/public/" + file.filename);

                var a = [];
                for (var i = 0; i < req.files.length; i++) {
                    await a.push(process.env.Ip + "/public/" + req.files[i].filename)
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
                    Phone: req.body.Phone,
                    Email: req.body.Email,
                    OfficialPhone: req.body.Phone2,
                    ManagerName2: req.body.ManagerName2,
                    City: CityName,
                    State: StateName,
                    UserWaitTime: UserWaitTimeArray,
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

            var User = await Todo.find({ Phone: req.body.Phone })

            if (User.length == 1) {

                // if (typeof User[0].VehicleDetail[0].CompanyName === 'undefined' && typeof User[0].VehicleDetail[0].Model === 'undefined' && typeof User[0].VehicleDetail[0].RegistrationNumber === 'undefined' && typeof User[0].VehicleDetail[0].Color === 'undefined' && User[0].VehicleDetail[0].Picture.length == 0) {
                //     User[0].VehicleDetail.shift();
                // }

                if (User[0].VehicleDetail.length < 2) {

                    var PictureArray = [];
                    for (var i = 0; i < req.files.length; i++) {
                        PictureArray.push(process.env.Ip + "/public/" + req.files[i].filename)
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

                        User[0].VehicleDetail.push({
                            CompanyName: req.body.CompanyName,
                            Model: req.body.Model,
                            RegistrationNumber: req.body.RegistrationNumber,
                            status: "",
                            Color: req.body.Color,
                            Year: req.body.Year,
                            BodyType: req.body.BodyType,
                            Picture: PictureArray,
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
                var user = await Todo.find({ Phone: req.body.Phone });
                if (user.length == 0) {
                    var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                    res.status(HTTP.NOT_FOUND).json(a);
                } else {

                    function generateRandom6DigitNumber() {
                        const min = 100000;
                        const max = 999999;

                        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

                        return randomNumber;
                    }

                    const otp = generateRandom6DigitNumber();

                    var updateuser = await Todo.findOneAndUpdate({ Phone: req.body.Phone }, { $set: { otp: otp } });
                    await updateuser.save();

                    axios.get(`http://3.109.217.93/index.php?number=${req.body.Phone}&otp=${otp}`)
                        .then((response) => {

                            var a = { "message": "Otp Send", "status": `${HTTP.SUCCESS}` }
                            res.status(HTTP.SUCCESS).json(a);

                        })
                        .catch((error) => {
                            console.error(`Error: ${error}`);
                        });

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

                        if (User) {

                            var updateuser = await Todo2.findOneAndUpdate({ UserName: LowerCaseUsername }, { $set: { token: token, Fcm: req.body.Fcm } }, { new: true });
                            await updateuser.save();

                            var message2 = { "message": "Data Load Successfully", "Type": "Business Account", "data": `${token}`, "status": `${HTTP.SUCCESS}` }
                            res.status(HTTP.SUCCESS).json(message2);

                        } else {

                            var updateuser = await Todo8.findOneAndUpdate({ Username: LowerCaseUsername }, { $set: { token: token, Fcm: req.body.Fcm } }, { new: true });
                            await updateuser.save();

                            var message2 = { "message": "Data Load Successfully", "Type": "Valet Account", "data": `${token}`, "status": `${HTTP.SUCCESS}` }
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

                        const valetTicketPictures = req.files['valetTicket'].map(file => process.env.Ip + "/public/" + file.filename);
                        const carPictures = req.files['carPicture'].map(file => process.env.Ip + "/public/" + file.filename);

                        const suratTimezone = 'Asia/Kolkata';
                        const currentTimeInSurat = moment().tz(suratTimezone).format('YYYY-MM-DDTHH:mm:ss');

                        var Parklocation = await User.BusinessUnitName;

                        const postData2 = {
                            RegistrationNumber: req.body.RegistrationNumber,
                        };

                        const response = await axios.post(`${process.env.Ip}/NumberToMember`, postData2);

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
                            UserWaitTime: [],
                            TimeUpdateStatus: 0,
                            Member: response.data.message
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

                                const response = await axios.post(`${process.env.Ip}/NumberToMember`, postData);

                                if (response.status === 200) {

                                    const UserNameData = response.data.message[0];

                                    var FcmTokenUser = await Todo.find({ UserName: UserNameData })
                                    var FcmToken = await FcmTokenUser[0].Fcm;

                                    axios.post(`${process.env.Ip}/StatusChange`, postData)
                                        .then(response => {

                                            const message = {
                                                notification: {
                                                    title: 'Your Car has been parked',
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
    static h1 = async (req, res) => {
        try {

            if (req.UserName) {

                const headerValue = req.get('Authorization');

                var User = await Todo8.findOne({ Username: req.UserName })

                if (User) {
                    if (User.token == headerValue) {

                        var a = [];
                        for (var i = 0; i < req.files.length; i++) {
                            await a.push(process.env.Ip + "/public/" + req.files[i].filename)
                        }  

                        var Parklocation = await User.BusinessUnitName;

                        const postData2 = {
                            RegistrationNumber: req.body.RegistrationNumber,
                        };

                        const response = await axios.post(`${process.env.Ip}/NumberToMember`, postData2);

                        let data = new Todo4({
                            CompanyName: req.body.CompanyName,
                            Model: req.body.Model,
                            RegistrationNumber: req.body.RegistrationNumber,
                            Color: req.body.Color,
                            CarPicture: a,
                            Parklocation: Parklocation,
                            CarBringer: req.body.CarBringer,
                            CarParkBy: req.UserName,
                            status: "Parked1",
                            UserWaitTime: [],
                            TimeUpdateStatus: 0,
                            Member: response.data.message,
                            ValetStatus:1
                        });

                        await data.save();

                        const postData = {
                            RegistrationNumber: req.body.RegistrationNumber,
                            Status: "Parked1",
                        };

                        axios.post(`${process.env.Ip}/StatusChange`, postData)
                                        .then(response => {

                                            var a = { "message": "Valet upload Car Picture Sucessfully", "status": `${HTTP.SUCCESS}` }
                                            res.status(HTTP.SUCCESS).json(a);

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
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }
        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static h2 = async (req, res) => {
        try {

            if (req.UserName) {

                const headerValue = req.get('Authorization');

                var User = await Todo8.findOne({ Username: req.UserName })

                if (User) {
                    if (User.token == headerValue) {

                        var a = [];
                        for (var i = 0; i < req.files.length; i++) {
                            await a.push(process.env.Ip + "/public/" + req.files[i].filename)
                        }

                        const suratTimezone = 'Asia/Kolkata';
                        const currentTimeInSurat = moment().tz(suratTimezone).format('YYYY-MM-DDTHH:mm:ss');

                        const postData2 = {
                            RegistrationNumber: req.body.RegistrationNumber,
                        };

                        const response = await axios.post(`${process.env.Ip}/NumberToMember`, postData2);

                        const postData = {
                            RegistrationNumber: req.body.RegistrationNumber,
                            Status: "Parked",
                        };

                        var ParkedCar1 = await Todo4.find({ RegistrationNumber: req.body.RegistrationNumber, status: "Parked1" })

                        if (ParkedCar1.length !== 0) {

                            await Todo8.findOneAndUpdate({ Username: req.UserName }, {
                                $set: {
                                    ValetStatus: 0
                                }
                            }, { returnOriginal: false })

                            ParkedCar1[0].valetTicketPicture = a;
                            ParkedCar1[0].ParkInTime = currentTimeInSurat;
                            ParkedCar1[0].save();

                            let data2 = new Todo7({
                                UserName: response.data.message[0],
                                Message: "Car is parked",
                                ParkInTime: currentTimeInSurat
                            });
    
                            await data2.save();
    
                            async function fetchData() {
                                try {
    
                                    const response = await axios.post(`${process.env.Ip}/NumberToMember`, postData);
    
                                    if (response.status === 200) {
    
                                        const UserNameData = response.data.message[0];
    
                                        var FcmTokenUser = await Todo.find({ UserName: UserNameData })
                                        var FcmToken = await FcmTokenUser[0].Fcm;
    
                                        axios.post(`${process.env.Ip}/StatusChange`, postData)
                                            .then(response => {
    
                                                const message = {
                                                    notification: {
                                                        title: 'Your Car has been parked',
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
                            var a = { "message": "Car Not Find IN Intermediate Parking Mode", "status": `${HTTP.NOT_FOUND}` }
                            res.status(HTTP.NOT_FOUND).json(a);
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
    static i = async (req, res) => {
        try {
            var ParkedCar = await Todo4.find({ RegistrationNumber: req.body.RegistrationNumber, status: "Parked" })

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
                                const response = await axios.post(`${process.env.Ip}/WaitTime`, postData2);
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
                        await ParkedCar[0].save();

                        var NotificationUserFcm = await ParkedCar[0].CarParkBy;

                        var NotificationUser = await Todo8.find({ Username: NotificationUserFcm })

                        var NotificationUserFcm3 = NotificationUser[0].Fcm;
                        var NotificationUserFcm2 = User.Fcm;

                        var VehicleParkedBusinessManagerUserName = NotificationUser[0].BusinessManagerUserName;
                        var VehicleOwnerUserName = await ParkedCar[0].Member[0];
                        const postData = {
                            RegistrationNumber: VehicleParkedBusinessManagerUserName,
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
                            BusinessUserName: VehicleParkBusinessUserName
                        });

                        await data2.save();

                        axios.post(`${process.env.Ip}/StatusChange`, postData)
                            .then(response => {

                                fcm.send({
                                    notification: {
                                        title: `Your request has been accepted with wait time: ${result.message} Second`,
                                    },
                                    token: NotificationUserFcm2,
                                })
                                    .then((response) => {

                                        const message2 = {
                                            notification: {
                                                title: `${User.UserName} has requested for Car`,
                                            },
                                            tokens: registrationTokens,
                                        };

                                        fcm.sendMulticast(message2)
                                            .then((response) => {

                                                var a = { "message": "User Can Send Request Sucessfully & Notification sent successfully", "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
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
    static j = async (req, res) => {
        try {
            var ParkedCar = await Todo4.find({ RegistrationNumber: req.body.RegistrationNumber, status: "Requested" })
            if (ParkedCar.length !== 0) {
                const headerValue = req.get('Authorization');

                var User = await Todo8.findOne({ UserName: req.Username })

                if (User) {

                    if (headerValue == User.token) {

                        var User2 = await Todo8.findOne({ UserName: req.Username })
                        User2[0].ValetStatus = 0;
                        await User2[0].save();

                        const suratTimezone = 'Asia/Kolkata';
                        const currentTimeInSurat2 = moment().tz(suratTimezone).format('YYYY-MM-DDTHH:mm:ss')
                        const currentTimeInSurat = moment().tz(suratTimezone);
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

                        ParkedCar[0].RequestTimeDate = req.body.Date;
                        ParkedCar[0].status = req.body.Action;
                        await ParkedCar[0].save();

                        const postData = {
                            RegistrationNumber: req.body.RegistrationNumber,
                            Status: req.body.Action,
                        };

                        async function fetchData() {
                            try {

                                const response = await axios.post(`${process.env.Ip}/NumberToMember`, postData);

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

                                    async function myAsyncFunction() {
                                        try {
                                            const response = await axios.post(`${process.env.Ip}/WaitTime`, postData2);
                                            const data = response.data;
                                            return data;
                                        } catch (error) {
                                            console.error("An error occurred:", error);
                                            throw error;
                                        }
                                    }

                                    const result = await myAsyncFunction();

                                    let data22 = new Todo7({
                                        UserName: UserNameData,
                                        Message: `Car is on the way , waiting time is : ${result.message} min`,
                                        ParkInTime: currentTimeInSurat2,
                                    });

                                    await data22.save();

                                    axios.post(`${process.env.Ip}/StatusChange`, postData)
                                        .then(response => {

                                            const message = {
                                                notification: {
                                                    title: 'Car is on the way',
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
    static k = async (req, res) => {
        try {
            var ParkedCar = await Todo4.find({ RegistrationNumber: req.body.RegistrationNumber, status: "Requested" })

            if (ParkedCar.length !== 0) {

                const headerValue = req.get('Authorization');

                var User = await Todo8.findOne({ UserName: req.Username })

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

                        var a = { "message": "Wallet Can Update user wait time sucessfully", "status": `${HTTP.SUCCESS}` }
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
    static l = async (req, res) => {
        try {

            var ParkedCar = await Todo4.find({ RegistrationNumber: req.body.RegistrationNumber })

            if (ParkedCar.length !== 0) {

                if (ParkedCar[ParkedCar.length - 1].UserWaitTime.length == 0) {

                    const postData = {
                        UserName: req.body.UserName
                    };

                    async function myAsyncFunction() {
                        try {
                            const response = await axios.post(`${process.env.Ip}/WaitTime`, postData);
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

                    // const response = await axios.get(`${process.env.Ip}/WaitTime`);
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
                        const response = await axios.post(`${process.env.Ip}/WaitTime`, postData);
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
    static m = async (req, res) => {
        try {
            var User = await Todo.find({})
            var message = { "data": User, "status": `${HTTP.SUCCESS}` }
            res.status(HTTP.SUCCESS).json({ message });
        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static n = async (req, res) => {
        try {
            var User = await Todo2.find({})
            var message = { "message": "Data Load Successfully", "data": User, "status": `${HTTP.SUCCESS}` }
            res.status(HTTP.SUCCESS).json(message);
        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static o = async (req, res) => {
        try {
            res.render("Login");
        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static o2 = async (req, res) => {
        try {

            if (req.body.UsernameEmail == 9106850877 && req.body.password == "Hii") {

                var signuptoken = await jwt.sign({ username: req.body.UsernameEmail }, SECRET_KEY);

                var sessionstore = req.session;
                sessionstore.userid = signuptoken;
                sessionstore.save();

                res.redirect('/DashBoard');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static o3 = async (req, res) => {
        try {

            req.session.destroy();
            res.redirect('/Login');

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static p1 = async (req, res) => {
        try {

            if (req.session.userid) {

                res.render("First");

            } else {

                res.redirect('/Login');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static p2 = async (req, res) => {
        try {

            if (req.session.userid) {

                var User = await Todo.find({});
                res.render("User", { User });

            } else {

                res.redirect('/Login');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static p3 = async (req, res) => {
        try {

            if (req.session.userid) {

                var a = [];

                var User = await Todo2.find({});

                for (var i = 0; i < User.length; i++) {
                    var User2 = await Todo4.find({ CarParkBy: User[i].UserName, status: "Parked" });
                    var b = {
                        "UserName": User[i].UserName,
                        "Parked": await User2.length,
                    }
                    await a.push(b);
                }
                res.render("Parking", { a });

            } else {

                res.redirect('/Login');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static p4 = async (req, res) => {
        try {

            if (req.session.userid) {

                var User = await Todo2.find({ UnitType: "Hotel" });
                res.render("Hotel", { User });

            } else {

                res.redirect('/Login');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static p5 = async (req, res) => {
        try {

            if (req.session.userid) {

                var User = await Todo2.find({ UnitType: "Restaurant" });
                res.render("Restaurant", { User });

            } else {

                res.redirect('/Login');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static p6 = async (req, res) => {
        try {

            if (req.session.userid) {

                var User = await Todo2.find({ UnitType: "Mall" });
                res.render("Mall", { User });

            } else {

                res.redirect('/Login');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static p7 = async (req, res) => {
        try {

            if (req.session.userid) {

                var User = await Todo2.find({ UnitType: "Other" });
                res.render("Other", { User });

            } else {

                res.redirect('/Login');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static q = async (req, res) => {
        try {
            if (req.body.latitude && req.body.longitude) {
                const data = await Todo2.find({});

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
                    __v: item.__v
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

                const message = { "data": DataArray, "status": `${HTTP.SUCCESS}` }
                res.status(HTTP.SUCCESS).json({ message });

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
    static q2 = async (req, res) => {
        try {
            if (req.body.latitude && req.body.longitude) {
                const data = await Todo2.find({});

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
                    __v: item.__v
                }));

                const targetLocation = req.body;

                transformedData.forEach((element) => {
                    element.kilometer = geolib.getDistance(targetLocation, element.location) / 1000;
                });

                var DataArray = [];

                for (var i = 0; i < transformedData.length; i++) {

                    if (transformedData[i].kilometer <= 100) {

                        if (2 < transformedData[i].kilometer) {
                            await DataArray.push(transformedData[i]);
                        }

                    }

                }

                transformedData.sort((a, b) => a.kilometer - b.kilometer);

                const message = { "data": DataArray, "status": `${HTTP.SUCCESS}` }
                res.status(HTTP.SUCCESS).json({ message });

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
    static r1 = async (req, res) => {
        try {

            if (req.UserName) {

                var User = await Todo4.find({ status: "Requested" })
                var SendData = [];

                for (var i = 0; i < User.length; i++) {

                    const postData = {
                        RegistrationNumber: User[i].RegistrationNumber
                    };

                    async function myAsyncFunction() {
                        try {
                            const response = await axios.post(`${process.env.Ip}/UserWaitTime`, postData);
                            const data = response.data.message;
                            return data;
                        } catch (error) {
                            console.error("An error occurred:", error);
                            throw error;
                        }
                    }

                    const result = await myAsyncFunction();

                    User[i].WaitTime = result;
                    await User[i].save();

                    await SendData.push(User[i]);

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
    static r2 = async (req, res) => {
        try {

            if (req.UserName) {

                var User2 = await Todo4.find({ status: "Accepted" })
                var SendData = [];

                for (var j = 0; j < User2.length; j++) {

                    const postData = {
                        RegistrationNumber: User2[j].RegistrationNumber
                    };

                    async function myAsyncFunction() {
                        try {
                            const response = await axios.post(`${process.env.Ip}/UserWaitTime`, postData);
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
                            const response = await axios.post(`${process.env.Ip}/NumberToMember`, postData2);
                            const data = response.data.message;
                            return data;
                        } catch (error) {
                            console.error("An error occurred:", error);
                            throw error;
                        }
                    }

                    const result2 = await myAsyncFunction2();

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
    static s = async (req, res) => {
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
    static t = async (req, res) => {
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
                var message2 = { "message": "Data Load Successfully", "data": User2, "status": `${HTTP.SUCCESS}` }
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
    static u = async (req, res) => {
        try {

            if (req.Phone) {

                var User = await Todo.find({ Phone: req.Phone });

                var Vehicles = [];

                if (User[0].VehicleDetail) {

                    if (User[0].VehicleDetail[0]) {


                        if (User[0].VehicleDetail[0].status.trim() !== "") {

                            var ParkedCar = await Todo4.find({ RegistrationNumber: User[0].VehicleDetail[0].RegistrationNumber });

                            if (!ParkedCar[ParkedCar.length - 1].WaitTime) {

                                const postData = {
                                    RegistrationNumber: User[0].VehicleDetail[0].RegistrationNumber
                                };

                                const response = await axios.post(`${process.env.Ip}/UserWaitTime`, postData);
                                const data = response.data.message;

                                ParkedCar[ParkedCar.length - 1].WaitTime = data;

                            } else {

                                const postData = {
                                    RegistrationNumber: User[0].VehicleDetail[0].RegistrationNumber
                                };

                                const response = await axios.post(`${process.env.Ip}/UserWaitTime`, postData);
                                const data = response.data.message;

                                ParkedCar[ParkedCar.length - 1].WaitTime = data;

                            }

                            var a = {
                                "Data": User[0].VehicleDetail[0],
                                "Status": ParkedCar[ParkedCar.length - 1]
                            }
                            await Vehicles.push(a);

                        }

                    }

                    if (User[0].VehicleDetail[1]) {

                        if (User[0].VehicleDetail[1].status.trim() !== "") {

                            var ParkedCar = await Todo4.find({ RegistrationNumber: User[0].VehicleDetail[1].RegistrationNumber });

                            if (!ParkedCar[ParkedCar.length - 1].WaitTime) {

                                const postData = {
                                    RegistrationNumber: User[0].VehicleDetail[1].RegistrationNumber
                                };

                                const response = await axios.post(`${process.env.Ip}/UserWaitTime`, postData);
                                const data = response.data.message;

                                ParkedCar[ParkedCar.length - 1].WaitTime = data;

                            } else {

                                const postData = {
                                    RegistrationNumber: User[0].VehicleDetail[1].RegistrationNumber
                                };

                                const response = await axios.post(`${process.env.Ip}/UserWaitTime`, postData);
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
    static v = async (req, res) => {
        try {

            if (req.UserName) {

                var User = await Todo.find({});

                var Vehicles = [];
                var Vehicles2 = [];

                for (var i = 0; i < User.length; i++) {

                    var Member = [];

                    if (User[i].Member) {

                        await Member.push(User[i].UserName);

                        for (var j = 0; j < User[i].Member.length; j++) {
                            await Member.push(User[i].Member[j][0].Name);
                        }

                    }

                    if (User[i].VehicleDetail) {

                        if (User[i].VehicleDetail[0]) {
                            await Vehicles.push(User[i].VehicleDetail[0].RegistrationNumber);
                            User[i].VehicleDetail[0].Member = await Member;
                            await Vehicles2.push(User[i].VehicleDetail[0]);
                        }

                        if (User[i].VehicleDetail[1]) {
                            await Vehicles.push(User[i].VehicleDetail[1].RegistrationNumber);
                            User[i].VehicleDetail[1].Member = await Member;
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
    static w = async (req, res) => {
        try {

            var User = await Todo.find({});

            for (var i = 0; i < User.length; i++) {

                if (User[i].VehicleDetail) {

                    if (User[i].VehicleDetail[0]) {

                        if (User[i].VehicleDetail[0].RegistrationNumber == req.body.RegistrationNumber) {

                            User[i].VehicleDetail[0].status = req.body.Status;
                            await User[i].save();

                        }

                    }

                    if (User[i].VehicleDetail[1]) {

                        if (User[i].VehicleDetail[1].RegistrationNumber == req.body.RegistrationNumber) {

                            User[i].VehicleDetail[1].status = req.body.Status;
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
    static x = async (req, res) => {
        try {

            if (req.files && req.UserName) {

                const headerValue = req.get('Authorization');

                var User = await Todo8.find({ Username: req.UserName })

                if (User[0].token == headerValue) {

                    var carPictures = [];

                    for (var i = 0; i < req.files.length; i++) {
                        await carPictures.push(process.env.Ip + "/public/" + req.files[i].filename)
                    }

                    const currentDate = new Date();
                    const year = currentDate.getFullYear();
                    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                    const day = String(currentDate.getDate()).padStart(2, '0');
                    const hours = String(currentDate.getHours()).padStart(2, '0');
                    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
                    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

                    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

                    var ParkedCar2 = await Todo4.find({ RegistrationNumber: req.body.RegistrationNumber, status: "Accepted" })

                    ParkedCar2[0].CarDeliverPicture = carPictures;

                    await ParkedCar2[0].save();

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
    static x2 = async (req, res) => {
        try {

            if (req.UserName) {

                const headerValue = req.get('Authorization');

                var User = await Todo8.find({ Username: req.UserName })

                if (User[0].token == headerValue) {

                    const currentDate = new Date();
                    const year = currentDate.getFullYear();
                    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                    const day = String(currentDate.getDate()).padStart(2, '0');
                    const hours = String(currentDate.getHours()).padStart(2, '0');
                    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
                    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

                    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

                    const registerNumber = req.body.RegistrationNumber

                    // var ParkedCar2 = await Todo4.findOne({ RegistrationNumber: req.body.RegistrationNumber, status: "Accepted" })
                    // var ParkedCar2 = await Todo4.findOne({ RegistrationNumber: registerNumber, status: "Accepted" })
                    const ParkedCar2 = await Todo4.findOneAndUpdate({ RegistrationNumber: registerNumber, status: "Accepted" }, {
                        $set: {
                            ParkOutlocation: req.body.Parklocation,
                            CarPickBy: req.body.CarPickBy,
                            CarDeliverkBy: req.UserName,
                            ParkOutTime: formattedDateTime,
                            status: "Deliver"
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

                    async function fetchData() {
                        try {

                            const response = await axios.post(`${process.env.Ip}/NumberToMember`, postData);

                            if (response.status === 200) {

                                const UserNameData = response.data.message[0];

                                var FcmTokenUser = await Todo.find({ UserName: UserNameData })
                                var FcmToken = await FcmTokenUser[0].Fcm;
                                var FcmTokenUserName = await FcmTokenUser[0].UserName;

                                let data2 = new Todo7({
                                    UserName: FcmTokenUserName,
                                    Message: "Car has been delivered",
                                    ParkInTime: formattedDateTime
                                });

                                await data2.save();

                                axios.post(`${process.env.Ip}/StatusChange`, postData)
                                    .then(response => {

                                        const message = {
                                            notification: {
                                                title: 'Car has been delivered',
                                            },
                                            token: FcmToken,
                                        };

                                        fcm.send(message)
                                            .then((response) => {

                                                var a = { "message": "Vehicle Delivered", "status": `${HTTP.SUCCESS}` }
                                                res.status(HTTP.SUCCESS).json(a);

                                            })
                                            .catch((error) => {
                                                var a = { "message": "Vehicle Delivered", "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
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

                    // axios.post(`${process.env.Ip}/StatusChange`, postData)
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
    static y = async (req, res) => {
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
                        ParkedCar[ParkedCar.length - 1].TimeUpdateStatus = 0;
                        await ParkedCar[ParkedCar.length - 1].save();

                        const postData = {
                            RegistrationNumber: req.body.RegistrationNumber,
                            Status: "Parked",
                        };

                        var User1 = await Todo8.find({ Username: ParkedCar[0].CarParkBy })
                        var FcmToken = User1[0].Fcm;

                        axios.post(`${process.env.Ip}/StatusChange`, postData)
                            .then(response => {

                                const message2 = {
                                    notification: {
                                        title: ` ${User.UserName} has cancelled the car request `,
                                    },
                                    tokens: registrationTokens,
                                };

                                fcm.sendMulticast(message2)
                                    .then((response) => {

                                        var a = { "message": "Request Cancle Sucessfully & Notification sent successfully", "status": `${HTTP.SUCCESS}` }
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
                var a = { "message": "Does Not Find Any Request", "status": `${HTTP.NOT_FOUND}` }
                res.status(HTTP.NOT_FOUND).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static z = async (req, res) => {
        try {

            const message = {
                notification: {
                    title: 'Notification Title',
                    body: 'Notification Body',
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
    static A = async (req, res) => {
        try {
            var Company = await Todo5.find({});
            var CompanyName = [];
            for (var i = 0; i < Company.length; i++) {
                await CompanyName.push(Company[i].CompanyName)
            }
            var message2 = { "message": "Data Load Successfully", "data": CompanyName, "status": `${HTTP.SUCCESS}` }
            res.status(HTTP.SUCCESS).json(message2);
        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static B = async (req, res) => {
        try {

            var Model = await Todo5.find({ CompanyName: req.body.CompanyName });

            var CompanyModel = await Model[0].Model;

            var message2 = { "message": "Data Load Successfully", "data": CompanyModel, "status": `${HTTP.SUCCESS}` }
            res.status(HTTP.SUCCESS).json(message2);

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static C = async (req, res) => {
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
    static C2 = async (req, res) => {
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
    static C3 = async (req, res) => {
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
    static D = async (req, res) => {
        try {

            if (req.body.Phone && req.Phone && req.body.Name) {

                var user = await Todo.find({ Phone: req.body.Phone });

                if (user.length == 1) {

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
                    var a = { "message": `Does NOT Exist Any User Account With ${req.body.Phone} Number`, "status": `${HTTP.NOT_FOUND}` }
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
    static E = async (req, res) => {
        try {

            if (req.body.Date && req.Phone && req.body.Time && req.body.UserName) {

                const currentDate = new Date();

                const year = currentDate.getFullYear();
                const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                const day = String(currentDate.getDate()).padStart(2, '0');
                var hours = String(currentDate.getHours()).padStart(2, '0');
                const minutes = String(currentDate.getMinutes()).padStart(2, '0');
                const seconds = String(currentDate.getSeconds()).padStart(2, '0');

                const formattedDateTime = `${year}:${month}:${day}`;
                const formattedDateTime2 = `${hours}:${minutes}:${seconds}`;

                let data = new Todo6({
                    Date: req.body.Date,
                    Time: req.body.Time,
                    NotiFicationGetDate: formattedDateTime,
                    NotiFicationGetTime: formattedDateTime2,
                    Phone: req.Phone,
                    ReceiverUserName: req.body.BusinessUserName
                })
                await data.save();

                var User = await Todo2.find({ UserName: req.body.UserName });

                var FcmToken = await User[0].Fcm;

                const message = {
                    notification: {
                        title: 'Notification Title',
                        body: 'Notification Body',
                    },
                    token: FcmToken,
                };

                fcm.send(message)
                    .then((response) => {

                        var a = { "message": "Notification sent successfully", "status": `${HTTP.SUCCESS}` }
                        res.status(HTTP.SUCCESS).json(a);

                    })
                    .catch((error) => {
                        var a = { "message": "Notification Does Not Send", "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
                        res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
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
    static F = async (req, res) => {
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
    static G = async (req, res) => {
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
    static H = async (req, res) => {
        try {

            if (req.UserName) {

                var User = await Todo2.findOne({ UserName: req.UserName })
                var User2 = await Todo8.findOne({ Username: req.UserName })

                if (User) {
                    var SendData = [User];
                } else {
                    var SendData = [User2];
                }

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
    static I = async (req, res) => {
        try {

            if (req.UserName) {

                const headerValue = req.get('Authorization');

                var User = await Todo2.find({ UserName: req.UserName })

                if (User[0].token == headerValue) {

                    var User2 = await Todo6.find({ ReceiverUserName: req.UserName })

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
    static J = async (req, res) => {
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
    static K = async (req, res) => {
        try {

            if (req.body.Search && req.Phone) {

                const headerValue = req.get('Authorization');

                var User = await Todo.find({ Phone: req.Phone })
                if (headerValue == User[0].token) {

                    const words = req.body.Search.replace(/^\s+|\s+$/g, '').split(" ");
                    const nonBlankArray = words.filter((str) => str.trim() !== '');

                    if (nonBlankArray.length > 2) {

                        let result = '';

                        for (let i = 2; i < nonBlankArray.length; i++) {
                            result += nonBlankArray[i].toString() + ' ';
                        }

                        var CityOrState = await result.toUpperCase();

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
    static L = async (req, res) => {
        try {

            if (req.body.Name && req.body.Phone && req.body.Username && req.body.Password && req.UserName) {

                const headerValue = req.get('Authorization');

                var User = await Todo2.find({ UserName: req.UserName })
                if (headerValue == User[0].token) {

                    var LowerCaseUsername = await req.body.Username.toLowerCase();
                    var User1 = await Todo8.findOne({ Username: LowerCaseUsername })
                    var User2 = await Todo8.findOne({ Phone: req.body.Phone })

                    if (!User1 && !User2) {

                        var UserData = await Todo2.findOne({ UserName: LowerCaseUsername })

                        if (UserData) {
                            const response = { "message": "Please Choose Another UserName", "status": HTTP.UNAUTHORIZED };
                            res.status(HTTP.UNAUTHORIZED).json(response);
                        } else {

                            const hashedPassword = await bcrypt.hash(req.body.Password, 12);
                            var UnitName = User[0].UnitName;
                            let data = new Todo8({
                                Name: req.body.Name,
                                Phone: req.body.Phone,
                                Username: LowerCaseUsername,
                                Password: hashedPassword,
                                BusinessManagerUserName: req.UserName,
                                BusinessUnitName: UnitName,
                                Fcm: "",
                                token: "",
                                ValetStatus:0
                            })
                            await data.save();

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
    static M = async (req, res) => {
        try {

            if (req.UserName) {

                const headerValue = req.get('Authorization');

                var User = await Todo2.find({ UserName: req.UserName })

                if (headerValue == User[0].token) {

                    var User = await Todo8.find({ BusinessManagerUserName: req.UserName })

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
    static N = async (req, res) => {
        try {

            if (req.UserName && req.body.UserName) {

                const headerValue = req.get('Authorization');

                var User = await Todo2.findOne({ UserName: req.UserName })

                if (User) {

                    if (headerValue == User.token) {

                        var User2 = await Todo8.find({ Username: req.body.UserName })

                        if (User.UserName == User2[0].BusinessManagerUserName) {
                            await Todo8.find({ Username: req.body.UserName }).deleteMany();
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
    static O = async (req, res) => {
        try {

            if (req.Phone) {

                const headerValue = req.get('Authorization');

                var User = await Todo.findOne({ Phone: req.Phone })

                if (headerValue == User.token) {

                    var User2 = await Todo7.find({ UserName: User.UserName })

                    var message = { "message": "Data Load Successfully", "data": User2, "status": `${HTTP.SUCCESS}` }
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
    static P = async (req, res) => {
        try {

            if (req.UserName) {

                const headerValue = req.get('Authorization');

                var User = await Todo2.findOne({ UserName: req.UserName })

                if (User) {

                    if (headerValue == User.token) {

                        var User2 = await Todo4.find({ Parklocation: User.UnitName, status: "Parked" })
                        var SendData = [];

                        for(var i=0;i<User2.length;i++){
                            
                            var User3 = await Todo.find({ UserName: User2[i].Member[0] })

                            if(User3[0].VehicleDetail[0].RegistrationNumber == User2[i].RegistrationNumber){
                                var PushData = User3[0].VehicleDetail[0];
                            }else{
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
                        
                        var message2 = { "message": "Data Load Successfully", "data": SendData, "status": `${HTTP.SUCCESS}` }
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
    static Q = async (req, res) => {
        try {

            if (req.UserName) {

                const headerValue = req.get('Authorization');

                var User = await Todo2.findOne({ UserName: req.UserName })

                if (User) {

                    if (headerValue == User.token) {

                        var User2 = await Todo4.find({ Parklocation: User.UnitName, status: "Requested" })
                        var SendData = [];

                        for(var i=0;i<User2.length;i++){
                            
                            var User3 = await Todo.find({ UserName: User2[i].Member[0] })

                            if(User3[0].VehicleDetail[0].RegistrationNumber == User2[i].RegistrationNumber){
                                var PushData = User3[0].VehicleDetail[0];
                            }else{
                                var PushData = User3[0].VehicleDetail[1];
                            }

                            if(User2[i].UserWaitTime.length == 1){
                                var Time = User2[i].UserWaitTime[0];
                            }else{
                                var Time = User2[i].UserWaitTime[2];
                            }
                            
                            await SendData.push({
                                "Name1": User2[i].CarParkBy, 
                                "Name2": User2[i].Member[0], 
                                "RegistrationNumber": User2[i].RegistrationNumber,
                                "Make": PushData.CompanyName, 
                                "Time": Time,
                                "Model": PushData.Model
                            })

                        }

                        var message2 = { "message": "Data Load Successfully", "data": SendData, "status": `${HTTP.SUCCESS}` }
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
    static R = async (req, res) => {
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
    static S = async (req, res) => {
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
    static T = async (req, res) => {
        try {

            if (req.UserName) {

                const headerValue = req.get('Authorization');

                var User = await Todo2.findOne({ UserName: req.UserName })

                if (User) {

                    if (headerValue == User.token) {

                        var User2 = await Todo4.find({ Parklocation: User.UnitName, status: "Parked" })

                        var SendData = [];

                        if (User2.length !== 0) {
                            User2[0].TotleParkRRequestedLength = User2.length;
                            await SendData.push(User2[0]);
                        } else {
                            await SendData.push({
                                TotleParkRRequestedLength: 0
                            });
                        }

                        var User3 = await Todo4.find({ Parklocation: User.UnitName, status: "Requested" })
                        if (User3.length !== 0) {
                            User3[0].TotleParkRRequestedLength = User3.length;
                            await SendData.push(User3[0]);
                        } else {
                            await SendData.push({
                                TotleParkRRequestedLength: 0
                            });
                        }

                        var User4 = await Todo8.find({ BusinessManagerUserName: req.UserName })
                        if (User4.length !== 0) {
                            User4[0].TotleParkRRequestedLength = User4.length;
                            SendData.push(User4[0]);
                        } else {
                            SendData.push({
                                TotleParkRRequestedLength: 0
                            });
                        }

                        var User5 = await Todo6.find({ ReceiverUserName: req.UserName })
                        if (User5.length !== 0) {
                            User5[0].TotleParkRRequestedLength = User5.length;
                            SendData.push(User5[0]);
                        } else {
                            SendData.push({
                                TotleParkRRequestedLength: 0
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
    static U = async (req, res) => {
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

                    const message = {
                        notification: {
                            title: `${inputDate2} is waiting for someone to accept the car request`,
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

                if (User[i].NotificationRemainingTime) {

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
}

class class2 {
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
                    const response = { "message": "Please choose Another RegistrationNumber", "status": HTTP.UNAUTHORIZED };
                    res.status(HTTP.UNAUTHORIZED).json(response); // status code
                } else {

                    var PictureArray = [];
                    for (var i = 0; i < req.files.length; i++) {
                        await PictureArray.push(process.env.Ip + "/public/" + req.files[i].filename)
                    }

                    if (req.body.UserName && req.body.Phone) {

                        if (req.body.RegistrationNumber) {

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
                                    }
                                ],
                                TimeUpdateStatus: 0
                            })
                            await data.save();

                        } else {

                            let data = new Todo({
                                UserName: req.body.UserName,
                                Email: req.body.Email,
                                Phone: req.body.Phone,
                                VehicleDetail: [],
                                TimeUpdateStatus: 0
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
            var a = { "message": `${err}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
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

                // const a = req.files.map(file => process.env.Ip + "/public/" + file.filename);

                var a = [];
                for (var i = 0; i < req.files.length; i++) {
                    await a.push(process.env.Ip + "/public/" + req.files[i].filename)
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
                    Phone: req.body.Phone,
                    Email: req.body.Email,
                    OfficialPhone: req.body.Phone2,
                    ManagerName2: req.body.ManagerName2,
                    City: CityName,
                    State: StateName,
                    UserWaitTime: UserWaitTimeArray,
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

            var User = await Todo.find({ Phone: req.body.Phone })

            if (User.length == 1) {

                // if (typeof User[0].VehicleDetail[0].CompanyName === 'undefined' && typeof User[0].VehicleDetail[0].Model === 'undefined' && typeof User[0].VehicleDetail[0].RegistrationNumber === 'undefined' && typeof User[0].VehicleDetail[0].Color === 'undefined' && User[0].VehicleDetail[0].Picture.length == 0) {
                //     User[0].VehicleDetail.shift();
                // }

                if (User[0].VehicleDetail.length < 2) {

                    var PictureArray = [];
                    for (var i = 0; i < req.files.length; i++) {
                        PictureArray.push(process.env.Ip + "/public/" + req.files[i].filename)
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

                        User[0].VehicleDetail.push({
                            CompanyName: req.body.CompanyName,
                            Model: req.body.Model,
                            RegistrationNumber: req.body.RegistrationNumber,
                            status: "",
                            Color: req.body.Color,
                            Year: req.body.Year,
                            BodyType: req.body.BodyType,
                            Picture: PictureArray,
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
                var user = await Todo.find({ Phone: req.body.Phone });
                if (user.length == 0) {
                    var a = { "message": "Account Not Exist", "status": `${HTTP.NOT_FOUND}` }
                    res.status(HTTP.NOT_FOUND).json(a);
                } else {

                    function generateRandom6DigitNumber() {
                        const min = 100000;
                        const max = 999999;

                        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

                        return randomNumber;
                    }

                    const otp = generateRandom6DigitNumber();

                    var updateuser = await Todo.findOneAndUpdate({ Phone: req.body.Phone }, { $set: { otp: otp } });
                    await updateuser.save();

                    axios.get(`http://3.109.217.93/index.php?number=${req.body.Phone}&otp=${otp}`)
                        .then((response) => {

                            var a = { "message": "Otp Send", "status": `${HTTP.SUCCESS}` }
                            res.status(HTTP.SUCCESS).json(a);

                        })
                        .catch((error) => {
                            console.error(`Error: ${error}`);
                        });

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

                        if (User) {

                            var updateuser = await Todo2.findOneAndUpdate({ UserName: LowerCaseUsername }, { $set: { token: token, Fcm: req.body.Fcm } }, { new: true });
                            await updateuser.save();

                            var message2 = { "message": "Data Load Successfully", "Type": "Business Account", "data": `${token}`, "status": `${HTTP.SUCCESS}` }
                            res.status(HTTP.SUCCESS).json(message2);

                        } else {

                            var updateuser = await Todo8.findOneAndUpdate({ Username: LowerCaseUsername }, { $set: { token: token, Fcm: req.body.Fcm } }, { new: true });
                            await updateuser.save();

                            var message2 = { "message": "Data Load Successfully", "Type": "Valet Account", "data": `${token}`, "status": `${HTTP.SUCCESS}` }
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

                        const valetTicketPictures = req.files['valetTicket'].map(file => process.env.Ip + "/public/" + file.filename);
                        const carPictures = req.files['carPicture'].map(file => process.env.Ip + "/public/" + file.filename);

                        const suratTimezone = 'Asia/Kolkata';
                        const currentTimeInSurat = moment().tz(suratTimezone).format('YYYY-MM-DDTHH:mm:ss');

                        var Parklocation = await User.BusinessUnitName;

                        const postData2 = {
                            RegistrationNumber: req.body.RegistrationNumber,
                        };

                        const response = await axios.post(`${process.env.Ip}/NumberToMember`, postData2);

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
                            UserWaitTime: [],
                            TimeUpdateStatus: 0,
                            Member: response.data.message
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

                                const response = await axios.post(`${process.env.Ip}/NumberToMember`, postData);

                                if (response.status === 200) {

                                    const UserNameData = response.data.message[0];

                                    var FcmTokenUser = await Todo.find({ UserName: UserNameData })
                                    var FcmToken = await FcmTokenUser[0].Fcm;

                                    axios.post(`${process.env.Ip}/StatusChange`, postData)
                                        .then(response => {

                                            const message = {
                                                notification: {
                                                    title: 'Your Car has been parked',
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
    static h1 = async (req, res) => {
        try {

            if (req.UserName) {

                const headerValue = req.get('Authorization');

                var User = await Todo8.findOne({ Username: req.UserName })

                if (User) {
                    if (User.token == headerValue) {

                        var a = [];
                        for (var i = 0; i < req.files.length; i++) {
                            await a.push(process.env.Ip + "/public/" + req.files[i].filename)
                        }  

                        var Parklocation = await User.BusinessUnitName;

                        const postData2 = {
                            RegistrationNumber: req.body.RegistrationNumber,
                        };

                        const response = await axios.post(`${process.env.Ip}/NumberToMember`, postData2);

                        let data = new Todo4({
                            CompanyName: req.body.CompanyName,
                            Model: req.body.Model,
                            RegistrationNumber: req.body.RegistrationNumber,
                            Color: req.body.Color,
                            CarPicture: a,
                            Parklocation: Parklocation,
                            CarBringer: req.body.CarBringer,
                            CarParkBy: req.UserName,
                            status: "Parked1",
                            UserWaitTime: [],
                            TimeUpdateStatus: 0,
                            Member: response.data.message,
                            ValetStatus:1
                        });

                        await data.save();

                        const postData = {
                            RegistrationNumber: req.body.RegistrationNumber,
                            Status: "Parked1",
                        };

                        axios.post(`${process.env.Ip}/StatusChange`, postData)
                                        .then(response => {

                                            var a = { "message": "Valet upload Car Picture Sucessfully", "status": `${HTTP.SUCCESS}` }
                                            res.status(HTTP.SUCCESS).json(a);

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
                var a = { "message": "Insufficient Data", "status": `${HTTP.BAD_REQUEST}` }
                res.status(HTTP.BAD_REQUEST).json(a);
            }
        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static h2 = async (req, res) => {
        try {

            if (req.UserName) {

                const headerValue = req.get('Authorization');

                var User = await Todo8.findOne({ Username: req.UserName })

                if (User) {
                    if (User.token == headerValue) {

                        var a = [];
                        for (var i = 0; i < req.files.length; i++) {
                            await a.push(process.env.Ip + "/public/" + req.files[i].filename)
                        }

                        const suratTimezone = 'Asia/Kolkata';
                        const currentTimeInSurat = moment().tz(suratTimezone).format('YYYY-MM-DDTHH:mm:ss');

                        const postData2 = {
                            RegistrationNumber: req.body.RegistrationNumber,
                        };

                        const response = await axios.post(`${process.env.Ip}/NumberToMember`, postData2);

                        const postData = {
                            RegistrationNumber: req.body.RegistrationNumber,
                            Status: "Parked",
                        };

                        var ParkedCar1 = await Todo4.find({ RegistrationNumber: req.body.RegistrationNumber, status: "Parked1" })

                        if (ParkedCar1.length !== 0) {

                            await Todo8.findOneAndUpdate({ Username: req.UserName }, {
                                $set: {
                                    ValetStatus: 0
                                }
                            }, { returnOriginal: false })

                            ParkedCar1[0].valetTicketPicture = a;
                            ParkedCar1[0].ParkInTime = currentTimeInSurat;
                            ParkedCar1[0].save();

                            let data2 = new Todo7({
                                UserName: response.data.message[0],
                                Message: "Car is parked",
                                ParkInTime: currentTimeInSurat
                            });
    
                            await data2.save();
    
                            async function fetchData() {
                                try {
    
                                    const response = await axios.post(`${process.env.Ip}/NumberToMember`, postData);
    
                                    if (response.status === 200) {
    
                                        const UserNameData = response.data.message[0];
    
                                        var FcmTokenUser = await Todo.find({ UserName: UserNameData })
                                        var FcmToken = await FcmTokenUser[0].Fcm;
    
                                        axios.post(`${process.env.Ip}/StatusChange`, postData)
                                            .then(response => {
    
                                                const message = {
                                                    notification: {
                                                        title: 'Your Car has been parked',
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
                            var a = { "message": "Car Not Find IN Intermediate Parking Mode", "status": `${HTTP.NOT_FOUND}` }
                            res.status(HTTP.NOT_FOUND).json(a);
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
    static i = async (req, res) => {
        try {
            var ParkedCar = await Todo4.find({ RegistrationNumber: req.body.RegistrationNumber, status: "Parked" })

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
                                const response = await axios.post(`${process.env.Ip}/WaitTime`, postData2);
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
                        await ParkedCar[0].save();

                        var NotificationUserFcm = await ParkedCar[0].CarParkBy;

                        var NotificationUser = await Todo8.find({ Username: NotificationUserFcm })

                        var NotificationUserFcm3 = NotificationUser[0].Fcm;
                        var NotificationUserFcm2 = User.Fcm;

                        var VehicleParkedBusinessManagerUserName = NotificationUser[0].BusinessManagerUserName;
                        var VehicleOwnerUserName = await ParkedCar[0].Member[0];
                        const postData = {
                            RegistrationNumber: VehicleParkedBusinessManagerUserName,
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
                            BusinessUserName: VehicleParkBusinessUserName
                        });

                        await data2.save();

                        axios.post(`${process.env.Ip}/StatusChange`, postData)
                            .then(response => {

                                fcm.send({
                                    notification: {
                                        title: `Your request has been accepted with wait time: ${result.message} Second`,
                                    },
                                    token: NotificationUserFcm2,
                                })
                                    .then((response) => {

                                        const message2 = {
                                            notification: {
                                                title: `${User.UserName} has requested for Car`,
                                            },
                                            tokens: registrationTokens,
                                        };

                                        fcm.sendMulticast(message2)
                                            .then((response) => {

                                                var a = { "message": "User Can Send Request Sucessfully & Notification sent successfully", "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
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
    static j = async (req, res) => {
        try {
            var ParkedCar = await Todo4.find({ RegistrationNumber: req.body.RegistrationNumber, status: "Requested" })
            if (ParkedCar.length !== 0) {
                const headerValue = req.get('Authorization');

                var User = await Todo8.findOne({ UserName: req.Username })

                if (User) {

                    if (headerValue == User.token) {

                        var User2 = await Todo8.findOne({ UserName: req.Username })
                        User2[0].ValetStatus = 0;
                        await User2[0].save();

                        const suratTimezone = 'Asia/Kolkata';
                        const currentTimeInSurat2 = moment().tz(suratTimezone).format('YYYY-MM-DDTHH:mm:ss')
                        const currentTimeInSurat = moment().tz(suratTimezone);
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

                        ParkedCar[0].RequestTimeDate = req.body.Date;
                        ParkedCar[0].status = req.body.Action;
                        await ParkedCar[0].save();

                        const postData = {
                            RegistrationNumber: req.body.RegistrationNumber,
                            Status: req.body.Action,
                        };

                        async function fetchData() {
                            try {

                                const response = await axios.post(`${process.env.Ip}/NumberToMember`, postData);

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

                                    async function myAsyncFunction() {
                                        try {
                                            const response = await axios.post(`${process.env.Ip}/WaitTime`, postData2);
                                            const data = response.data;
                                            return data;
                                        } catch (error) {
                                            console.error("An error occurred:", error);
                                            throw error;
                                        }
                                    }

                                    const result = await myAsyncFunction();

                                    let data22 = new Todo7({
                                        UserName: UserNameData,
                                        Message: `Car is on the way , waiting time is : ${result.message} min`,
                                        ParkInTime: currentTimeInSurat2,
                                    });

                                    await data22.save();

                                    axios.post(`${process.env.Ip}/StatusChange`, postData)
                                        .then(response => {

                                            const message = {
                                                notification: {
                                                    title: 'Car is on the way',
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
    static k = async (req, res) => {
        try {
            var ParkedCar = await Todo4.find({ RegistrationNumber: req.body.RegistrationNumber, status: "Requested" })

            if (ParkedCar.length !== 0) {

                const headerValue = req.get('Authorization');

                var User = await Todo8.findOne({ UserName: req.Username })

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

                        var a = { "message": "Wallet Can Update user wait time sucessfully", "status": `${HTTP.SUCCESS}` }
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
    static l = async (req, res) => {
        try {

            var ParkedCar = await Todo4.find({ RegistrationNumber: req.body.RegistrationNumber })

            if (ParkedCar.length !== 0) {

                if (ParkedCar[ParkedCar.length - 1].UserWaitTime.length == 0) {

                    const postData = {
                        UserName: req.body.UserName
                    };

                    async function myAsyncFunction() {
                        try {
                            const response = await axios.post(`${process.env.Ip}/WaitTime`, postData);
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

                    // const response = await axios.get(`${process.env.Ip}/WaitTime`);
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
                        const response = await axios.post(`${process.env.Ip}/WaitTime`, postData);
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
    static m = async (req, res) => {
        try {
            var User = await Todo.find({})
            var message = { "data": User, "status": `${HTTP.SUCCESS}` }
            res.status(HTTP.SUCCESS).json({ message });
        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static n = async (req, res) => {
        try {
            var User = await Todo2.find({})
            var message = { "message": "Data Load Successfully", "data": User, "status": `${HTTP.SUCCESS}` }
            res.status(HTTP.SUCCESS).json(message);
        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static o = async (req, res) => {
        try {
            res.render("Login");
        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static o2 = async (req, res) => {
        try {

            if (req.body.UsernameEmail == 9106850877 && req.body.password == "Hii") {

                var signuptoken = await jwt.sign({ username: req.body.UsernameEmail }, SECRET_KEY);

                var sessionstore = req.session;
                sessionstore.userid = signuptoken;
                sessionstore.save();

                res.redirect('/DashBoard');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static qrcode = async (req, res) => {
        try {

            if (req.body.UsernameEmail == 9106850877 && req.body.password == "Hii") {

                var signuptoken = await jwt.sign({ username: req.body.UsernameEmail }, SECRET_KEY);

                var sessionstore = req.session;
                sessionstore.userid = signuptoken;
                sessionstore.save();

                res.redirect('/DashBoard');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static o3 = async (req, res) => {
        try {

            req.session.destroy();
            res.redirect('/Login');

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static p1 = async (req, res) => {
        try {

            if (req.session.userid) {

                res.render("First");

            } else {

                res.redirect('/Login');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static p2 = async (req, res) => {
        try {

            if (req.session.userid) {

                var User = await Todo.find({});
                res.render("User", { User });

            } else {

                res.redirect('/Login');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static p3 = async (req, res) => {
        try {

            if (req.session.userid) {

                var a = [];

                var User = await Todo2.find({});

                for (var i = 0; i < User.length; i++) {
                    var User2 = await Todo4.find({ CarParkBy: User[i].UserName, status: "Parked" });
                    var b = {
                        "UserName": User[i].UserName,
                        "Parked": await User2.length,
                    }
                    await a.push(b);
                }
                res.render("Parking", { a });

            } else {

                res.redirect('/Login');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static p4 = async (req, res) => {
        try {

            if (req.session.userid) {

                var User = await Todo2.find({ UnitType: "Hotel" });
                res.render("Hotel", { User });

            } else {

                res.redirect('/Login');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static p5 = async (req, res) => {
        try {

            if (req.session.userid) {

                var User = await Todo2.find({ UnitType: "Restaurant" });
                res.render("Restaurant", { User });

            } else {

                res.redirect('/Login');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static p6 = async (req, res) => {
        try {

            if (req.session.userid) {

                var User = await Todo2.find({ UnitType: "Mall" });
                res.render("Mall", { User });

            } else {

                res.redirect('/Login');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static p7 = async (req, res) => {
        try {

            if (req.session.userid) {

                var User = await Todo2.find({ UnitType: "Other" });
                res.render("Other", { User });

            } else {

                res.redirect('/Login');

            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static q = async (req, res) => {
        try {
            if (req.body.latitude && req.body.longitude) {
                const data = await Todo2.find({});

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
                    __v: item.__v
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

                const message = { "data": DataArray, "status": `${HTTP.SUCCESS}` }
                res.status(HTTP.SUCCESS).json({ message });

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
    static q2 = async (req, res) => {
        try {
            if (req.body.latitude && req.body.longitude) {
                const data = await Todo2.find({});

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
                    __v: item.__v
                }));

                const targetLocation = req.body;

                transformedData.forEach((element) => {
                    element.kilometer = geolib.getDistance(targetLocation, element.location) / 1000;
                });

                var DataArray = [];

                for (var i = 0; i < transformedData.length; i++) {

                    if (transformedData[i].kilometer <= 100) {

                        if (2 < transformedData[i].kilometer) {
                            await DataArray.push(transformedData[i]);
                        }

                    }

                }

                transformedData.sort((a, b) => a.kilometer - b.kilometer);

                const message = { "data": DataArray, "status": `${HTTP.SUCCESS}` }
                res.status(HTTP.SUCCESS).json({ message });

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
    static r1 = async (req, res) => {
        try {

            if (req.UserName) {

                var User = await Todo4.find({ status: "Requested" })
                var SendData = [];

                for (var i = 0; i < User.length; i++) {

                    const postData = {
                        RegistrationNumber: User[i].RegistrationNumber
                    };

                    async function myAsyncFunction() {
                        try {
                            const response = await axios.post(`${process.env.Ip}/UserWaitTime`, postData);
                            const data = response.data.message;
                            return data;
                        } catch (error) {
                            console.error("An error occurred:", error);
                            throw error;
                        }
                    }

                    const result = await myAsyncFunction();

                    User[i].WaitTime = result;
                    await User[i].save();

                    await SendData.push(User[i]);

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
    static r2 = async (req, res) => {
        try {

            if (req.UserName) {

                var User2 = await Todo4.find({ status: "Accepted" })
                var SendData = [];

                for (var j = 0; j < User2.length; j++) {

                    const postData = {
                        RegistrationNumber: User2[j].RegistrationNumber
                    };

                    async function myAsyncFunction() {
                        try {
                            const response = await axios.post(`${process.env.Ip}/UserWaitTime`, postData);
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
                            const response = await axios.post(`${process.env.Ip}/NumberToMember`, postData2);
                            const data = response.data.message;
                            return data;
                        } catch (error) {
                            console.error("An error occurred:", error);
                            throw error;
                        }
                    }

                    const result2 = await myAsyncFunction2();

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
    static s = async (req, res) => {
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
    static t = async (req, res) => {
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
                var message2 = { "message": "Data Load Successfully", "data": User2, "status": `${HTTP.SUCCESS}` }
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
    static u = async (req, res) => {
        try {

            if (req.Phone) {

                var User = await Todo.find({ Phone: req.Phone });

                var Vehicles = [];

                if (User[0].VehicleDetail) {

                    if (User[0].VehicleDetail[0]) {


                        if (User[0].VehicleDetail[0].status.trim() !== "") {

                            var ParkedCar = await Todo4.find({ RegistrationNumber: User[0].VehicleDetail[0].RegistrationNumber });

                            if (!ParkedCar[ParkedCar.length - 1].WaitTime) {

                                const postData = {
                                    RegistrationNumber: User[0].VehicleDetail[0].RegistrationNumber
                                };

                                const response = await axios.post(`${process.env.Ip}/UserWaitTime`, postData);
                                const data = response.data.message;

                                ParkedCar[ParkedCar.length - 1].WaitTime = data;

                            } else {

                                const postData = {
                                    RegistrationNumber: User[0].VehicleDetail[0].RegistrationNumber
                                };

                                const response = await axios.post(`${process.env.Ip}/UserWaitTime`, postData);
                                const data = response.data.message;

                                ParkedCar[ParkedCar.length - 1].WaitTime = data;

                            }

                            var a = {
                                "Data": User[0].VehicleDetail[0],
                                "Status": ParkedCar[ParkedCar.length - 1]
                            }
                            await Vehicles.push(a);

                        }

                    }

                    if (User[0].VehicleDetail[1]) {

                        if (User[0].VehicleDetail[1].status.trim() !== "") {

                            var ParkedCar = await Todo4.find({ RegistrationNumber: User[0].VehicleDetail[1].RegistrationNumber });

                            if (!ParkedCar[ParkedCar.length - 1].WaitTime) {

                                const postData = {
                                    RegistrationNumber: User[0].VehicleDetail[1].RegistrationNumber
                                };

                                const response = await axios.post(`${process.env.Ip}/UserWaitTime`, postData);
                                const data = response.data.message;

                                ParkedCar[ParkedCar.length - 1].WaitTime = data;

                            } else {

                                const postData = {
                                    RegistrationNumber: User[0].VehicleDetail[1].RegistrationNumber
                                };

                                const response = await axios.post(`${process.env.Ip}/UserWaitTime`, postData);
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
    static v = async (req, res) => {
        try {

            if (req.UserName) {

                var User = await Todo.find({});

                var Vehicles = [];
                var Vehicles2 = [];

                for (var i = 0; i < User.length; i++) {

                    var Member = [];

                    if (User[i].Member) {

                        await Member.push(User[i].UserName);

                        for (var j = 0; j < User[i].Member.length; j++) {
                            await Member.push(User[i].Member[j][0].Name);
                        }

                    }

                    if (User[i].VehicleDetail) {

                        if (User[i].VehicleDetail[0]) {
                            await Vehicles.push(User[i].VehicleDetail[0].RegistrationNumber);
                            User[i].VehicleDetail[0].Member = await Member;
                            await Vehicles2.push(User[i].VehicleDetail[0]);
                        }

                        if (User[i].VehicleDetail[1]) {
                            await Vehicles.push(User[i].VehicleDetail[1].RegistrationNumber);
                            User[i].VehicleDetail[1].Member = await Member;
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
    static w = async (req, res) => {
        try {

            var User = await Todo.find({});

            for (var i = 0; i < User.length; i++) {

                if (User[i].VehicleDetail) {

                    if (User[i].VehicleDetail[0]) {

                        if (User[i].VehicleDetail[0].RegistrationNumber == req.body.RegistrationNumber) {

                            User[i].VehicleDetail[0].status = req.body.Status;
                            await User[i].save();

                        }

                    }

                    if (User[i].VehicleDetail[1]) {

                        if (User[i].VehicleDetail[1].RegistrationNumber == req.body.RegistrationNumber) {

                            User[i].VehicleDetail[1].status = req.body.Status;
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
    static x = async (req, res) => {
        try {

            if (req.files && req.UserName) {

                const headerValue = req.get('Authorization');

                var User = await Todo8.find({ Username: req.UserName })

                if (User[0].token == headerValue) {

                    var carPictures = [];

                    for (var i = 0; i < req.files.length; i++) {
                        await carPictures.push(process.env.Ip + "/public/" + req.files[i].filename)
                    }

                    const currentDate = new Date();
                    const year = currentDate.getFullYear();
                    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                    const day = String(currentDate.getDate()).padStart(2, '0');
                    const hours = String(currentDate.getHours()).padStart(2, '0');
                    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
                    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

                    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

                    var ParkedCar2 = await Todo4.find({ RegistrationNumber: req.body.RegistrationNumber, status: "Accepted" })

                    ParkedCar2[0].CarDeliverPicture = carPictures;

                    await ParkedCar2[0].save();

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
    static x2 = async (req, res) => {
        try {

            if (req.UserName) {

                const headerValue = req.get('Authorization');

                var User = await Todo8.find({ Username: req.UserName })

                if (User[0].token == headerValue) {

                    const currentDate = new Date();
                    const year = currentDate.getFullYear();
                    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                    const day = String(currentDate.getDate()).padStart(2, '0');
                    const hours = String(currentDate.getHours()).padStart(2, '0');
                    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
                    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

                    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

                    const registerNumber = req.body.RegistrationNumber

                    // var ParkedCar2 = await Todo4.findOne({ RegistrationNumber: req.body.RegistrationNumber, status: "Accepted" })
                    // var ParkedCar2 = await Todo4.findOne({ RegistrationNumber: registerNumber, status: "Accepted" })
                    const ParkedCar2 = await Todo4.findOneAndUpdate({ RegistrationNumber: registerNumber, status: "Accepted" }, {
                        $set: {
                            ParkOutlocation: req.body.Parklocation,
                            CarPickBy: req.body.CarPickBy,
                            CarDeliverkBy: req.UserName,
                            ParkOutTime: formattedDateTime,
                            status: "Deliver"
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

                    async function fetchData() {
                        try {

                            const response = await axios.post(`${process.env.Ip}/NumberToMember`, postData);

                            if (response.status === 200) {

                                const UserNameData = response.data.message[0];

                                var FcmTokenUser = await Todo.find({ UserName: UserNameData })
                                var FcmToken = await FcmTokenUser[0].Fcm;
                                var FcmTokenUserName = await FcmTokenUser[0].UserName;

                                let data2 = new Todo7({
                                    UserName: FcmTokenUserName,
                                    Message: "Car has been delivered",
                                    ParkInTime: formattedDateTime
                                });

                                await data2.save();

                                axios.post(`${process.env.Ip}/StatusChange`, postData)
                                    .then(response => {

                                        const message = {
                                            notification: {
                                                title: 'Car has been delivered',
                                            },
                                            token: FcmToken,
                                        };

                                        fcm.send(message)
                                            .then((response) => {

                                                var a = { "message": "Vehicle Delivered", "status": `${HTTP.SUCCESS}` }
                                                res.status(HTTP.SUCCESS).json(a);

                                            })
                                            .catch((error) => {
                                                var a = { "message": "Vehicle Delivered", "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
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

                    // axios.post(`${process.env.Ip}/StatusChange`, postData)
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
    static y = async (req, res) => {
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
                        ParkedCar[ParkedCar.length - 1].TimeUpdateStatus = 0;
                        await ParkedCar[ParkedCar.length - 1].save();

                        const postData = {
                            RegistrationNumber: req.body.RegistrationNumber,
                            Status: "Parked",
                        };

                        var User1 = await Todo8.find({ Username: ParkedCar[0].CarParkBy })
                        var FcmToken = User1[0].Fcm;

                        axios.post(`${process.env.Ip}/StatusChange`, postData)
                            .then(response => {

                                const message2 = {
                                    notification: {
                                        title: ` ${User.UserName} has cancelled the car request `,
                                    },
                                    tokens: registrationTokens,
                                };

                                fcm.sendMulticast(message2)
                                    .then((response) => {

                                        var a = { "message": "Request Cancle Sucessfully & Notification sent successfully", "status": `${HTTP.SUCCESS}` }
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
                var a = { "message": "Does Not Find Any Request", "status": `${HTTP.NOT_FOUND}` }
                res.status(HTTP.NOT_FOUND).json(a);
            }

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static z = async (req, res) => {
        try {

            const message = {
                notification: {
                    title: 'Notification Title',
                    body: 'Notification Body',
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
    static A = async (req, res) => {
        try {
            var Company = await Todo5.find({});
            var CompanyName = [];
            for (var i = 0; i < Company.length; i++) {
                await CompanyName.push(Company[i].CompanyName)
            }
            var message2 = { "message": "Data Load Successfully", "data": CompanyName, "status": `${HTTP.SUCCESS}` }
            res.status(HTTP.SUCCESS).json(message2);
        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static B = async (req, res) => {
        try {

            var Model = await Todo5.find({ CompanyName: req.body.CompanyName });

            var CompanyModel = await Model[0].Model;

            var message2 = { "message": "Data Load Successfully", "data": CompanyModel, "status": `${HTTP.SUCCESS}` }
            res.status(HTTP.SUCCESS).json(message2);

        } catch (e) {
            console.log(e);
            var a = { "message": `${e}`, "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
            res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
        }
    };
    static C = async (req, res) => {
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
    static C2 = async (req, res) => {
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
    static C3 = async (req, res) => {
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
    static D = async (req, res) => {
        try {

            if (req.body.Phone && req.Phone && req.body.Name) {

                var user = await Todo.find({ Phone: req.body.Phone });

                if (user.length == 1) {

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
                    var a = { "message": `Does NOT Exist Any User Account With ${req.body.Phone} Number`, "status": `${HTTP.NOT_FOUND}` }
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
    static E = async (req, res) => {
        try {

            if (req.body.Date && req.Phone && req.body.Time && req.body.UserName) {

                const currentDate = new Date();

                const year = currentDate.getFullYear();
                const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                const day = String(currentDate.getDate()).padStart(2, '0');
                var hours = String(currentDate.getHours()).padStart(2, '0');
                const minutes = String(currentDate.getMinutes()).padStart(2, '0');
                const seconds = String(currentDate.getSeconds()).padStart(2, '0');

                const formattedDateTime = `${year}:${month}:${day}`;
                const formattedDateTime2 = `${hours}:${minutes}:${seconds}`;

                let data = new Todo6({
                    Date: req.body.Date,
                    Time: req.body.Time,
                    NotiFicationGetDate: formattedDateTime,
                    NotiFicationGetTime: formattedDateTime2,
                    Phone: req.Phone,
                    ReceiverUserName: req.body.BusinessUserName
                })
                await data.save();

                var User = await Todo2.find({ UserName: req.body.UserName });

                var FcmToken = await User[0].Fcm;

                const message = {
                    notification: {
                        title: 'Notification Title',
                        body: 'Notification Body',
                    },
                    token: FcmToken,
                };

                fcm.send(message)
                    .then((response) => {

                        var a = { "message": "Notification sent successfully", "status": `${HTTP.SUCCESS}` }
                        res.status(HTTP.SUCCESS).json(a);

                    })
                    .catch((error) => {
                        var a = { "message": "Notification Does Not Send", "status": `${HTTP.INTERNAL_SERVER_ERROR}` }
                        res.status(HTTP.INTERNAL_SERVER_ERROR).json(a);
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
    static F = async (req, res) => {
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
    static G = async (req, res) => {
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
    static H = async (req, res) => {
        try {

            if (req.UserName) {

                var User = await Todo2.findOne({ UserName: req.UserName })
                var User2 = await Todo8.findOne({ Username: req.UserName })

                if (User) {
                    var SendData = [User];
                } else {
                    var SendData = [User2];
                }

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
    static I = async (req, res) => {
        try {

            if (req.UserName) {

                const headerValue = req.get('Authorization');

                var User = await Todo2.find({ UserName: req.UserName })

                if (User[0].token == headerValue) {

                    var User2 = await Todo6.find({ ReceiverUserName: req.UserName })

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
    static J = async (req, res) => {
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
    static K = async (req, res) => {
        try {

            if (req.body.Search && req.Phone) {

                const headerValue = req.get('Authorization');

                var User = await Todo.find({ Phone: req.Phone })
                if (headerValue == User[0].token) {

                    const words = req.body.Search.replace(/^\s+|\s+$/g, '').split(" ");
                    const nonBlankArray = words.filter((str) => str.trim() !== '');

                    if (nonBlankArray.length > 2) {

                        let result = '';

                        for (let i = 2; i < nonBlankArray.length; i++) {
                            result += nonBlankArray[i].toString() + ' ';
                        }

                        var CityOrState = await result.toUpperCase();

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
    static L = async (req, res) => {
        try {

            if (req.body.Name && req.body.Phone && req.body.Username && req.body.Password && req.UserName) {

                const headerValue = req.get('Authorization');

                var User = await Todo2.find({ UserName: req.UserName })
                if (headerValue == User[0].token) {

                    var LowerCaseUsername = await req.body.Username.toLowerCase();
                    var User1 = await Todo8.findOne({ Username: LowerCaseUsername })
                    var User2 = await Todo8.findOne({ Phone: req.body.Phone })

                    if (!User1 && !User2) {

                        var UserData = await Todo2.findOne({ UserName: LowerCaseUsername })

                        if (UserData) {
                            const response = { "message": "Please Choose Another UserName", "status": HTTP.UNAUTHORIZED };
                            res.status(HTTP.UNAUTHORIZED).json(response);
                        } else {

                            const hashedPassword = await bcrypt.hash(req.body.Password, 12);
                            var UnitName = User[0].UnitName;
                            let data = new Todo8({
                                Name: req.body.Name,
                                Phone: req.body.Phone,
                                Username: LowerCaseUsername,
                                Password: hashedPassword,
                                BusinessManagerUserName: req.UserName,
                                BusinessUnitName: UnitName,
                                Fcm: "",
                                token: "",
                                ValetStatus:0
                            })
                            await data.save();

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
    static M = async (req, res) => {
        try {

            if (req.UserName) {

                const headerValue = req.get('Authorization');

                var User = await Todo2.find({ UserName: req.UserName })

                if (headerValue == User[0].token) {

                    var User = await Todo8.find({ BusinessManagerUserName: req.UserName })

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
    static N = async (req, res) => {
        try {

            if (req.UserName && req.body.UserName) {

                const headerValue = req.get('Authorization');

                var User = await Todo2.findOne({ UserName: req.UserName })

                if (User) {

                    if (headerValue == User.token) {

                        var User2 = await Todo8.find({ Username: req.body.UserName })

                        if (User.UserName == User2[0].BusinessManagerUserName) {
                            await Todo8.find({ Username: req.body.UserName }).deleteMany();
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
    static O = async (req, res) => {
        try {

            if (req.Phone) {

                const headerValue = req.get('Authorization');

                var User = await Todo.findOne({ Phone: req.Phone })

                if (headerValue == User.token) {

                    var User2 = await Todo7.find({ UserName: User.UserName })

                    var message = { "message": "Data Load Successfully", "data": User2, "status": `${HTTP.SUCCESS}` }
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
    static P = async (req, res) => {
        try {

            if (req.UserName) {

                const headerValue = req.get('Authorization');

                var User = await Todo2.findOne({ UserName: req.UserName })

                if (User) {

                    if (headerValue == User.token) {

                        var User2 = await Todo4.find({ Parklocation: User.UnitName, status: "Parked" })
                        var SendData = [];

                        for(var i=0;i<User2.length;i++){
                            
                            var User3 = await Todo.find({ UserName: User2[i].Member[0] })

                            if(User3[0].VehicleDetail[0].RegistrationNumber == User2[i].RegistrationNumber){
                                var PushData = User3[0].VehicleDetail[0];
                            }else{
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
                        
                        var message2 = { "message": "Data Load Successfully", "data": SendData, "status": `${HTTP.SUCCESS}` }
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
    static Q = async (req, res) => {
        try {

            if (req.UserName) {

                const headerValue = req.get('Authorization');

                var User = await Todo2.findOne({ UserName: req.UserName })

                if (User) {

                    if (headerValue == User.token) {

                        var User2 = await Todo4.find({ Parklocation: User.UnitName, status: "Requested" })
                        var SendData = [];

                        for(var i=0;i<User2.length;i++){
                            
                            var User3 = await Todo.find({ UserName: User2[i].Member[0] })

                            if(User3[0].VehicleDetail[0].RegistrationNumber == User2[i].RegistrationNumber){
                                var PushData = User3[0].VehicleDetail[0];
                            }else{
                                var PushData = User3[0].VehicleDetail[1];
                            }

                            if(User2[i].UserWaitTime.length == 1){
                                var Time = User2[i].UserWaitTime[0];
                            }else{
                                var Time = User2[i].UserWaitTime[2];
                            }
                            
                            await SendData.push({
                                "Name1": User2[i].CarParkBy, 
                                "Name2": User2[i].Member[0], 
                                "RegistrationNumber": User2[i].RegistrationNumber,
                                "Make": PushData.CompanyName, 
                                "Time": Time,
                                "Model": PushData.Model
                            })

                        }

                        var message2 = { "message": "Data Load Successfully", "data": SendData, "status": `${HTTP.SUCCESS}` }
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
    static R = async (req, res) => {
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
    static S = async (req, res) => {
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
    static T = async (req, res) => {
        try {

            if (req.UserName) {

                const headerValue = req.get('Authorization');

                var User = await Todo2.findOne({ UserName: req.UserName })

                if (User) {

                    if (headerValue == User.token) {

                        var User2 = await Todo4.find({ Parklocation: User.UnitName, status: "Parked" })

                        var SendData = [];

                        if (User2.length !== 0) {
                            User2[0].TotleParkRRequestedLength = User2.length;
                            await SendData.push(User2[0]);
                        } else {
                            await SendData.push({
                                TotleParkRRequestedLength: 0
                            });
                        }

                        var User3 = await Todo4.find({ Parklocation: User.UnitName, status: "Requested" })
                        if (User3.length !== 0) {
                            User3[0].TotleParkRRequestedLength = User3.length;
                            await SendData.push(User3[0]);
                        } else {
                            await SendData.push({
                                TotleParkRRequestedLength: 0
                            });
                        }

                        var User4 = await Todo8.find({ BusinessManagerUserName: req.UserName })
                        if (User4.length !== 0) {
                            User4[0].TotleParkRRequestedLength = User4.length;
                            SendData.push(User4[0]);
                        } else {
                            SendData.push({
                                TotleParkRRequestedLength: 0
                            });
                        }

                        var User5 = await Todo6.find({ ReceiverUserName: req.UserName })
                        if (User5.length !== 0) {
                            User5[0].TotleParkRRequestedLength = User5.length;
                            SendData.push(User5[0]);
                        } else {
                            SendData.push({
                                TotleParkRRequestedLength: 0
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
    static U = async (req, res) => {
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

                    const message = {
                        notification: {
                            title: `${inputDate2} is waiting for someone to accept the car request`,
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

                if (User[i].NotificationRemainingTime) {

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
}

module.exports = { class1 , class2 };

