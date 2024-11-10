import { GET_CURRENT_USER } from "@/apollo/queries/currentUser";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

const getCurrentUser = async (
  apolloClient: ApolloClient<NormalizedCacheObject>
) => {
  try {
    const { data, error, loading } = await apolloClient.query({
      query: GET_CURRENT_USER,
    });

    if (error) {
      console.error("Error fetching current user:", error);
    }

    return { data, error, loading };
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    throw error;
  }
};

export default getCurrentUser;
