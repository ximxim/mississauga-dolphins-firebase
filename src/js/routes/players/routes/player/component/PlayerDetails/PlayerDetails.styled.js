import styled from 'styled-components';

export const Avatar = styled.img`
width: 70%;
border-radius: 15px;
border: ${props => `2px solid ${props.theme.brandPrimary}`};
display: block;
margin-bottom: 10px;
`;
