const grpc = require('grpc')
const path = require('path')
var async = require('async')

const PROTO_PATH = path.resolve(__dirname, '../protos/employee.proto')
const proto = grpc.load(PROTO_PATH)
const db = require('../databases')

const client = new proto.employee.EmployeeService('localhost:50050', 
grpc.credentials.createInsecure())

function callEmployee(callback){
  function featureCallback(err, res){
    if(err){
      return callback(err)
    }
    console.log(res)
  }
  client.getEmployee(1, featureCallback)
}
function main () {
  async.series([
    callEmployee,
  ])
}

if (require.main === module) {
  main()
}

exports.callEmployee = callEmployee
