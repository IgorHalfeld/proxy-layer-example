exports.translatePathToMethod = pattern => {
  console.log('* Pattern receive', pattern)
  const [fileName, method] = pattern.split('.')
  const file = require(`./apiMethods/${fileName}`)
  return file[method]
}