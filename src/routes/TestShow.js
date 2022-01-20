import React, { useEffect, useState } from "react";
import axios from "axios";

const Test = () => {
  const [res, setRes] = useState("");
  useEffect(() => {
    const response = await axios.get("https://localhost:4000/api/test");
    setRes(response);
    console.log(response);
  });
  return (
    <div>
      <p>{res}</p>
    </div>
  );
};

export default Test;
