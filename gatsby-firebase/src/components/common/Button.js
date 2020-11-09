import styled from "styled-components"

export const Button = styled.button`
  ${props => (props.block ? `display:block; width: 100%` : `width:auto`)};
  padding: 8px 16px;
  background: rebeccapurple;
  color: white;
  border-radius: 4px;
  white-space: nowrap;
  cursor: pointer;

  &:hover {
    background: indigo;
  }
`
