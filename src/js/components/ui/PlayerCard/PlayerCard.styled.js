import styled from 'styled-components';

export const Card = styled.li`
& div:not(:first-child) {
    font-size: 12px !important;
}
background-color: ${props => (props.selected ? props.theme.selection : 'white')};
&:hover {
    background-color: ${props => props.theme.selection};
}
`;
