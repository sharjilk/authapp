import { gql } from "@apollo/client";

const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser @rest(type: "User", path: "/auth/currentuser") {
      email
      name
    }
  }
`;

export { GET_CURRENT_USER };
