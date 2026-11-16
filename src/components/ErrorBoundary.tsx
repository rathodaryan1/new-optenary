import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in React component tree:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050607] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange mb-6 shadow-glow">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-heading mb-3">Something went wrong</h1>
          <p className="text-dark-muted text-sm max-w-md mb-4">
            An unexpected error occurred while loading this page. Please try refreshing to load the latest version.
          </p>

          {/* Detailed Error for Debugging */}
          {this.state.error && (
            <div className="max-w-2xl w-full p-4 mb-6 rounded-xl bg-red-950/60 border border-red-500/40 text-left font-mono text-xs text-red-200 overflow-x-auto">
              <div className="font-bold text-red-400 mb-1">{this.state.error.name}: {this.state.error.message}</div>
              <pre className="text-[10px] text-red-300/80 whitespace-pre-wrap">{this.state.error.stack}</pre>
            </div>
          )}

          <button
            onClick={this.handleReload}
            className="px-6 py-3 rounded-xl bg-brand-orange hover:bg-brand-orangeDark text-dark-bg font-bold text-xs uppercase tracking-wider transition-colors shadow-glow"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
