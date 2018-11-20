const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const { translatePathToMethod } = require('./utils')

const app = express()
const { PORT = '4000' } = process.env
app.use(bodyParser.json())
app.use(cors())

app.use(async (req, res) => {
  console.log('* Path match', req.path)
  const isToApiHandler = (req.path.startsWith('/api') && req.method === 'POST')

  if (!isToApiHandler) return res.status(403).json({ error: 'Wrong pattern' })
  if (!req.headers.path) return res.status(403).json({ error: 'Wrong pattern' })

  const method = translatePathToMethod(req.headers.path)

  try {
    const { headers, data } = await method(req.body)
    res.status(200).json({ headers, ...data })
  } catch (error) {
    console.log('* Error', error)
    res.status(403).json({ error: 'Some error happen :(' })
  }
})

app.listen(PORT, () => console.log(`App running at ${PORT}`))
