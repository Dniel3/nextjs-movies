import * as React from 'react';

interface ErrorBoundaryProps {
    hasErrors: boolean;
    children: React.ReactNode;
}

const ErrorBoundary = (props: ErrorBoundaryProps) => {
    const ErrorMessage = (
        <h2>An Error happended while loading movies, please try again.</h2>
    );

return <>{props.hasErrors ? ErrorMessage : props.children}</>
};

export default ErrorBoundary
