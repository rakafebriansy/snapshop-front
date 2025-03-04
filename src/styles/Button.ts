import { css } from "styled-components";

export const ButtonStyle = css`
    border: 0;
    display: inline-flex;
    gap: 0.4rem;
    align-items: center;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    ${props => props.white && !props.outlined && css`
        background-color: #FFF;
        color: #000;
    `}
    ${props => props.white && props.outlined && css`
        background-color: transparent;
        color: #FFF;
        border: 1px solid #FFF;
    `}
    ${props => props.primary && !props.outlined && css`
        background-color: #5542F6;
        color: #FFF;
    `}
    ${props => props.primary && props.outlined && css`
        background-color: transparent;
        color: #5542F6;
        border: 1px solid #5542F6;
    `}
    ${props => props.size === 'l' && css`
        font-size: 1.2rem;
        padding: 0.625rem 1.25rem;
    `}
`;