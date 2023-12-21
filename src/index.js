import express from 'express'
import Gun from 'gun'
import  { fileURLToPath } from 'url'
import { dirname } from 'path'

const port = process.env.OPENSHIFT_NODEJS_PORT || process.env.VCAP_APP_PORT || process.env.PORT || process.argv[2] || 8765

const __dirname = dirname(fileURLToPath(import.meta.url))

const app = express()
app.use(Gun.serve)
app.use(express.static(__dirname))

const server = app.listen(port)
const gun = Gun({file: 'data', web: server})

global.Gun = Gun; /// make global to `node --inspect` - debug only
global.gun = gun; /// make global to `node --inspect` - debug only

console.log('Server start on port ' + port + ' with /gun')