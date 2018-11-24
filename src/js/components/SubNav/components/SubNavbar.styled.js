import styled from 'styled-components';
import { media } from '../../../utils/media';

export const SubNavBarStyled = styled.nav`
background-color: black;
display: flex;
justify-content: space-between;
align-items: center;
position: sticky;
`;

export const SubNavBarButton = styled.button`
color: ${props => props.theme.brandPrimary};
border: ${props => `2px solid ${props.theme.brandPrimary}`};
border-radius: 10px;
background-color: white;
cursor: pointer;
width: 40px;
height: 40px;
transition: all 0.3s;
display: inline-flex;
justify-content: center;
align-items: center;
&:hover {
    background-color: ${props => props.theme.brandPrimary};
    color: white;
}
`;

export const SubToggleButton = styled(SubNavBarButton)`
${media.medium`
display: none;
`}
`;
