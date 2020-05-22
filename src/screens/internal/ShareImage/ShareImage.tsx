import React from 'react';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import ShareCardImage from './ShareCardImage';
import { ScreenshotWrapper, Content, Wrapper } from './ShareImage.style';
import ChartShareImage from './ChartShareImage';

export default function ShareImage({ match }: RouteComponentProps<{}>) {
  return (
    <Wrapper>
      <Content>
        <ScreenshotWrapper className={'screenshot'}>
          <Switch>
            <Route exact path={`${match.path}`} component={ShareCardImage} />
            <Route
              exact
              path={`${match.path}states/:stateId`}
              component={ShareCardImage}
            />
            <Route
              exact
              path={`${match.path}states/:stateId/chart/:metric`}
              component={ChartShareImage}
            />
            <Route
              exact
              path={`${match.path}counties/:countyFipsId`}
              component={ShareCardImage}
            />
            <Route
              exact
              path={`${match.path}counties/:countyFipsId/chart/:metric`}
              component={ChartShareImage}
            />
            <Route path="/*">Bad Share Image URL.</Route>
          </Switch>
        </ScreenshotWrapper>
      </Content>
    </Wrapper>
  );
}
