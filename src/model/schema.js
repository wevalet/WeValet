var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  UserName: {
    type: String,
    // required: true, // I have know idea why i have add unique But by the my mine i was required to add required property but by mistakely i was added unique property
    // unique: true,
  },
  Email: {
    type: String,
  },
  Phone: {
    type: String,
    unique: true,
    required: true,
  },
  VehicleDetail: [{
    data: Buffer,
    contentType: String,
    CompanyName: String,
    Model: String,
    RegistrationNumber: String,
    Year: String,
    BodyType: String,
    Color: String,
    Picture: Array,
    status: String,
    status2: String,
    Member: Array,
    StatusChange: String,
  }],
  Member: Array,
  ActiveParkingUser: Array,
  Promocode: {
    type: String,
  },
  otp: {
    type: String,
  },
  token: {
    type: String,
  },
  Fcm: {
    type: String,
  },
  TimeUpdateStatus: {
    type: String,
  },
  OfficialPhone: {
    type: String,
  },
  Request: {
    type: Number,
  },
  PlanPurchase: {
    type: String,
  },
  PlanExpiredDate: {
    type: String,
  },
  OfficialPlanExpiredDate: {
    type: String,
  }
});

var Todo = mongoose.model("UserCollection", UserSchema);

const BusinessSchema = new mongoose.Schema({
  UserName: {
    type: String,
    unique: true,
    required: true,
  },
  Phone: {
    type: String,
    unique: true,
    required: true,
  },
  ManagerName: {
    type: String,
  },
  Name: {
    type: String,
  },
  ManagerDestination: {
    type: String,
  },
  PassWord: {
    trim: true,
    type: String,
    required: true,
  },
  UnitName: {
    type: String,
  },
  UnitType: {
    type: String,
  },
  UnitAddress: {
    type: String,
  },
  token: {
    type: String,
  },
  Fcm: {
    type: String,
  },
  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  },
  Profile: {
    type: Array,
  },
  Rating: {
    type: String,
  },
  Review: {
    type: Array,
  },
  Valets: {
    type: Array,
  },
  ForgetPasswordOtp: {
    type: String,
  },
  Email: {
    type: String,
  },
  OfficialPhone: {
    type: String,
  },
  ManagerName2: {
    type: String,
  },
  Country: {
    type: String,
  },
  State: {
    type: String,
  },
  City: {
    type: String,
  },
  UserWaitTime: [{
    data: Buffer,
    contentType: String,
    Monday: Array,
    Tuesday: Array,
    Wednesday: Array,
    Thursday: Array,
    Friday: Array,
    Saturday: Array,
    Sunday: Array,
  }],
  AccountCreateDate: {
    type: String,
  },
  PlanPurchase: {
    type: String,
  },
  PlanExpiredDate: {
    type: String,
  }
});

const Todo2 = new mongoose.model(
  "BusinessCollection",
  BusinessSchema
);

var CustomerSchema = new mongoose.Schema({
  Name: {
    type: String,
  },
  Phone: {
    type: String,
  },
  Username: {
    type: String,
    unique: true,
    required: true,
  },
  PassWord: {
    trim: true,
    type: String,
    required: true,
  },
  Access1: {
    type: Number,
  },
  Access2: {
    type: Number,
  },
  Access3: {
    type: Number,
  },
  Access4: {
    type: Number,
  },
  Access5: {
    type: Number,
  },
  Access6: {
    type: Number,
  },
  Access7: {
    type: Number,
  },
  Access8: {
    type: Number,
  },
  Access9: {
    type: Number,
  },
  Access10: {
    type: Number,
  },
  Access11: {
    type: Number,
  },
  Access12: {
    type: Number,
  },
  Access13: {
    type: Number,
  },
  Access14: {
    type: Number,
  },
  Access15: {
    type: Number,
  },
  Access16: {
    type: Number,
  },
  signuptoken: {
    type: String,
  }
});

var Todo3 = mongoose.model("CustomerCollection", CustomerSchema);

