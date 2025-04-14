export class Message {
  constructor(
    public city: string,
    public phone: string,
    public body: string | undefined,
  ) {}
}

export type Result<T> = {
  status: 'success' | 'error';
  data?: T;
  error?: Error;
};
