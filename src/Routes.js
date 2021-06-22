const Routes = require("express").Router();

var urlData = [];

Routes.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

Routes.post("/api/shorturl", (req, res) => {
  const urlIsValid =
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/.test(
      req.body.url
    );

  if (!urlIsValid) return res.json({ error: "Invalid url" });

  const original_url = req.body.url;
  const short_url = Math.floor(1000 + Math.random() * 9000);

  const newUrl = { original_url, short_url };
  urlData.push(newUrl);

  return res.json(newUrl);
});

Routes.get("/api/shorturl/:shorturl?", (req, res) => {
  const short_url = parseInt(req.params.shorturl);

  const url = urlData.find((url) => url.short_url === short_url);

  if (url) return res.redirect(301, url.original_url);

  return res.status(404).json({ err: "Short url not found" });
});

module.exports = Routes;
