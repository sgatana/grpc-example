const grpc = require('grpc')
const path = require('path')

const PROTO_PATH = path.resolve(__dirname, '../protos/employee.proto')
const proto = grpc.load(PROTO_PATH)
const db = require('../databases')

const client = new proto.employee.EmployeeService('localhost:50050', 
grpc.credentials.createInsecure())

client.getEmployee(db)
