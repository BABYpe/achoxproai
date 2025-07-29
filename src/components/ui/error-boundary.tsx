"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "./button";
import { AlertCircle } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    // You can also log the error to an error reporting service
    // Ex: logErrorToMyService(error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="flex h-full w-full flex-col items-center justify-center rounded-lg border border-dashed border-destructive bg-destructive/10 p-8 text-center">
            <AlertCircle className="h-12 w-12 text-destructive" />
          <h2 className="mt-4 text-2xl font-semibold text-destructive">
            حدث خطأ ما
          </h2>
          <p className="mt-2 text-muted-foreground">
            نأسف، لقد واجه هذا الجزء من التطبيق مشكلة.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <pre className="mt-4 text-left text-xs bg-destructive/20 p-2 rounded-md max-w-full overflow-auto">
                {this.state.error?.toString()}
            </pre>
          )}
          <Button
            onClick={() => this.setState({ hasError: false, error: undefined })}
            variant="destructive"
            className="mt-6"
          >
            حاول مرة أخرى
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;