const Redis=require('ioredis');
//redis-cli -u redis://default:38gh7lvpk91hZ396xR6acxsApPCnSiIB@redis-12379.c264.ap-south-1-1.ec2.cloud.redislabs.com:12379
let configuration={
    host:"redis-12379.c264.ap-south-1-1.ec2.cloud.redislabs.com",
    port:12379,
    username:"default",
    password:"38gh7lvpk91hZ396xR6acxsApPCnSiIB"
}

const redis= new Redis(configuration);

module.exports=redis