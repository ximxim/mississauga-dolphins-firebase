import styled from 'styled-components';

export const Sidebar = styled.nav`
min-width: 200px;
max-width: 200px;
color: #fff;
transition: all 0.3s;
background: #00334c;
background-repeat: no-repeat;
background-size: cover;
background-position: top right;
min-height: 100vh;
max-height: 100vh;
overflow-y: auto;
-webkit-overflow-scrolling: touch;
z-index: 4;
margin-left: ${props => (props.isOpen ? '0px' : '-200px')};
@media (min-width: 1024px) {
    ${props => (!props.isOpen
    ? `
    min-width: 60px;
    max-width: 60px;
    margin-left: 0px !important;
    ` : null)};
}
@media (max-width: 1024px) {
    margin-left: -200px;
}
@media (max-width: 1024px) {
    ${props => (props.isOpen
    ? `
    margin-left: 0;
    position: absolute;
    z-index: 4;
    ` : null)};
}
`;

export const SidebarContent = styled.div`
width: 100%;
min-height: 100vh;
transition: all 0.3s;
max-height: 100vh;
`;

export const Wrapper = styled.div`
display: flex;
width: 100%;
align-items: stretch;
`;
