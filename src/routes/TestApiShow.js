import React, { useEffect, useState } from "react";
import axios from "axios";

const Test = () => {
  const [res, setRes] = useState("");
  useEffect(async () => {
    await axios
      .get("http://localhost:4000/api/show")
      .then((response) => {
        setRes(response);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return (
    <div>
      <p>{res}</p>
    </div>
  );
};

export default Test;
