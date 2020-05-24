import styled from 'styled-components';

export const Wrapper = styled.div`
  transform: scale(2);
  transform-origin: top center;
`;

export const Content = styled.div`
  margin: auto;
  position: relative;
  width: 600px;
  height: 315px;
`;

export const Headers = styled.div`
  position: absolute;
  left: 50px;
  top: 13px;
  width: 550px;
  height: 46px;
`;

export const Title = styled.div`
  position: absolute;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 32.61%;

  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 18px;

  display: flex;
  align-items: center;
  text-transform: capitalize;
`;

export const Subtitle = styled.div`
  position: absolute;
  left: 0%;
  right: 21.56%;
  top: 58.7%;
  bottom: -2.17%;

  font-family: Source Code Pro;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  /* identical to box height, or 125% */

  display: flex;
  align-items: center;
  text-transform: uppercase;
  color: #bcbcbc;
`;

export const ChartWrapper = styled.div`
  position: absolute;
  width: 500px;
  height: 238px;
  left: 50px;
  top: 80px;
`;

export const LogoHolder = styled.div`
  position: absolute;
  right: 55px;
  top: 10px;
`;
