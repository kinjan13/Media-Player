import { Component } from "react";

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

    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('Error Boundary caught an error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="page">
          <div style={{
            textAlign: "center",
            padding: "50px",
            color: "#e53e3e",
            maxWidth: "600px",
            margin: "0 auto"
          }}>
            <h1>🚨 Something went wrong</h1>
            <p style={{ marginBottom: "20px" }}>
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>

            <div style={{ marginBottom: "20px" }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  background: "#6b46c1",
                  color: "white",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "600",
                  marginRight: "10px"
                }}
              >
                🔄 Refresh Page
              </button>

              <button
                onClick={() => window.location.href = '/'}
                style={{
                  background: "#4a5568",
                  color: "white",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "600"
                }}
              >
                🏠 Go Home
              </button>
            </div>

            {import.meta.env.DEV && (
              <details style={{
                textAlign: "left",
                background: "#f7fafc",
                padding: "15px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                marginTop: "20px"
              }}>
                <summary style={{
                  cursor: "pointer",
                  fontWeight: "600",
                  color: "#2d3748"
                }}>
                  🔧 Error Details (Development Only)
                </summary>
                <pre style={{
                  whiteSpace: "pre-wrap",
                  fontSize: "12px",
                  color: "#e53e3e",
                  marginTop: "10px",
                  overflow: "auto"
                }}>
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;