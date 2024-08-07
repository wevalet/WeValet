var express = require("express");
const router = express.Router();

var { class1 , class2 } = require('../controller/controller');

var jwt = require("jsonwebtoken");
var path = require("path");

var { upload, upload2 } = require("../middleware/schema");

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

router.post("/CreateUser", upload.array("picture"), class1.a);
router.post("/CreateBusiness", upload.array("picture"), class1.b);
router.post("/AddVehicle", verifyToken, upload.array("picture"), class1.c);
router.post("/UserLoginOtpSend", class1.d);
router.post("/UserLoginVerifyOtp", class1.e);
router.post("/BusinessLogin", class1.f);
router.post("/WaitTime" , class1.g);
router.post("/WalletParkInRequest", verifyToken, upload2.fields([{ name: 'valetTicket' }, { name: 'carPicture' }]), class1.h);
router.post("/WalletParkInRequest1", verifyToken, upload.array("picture"), class1.h1);
router.post("/WalletParkInRequest2", verifyToken, upload.array("picture"), class1.h2);
router.post("/UserParkOutRequest", verifyToken, class1.i);
router.post("/WaletRequestAction", verifyToken, class1.j);
router.post("/WaletUpdateUserWaitTime", verifyToken, class1.k);
router.post("/UserWaitTime", class1.l);
router.get("/UserAccounts", class1.m);
router.get("/BusinessAccounts", class1.n);
router.get("/Login", class1.o);
router.post("/Login", class1.o2);
router.get("/LogOut", class1.o3);
router.get("/DashBoard", class1.p1);
router.get("/User", class1.p2);
router.get("/Parking", class1.p3);
router.get("/Hotel", class1.p4);
router.get("/Restaurant", class1.p5);
router.get("/Mall", class1.p6);
router.get("/Other", class1.p7);
router.post("/location", class1.q);
router.post("/location2", class1.q2);
router.get("/CustomerRequest", verifyToken, class1.r1);
router.get("/AcceptedCustomerRequest", verifyToken, class1.r2);  
router.post("/CustomerRequestByRegistrationNumber", verifyToken, class1.s);
router.get("/History", verifyToken, class1.t);
router.get("/status", verifyToken, class1.u);
router.post("/RegistrationNumberCheck", verifyToken, class1.v);
router.post("/StatusChange", class1.w); 
router.post("/VehicleDeliverByValet", verifyToken, upload2.array("carPicture"), class1.x);
router.post("/VehicleDeliverByValet2", verifyToken, class1.x2);
router.post("/RequestCancleByCustomer", verifyToken , class1.y);
router.post("/InitilizeNotification", verifyToken , class1.z);
router.get("/Company", class1.A);
router.post("/Model", class1.B);
router.post("/ForgetPasswordOtpSend", class1.C);
router.post("/ForgetPasswordVerifyOtp", class1.C2);
router.post("/NewPassword", class1.C3);
router.post("/AddMember", verifyToken , class1.D);
router.post("/Notification", verifyToken , class1.E);
router.get("/CustomerPersonalDetails", verifyToken , class1.F);
router.get("/FetchMember", verifyToken , class1.G);
router.get("/ValetPersonalDetails", verifyToken , class1.H);
router.get("/BusinessIntimatelDetails", verifyToken , class1.I);
router.post("/NumberToMember", class1.J);
router.post("/Search", verifyToken , class1.K);
router.post("/AddValet", verifyToken , class1.L);
router.get("/ShowValet", verifyToken , class1.M);
router.post("/DeleteValet", verifyToken , class1.N);
router.get("/ShowNotification", verifyToken , class1.O);
router.get("/ParkedCar", verifyToken , class1.P);
router.get("/RequestedCar", verifyToken , class1.Q);
router.get("/ReadTime", verifyToken , class1.R);
router.post("/UpdateTime", verifyToken , class1.S);
router.get("/BusinessFirstPage", verifyToken , class1.T);
router.get("/BusinessSendNotification" , class1.U);

module.exports = router;