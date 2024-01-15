module.exports = (error, req, res, next) => {
  console.error(error)
  req.flash('error', error.error_msg || 'Server Error :(')
  res.redirect('back')
  next(error) // 將錯誤傳給 express 預設的 error handler middleware
}
