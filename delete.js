import weaviate from 'weaviate-ts-client';
import * as dotenv from 'dotenv' 
dotenv.config()

//For deleting repeated classes in weviate

const client = weaviate.client({
  scheme: 'https',
  host: `${process.env.WEVIATE_HOST_URL}`,  // Replace with your endpoint
});

var className = "Question"
client.schema
  .classDeleter()
  .withClassName(className)
  .do()
  .then(res => {
  console.log(res);
  })
  .catch(err => {
  console.error(err)
  });