import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const client = new ApolloClient({
  uri: "https://mock.shop/api",
  cache: new InMemoryCache()
});

root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
