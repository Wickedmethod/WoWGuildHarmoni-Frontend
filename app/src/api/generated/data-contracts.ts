/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum HttpStatusCode {
  Value200 = 200,
  Value201 = 201,
  Value204 = 204,
  Value400 = 400,
  Value401 = 401,
  Value403 = 403,
  Value404 = 404,
  Value409 = 409,
  Value429 = 429,
  Value422 = 422,
  Value500 = 500,
  Value502 = 502,
  Value503 = 503,
}

export interface WowauditResponse {
  message: string;
}

export interface ScheduledJob {
  name: string;
  /** @format double */
  intervalMs: number;
  /** @format double */
  lastRunAt?: number;
  /** @format double */
  nextRunAt?: number;
}

/** Construct a type with a set of properties K of type T */
export type RecordStringUnknown = Record<string, any>;

export interface ErrorResponse {
  statusCode: HttpStatusCode;
  message: string;
  code?: string;
  /** Construct a type with a set of properties K of type T */
  details?: RecordStringUnknown;
}

export interface RunJobRequestDto {
  name: string;
}

export interface RescheduleJobRequestDto {
  name: string;
  /** @format double */
  intervalMs: number;
}

export interface UpsertJobConfigRequestDto {
  name: string;
  /** @format double */
  intervalMs: number;
  enabled: boolean;
}

export interface HealthCheckResponse {
  status: "healthy" | "degraded" | "unhealthy";
  timestamp: string;
  version: string;
  /** @format double */
  processId: number;
  /** @format double */
  uptimeSeconds: number;
  env?: string;
}

export interface AuthResponseBody {
  token: string;
  user: {
    email: string;
    /** @format double */
    id: number;
  };
}

export interface RegisterRequestBody {
  email: string;
  password: string;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}
