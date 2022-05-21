import {
    ApolloClient,
    ApolloLink,
    createHttpLink,
    InMemoryCache,
} from "@apollo/client"
// import "./global.css"

const httpLink = createHttpLink({
    uri:
        // process.env.NODE_ENV === "production"
        //     ? "https://api.uoft.in/graphql"
        //     : "http://localhost:5000/graphql",
        "https://api.staging.sqrlplanner.com/graphql",
})

// https://dev.to/tmaximini/accessing-authorization-headers-in-apollo-graphql-client-3b50
const client = new ApolloClient({
    link: ApolloLink.from([httpLink]),
    cache: new InMemoryCache(),
    connectToDevTools: true,
})

export default client
