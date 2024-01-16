module.exports = {
  errorHandler (err, req, res, next) {
    console.error(err)
    req.flash('error', err.message || 'Server Error :(')
    res.redirect('back')
    next(err) // 將錯誤傳給 express 預設的 error handler middleware
  }
}
