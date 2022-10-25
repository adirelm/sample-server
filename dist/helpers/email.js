"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMailUserActivated = exports.sendMailUserWelcome = exports.sendMailAdminServerRegister = exports.sendMailToAdminStatusChanged = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
mail_1.default.setApiKey(process.env.SENDGRID_APIKEY);
const sendMailToAdminStatusChanged = function (serverName, serverUrl, serverStatus, adminMail) {
    mail_1.default.send({
        to: adminMail,
        from: "adir@monkeytech.co.il",
        subject: "The health status of your server is changed!",
        html: statusChangeEmailTemplate(serverName, serverUrl, serverStatus),
    });
};
exports.sendMailToAdminStatusChanged = sendMailToAdminStatusChanged;
const sendMailAdminServerRegister = function (serverName, serverUrl, adminMail) {
    mail_1.default.send({
        to: adminMail,
        from: "adir@monkeytech.co.il",
        subject: `Sucessfully registered ${serverName} to Sample Server Service!`,
        html: adminServerRegisterEmailTemplate(serverName, serverUrl, adminMail),
    });
};
exports.sendMailAdminServerRegister = sendMailAdminServerRegister;
const sendMailUserWelcome = function (username, firstname, otpCode, adminMail) {
    mail_1.default.send({
        to: adminMail,
        from: "adir@monkeytech.co.il",
        subject: `Welcome ${firstname || username}`,
        html: userWelcomeEmailTemplate(username, firstname, otpCode),
    });
};
exports.sendMailUserWelcome = sendMailUserWelcome;
const sendMailUserActivated = function (username, adminMail) {
    mail_1.default.send({
        to: adminMail,
        from: "adir@monkeytech.co.il",
        subject: `User ${username} activated`,
        html: userActivatedEmailTemplate(username),
    });
};
exports.sendMailUserActivated = sendMailUserActivated;
const userActivatedEmailTemplate = function (username) {
    return `    <body>
  <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#FFFFFF;">
    <div class="webkit">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
        <tr>
          <td valign="top" bgcolor="#FFFFFF" width="100%">
            <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td width="100%">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td>
                        <!--[if mso]>
<center>
<table><tr><td width="600">
<![endif]-->
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                  <tr>
                                    <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
<tr>
  <td role="module-content">
    <p></p>
  </td>
</tr>
</table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="6593bfa5-6181-4070-9569-a87270639989">
<tbody>
  <tr>
    <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
      <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:30% !important; width:30%; height:auto !important;" width="180" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/0dd99ba9801b3b22/aad56fca-7326-4982-95b5-fb0a0791866c/500x500.png">
    </td>
  </tr>
</tbody>
</table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="4743f6a7-2515-465d-a5ed-565b87041205">
<tbody>
  <tr>
    <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
      <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="4px" style="line-height:4px; font-size:4px;">
        <tbody>
          <tr>
            <td style="padding:0px 0px 4px 0px;" bgcolor="#a7adc6"></td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
</tbody>
</table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="45cabcb8-45b3-4154-8111-1666c075445d" data-mc-module-version="2019-10-22">
<tbody>
  <tr>
    <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 18px"><strong>User ${username} successfully </strong></span><span style="font-size: 18px; color: #089f08"><strong>activated</strong></span></div><div></div></div></td>
  </tr>
</tbody>
</table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="4743f6a7-2515-465d-a5ed-565b87041205.1">
<tbody>
  <tr>
    <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
      <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="4px" style="line-height:4px; font-size:4px;">
        <tbody>
          <tr>
            <td style="padding:0px 0px 4px 0px;" bgcolor="#a7adc6"></td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
</tbody>
</table><div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5"><div class="Unsubscribe--addressLine"></div><p style="font-size:12px; line-height:20px;"><a class="Unsubscribe--unsubscribeLink" href="{{{unsubscribe}}}" target="_blank" style="">Unsubscribe</a> - <a href="{{{unsubscribe_preferences}}}" target="_blank" class="Unsubscribe--unsubscribePreferences" style="">Unsubscribe Preferences</a></p></div></td>
                                  </tr>
                                </table>
                                <!--[if mso]>
                              </td>
                            </tr>
                          </table>
                        </center>
                        <![endif]-->
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </center>
</body>`;
};
const userWelcomeEmailTemplate = function (username, firstname, otpCode) {
    return `    <body>
  <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#FFFFFF;">
    <div class="webkit">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
        <tr>
          <td valign="top" bgcolor="#FFFFFF" width="100%">
            <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td width="100%">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td>
                        <!--[if mso]>
<center>
<table><tr><td width="600">
<![endif]-->
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                  <tr>
                                    <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
<tr>
  <td role="module-content">
    <p></p>
  </td>
</tr>
</table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="9ceb64a2-2b9e-49b5-aa0f-f9aa4dc3f547">
<tbody>
  <tr>
    <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
      <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:50% !important; width:50%; height:auto !important;" width="300" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/0dd99ba9801b3b22/43670072-702f-49a7-b575-5b78bfb78278/616x405.png">
    </td>
  </tr>
</tbody>
</table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="cd56f29e-45c0-489e-82ac-94a2bd72dc17">
<tbody>
  <tr>
    <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
      <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="4px" style="line-height:4px; font-size:4px;">
        <tbody>
          <tr>
            <td style="padding:0px 0px 4px 0px;" bgcolor="#121dd9"></td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
</tbody>
</table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="722cec7b-6e68-4905-a770-fd0e066dc081" data-mc-module-version="2019-10-22">
<tbody>
  <tr>
    <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 18px"><strong>Hello ${firstname || username}, Welcome to Sample Server Service!</strong></span></div><div></div></div></td>
  </tr>
</tbody>
</table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="cd56f29e-45c0-489e-82ac-94a2bd72dc17.1">
<tbody>
  <tr>
    <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
      <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="4px" style="line-height:4px; font-size:4px;">
        <tbody>
          <tr>
            <td style="padding:0px 0px 4px 0px;" bgcolor="#121dd9"></td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
</tbody>
</table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="a67573db-d29e-4372-8c86-43b9f4d3d576" data-mc-module-version="2019-10-22">
<tbody>
  <tr>
    <td style="padding:18px 0px 18px 0px; line-height:16px; text-align:inherit; background-color:#ffffff;" height="100%" valign="top" bgcolor="#ffffff" role="module-content"><div><div style="font-family: inherit; text-align: center"><strong>Your user is currently in </strong><span style="color: #e50808"><strong>pending</strong></span><strong> status.</strong></div>
<div style="font-family: inherit; text-align: center"><br></div>
<div style="font-family: inherit; text-align: center"><span style="font-size: 18px"><strong>CODE:</strong></span><span style="font-size: 18px; color: #000000"><strong> </strong></span><span style="font-size: 18px; color: #6aafed"><strong>${otpCode}</strong></span></div>
<div style="font-family: inherit; text-align: center"><strong><br>
</strong><span style="color: #c6b8b8"><strong>We will notify you when your user is activated.</strong></span></div><div></div></div></td>
  </tr>
</tbody>
</table><div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5"><div class="Unsubscribe--addressLine"></div><p style="font-size:12px; line-height:20px;"><a class="Unsubscribe--unsubscribeLink" href="{{{unsubscribe}}}" target="_blank" style="">Unsubscribe</a> - <a href="{{{unsubscribe_preferences}}}" target="_blank" class="Unsubscribe--unsubscribePreferences" style="">Unsubscribe Preferences</a></p></div></td>
                                  </tr>
                                </table>
                                <!--[if mso]>
                              </td>
                            </tr>
                          </table>
                        </center>
                        <![endif]-->
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </center>
</body>`;
};
const adminServerRegisterEmailTemplate = function (server_name, server_url, admin_mail) {
    return `    <body>
  <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#FFFFFF;">
    <div class="webkit">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
        <tr>
          <td valign="top" bgcolor="#FFFFFF" width="100%">
            <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td width="100%">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td>
                        <!--[if mso]>
<center>
<table><tr><td width="600">
<![endif]-->
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                  <tr>
                                    <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
<tr>
  <td role="module-content">
    <p></p>
  </td>
</tr>
</table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="640bb940-ea29-460b-8451-d07e64e4d07b">
<tbody>
  <tr>
    <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
      <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:40% !important; width:40%; height:auto !important;" width="240" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/0dd99ba9801b3b22/c1bc24a2-3aaa-4301-a56d-c37b415e7003/1600x1600.png">
    </td>
  </tr>
</tbody>
</table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="d9c01cfc-651d-4e57-88c8-66d8950f0a56">
<tbody>
  <tr>
    <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
      <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="2px" style="line-height:2px; font-size:2px;">
        <tbody>
          <tr>
            <td style="padding:0px 0px 2px 0px;" bgcolor="#D0CDCD"></td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
</tbody>
</table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="75d8ff46-30cb-4ed2-950d-7abde729614b" data-mc-module-version="2019-10-22">
<tbody>
  <tr>
    <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 18px"><strong>Great!<br>
Your server have successfully registered to Sample Server Service.<br>
</strong></span></div><div></div></div></td>
  </tr>
</tbody>
</table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="7a855c70-8cb3-48f2-a34a-13727f10aa15">
<tbody>
  <tr>
    <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
      <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="2px" style="line-height:2px; font-size:2px;">
        <tbody>
          <tr>
            <td style="padding:0px 0px 2px 0px;" bgcolor="#d0cdcd"></td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
</tbody>
</table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="e932d82d-72f5-4282-968a-e6be7dd54ca0" data-mc-module-version="2019-10-22">
<tbody>
  <tr>
    <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><ul>
<li color="rgb(0, 0, 0)" style="text-align: inherit; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0); font-size: 16px; font-weight: bold; font-size: 16px; font-weight: bold"><span style="color: #000000; font-family: arial, helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline; font-size: 16px"><strong>Server name: ${server_name}</strong></span></li>
<li color="rgb(0, 0, 0)" style="text-align: inherit; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0); font-size: 16px; font-weight: bold; font-size: 16px; font-weight: bold"><span style="color: #000000; font-family: arial, helvetica, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline"><strong>Server URL: ${server_url}</strong></span></li>
<li color="rgb(0, 0, 0)" style="text-align: inherit; font-family: arial, helvetica, sans-serif; color: rgb(0, 0, 0); font-size: 16px; font-weight: bold; font-size: 16px; font-weight: bold"><span style="color: #000000; font-family: arial, helvetica, sans-serif; font-size: 16px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline"><strong>Admin email: ${admin_mail}</strong></span></li>
</ul><div></div></div></td>
  </tr>
</tbody>
</table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="fd1ef469-944a-43a9-ad4a-6afe4b64090a">
<tbody>
  <tr>
    <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
      <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="2px" style="line-height:2px; font-size:2px;">
        <tbody>
          <tr>
            <td style="padding:0px 0px 2px 0px;" bgcolor="#D0CDCD"></td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
</tbody>
</table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="b075a766-5968-41cd-9bd9-70bf7801ead5" data-mc-module-version="2019-10-22">
<tbody>
  <tr>
    <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="color: #000000; font-family: arial, helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: left; text-indent: 0px; text-transform: none; white-space: pre-wrap; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; float: none; display: inline; font-size: 16px">Your server will receive a sample every 2 minutes, we will notify you if the access to your server is limited.<br>
<br>
Thank you for choosing Sample Server Service.</span></div><div></div></div></td>
  </tr>
</tbody>
</table><div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5"><div class="Unsubscribe--addressLine"></div><p style="font-size:12px; line-height:20px;"><a class="Unsubscribe--unsubscribeLink" href="{{{unsubscribe}}}" target="_blank" style="">Unsubscribe</a> - <a href="{{{unsubscribe_preferences}}}" target="_blank" class="Unsubscribe--unsubscribePreferences" style="">Unsubscribe Preferences</a></p></div></td>
                                  </tr>
                                </table>
                                <!--[if mso]>
                              </td>
                            </tr>
                          </table>
                        </center>
                        <![endif]-->
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  </center>
</body>`;
};
const statusChangeEmailTemplate = function (server_name, server_url, server_status) {
    return `
  <body>
    <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#FFFFFF;">
      <div class="webkit">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
          <tr>
            <td valign="top" bgcolor="#FFFFFF" width="100%">
              <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="100%">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td>
                          <!--[if mso]>
  <center>
  <table><tr><td width="600">
<![endif]-->
                                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                    <tr>
                                      <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
  <tr>
    <td role="module-content">
      <p></p>
    </td>
  </tr>
</table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="85c0f635-2c16-4470-8e4c-97fb275bda61">
  <tbody>
    <tr>
      <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
        <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:40% !important; width:40%; height:auto !important;" width="240" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/0dd99ba9801b3b22/c1bc24a2-3aaa-4301-a56d-c37b415e7003/1600x1600.png">
      </td>
    </tr>
  </tbody>
</table><table class="module" role="module" data-type="code" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="37e471aa-c098-471f-8773-7e174d5bddba">
  <tbody>
    <tr>
      <td height="100%" valign="top" role="module-content"></td>
    </tr>
  </tbody>
</table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="4a85db52-4804-4cbb-8a01-530118d32a8c" data-mc-module-version="2019-10-22">
  <tbody>
    <tr>
      <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 18px"><strong>The server status ${server_name} at url ${server_url} has changed to ${server_status}.</strong></span></div><div></div></div></td>
    </tr>
  </tbody>
</table><div data-role="module-unsubscribe" class="module" role="module" data-type="unsubscribe" style="color:#444444; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;" data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5"><div class="Unsubscribe--addressLine"></div><p style="font-size:12px; line-height:20px;"><a class="Unsubscribe--unsubscribeLink" href="{{{unsubscribe}}}" target="_blank" style="">Unsubscribe</a> - <a href="{{{unsubscribe_preferences}}}" target="_blank" class="Unsubscribe--unsubscribePreferences" style="">Unsubscribe Preferences</a></p></div></td>
                                    </tr>
                                  </table>
                                  <!--[if mso]>
                                </td>
                              </tr>
                            </table>
                          </center>
                          <![endif]-->
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </center>
  </body>`;
};
//# sourceMappingURL=email.js.map