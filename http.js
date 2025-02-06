const axios = require('axios');


async function check_website(url){
    try { 
        //cheking reachability
        const resp = await axios.head(url);
        if (resp.status == 200) {
            console.log('server is alive');
        }else{
            console.warn("server returned status code :"+ resp.status);
        }

        //fetching server details

        const getresp = await axios.get(url);
        const srvheader = getresp.headers['server'];// i used ['server'] to be more specific 
        if (srvheader){
            console.log('server header :'+ srvheader);
        }else{
            console.warn('server header not found');
        }

        //checking allowed methods
        const optionsresp = await axios.options(url);


        }catch (error) {
            console.error("Error: Unable to reach server :"+ error.message);
        }





    }


}