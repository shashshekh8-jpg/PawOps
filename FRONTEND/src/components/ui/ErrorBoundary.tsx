"use client";
import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallbackName: string;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="bg-white/5 border border-coral/30 p-6 rounded-2xl flex items-center justify-center text-center h-full min-h-[200px]">
          <div>
            <span className="text-2xl mb-2 block">⚠️</span>
            <h3 className="text-coral font-bold text-sm">Module Offline</h3>
            <p className="text-gray-400 text-xs mt-1">{this.props.fallbackName} is currently unavailable.</p>
          </div>
        </div>
      ); // [cite: 179]
    }
    return this.props.children;
  }
}

