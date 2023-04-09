import weaviate from 'weaviate-ts-client';

import * as dotenv from 'dotenv' 

import * as readline from 'readline';

dotenv.config()


const client = weaviate.client({
  scheme: 'https',
    host: `${process.env.WEVIATE_HOST_URL}`,  // Replace with your endpoint
    headers: {'X-Cohere-Api-Key': `${process.env.COHESION_API_KEY}`},  // Replace with your API key

});

function AskQuery(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    

    return  new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
      }))


    
}
async function search() {
    var topic = await AskQuery("What concept are you searching in the databse? \n")
   
    
    client.graphql
        .get()
        .withClassName('Question')
        .withFields('question answer category')
        .withNearText({ concepts: [`${topic}`] })
        .withLimit(2)
        .do()
        .then(res => {
            console.log(JSON.stringify(res, null, 2))
        })
        .catch(err => {
            console.error(err)
        });
    
}

search()