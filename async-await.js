const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/Assignment4';

 function findAll() {
    
    const client =  MongoClient.connect(url, { useNewUrlParser: true })
        .catch(err => { console.log("s2");console.log(err); });
    if (!client) return;
        
    try {
        console.log('1');
        const db =  client.db("Assignment4");
        console.log('2');
        let collection =  db.collection('employees');
        console.log('3');
        let cursor =  collection.find({}).limit(10);
        console.log('4');
        await cursor.forEach(doc => console.log(doc));
        console.log('5');
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
}
setTimeout(()=>{
    findAll();
    console.log('iter');
}, 8000);