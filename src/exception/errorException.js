const errorHandle = async (res, err, status, msg) => {
  return res.status(status).json({
    success: false,
    message: `${msg} ${err}`,
  });
};

module.exports = {
  errorHandle,
};
