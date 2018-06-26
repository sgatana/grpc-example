const path = require('path')
const Mali = require('mali')

const db = require('../databases')
const port = '0.0.0.0:50050'
const PROTO_PATH = path.resolve(__dirname, '../protos/employee.proto')

const getEmployee = async(ctx) => {
  const id = ctx.req;
  let employee = await db.employees[id]
  if(!employee){
    throw new Error('cannot find employee')
  }
  ctx.res = employee

}
let app;
const main = () => {
  app = new Mali(PROTO_PATH, 'EmployeeService')
  app.use({
    getEmployee,
  })
  app.start(port)
  console.log(`server running on port ${port}`)
}
const shutdown  = (err) => {
 if(err){
   console.log(err)
 }
}
process.on('uncaughtException', shutdown)
process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)

main()