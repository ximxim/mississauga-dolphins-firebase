import styled from 'styled-components';
import { media } from '../../../utils/media';

export const SubSidebarStyled = styled.nav`
min-width: 250px;
max-width: 250px;
transition: all 0.3s;
background: white;
min-height: 92.5vh;
max-height: 92.5vh;
overflow-y: auto;
-webkit-overflow-scrolling: touch;
border-right: ${props => `2px solid ${props.theme.brandDark}`} 
margin-left: ${props => (props.isOpen ? '0px' : '-250px')};
position: absolute;
& img {
    width: 180px;
}
${media.medium`
position: relative;
margin-left: 0px;
`};
z-index: 1039;
`;

export const SubToggleButton = styled.a`
display: block;
background-color: ${props => props.theme.brandPrimary};
color: white !important;
padding-left: 10px;
${media.medium`
display: none;
`}
`;
