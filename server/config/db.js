const mongo = require('mongoose')
const mongoConn = async ()=>{


try {
    

 mongo.set('strictQuery', false)
 const conn = await mongo.connect('mongodb+srv://gilugali:GjLngWIXTazW9w7r@blogs.oqmq9l3.mongodb.net/blogs?retryWrites=true&w=majority')
 console.log(`connectig to db ${conn.connection.host}`) 


} catch (error) {
    console.error("error connecting to db", error)
}
}



module.exports = mongoConn