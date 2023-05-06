import  cookie  from "cookie";

const handler = (req:any,res:any)=>{
    if(req.method === "POST"){
        const {username,password} = req.body;
        const token:any =process.env.TOKEN 
        console.log(token);
        
        if(username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD){
            res.setHeader(
                "set-Cookie",
                cookie.serialize("token",token , {
                    maxAge:60*60,
                    sameSite:"strict",
                    path:"/"
                })
            );
            res.status(200).json("Succesfull");
        }else{
            res.status(400).json("Wrong Credentials!");  
        }
    }

}

export default handler;