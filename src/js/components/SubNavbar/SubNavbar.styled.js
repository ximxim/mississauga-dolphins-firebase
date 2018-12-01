import styled from 'styled-components';
import { media } from '../../utils/media';

export const SubNavBarButton = styled.button`
color: ${props => props.theme.brandPrimary};
border: ${props => `2px solid ${props.theme.brandPrimary}`};
border-radius: 10px;
background-color: ${props => props.theme.white};
cursor: pointer;
transition: all 0.3s;
display: flex;
justify-content: center;
align-items: center;
margin-left: 5px;
&:hover {
    background-color: ${props => props.theme.brandPrimary};
    color: ${props => props.theme.white};
}
`;

export const SubToggleButton = styled(SubNavBarButton)`
${media.medium`
display: none;
`}
`;

export const SubNavbarLabel = styled.h6`
margin: 0px;
padding: 5px;
`;

export const SubToggleLabel = styled(SubNavbarLabel)`
${media.medium`
display: none;
`}
`;
