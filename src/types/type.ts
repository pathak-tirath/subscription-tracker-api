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