import Server from "../../models/server";

export const HTTP = "http";
export const HTTPS = "https";

export const modifyUrlWithHttpOrHttps = function (url: string) {
  let modifiedUrl = url;
  if (url) {
    const prefix = url.split(":");
    if (prefix[0] !== HTTP && prefix[0] !== HTTPS) {
      modifiedUrl = `http://${url}`;
    }
  }

  return modifiedUrl;
};

export const checkExistenceOfUrl = async function (
  url: string
): Promise<boolean> {
  const record = await Server.findOne({ where: { url } });

  return !!record;
};