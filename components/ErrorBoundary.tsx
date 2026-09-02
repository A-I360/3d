"use client";

import { Component, type ReactNode } from "react";

/**
 * Last line of defense: if any client error occurs, show a graceful branded
 * screen instead of a blank page.
 */
export default class ErrorBoundary extends Component<
  { children: ReactNode },
  { err: Error | null }
> {
  state = { err: null as Error | null };

  static getDerivedStateFromError(err: Error) {
    return { err };
  }

  render() {
    if (this.state.err) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#f7f2ea",
            color: "#3a2a1e",
            fontFamily: "Georgia, serif",
            textAlign: "center",
            padding: 24,
            cursor: "auto"
          }}
        >
          <div>
            <p style={{ letterSpacing: "0.35em", fontSize: 12, color: "#b08d57" }}>
              AFRIESSENCE
            </p>
            <h1 style={{ fontSize: 28, margin: "18px 0 8px" }}>
              Something interrupted the ritual.
            </h1>
            <p style={{ fontSize: 14, color: "#6b4f3a", marginBottom: 22 }}>
              Please reload the experience to continue.
            </p>
            <a
              href="/"
              style={{ color: "#b08d57", textDecoration: "underline", fontSize: 13 }}
            >
              Reload the experience
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
