const axios = require('axios');


async function check_website(url){
    try { 
        //cheking reachability
        const resp = await axios.head(url,{timeout: 5000});
        if (resp.status == 200) {
            console.log('server is alive');
        }else{
            console.warn("server returned status code :"+ resp.status); // connection error
        }

        //fetching server details

        const getresp = await axios.get(url,{timeout: 5000});
        const srvheader = getresp.headers['server'];// i used ['server'] to be more specific 
        if (srvheader){
            console.log('server header :'+ srvheader);
        }else{
            console.warn('server header not found'); //server header error
        }

        //checking allowed methods
        const optionsresp = await axios.options(url,{timeout: 5000});
        const allowheader = optionsresp.headers['allow'];
        if (allowheader){
            console.log('allowed http methods are :'+ allowheader);
        }else{
            console.warn('allowed http methods not found');//permission error?
        }

        catch (error) {
            console.error("Error: Unable to reach server :"+ error.message);
        }





    }


}