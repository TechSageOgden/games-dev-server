/* eslint-disable require-jsdoc */
async function getInitialData() {
  console.log("getInitialData");
  const response = await fetch("./datainitial", { method: "GET" });
  const data = await response.json();
  console.log(data);
  response.locals = data;
}

getInitialData();
