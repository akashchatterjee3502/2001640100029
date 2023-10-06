const express = require("express");
const axios = require("axios");

const app = express();

const PORT = 3000;

const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

app.get("/numbers", async (req, res) => {
  var urls = req.query.url;
  if (typeof urls === "string") {
    urls = [urls];
  }
  var urls = urls.filter((url) => isValidURL(url));

  const numbers = [];

  await Promise.all(
    urls.map(async (url) => {
      try {
        const response = await axios.get(url);
        numbers.push(...response.data?.numbers);
      } catch (error) {
        console.log(error);
      }
    })
  );

  const uniqueNumbers = [...new Set(numbers)];

  res.status(200).json({ numbers: uniqueNumbers });
});

app.listen(PORT, () => {
  console.log("Server listening on port 3000");
});
