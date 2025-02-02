import { ApolloClient, InMemoryCache, split, HttpLink } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

console.log("Initializing Apollo Client");

// HTTP връзка за нормални заявки
const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
});

// WebSocket връзка за subscriptions
const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/graphql",
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem("token")
    }
  }
});

// Комбиниране на връзките
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

// Създаване на Apollo Client инстанция
export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});