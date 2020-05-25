import React from 'react';
import {
  Route as ReactRouterDom0Route,
  RouteProps as ReactRouterDom0RouterProps,
  Redirect,
} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface RouteProps extends ReactRouterDom0RouterProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { data } = useAuth();
  const { token } = data;

  return (
    <ReactRouterDom0Route
      {...rest}
      render={({ location }) => {
        if (isPrivate === !!token) {
          return <Component />;
        }
        return (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
