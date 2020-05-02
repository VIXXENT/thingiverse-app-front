import { gql, ApolloClient, HttpLink, ApolloQueryResult } from "apollo-boost";
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';

const link = new HttpLink({
    uri: 'http://localhost:8080/graphql/'
});
const cache = new InMemoryCache();

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    link
});

export default client;