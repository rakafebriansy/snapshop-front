import React from 'react'
import styled from 'styled-components';

const StyledTable = styled.table`
    width: 100%;
    th {
        text-align: left;
        text-transform: uppercase;
        color: #CCC;
        font-weight: 600;
        font-size: .7rem;
    }
    td {
        padding: 1rem;
        border-top: 1px solid rgba(0,0,0,0.1);
    }
`;

const Table: React.FC = (props) => {
    return (
        <StyledTable {...props}/>
    );
}
export default Table;