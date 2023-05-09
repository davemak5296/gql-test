import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";

const dataSet = [
  {
    quantity: 1,
    merchandiseId: "gid://shopify/ProductVariant/43696905224214"
  },
  {
    quantity: 2,
    merchandiseId: "gid://shopify/ProductVariant/43696905256982"
  }
];
// const dataSetClean = JSON.stringify(dataSet).replace(/\"([^(\")"]+)\":/g, "$1:");
// lines: [
//   {
//     quantity: 1
//     merchandiseId: "gid://shopify/ProductVariant/43695848128534"
//   }
// ]

const CREATE_CART = gql`
  mutation CartCreate {
    cartCreate(
      input: {
        lines: ${JSON.stringify(dataSet).replace(/\"([^(\")"]+)\":/g, "$1:")}
      }
    ) {
      cart {
        id
        createdAt
        updatedAt
        lines(first: 10) {
          edges {
            node {
              id
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  image {
                    id
                    url
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

function App() {
  const [createCart, { data }] = useMutation(CREATE_CART);
  useEffect(() => {
    createCart();
  }, []);

  return (
    <pre style={{ fontSize: "10px" }}>{JSON.stringify(data, null, 4)}</pre>
  );
}

export default App;
