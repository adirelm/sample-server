import sendMail from "@sendgrid/mail";

sendMail.setApiKey(process.env.SENDGRID_APIKEY!);

export const sendMailToAdmin = function (
  serverName: string,
  serverUrl: string,
  serverStatus: string,
  adminMail: string
) {
  sendMail.send({
    to: adminMail,
    from: "adir@monkeytech.co.il",
    subject: "The health check of your server is changed!",
    html: emailTemplate(serverName, serverUrl, serverStatus),
  });
};

const emailTemplate = function (
  server_name: string,
  server_url: string,
  server_status: string
) {
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
