const axios = require("axios");

const makeRequest = async (url, cookies, referer, data) => {
  if (data == undefined) {
    data = {
      sessionId: "null",
      dateMin: "",
      dateMax: "",
    };
  } else {
    if (data["sessionId"] == undefined) {
      data["sessionId"] = "null";
    }
    if (data["dateMin"] == undefined) {
      data["dateMin"] = "";
    }
    if (data["dateMax"] == undefined) {
      data["dateMax"] = "";
    }
  }
  const req = axios.create({
    baseURL: "https://app3.ecolecatholique.ca/sp/parent/DataService.asmx/",
    withCredentials: true,
    headers: {
      Cookie: cookies,
      Host: "app3.ecolecatholique.ca",
      origin: "https://app3.ecolecatholique.ca",
      Referer: referer,
    },
  });

  let res = await req.post(url, data);
  return res.data;
};

export default makeRequest;