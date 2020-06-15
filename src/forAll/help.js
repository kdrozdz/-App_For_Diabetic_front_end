import Cookies from "universal-cookie";
import Axios from "axios";

const cookie = new Cookies();

const id = cookie.get("id");
const auth = { Authorization: `token ${cookie.get("token")}` };
const url = "https://app-diabetic.herokuapp.com";

const Logout = () => {
  cookie.remove("id");
  cookie.remove("token");
  window.location.href = "/";
};

const getMsg = (sId, rId) => {
  Axios.post(
    `${url}/email/conv/`,
    {
      sId,
      rId,
    },
    {
      headers: auth,
    }
  ).then((res) => {});
};

const sendMsg = (sId, rId, msg, funk) => {
  if (msg !== "") {
    Axios.post(
      `${url}/email/`,
      {
        sender: sId,
        reciver: rId,
        msg,
      },
      {
        headers: auth,
      }
    ).then((res) => {
      funk("");
    });
  }
};
const get_new_msg = (rId, setNewMsg) => {
  Axios.post(
    `${url}/email/new_msg/`,
    {
      rId,
    },
    {
      headers: auth,
    }
  ).then((res) => {
    console.log(res.data);

    setNewMsg(res.data);
  });
};
const get_new_msg_detail = (rId, setNewMsg) => {
  Axios.post(
    `${url}/email/new_msg/`,
    {
      rId,
    },
    {
      headers: auth,
    }
  ).then((res) => {
    setNewMsg(res.data);
  });
};
const help = {
  url,
  id,
  auth,
  Logout,
  sendMsg,
  getMsg,
  get_new_msg,
  get_new_msg_detail,
};

export default help;
