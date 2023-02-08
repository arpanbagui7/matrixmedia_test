const axios = require("axios");
const fs = require("fs");
const crypto = require("crypto");

const fetchData = async () => {
  const response = await axios.get(
    "https://coderbyte.com/api/challenges/json/age-counting"
  );
  const { data } = response.data;
  const dataList = data.split(", ");
  const keys = [];
  for (let i = 0; i < dataList.length; i += 2) {
    const age = parseInt(dataList[i + 1].split("=")[1]);
    const key = dataList[i].split("=")[1];
    if (age === 32) {
      keys.push(key);
    }
  }
  try {
    const file = "output.txt";
    fs.writeFile(file, keys.join("\n") + "\n", (error) => {
      if (error) throw error;
      console.log("file created successfully");
    });
    fs.readFile(file, (error, data) => {
      if (error) throw error;
      const hash = crypto.createHash("sha1").update(data).digest("hex");
      console.log(hash);
    });
  } catch (error) {
    console.log(error);
  }
};

fetchData();
