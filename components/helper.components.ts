import styled from "styled-components";

export const FlexDiv = styled.div<{ width: number }>`
  display: flex;
  justify-content: space-between;
  width: ${(props) => props.width}px;
  // align-items: center;
  height: 20px;
`;
