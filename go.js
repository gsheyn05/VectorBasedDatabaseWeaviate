import weaviate from 'weaviate-ts-client';

import * as dotenv from 'dotenv' 
dotenv.config()

const client = weaviate.client({
  scheme: 'https',
    host: `${process.env.WEVIATE_HOST_URL}`,  // Replace with your endpoint
    headers: {'X-Cohere-Api-Key': `${process.env.COHESION_API_KEY}`},  // Replace with your API key

});

const Search = () => {

    client.graphql
        .get()
        .withClassName('Question')
        .withFields('question answer category')
        .withNearText({ concepts: ['biology'] })
        .withLimit(2)
        .do()
        .then(res => {
            console.log(JSON.stringify(res, null, 2))
        })
        .catch(err => {
            console.error(err)
        });
}