import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const GridForm = styled.form`
  width: 70%;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: auto 1fr;
`

export const ColOne = styled.label`
  grid-column: 1;
`

export const ColTwoText = styled.input`
  grid-column: 2;
`

export const ColTwoField = styled.fieldset`
  grid-column: 2;
  border: none;
  display: flex;
  flex-wrap: wrap;
`

export const Button = styled.button`
  grid-column: 2;
  width: 50%;
`

export const ErrorMessage = styled.div`
  color: red;
  cursor: pointer;
`
// interface Props {
//   selected: string
// }

// export const RadioLabel = styled.label`
//   padding: 5px;
//   ${(props: Props) =>
//     props.selected &&
//     `
//     border-radius: 15%;
//     background-color: grey;
//   `}
// `

export const Radio = styled.input.attrs({ type: 'radio' })`
  display: none;
`

export const NavGroup = styled.nav`
  float: right;
`

export const NavLink = styled(Link)`
  margin-right: 30px;
`

// button text
export const NavButton = styled.button`
    background-color: #1E9137 ; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
`
