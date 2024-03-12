const mongo = require('mongoose')
const mongoConn = async ()=>{


try {
    

 mongo.set('strictQuery', false)
 const conn = await mongo.connect(process.env.MONGO_URI)
 console.log(`connectig to db ${conn.connection.host}`) 


} catch (error) {
    console.error("error connecting to db", error)
}
}



module.exports = mongoConn