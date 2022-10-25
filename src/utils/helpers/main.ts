import { ApiError } from "../../helpers/error";
import Server from "../../models/server";

export const HTTP = "http";
export const HTTPS = "https";

export const modifyUrlWithHttpOrHttps = function (url: string): string {
  let modifiedUrl = url;
  if (url) {
    const prefix = url.split(":");
    if (prefix[0] !== HTTP && prefix[0] !== HTTPS) {
      modifiedUrl = `http://${url}`;
    }
  }

  return modifiedUrl;
};

export const renderSuccess = function (
  res: any,
  status: number,
  message: string,
  data: any
) {
  res.status(status).json({ status, message, data });
};

export const restrictEmail = function (admin_mail: string) {
  const authorizedMail = [
    "adir4455@gmail.com",
    "adir@monkeytech.co.il",
    "idanref@gmail.com",
    "Kipnissroni@gmail.com",
  ];

  const authorizedAdminMail = authorizedMail.find(
    (mail) => admin_mail === mail
  );
  if (!authorizedAdminMail)
    throw new ApiError(
      400,
      "Unauthorized email, contact administrator for permissions"
    );

  return authorizedAdminMail;
};
