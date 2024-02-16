import axios from "axios"

const api = axios.create({ baseURL: "http://localhost:3000/graphql" })
const fetch = (data: object) => api.post("", data)

const setTopicQuery = `query getTopicSyntax($topicId:Int!){
    getTopic(id: $topicId){id title body}
}`
const findAllQuery = `query { topics { id title body } }`
const createHandleQuery = `mutation createTopic($title: String!, $body: String){
    createTopic(title: $title, body: $body) {id}
}`

const getTopic = (topicId: number) => fetch({
    query: setTopicQuery,
    variables: { topicId }
})

const findAll = () => fetch({ query: findAllQuery })

const addTopic = (title: string, body: string) => fetch({
  query: createHandleQuery,
  variables: { title, body }
})

export { getTopic, findAll, addTopic }