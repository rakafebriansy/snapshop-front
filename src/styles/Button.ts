import { css } from "styled-components";
import * as Colors from '../lib/colors';

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
        background-color: ${Colors.primary};
        color: #FFF;
    `}
    ${props => props.primary && props.outlined && css`
        background-color: transparent;
        color: ${Colors.primary};
        border: 1px solid ${Colors.primary};
    `}
    ${props => props.size === 'l' && css`
        font-size: 1.2rem;
        padding: 0.625rem 1.25rem;
    `}
`;