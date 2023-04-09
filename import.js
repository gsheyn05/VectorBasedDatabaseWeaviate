import weaviate from 'weaviate-ts-client';
import * as dotenv from 'dotenv' 
dotenv.config()

const client = weaviate.client({
    scheme: 'https',
      host: `${process.env.WEVIATE_HOST_URL}`,  // Replace with your endpoint
      headers: {'X-Cohere-Api-Key': `${COHESION_API_KEY}`},  // Replace with your API key
  
  });
async function getJsonData() { //gets the json data and converts it into json
    const file = await fetch('https://raw.githubusercontent.com/weaviate-tutorials/quickstart/main/data/jeopardy_tiny.json');
    return file.json();
}

async function importQuestions() {
    // Get the data from the data.json file
    const data = await getJsonData();
  
    // Prepare a batcher
    let batcher = client.batch.objectsBatcher();
    let counter = 0;
    let batchSize = 100;
  
    data.forEach(question => {
      // Construct an object with a class and properties 'answer' and 'question'
      const obj = {
        class: 'Question',
        properties: {
          answer: question.Answer,
          question: question.Question,
          category: question.Category,
        },
      }
  
      // add the object to the batch queue
      batcher = batcher.withObject(obj);
  
      // When the batch counter reaches batchSize, push the objects to Weaviate
      if (counter++ == batchSize) {
        // flush the batch queue
        batcher
        .do()
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.error(err)
        });
  
        // restart the batch queue
        counter = 0;
        batcher = client.batch.objectsBatcher();
      }
    });
  
    // Flush the remaining objects
    batcher
    .do()
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.error(err)
    });
  }
  
  importQuestions();