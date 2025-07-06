import  express, { Request, Response ,Express} from "express"


const app: Express = express();

app.use(express.json())

app.get("/",(_req:Request,res:Response)=>{
res.send("welcome to blogIt")
} )
const port =process.env.PORT || 3000
app.listen(port , ()=>{
    console.log(`server is up and running on port ${port}`)
})