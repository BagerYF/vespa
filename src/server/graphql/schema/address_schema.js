import { gql } from 'graphql-tag'

export const AddressSchema = {
  customerAddressCreate: gql`
    mutation customerAddressCreate(
      $address: MailingAddressInput!
      $customerAccessToken: String!
    ) {
      customerAddressCreate(
        address: $address
        customerAccessToken: $customerAccessToken
      ) {
        customerAddress {
          id
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `,

  customerAddressUpdate: gql`
    mutation customerAddressUpdate(
      $address: MailingAddressInput!
      $customerAccessToken: String!
      $id: ID!
    ) {
      customerAddressUpdate(
        address: $address
        customerAccessToken: $customerAccessToken
        id: $id
      ) {
        customerAddress {
          id
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `,

  customerAddressDelete: gql`
    mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
      customerAddressDelete(
        customerAccessToken: $customerAccessToken
        id: $id
      ) {
        customerUserErrors {
          code
          field
          message
        }
        deletedCustomerAddressId
      }
    }
  `,

  getRegionList: gql`
    query {
      API_countries {
        name
        code
        currencyCode
        regionCode
        symbol
        isFreeReturn
      }
    }
  `,
}
