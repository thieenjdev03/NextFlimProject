const user = require("../Models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Mailer = require("../middlewares/mailer");
const useragent = require("useragent");
// const geoip = require("geoip-lite");

class authUsersService {
  static async loginUserService(email, password, req) {
    const userFound = await user.findOne({ email });
    if (!userFound) {
      return { success: false, message: "Emai is incorrect" };
    }
    const passwordValid = await bcrypt.compare(password, userFound.password);
    if (!passwordValid) {
      return {
        passwordValid,
        success: false,
        message: "Email or password is incorrect",
      };
    }
    // // Get device info
    // const userAgentString = req.headers["user-agent"];
    // const agent = useragent.parse(userAgentString);
    // const ip = req.ip;
    // const geo = geoip.lookup(ip);
    // const deviceInfo = {
    //   browser: agent.toAgent(),
    //   os: agent.os.toString(),
    //   device: agent.device.toString(),
    //   ip: ip,
    //   location: geo ? `${geo.city}, ${geo.region}, ${geo.country}` : "Unknown",
    //   deviceId: `${agent.toAgent()}-${agent.os.toString()}-${ip}`, // Create a unique deviceId
    // };

    // Check if the device is recognized
    const knownDevice = userFound.knownDevices.find(
      (device) => device.deviceId === deviceInfo.deviceId
    );
    if (!knownDevice) {
      // This is a new device
      userFound.knownDevices.push(deviceInfo);
      await userFound.save();
      // Send an alert to the user
      Mailer.sendNewDeviceAlert(userFound.email, deviceInfo);
    }

    const accessToken = jwt.sign(
      { userId: userFound._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    return {
      success: true,
      message: "Login successfully",
      accessToken,
      user: {
        id: userFound._id,
        name: userFound.name,
        email: userFound.email,
        phoneNumber: userFound.phoneNumber,
      },
    };
  }
  static async registerUserService(userName, email, password, phoneNumber) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new user({
      userName,
      email,
      password: hashedPassword,
      phoneNumber,
    });
    const userCreated = await newUser.save();
    const accessToken = jwt.sign(
      { userId: userCreated._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    return {
      success: true,
      message: "Register successfully",
      accessToken,
      //khong can thiet
      user: {
        id: userCreated._id,
        name: userCreated.userName,
        email: userCreated.email,
        phoneNumber: userCreated.phoneNumber,
      },
    };
  }
  static async forgotPasswordService(email) {
    const userFound = await user.findOne({ email });
    if (!userFound) {
      return { status: 400, message: "No account with that email found" };
    }

    const code = Math.floor(100000 + Math.random() * 900000); // generate a six digit number
    userFound.resetPasswordCode = code;

    // Set the expiration time for the reset password code
    // For example, let's set it to expire after 15 minutes
    userFound.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

    await userFound.save();

    // send email with the code
    // you need to implement this function
    await Mailer.sendEmailWithCode(email, code);

    return { message: "A verification code has been sent to your email" };
  }
  static async resetPasswordService(email, newPassword) {
    const userFound = await user.findOne({ email });
    if (!userFound) {
      return { status: 400, message: "No account with that email found" };
    }
    if (userFound.resetPasswordCode !== "true") {
      return { status: 400, message: "please confirm code before reset pass" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    userFound.password = hashedPassword;
    userFound.resetPasswordCode = null;
    userFound.resetPasswordExpires = null; // Reset the expiration time

    await userFound.save();

    return { status: 200, message: "Password reset successfully" };
  }
  static async confirmCodeService(email, code) {
     const userFound = await user.findOne({ email });
    if (!userFound) {
      return { status: 400, message: "No account with that email found" };
    }
    // Check if the code has expired
    if (userFound.resetPasswordExpires < Date.now()) {
      return { status: 400, message: "Verification code has expired" };
    }
     if (userFound.resetPasswordCode !== code) {
      console.log(code);
      return { status: 400, message: "Invalid verification code" };
    }
    userFound.resetPasswordCode = "true";
    userFound.resetPasswordExpires = null; // Reset the expiration time
    await userFound.save();

    return { status: 200,availableResetpass:"true", message: "confirm code successfully" };
  }
}
module.exports = authUsersService;
