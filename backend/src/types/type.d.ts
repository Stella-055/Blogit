interface userdetails{


    id:string
    firstname:string
    lastname:string
    username:string
}

declare global{
    namespace Express{
interface Request{
    owner:userdetails
}
    }
}