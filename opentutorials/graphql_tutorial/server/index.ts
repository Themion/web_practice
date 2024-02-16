import express from 'express';
import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql'
import cors from 'cors'

const schema = buildSchema(`
    type Topic{
        id:Int!
        title:String!
        body:String
    }
    type Query {
        topics:[Topic]
        getTopic(id: Int!): Topic
    }
    type Mutation {
        createTopic(title: String!, body: String): Topic 
    }
`)

type Id = {
  id: number
}

type TopicCommand = {
  title: string,
  body: string,
}

type Topic = Id & TopicCommand

let nextId = 4;
const topics: Topic[] = [
  { id:1, title:'html', body:'html is ...' },
  { id:2, title:'css', body:'css is ...' },
  { id:3, title:'js', body:'js is ...' }
]

const getTopic = ({ id }: Id) => topics.find(topic => topic.id === id)
const createTopic = (command: TopicCommand) => {
  const newTopic: Topic = { id: nextId++, ...command };
  topics.push(newTopic);
  return newTopic;
}

const rootValue = { topics, getTopic, createTopic }

const app = express();
const port = 3000

app.use(cors())

app.use('/graphql', graphqlHTTP({ schema, rootValue, graphiql: true }));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


