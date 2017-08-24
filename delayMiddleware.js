module.exports = (req, res, next, seconds) => {
  var MAX_SECONDS_DELAY = 120;
  var seconds = parseFloat(seconds);

  if (isNaN(seconds)) {
    res
      .status(400)
      .send(
        '<strong>' +
          req.params.seconds +
          '</strong>' +
          'are no valid seconds. Try something like <strong>3</strong>'
      );
    return;
  }

  if (seconds > MAX_SECONDS_DELAY) {
    res
      .status(400)
      .send(
        '<strong>' +
          req.params.seconds +
          '</strong>' +
          'is too long. Try something like <strong>' +
          MAX_SECONDS_DELAY +
          '</strong>'
      );
    return;
  }

  setTimeout(() => next(), seconds * 1000);
};
