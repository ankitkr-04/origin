"use client";

import React, { useEffect, useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class CanvasErrorBoundaryClass extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn("Canvas WebGL error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

export function CanvasErrorBoundary(props: Props) {
  const [contextLost, setContextLost] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      console.warn("WebGL context lost! Temporarily hiding canvas to recover...");
      setContextLost(true);
      
      // Attempt recovery after a short delay
      setTimeout(() => {
        console.log("Attempting to recover WebGL context...");
        setContextLost(false);
      }, 1000);
    };

    const container = containerRef.current;
    if (container) {
      // Catch webglcontextlost in the capture phase since it doesn't bubble
      container.addEventListener("webglcontextlost", handleContextLost, true);
      return () => {
        container.removeEventListener("webglcontextlost", handleContextLost, true);
      };
    }
  }, []);

  if (contextLost) {
    return <>{props.fallback || null}</>;
  }

  return (
    <div ref={containerRef} className="h-full w-full">
      <CanvasErrorBoundaryClass fallback={props.fallback}>
        {props.children}
      </CanvasErrorBoundaryClass>
    </div>
  );
}
