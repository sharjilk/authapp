import { ApolloClient, InMemoryCache } from "@apollo/client";
import { RestLink } from "apollo-link-rest";

const restLink = new RestLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
});

export const getApolloClient = () => {
  const apolloClient = new ApolloClient({
    link: restLink,
    cache: new InMemoryCache(),
  });

  return apolloClient;
};
