import styled from "styled-components"

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const ProductTopBlock = styled.div`
  display: flex;
  flex-direction: row;
`

export const ProductImageContainer = styled.div`
  width: 50vw;
`

export const ProductImage = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;
  background-size: cover;
  background-position: center;
  background-image: ${props => `url(${props.imageUrl})`};
`
export const ProductInfoBlock = styled.div`
  width: 50vw;
  padding: 0 3em;
  h1 {
    margin-top:0;
  }
`

export const PriceContainer = styled.div`
         display: flex;
         flex-direction: row;
         justify-content: flex-start;

         span {
           font-size: 1.5rem;
           margin: 0.83em 0 0.83em 1em;
         }
       `

export const ProductDescription = styled.div`
  margin-top: 1em;
  width: 100%;
`