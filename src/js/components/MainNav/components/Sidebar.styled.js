import styled from 'styled-components';
import { media } from '../../../utils/media';

export const Sidebar = styled.nav`
min-width: 200px;
max-width: 200px;
color: #fff;
transition: all 0.3s;
background: #00334c;
min-height: 100vh;
max-height: 100vh;
overflow-y: auto;
-webkit-overflow-scrolling: touch;
z-index: 4;
margin-left: ${props => (props.isOpen ? '0px' : '-200px')};
position: absolute;
& img {
    width: 180px;
}
${media.large`
min-width: 60px;
max-width: 60px;
margin-left: 0px;
position: relative !important;
& li {
    display: flex;
    justify-content: center;
    align-items: center;
}
& li span {
    opacity: 0;
    margin-left: -150px;
    transition: all 0.5s;
}
& img {
    width: 50px;
}
&:hover {
min-width: 200px;
max-width: 200px;
margin-right: -140px;
& li {
    justify-content: start;
}
& img {
    width: 180px;
}
& li span {
    opacity: 1;
    margin-left: initial;
}
}
`}
`;

export const BrandLogo = styled.img`
width: 50px
transition: all 0.3s;
`;

export const BrandLogoWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
position: sticky;
position: -webkit-sticky;
top: 0;
`;

export const SidebarListItem = styled.li`
transition: all 0.3s;
cursor: pointer !important;
&:hover {
    padding-left: 20px !important;
}
& svg {
    font-size: 20px;
}
& span {
    margin-left: 10px;
    font-size: 18px;
}
`;

export const Divider = styled.hr`
border-top: 1px solid #1d523a !important;
`;

export const ToggleButton = styled.a`
display: block;
${media.large`
display: none;
`}
`;