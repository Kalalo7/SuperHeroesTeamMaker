import React, { Component } from 'react';
import { Alert, Button, Container } from 'react-bootstrap';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container className="py-5 text-center">
          <Alert variant="danger">
            <h2>Something went wrong</h2>
            <p>We're sorry, but an error occurred while rendering this component.</p>
            {this.state.error && (
              <details className="text-start my-3">
                <summary>Error details</summary>
                <p>{this.state.error.toString()}</p>
              </details>
            )}
            <Button 
              variant="primary" 
              onClick={() => window.location.href = '/'}
              className="mt-3"
            >
              Go to Home
            </Button>
          </Alert>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;