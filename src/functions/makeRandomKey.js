import axios from "axios";

const verifyKey = async (key) => {
  await axios
    .post("http://groovle.site/api/verifykey", {
      // await axios
      //   .post("http://localhost:4000/api/verifykey", {
      key,
      headers: {
        "content-type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    });
};

const makeRandomKey = () => {
  // TODO: 같은 아이디 가진 방 있을때 어떻게 할지 결정
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var key = "";
  for (var i = 0; i < 6; i++) {
    key += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  if (verifyKey(key)) {
    return key;
  } else {
    makeRandomKey();
  }
};

export default makeRandomKey;
