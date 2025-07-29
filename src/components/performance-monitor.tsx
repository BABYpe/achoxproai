"use client";

import { useEffect } from 'react';
import { reportWebVitals, type Metric } from 'web-vitals';

// A simple in-memory store for performance metrics.
// In a real app, you'd send this to your analytics service.
const metrics: Metric[] = [];

function logMetric(metric: Metric) {
  metrics.push(metric);
  // Example: Send to your analytics endpoint
  // const body = JSON.stringify({ [metric.name]: metric.value });
  // if (navigator.sendBeacon) {
  //   navigator.sendBeacon('/analytics', body);
  // } else {
  //   fetch('/analytics', { body, method: 'POST', keepalive: true });
  // }
  if (process.env.NODE_ENV === 'development') {
    console.log('[Perf Monitor]', metric);
  }
}

export function PerformanceMonitor() {
  useEffect(() => {
    reportWebVitals(logMetric);
  }, []);

  return null;
}