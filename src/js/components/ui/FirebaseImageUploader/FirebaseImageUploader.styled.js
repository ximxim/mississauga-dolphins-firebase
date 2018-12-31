import styled from 'styled-components';

export const Preview = styled.img`
width: 100px;
height: 100px;
border-radius: 10px;
border: ${props => `2px solid ${props.theme.brandPrimary}`};
margin: auto;
display: block;
background-color: ${props => props.theme.brandPrimary};
`;
