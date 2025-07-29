// performance.ts

/**
 * A decorator to measure the execution time of a class method.
 * @param target The prototype of the class.
 * @param propertyKey The name of the method.
 * @param descriptor The property descriptor.
 */
export function measurePerformance() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      if (process.env.NODE_ENV !== 'development') {
        return originalMethod.apply(this, args);
      }
      
      const start = performance.now();
      const result = await originalMethod.apply(this, args);
      const end = performance.now();
      
      console.log(`[Perf] ${target.constructor.name}.${propertyKey} took ${(end - start).toFixed(2)}ms`);
      
      return result;
    };

    return descriptor;
  };
}

/**
 * A utility function to track memory usage.
 * Should be used sparingly in development to avoid performance overhead.
 */
export function trackMemoryUsage(context: string): void {
  if (process.env.NODE_ENV === 'development' && typeof window.performance.memory !== 'undefined') {
    const memory = window.performance.memory;
    console.log(
      `[Memory] ${context}:`, {
        usedJSHeapSize: `${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
        totalJSHeapSize: `${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
        jsHeapSizeLimit: `${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`,
      }
    );
  }
}
