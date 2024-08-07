var express = require("express");
const router = express.Router();

var { class1 , class2 } = require('../controller/controller');

var jwt = require("jsonwebtoken");
var path = require("path");

var { upload, upload2, upload3 } = require("../middleware/schema");

const HTTP = require("../../constant/response.constant");

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(HTTP.FORBIDDEN).json({ message: 'Token not provided', "status": `${HTTP.FORBIDDEN}` });
  }

  var SECRET_KEY = process.env.SECRET_KEY || "YOURSECRETKEYGOESHERE";
                                              
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(HTTP.UNAUTHORIZED).json({ message: 'Invalid token', "status": `${HTTP.UNAUTHORIZED}` });
    }

    req.UserName = decoded.UserName;
    req.Phone = decoded.Phone;
    next();
  });
}
router.post("/tokenqrdata", verifyToken, class1.tokenqrdata);
router.post("/CreateUser", upload.array("picture"), class1.a);
router.post("/qrcodebynumber", class1.qrcode);
router.get("/demo", class1.demo);
router.post("/CreateBusiness", upload.array("picture"), class1.b);
router.post("/AddVehicle", verifyToken, upload.array("picture"), class1.c);
router.post("/UserLoginOtpSend", class1.d);
router.post("/UserLoginVerifyOtp", class1.e);
router.post("/BusinessLogin", class1.f);
router.post("/WaitTime" , class1.g);
router.post("/WalletParkInRequest", verifyToken, upload2.fields([{ name: 'valetTicket' }, { name: 'carPicture' }]), class1.h);
// router.post("/WalletParkInRequest1", verifyToken, upload.array("picture"), class1.i);
// router.post("/WalletParkInRequest1", verifyToken, upload3.single('picture'), class1.i);
router.post("/WalletParkInRequest1", verifyToken, upload3.array('picture'), class1.i);
router.post("/WalletParkInRequest11", verifyToken, upload3.array('picture'), class1.ione);
// router.post("/WalletParkInRequest2", verifyToken, upload.array("picture"), class1.j);
router.post("/WalletParkInRequest2", verifyToken, upload3.array('picture'), class1.j);
router.post("/WalletParkInRequest3", verifyToken, class1.k);
router.post("/UserParkOutRequest", verifyToken, class1.l);
router.post("/WaletRequestAction", verifyToken, class1.m);
router.post("/WaletUpdateUserWaitTime", verifyToken, class1.n);
router.post("/UserWaitTime", class1.o); // 1
// router.get("/UserAccounts", class1.o);
// router.get("/BusinessAccounts", class1.p);
router.get("/Login", class1.p);
router.post("/Login", class1.q);
router.get("/LogOut", class1.r);
router.get("/DashBoard", class1.s);
router.get("/User", class1.t);
router.post("/User", class1.u);
router.get("/Customer", class1.v);
router.get("/Customer/:id1", class1.w);
router.get("/QrCode", class2.qrcode);
router.post("/Customer", class1.v2);
router.post("/Customer/:id1", class1.w2);
router.get("/Parking", class1.x);
router.get("/Parking/:id1/:id2/:id3/:id4/:id5", class1.y);
router.get("/Hotel", class1.z);
router.get("/Hotel/:id1/:id2/:id3", class1.A);
router.get("/Restaurant", class1.B);
router.get("/Restaurant/:id1/:id2/:id3", class1.C);
router.get("/Mall", class1.D);
router.get("/Mall/:id1/:id2/:id3", class1.E);
router.get("/Other", class1.F);
router.get("/Other/:id1/:id2/:id3", class1.G);
router.post("/location", verifyToken, class1.H);
router.post("/location2", verifyToken, class1.I);
router.get("/CustomerRequest", verifyToken, class1.J);
router.get("/AcceptedCustomerRequest", verifyToken, class1.K);  
router.post("/CustomerRequestByRegistrationNumber", verifyToken, class1.L);
router.get("/History", verifyToken, class1.M);
router.get("/status", verifyToken, class1.N);
router.post("/RegistrationNumberCheck", verifyToken, class1.O);
router.post("/StatusChange", class1.P); 
// router.post("/VehicleDeliverByValet", verifyToken, upload2.array("carPicture"options), class1.J); 
router.post("/VehicleDeliverByValet", verifyToken, upload3.array('carPicture'), class1.Q); 
router.post("/VehicleDeliverByValet2", verifyToken , class1.R);
router.post("/RequestCancleByCustomer", verifyToken , class1.S);
router.post("/RequestCancleByCustomer2", class1.T);
router.post("/InitilizeNotification", verifyToken , class1.U);  
router.get("/Company", class1.V);
router.post("/Model", class1.W);
router.post("/ForgetPasswordOtpSend", class1.X);
router.post("/ForgetPasswordVerifyOtp", class1.Y);
router.post("/NewPassword", class1.Z); 
// router.post("/AddMember", verifyToken , class1.S);
router.post("/AddMember", verifyToken , class2.a);
router.post("/Notification", verifyToken , class2.b);
router.get("/CustomerPersonalDetails", verifyToken , class2.c);
router.get("/FetchMember", verifyToken , class2.d);
router.get("/ValetPersonalDetails", verifyToken , class2.e);
router.get("/BusinessIntimatelDetails", verifyToken , class2.f);
router.post("/NumberToMember", class2.g); 
router.post("/Search", verifyToken , class2.h);
router.post("/AddValet", verifyToken , class2.i);
router.get("/ShowValet", verifyToken , class2.j);
router.post("/DeleteValet", verifyToken , class2.k);
router.post("/UpdateValet", verifyToken, upload.array("picture"), class2.l);
router.get("/ShowNotification", verifyToken , class2.m);
router.get("/ParkedCar", verifyToken , class2.n);
router.get("/RequestedCar", verifyToken , class2.o);
router.get("/ReadTime", verifyToken , class2.p);
router.post("/UpdateTime", verifyToken , class2.q);
router.get("/BusinessFirstPage", verifyToken , class2.r);
router.get("/BusinessSendNotification" , class2.s);
router.post("/ValetUpdate", verifyToken, upload.array("picture"), class2.t);
router.get("/AddCompanyData", class2.u);
router.get("/Change" , class2.v);
router.post("/Change", class2.w);
router.get("/PaymentGet", verifyToken, class2.x);
router.post("/PlanPurchaseByCustomer", verifyToken, class2.y);
router.post("/ClearAll", verifyToken, class2.z);

// router.get("/ShowNotification2", verifyToken , class2.A);

router.get("/Payment", class2.B);
router.post("/Payment", class2.C);

router.post("/StatusChange2", class2.D); 
// class2.E // This is Also Define In Controller.js File

router.post("/OnlyNotification", class2.F); 

router.post("/LatitudeAndLongitude", class2.G);

router.get("/", class2.H);

router.get("/DeleteCusomer/:id", class2.I);

router.get("/CancleMemberShip", verifyToken, class2.J);

router.post("/WeekendPicture1", verifyToken, class2.K);
router.post("/WeekendPicture2", verifyToken, class2.M);


module.exports = router;