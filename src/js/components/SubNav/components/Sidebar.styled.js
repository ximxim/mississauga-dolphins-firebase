import styled from 'styled-components';
import { media } from '../../../utils/media';

export const Sidebar = styled.nav`
min-width: 250px;
max-width: 250px;
transition: all 0.3s;
background: white;
min-height: 92.5vh;
max-height: 92.5vh;
overflow-y: auto;
-webkit-overflow-scrolling: touch;
border-right: ${props => `2px solid ${props.theme.brandDark}`} 
z-index: 2;
margin-left: ${props => (props.isOpen ? '0px' : '-250px')};
position: absolute;
& img {
    width: 180px;
}
${media.medium`
position: relative;
margin-left: 0px;
`}
`;

export const ToggleButton = styled.a`
display: block;
${media.medium`
display: none;
`}
`;
