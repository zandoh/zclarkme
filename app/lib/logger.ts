export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogContext {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: unknown;
  [key: string]: unknown;
}

export type LogMiddleware = (context: LogContext) => LogContext | Promise<LogContext>;

export interface Logger {
  debug(message: string, data?: unknown): void;
  info(message: string, data?: unknown): void;
  warn(message: string, data?: unknown): void;
  error(message: string, data?: unknown): void;
  use(middleware: LogMiddleware): void;
}

class LoggerImpl implements Logger {
  private middlewares: LogMiddleware[] = [];

  constructor(private readonly baseContext: Partial<LogContext> = {}) {}

  use(middleware: LogMiddleware): void {
    this.middlewares.push(middleware);
  }

  private async processMiddlewares(context: LogContext): Promise<LogContext> {
    let result = { ...context };
    for (const middleware of this.middlewares) {
      result = await middleware(result);
    }
    return result;
  }

  private async log(level: LogLevel, message: string, data?: unknown): Promise<void> {
    const context: LogContext = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      ...this.baseContext,
    };

    const processedContext = await this.processMiddlewares(context);
    this.output(processedContext);
  }

  protected output(context: LogContext): void {
    const { timestamp, level, message, data, ...rest } = context;
    const logData = {
      timestamp,
      level,
      message,
      ...(data !== undefined && { data }),
      ...rest,
    };

    switch (level) {
      case "debug":
        console.debug(logData);
        break;
      case "info":
        console.info(logData);
        break;
      case "warn":
        console.warn(logData);
        break;
      case "error":
        console.error(logData);
        break;
    }
  }

  debug(message: string, data?: unknown): void {
    void this.log("debug", message, data);
  }

  info(message: string, data?: unknown): void {
    void this.log("info", message, data);
  }

  warn(message: string, data?: unknown): void {
    void this.log("warn", message, data);
  }

  error(message: string, data?: unknown): void {
    void this.log("error", message, data);
  }
}

// Factory function to create a new logger instance
export function createLogger(baseContext?: Partial<LogContext>): Logger {
  return new LoggerImpl(baseContext);
}

// Common middleware examples
export const requestIdMiddleware: LogMiddleware = (context) => ({
  ...context,
  requestId: crypto.randomUUID(),
});

export const environmentMiddleware: LogMiddleware = (context) => ({
  ...context,
  environment: process.env.NODE_ENV,
});

export const errorStackMiddleware: LogMiddleware = (context) => {
  if (context.level === "error" && context.data instanceof Error) {
    return {
      ...context,
      stack: context.data.stack,
    };
  }
  return context;
};

// Example usage:
/*
const logger = createLogger({ app: "my-app" });

// Add middleware
logger.use(requestIdMiddleware);
logger.use(environmentMiddleware);
logger.use(errorStackMiddleware);

// Log messages
logger.info("Application started");
logger.error("Failed to process request", new Error("Invalid input"));
*/ 