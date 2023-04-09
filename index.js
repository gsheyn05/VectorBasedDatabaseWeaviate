import weaviate from 'weaviate-ts-client';
import * as dotenv from 'dotenv' 
dotenv.config()

const client= weaviate.client({
    scheme: 'https',
    host: `${process.env.WEVIATE_HOST_URL}`,  // Replace with your endpoint
});
  
const schemaRes = await client.schema.getter().do();

console.log(schemaRes)

let classObj = {
    'class': 'Question',
    'vectorizer': 'text2vec-cohere'  // Or 'text2vec-cohere' or 'text2vec-huggingface'
}
client
.schema
.classCreator()
.withClass(classObj)
.do()
.then(res => {
  console.log(res)
})
.catch(err => {
  console.error(err)
});
