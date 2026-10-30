import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
    const msg = String(error?.message || error || '');
    if (
      msg.includes('dynamically imported module') ||
      msg.includes('Failed to fetch') ||
      msg.includes('Loading chunk')
    ) {
      const hasReloaded = window.sessionStorage.getItem('chunk_error_reload');
      if (!hasReloaded) {
        window.sessionStorage.setItem('chunk_error_reload', 'true');
        window.location.reload();
      }
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex items-center justify-center p-6 bg-slate-50">
          <div className="max-w-md w-full bg-white border border-slate-200 p-8 rounded-[5px] shadow-sm text-center space-y-4">
            <div className="w-12 h-12 mx-auto bg-indigo-50 border border-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-xl font-bold">
              ↺
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              New Version Available
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              We just released a fresh update to our website. Please click below to refresh and load the latest catalog.
            </p>
            <button
              onClick={() => {
                window.sessionStorage.removeItem('chunk_error_reload');
                window.location.reload();
              }}
              className="w-full py-2.5 px-4 rounded-[5px] bg-slate-900 hover:bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer"
            >
              Refresh Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
