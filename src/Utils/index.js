import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'

const Utils = {
  get: function(url) {
    return fetch(url)
      .then(resp => resp.json())
  },

  post: function(url, body, headers) {
    body = JSON.stringify(body)

    return fetch(url, {
      method: "POST",
      headers: { 
        'content-type': 'application/json; charset=utf-8',
        ...headers
      },
      body
    }).then(resp => resp.json())
  },
}

const queries = {
  GET_PEOPLE: gql`
  {
    allPeople {
      people {
        name,
        gender,
        birthYear,
        height,
        homeworld {
          name
        },
        species {
          name
        },
        filmConnection {
          films {
            title
          }
        }
      }
    }
  }`
}

const client = new ApolloClient({
  uri: "http://localhost:52499"
});

export {
  Utils,
  queries,
  client,
}