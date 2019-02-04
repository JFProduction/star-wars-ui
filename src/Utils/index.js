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
        pageInfo {
          endCursor
        }
        people {
          name,
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
              title,
              episodeID,
              releaseDate
            }
          }
        }
      }
    }
  `,
  GET_PEOPLE_CURSOR: gql`
    query($cursorAfter:String, $cursorBefore:String) {
      allPeople(first:10, after: $cursorAfter, before: $cursorBefore) {
        pageInfo {
          endCursor
          startCursor
        }
        people {
          name
          id
          height
          homeworld {
            name
          }
          species {
            name
          }
          filmConnection {
            films {
              title,
              episodeID,
              releaseDate
            }
          }
        }
      }
    }
  `
}

const client = new ApolloClient({
  uri: "http://localhost:58623"
});

export {
  Utils,
  queries,
  client,
}