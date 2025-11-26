export interface IFrequency {
  daily: number;
  weekly: number;
  monthly: number;
  yearly: number;
}


export interface IError {
  message: string;
  statusCode?: number;
}

export interface IEnv {
  PORT?: string;
  NODE_ENV?: string;
  MONGO_URI?: string;
  LOGGER_LEVEL?: string;
  SALT?: string;
  JWT_SECRET?: string;
  JWT_EXPIRE?: string;
}

// Custom error interface
export interface CustomError extends Error {
  statusCode?: number;
  code?: number;
  errors?: unknown;
}
