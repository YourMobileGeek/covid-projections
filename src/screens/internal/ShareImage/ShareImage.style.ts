import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: calc(100vh - 64px);
`;

export const Content = styled.div`
  max-width: 900px;
  margin: auto;
  padding: 1rem 0 3rem;

  @media (max-width: 932px) {
    padding: 1rem;
  }
`;

export const ScreenshotWrapper = styled.div`
  width: 1200px;
  height: 630px;
  background-color: black;
  color: white;
  overflow: hidden;
`;
