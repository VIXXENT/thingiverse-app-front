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

export function getPopularThings():Promise<ApolloQueryResult<any>> {
    return client.query({
        query: gql`
            query{
                things{
                    id
                    name
                    url
                    public_url
                    created_at
                    thumbnail
                    preview_image
                    creator{
                        id
                        name
                        first_name
                        last_name
                        url
                        public_url
                        thumbnail
                        accepts_tips
                        is_following
                        location
                        cover
                    }
                    is_private
                    is_purchased
                    is_published
                }
            }
        `
    }).then((result:ApolloQueryResult<any>)=>{
        result.errors?.forEach((e)=>{
            console.error("Apollo Error when trying to fetch popular things");
            console.error(e);
        });
        return result.data;
    });
}