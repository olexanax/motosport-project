"use client"
import { Component, ErrorInfo, ReactNode } from "react";
import ErrorBanner from "../ErrorBanner/ErrorBanner";
//i18n
import { I18ComponentProps } from "@/types/i18NextTypes"
import { useTranslation } from "@/app/i18n/client";

interface ErrorBoundaryProps extends I18ComponentProps {
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
      return <ErrorBanner lng={this.props.lng} />
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
