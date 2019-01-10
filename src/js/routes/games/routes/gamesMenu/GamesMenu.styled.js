import styled from 'styled-components';

export const MenuImage = styled.img`
display: block;
width: 30vw;
height: 30vw;
border-radius: 50%;
margin: auto;
border: ${props => `2px solid ${props.theme.brandPrimary}`} ;
`;
