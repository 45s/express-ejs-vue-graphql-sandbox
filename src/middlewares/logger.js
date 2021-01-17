import colors from 'colors'

export function logger(req, res, next) {
  console.log(colors.bgGreen.black(`Req.time: ${req.requestTime}`))
  next()
}
