const grpc = require('grpc')
const path = require('path')

const PROTO_PATH = path.resolve(__dirname, '../protos/leave.proto')

const proto = grpc.load(PROTO_PATH)

const client = new proto.leave.LeaveApplicationService('localhost:50050', 
grpc.credentials.createInsecure())

const employee = {
  valid: {
    employeeId: 2345,
    name: 'Stephen Gatana',
    requestedDays: 6,
    accruedDays: 8,
  },
  ineligible: {
    employeeId: 2345,
    name: 'Stephen Gatana',
    requestedDays: 10,
    accruedDays: 8,
  },
  invalid: {
    employeeId: 2345,
    name: 'Stephen Gatana',
    requestedDays: -2,
    accruedDays: 8,
  }
}

client.applyForLeave(employee.ineligible, (error, res) => {
  if(!error) {
    if(res.eligible){
      client.grantLeave(employee.valid, (error, response) => {
        console.log('employee', response)
      })
    } else {
      console.log('you do not qualify for a leave');
    }
  } else {
    console.log('Error', error.message)
  }
});