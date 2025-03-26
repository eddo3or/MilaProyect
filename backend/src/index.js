import app from './app.js'
import { connect_db_mongoose } from './db.js'

connect_db_mongoose();
app.listen(3000)
console.log('Server on port', 3000)
