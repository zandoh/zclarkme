export type LogLevel = "debug" | "info" | "warn" | "error";

export interface LogContext {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: unknown;
  [key: string]: unknown;
}

export type LogMiddleware = (context: LogContext) => LogContext | Promise<LogContext>;

export interface LoggerInterface {
  debug(message: string, data?: unknown): void;
  info(message: string, data?: unknown): void;
  warn(message: string, data?: unknown): void;
  error(message: string, data?: unknown): void;
  use(middleware: LogMiddleware): void;
}

class Logger implements LoggerInterface {
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

export function createLogger(baseContext?: Partial<LogContext>): Logger {
  return new Logger(baseContext);
}