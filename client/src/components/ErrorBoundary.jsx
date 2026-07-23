import { Component } from "react";

/**
 * Catches render-time errors anywhere below it so a crash surfaces a readable
 * message (with the error) instead of an all-white blank screen.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // Keep the details in the console for debugging
    console.error("UI crashed:", error, info);
  }

  handleReload = () => {
    this.setState({ error: null });
    window.location.reload();
  };

  render() {
    if (this.state.error) {
      return (
        <div className="flex min-h-screen items-center justify-center p-6">
          <div className="surface w-full max-w-md rounded-3xl p-7 text-center shadow-lift">
            <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-red-500/10 text-red-300 ring-1 ring-inset ring-red-500/20">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 9v4M12 17h.01" />
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-zinc-50">
              Something went wrong
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              The interface hit an unexpected error. Reloading usually fixes it.
            </p>
            {this.state.error?.message && (
              <pre className="mt-4 overflow-auto rounded-xl border border-white/[0.06] bg-ink-950/60 p-3 text-left font-mono text-xs text-red-300/90">
                {this.state.error.message}
              </pre>
            )}
            <button
              type="button"
              onClick={this.handleReload}
              className="mt-5 inline-flex h-10 items-center justify-center rounded-xl bg-gradient-to-b from-accent to-accent-strong px-4 text-sm font-medium text-white shadow-glow-soft transition-shadow hover:shadow-glow focus-visible:outline-none"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
