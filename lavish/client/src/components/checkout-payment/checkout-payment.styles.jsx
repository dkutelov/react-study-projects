import styled from "styled-components"

import { CollectionTitle } from "../collection-preview/collection-review.styles"
export const PaymentContainer = styled.div`
    width: 100%
    height: 300px
`

export const PaymentTitle = styled(CollectionTitle)`
  text-transform: uppercase;
`

export const WarningText = styled.div`
  text-align: center;
  margin: 40px 0;
  font-size: 24px;
  color: red;
`
