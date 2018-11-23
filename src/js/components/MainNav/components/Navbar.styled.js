import styled from 'styled-components';
import { media } from '../../../utils/media';

export const NavBar = styled.nav`
background-color: black;
display: flex;
justify-content: space-between;
align-items: center;
`;

export const NavBarButton = styled.button`
border-radius: 10px;
border: 2px solid white;
background-color: ${props => props.theme.brandPrimary};
color: white;
cursor: pointer;
width: 40px;
height: 40px;
transition: all 0.3s;
display: inline-flex;
justify-content: center;
align-items: center;
&:hover {
    background-color: white !important;
    color: ${props => props.theme.brandPrimary};
}
`;

export const ToggleButton = styled(NavBarButton)`
${media.large`
display: none;
`}
`;

export const Brand = styled.a`
color: white;
font-family: 'Fugaz One', cursive;
font-size: 2vw;
&:hover {
    color: white;
    text-decoration: underline;
}
${media.large`
font-size: 1.5vw;
`}
${media.onlysmall`
font-size: 3vw;
`}
${media.xsmall`
font-size: 3vw;
`}
`;
