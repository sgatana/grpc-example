const grpc = require('grpc')
const path = require('path')

const port = '0.0.0.0:50050'
const PROTO_PATH = path.resolve(__dirname, '../protos/leave.proto')

const proto = grpc.load(PROTO_PATH)
const server = new grpc.Server()

server.addService(proto.leave.LeaveApplicationService.service, {
  applyForLeave,
  grantLeave
});
function applyForLeave (call, callback){
  console.log(call)
  if(call.request.requestedDays > 0) {
    const eligibility = call.request.requestedDays;
    if(call.request.accruedDays > eligibility){
      callback(null, {eligible: true})
    } else {
      callback(null, {eligible: false})
    }
  } else {
    callback(new Error('invalid request'))
  }
}

function grantLeave(call, callback){
  let accruedDays = call.request.accruedDays
  let grantedDays = call.request.requestedDays
  accruedDays = accruedDays - grantedDays
  let name = call.request.name
  callback(null, {
    name,
    accruedDays,
    grantedDays,
  });
};
server.bind(port, grpc.ServerCredentials.createInsecure())
server.start()
console.log(`server starting at port ${port}`)