const ParkDetailSchema = new mongoose.Schema({
  CompanyName: String,
  Model: String,
  RegistrationNumber: String,
  Color: String,
  CarPicture: Array,
  CarPictureofficial: Array,
  valetTicketPicture: Array,
  Parklocation: String,
  UpdatedParklocation: String,
  CarBringer: String,
  IsOwnerCarBringer: String,
  CarParkBy: String,
  ParkInTime: String,
  status: String,
  status2: String,
  UserWaitTime: Array,
  CarDeliverPicture: Array,
  valetDeliverTicketPicture: Array,
  ParkOutlocation: String,
  CarPickBy: String,
  CarDeliverkBy: String,
  ParkOutTime: String,
  TimeUpdateStatus: String,
  WaitTime: String,
  leaveTimeCounter: String,
  RequestTimeDate: String,
  UpdateTimeDate: String,
  Member: Array,
  TotleParkRRequestedLength: String,
  CarPictureUploadStatus: String
});

const Todo4 = mongoose.model('ParkDetailCollection', ParkDetailSchema);

const CompanyDetailSchema = new mongoose.Schema({
  CompanyName: {
    type: String
  },
  Model: {
    type: Array
  }
});

const Todo5 = mongoose.model('CompanyDetailCollection', CompanyDetailSchema); // One Company Name is Multiple ( 3 ) Times and i have find jeep 2 Time

var IntimateSchema = new mongoose.Schema({
  Date: {
    type: String,
  },
  Time: {
    type: String,
  },
  NotiFicationGetTime: {
    type: String,
  },
  NotiFicationGetDate: {
    type: String,
  },
  Phone: {
    type: String,
    required: true,
  },
  TotleParkRRequestedLength: {
    type: String,
  },
  ReceiverUserName: {
    type: String,
  },
  SenderUserName: {
    type: String,
  }
});

var Todo6 = mongoose.model("IntimateCollection", IntimateSchema);

var NotificationSchema = new mongoose.Schema({
  UserName: {
    type: String,
  },
  Message: {
    type: String,
  },
  ParkInTime: {
    type: String,
  },
  NotificationRemainingTime: {
    type: String,
  },
  BusinessUserName: {
    type: String,
  },
  RegistrationNumber: {
    type: String,
  }
});

var Todo7 = mongoose.model("NotificationCollection", NotificationSchema);

var ValetSchema = new mongoose.Schema({
  Username: {
    type: String,
    unique: true,
    required: true,
  },
  Phone: {
    type: String,
    unique: true,
    required: true,
  },
  Password: {
    trim: true,
    type: String,
    required: true,
  },
  Name: {
    type: String,
  },
  BusinessManagerUserName: {
    type: String,
  },
  BusinessUnitName: {
    type: String,
  },
  token: {
    type: String,
  },
  Fcm: {
    type: String,
  },
  Status: {
    type: String,
  },
  TotleParkRRequestedLength: {
    type: String,
  },
  ForgetPasswordOtp: {
    type: String,
  },
  ValetStatus: {
    type: String,
  },
  BusinessUserName: {
    type: String,
  },
  Profile: {
    type: Array,
  },
  PlanPurchase: {
    type: String,
  },
  PlanExpiredDate: {
    type: String,
  }
});



var Todo8 = mongoose.model("ValetCollection", ValetSchema);

var carParkInToken = new mongoose.Schema({
  tokennumber: {
    type: String,
    unique: true,
    required: true,
  },
  vehicalnumber: {
    type: String,
    unique: true,
    required: true,
  },
  randomnumber: {
    type: String,
    unique: true,
    required: true,
  },
});

var Todo15 = mongoose.model("carparkqrdata", carParkInToken);

var PaymentSchema = new mongoose.Schema({
  Plan: {
    type: String,
  },
  PlanAmount: {
    type: String,
  },
  ActualPrice: {
    type: String,
  },
  Message: {
    type: String,
  },
  OffAmount: {
    type: String,
  },
  User: {
    type: String,
  }
});

var Todo9 = mongoose.model("PaymentCollection", PaymentSchema);

var PictureSchema = new mongoose.Schema({
  Date: {
    type: String,
  },
  Time: {
    type: String,
  },
  UserAction: {
    type: String,
  },
  RegistrationNumber: {
    type: String,
  },
  Pictures: {
    type: Array,
  }
});

var Todo10 = mongoose.model("PictureCollection", PictureSchema);

module.exports = { Todo, Todo2, Todo3, Todo4, Todo5, Todo6, Todo7, Todo8, Todo9, Todo10, Todo15 };
