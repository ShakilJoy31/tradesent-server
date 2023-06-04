
import express from 'express'; 
import cors from 'cors';
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';

const app  = express(); 
app.use(cors());
const port = 5000;
// const nodeEnv = process.env.MONGO_URI;

app.use(express.json()); 
app.use(express.urlencoded({extended: true}));

// Connection with mongodb
// const mongoUri = process.env.MONGO_URI; 


const uri = "mongodb+srv://logedInUserr:HCtwliFQhB9gD7m1@cluster0.qzz0mz8.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const userCollection = client.db('test').collection('users');
async function run() {
  try {
    await client.connect();
    await client.db("users").command({ ping: 1 });
    console.log("Database is connected successfully.");
  } finally {
    
  }
}
run().catch(console.dir);

app.post('/create-user', async (req, res)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  const user = req.body;
  const result = await userCollection.insertOne(user);
  console.log(result);
  res.send(result); 
})
app.get('/all-user', async (req, res)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  const query = {};
  const result = await userCollection.find(query).toArray();
  console.log(result);
  res.send(result);
})
app.put('/update-user', async (req, res)=>{
  res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  const { userId } = req.query;
  const formData = req.body;
  const result = userCollection.findOneAndUpdate({ _id: new ObjectId(userId) }, { $set: formData })
  res.send(result); 
})

app.listen(port, ()=>{ 
    console.log(`Task app listening on ${port}`)
})

app.get("/", (req, res)=>{
    res.send("This project is running."); 
})












// async function databaseConnection () {
//     try{

//         await mongoose.connect("mongodb+srv://logedInUserr:HCtwliFQhB9gD7m1@cluster0.qzz0mz8.mongodb.net/?retryWrites=true&w=majority");
//         console.log("Database is connected successfully. Thank you.");
//         app.listen(port, ()=>{
//             console.log(`Task app listening on ${port}`)
//         })
        
//     }catch(error){
//         console.log( (error).message);
//     }
// }
// databaseConnection(); 