import http from 'http';



const server = http.createServer((req,res)=>{


    console.log("server is listening!")

    if(req.url ==="/" )
    {

        res.write("home");
        res.end();
    }



    if(req.url ==="/about" )
    {

        res.write("about");
        res.end();
    }





})


server.listen(5000);