// see ProfessorDataScraper.ts for more info

// const express = require("express");
// const cors = require("cors");
// const axios = require("axios");

// const app = express();
// app.use(cors());

// app.get("/proxy", async (req, res) => {
//   const targetUrl = req.query.url;
  
//   if (!targetUrl) {
//     return res.status(400).json({ error: "Missing 'url' query parameter" });
//   }

//   try {
//     const response = await axios.get(targetUrl, {
//       headers: { "User-Agent": "Mozilla/5.0" } // Mimic a real browser
//     });
//     res.send(response.data);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch data" });
//   }
// });

// app.listen(8080, () => console.log("Proxy server running on port 8080"));

