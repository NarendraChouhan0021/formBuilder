import Config from "./config";

export const LoginAPI = async (url, type, body_details) => {
  try {
    type = type.toUpperCase();
    const res = await fetch(`${Config.baseURL}/user/${url}`, {
      method: type,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body_details),
    });
    const response = await res.json();
    console.log("data", response);
    localStorage.setItem("basicAuth", response.data.token);
    return { data: response, auth: response.data.token };
  } catch (error) {
    throw error;
  }
};

export const AuthAPI = async (baseURL, url, type, body_details) => {
  const basicAuth = localStorage.getItem("basicAuth");
  // console.log("basicAuth", basicAuth);
  let API_details = {};
  type = type.toUpperCase();
  if (type === "GET") {
    API_details = {
      method: type,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + basicAuth,
      },
    };
  } else {
    if (body_details) {
      API_details = {
        method: type,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + basicAuth,
        },
        body: JSON.stringify(body_details),
      };
    } else {
      API_details = {
        method: type,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + basicAuth,
        },
      };
    }
  }
  try {
    const rootURL =
      baseURL === "normal" ? Config.baseURL : `https://${Config.domain}`;
    // //console.log("rootURL", rootURL);
    const resourse = `${rootURL}/${url}`;
    // if (resourse && resourse.includes('//')) {
    //     console.log('worng url')
    // }
    const res = await fetch(resourse, API_details);
    // //console.log(res, "res")
    const data = await res.json();
    // //console.log("data", data)
    return data;
  } catch (error) {
    throw error;
  }
};

export const UnAuthAPI = async (url, type, body_details) => {
  type = type.toUpperCase();
  let API_details = {};
  if (type === "GET") {
    API_details = {
      method: type,
      headers: { "Content-Type": "application/json" },
    };
  } else {
    if (body_details) {
      API_details = {
        method: type,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body_details),
      };
    } else {
      API_details = {
        method: type,
        headers: { "Content-Type": "application/json" },
      };
    }
  }
  try {
    const resourse = `${Config.baseURL}/${url}`;
    // if (resourse && resourse.includes('//')) {
    //     console.log('worng URl')
    // }
    const res = await fetch(resourse, API_details);
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const get_config = async () => {
  const resp = [];
  const basicAuth = localStorage.getItem("basicAuth");
  // const res = await AuthAPI('normal', '', 'GET');
  const res = await fetch(Config.baseURL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + basicAuth,
    },
  });
  const data = await res.json();
  console.log("get_config", data);
  resp.push(data);
  return resp;
};
