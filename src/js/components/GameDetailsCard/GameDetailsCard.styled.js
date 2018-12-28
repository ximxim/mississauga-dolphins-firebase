import styled from 'styled-components';

export const GameCover = styled.img`
width: 100%;
border-radius: 15px;
border: ${props => `2px solid ${props.theme.brandPrimary}`};
`;

export const InfoCard = styled.div`
width: 100%;
border-radius: 10px;
border: ${props => `2px solid ${props.theme.brandPrimary}`};
overflow: hidden;
& p {
    text-align: center;
    margin-bottom: 0px;
}
& p:first-child {
    padding: 5px;
    font-family: ${props => props.theme.headingFont};
    background-color: ${props => props.theme.brandPrimary};
    color: ${props => props.theme.white};
}
& p:last-child {
    padding: 10px;
    font-size: 20px;
    font-weight: bold;
}
`;
