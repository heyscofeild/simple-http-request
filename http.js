const axios = require('axios');


async function check_website(url){
    try { 
        const resp = await axios.head(url);
        if (resp.status == 200) {
            console.log('server is alive');
        }else{
            console.warn("server returned status code :"+ resp.status);
        }




        }catch (error) {
            console.error("error while checking website :"+ error.message);
        }





    }


}