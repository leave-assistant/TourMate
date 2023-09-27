import React, { FC } from "react";
import styled from "styled-components";

interface HorizonLineProps {
    width: string; // width 값
}

const HorizonLine: FC<HorizonLineProps> = ({ width }) => {
    return (
        <StyledHorizonLine width={width}/>
    );
};

const StyledHorizonLine = styled.div<{ width: string; }>`
    width: ${(props) => props.width};
    height: 0px;
    border-bottom: 1px solid #747474;
    line-height: 0.1em;
    margin: 12px 0 8px;
`;

export default HorizonLine;
