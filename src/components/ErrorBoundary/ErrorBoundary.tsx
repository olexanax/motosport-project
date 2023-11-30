"use client"
import { Component, ErrorInfo, ReactNode } from "react";
import ErrorBanner from "../ErrorBanner/ErrorBanner";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      error: false,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo);
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      return <ErrorBanner />
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
