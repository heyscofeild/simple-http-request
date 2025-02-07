const axios = require('axios');
const readline = require('readline');


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
            console.warn('allowed http methods not found');//permision error?
        }
    }
        catch (error) {
            if(error.code === 'ECONNABORTED'){  //ECONNABORTED is triggered when the 5 sec timeout is reached
                console.error("Error: request timeout");
            }else if (error.code === 'ENOTFOUND'|| error.code==='ECONNREFUSED'){ // these are for connecion adn code errors
                console.error("Error: Unable to reach server :"+ error.message);
            }else{
                console.error("Error: "+ error.message);
            }
        }
    }

       //prompt the user to input the url and call the function
       const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
       });
         rl.question('Enter the website url: ', (url) => {
          check_website(url);
          rl.close();
         });// for me it doesnt work the inputs doesnt show up in the console
         // i think its a probleme in the environment 
        // i will try to run it in windows tomorrow



    