declare namespace Express {
  export interface Request {
    workspaceId: string;
    sessionCookieName: string;
  }

  export interface Response {
    headers: Record<string, string>;
    addEtag(value: string | Buffer | unknown, etag?: string): void;
  }
}

declare module 'http' {
  export interface IncomingMessage {
    headers: Record<string, string>;
    originalUrl: string;
  }

  export interface ServerResponse {
    headers: Record<string, string>;
  }
}
