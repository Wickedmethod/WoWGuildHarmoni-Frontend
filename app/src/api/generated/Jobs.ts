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



import { HttpClient, RequestParams, ContentType, HttpResponse } from "./http-client";
import { HttpStatusCode, WowauditResponse, ScheduledJob, RecordStringUnknown, ErrorResponse, RunJobRequestDto, RescheduleJobRequestDto, UpsertJobConfigRequestDto, HealthCheckResponse, AuthResponseBody, RegisterRequestBody, LoginRequestBody } from "./data-contracts"

export class Jobs<SecurityDataType = unknown> extends HttpClient<SecurityDataType>  {

            /**
 * @description List scheduled jobs
 *
 * @tags Jobs
 * @name ListJobs
 * @request GET:/jobs
 * @secure
 */
listJobs: (params: RequestParams = {}) =>
    this.request<(ScheduledJob)[], ErrorResponse>({
        path: `/jobs`,
        method: 'GET',
                        secure: true,                format: "json",        ...params,
    }),            /**
 * @description Run a job immediately by name
 *
 * @tags Jobs
 * @name RunJob
 * @request POST:/jobs/run
 * @secure
 */
runJob: (data: RunJobRequestDto, params: RequestParams = {}) =>
    this.request<{
    ok: boolean,

}, void | ErrorResponse>({
        path: `/jobs/run`,
        method: 'POST',
                body: data,        secure: true,        type: ContentType.Json,        format: "json",        ...params,
    }),            /**
 * @description List job run history
 *
 * @tags Jobs
 * @name ListJobRuns
 * @request GET:/jobs/runs
 * @secure
 */
listJobRuns: (query?: {
  /** Optional job name to filter runs */
    name?: string,
  /**
   * Page size (1-100)
   * @format double
   */
    limit?: number,
  /**
   * Page number starting at 1
   * @format double
   */
    page?: number,
  /** ISO date (inclusive) for createdAt lower bound */
    from?: string,
  /**
   * ISO date (inclusive) for createdAt upper bound
   * Returns: { items, total, page, limit }
   */
    to?: string,

}, params: RequestParams = {}) =>
    this.request<{
    hasPrev: boolean,
    hasNext: boolean,
  /** @format double */
    totalPages: number,
  /** @format double */
    limit: number,
  /** @format double */
    page: number,
  /** @format double */
    total: number,
    items: ({
    createdAt: string,
    errorMessage: string | null,
  /** @format double */
    finishedAt: number | null,
  /** @format double */
    startedAt: number | null,
  /** @format double */
    durationMs: number | null,
    success: boolean,
    name: string,
  /** @format double */
    id: number,

})[],

}, ErrorResponse>({
        path: `/jobs/runs`,
        method: 'GET',
        query: query,                secure: true,                format: "json",        ...params,
    }),            /**
 * @description Reschedule a job's interval at runtime
 *
 * @tags Jobs
 * @name RescheduleJob
 * @request POST:/jobs/reschedule
 * @secure
 */
rescheduleJob: (data: RescheduleJobRequestDto, params: RequestParams = {}) =>
    this.request<{
    ok: boolean,

}, void | ErrorResponse>({
        path: `/jobs/reschedule`,
        method: 'POST',
                body: data,        secure: true,        type: ContentType.Json,        format: "json",        ...params,
    }),            /**
 * @description List persisted job configurations
 *
 * @tags Jobs
 * @name ListJobConfigs
 * @request GET:/jobs/defs
 * @secure
 */
listJobConfigs: (params: RequestParams = {}) =>
    this.request<({
    enabled: boolean,
  /** @format double */
    intervalMs: number,
    name: string,

})[], ErrorResponse>({
        path: `/jobs/defs`,
        method: 'GET',
                        secure: true,                format: "json",        ...params,
    }),            /**
 * @description Upsert a job configuration (persisted)
 *
 * @tags Jobs
 * @name UpsertJobConfig
 * @request POST:/jobs/defs
 * @secure
 */
upsertJobConfig: (data: UpsertJobConfigRequestDto, params: RequestParams = {}) =>
    this.request<{
    ok: boolean,

}, void | ErrorResponse>({
        path: `/jobs/defs`,
        method: 'POST',
                body: data,        secure: true,        type: ContentType.Json,        format: "json",        ...params,
    }),            /**
 * @description Apply all persisted job configs to the in-memory scheduler
 *
 * @tags Jobs
 * @name ApplyAllJobConfigs
 * @request POST:/jobs/defs/apply-all
 * @secure
 */
applyAllJobConfigs: (params: RequestParams = {}) =>
    this.request<{
  /** @format double */
    applied: number,

}, ErrorResponse>({
        path: `/jobs/defs/apply-all`,
        method: 'POST',
                        secure: true,                format: "json",        ...params,
    }),            /**
 * @description Get a single job config by name
 *
 * @tags Jobs
 * @name GetJobConfig
 * @request GET:/jobs/defs/one
 * @secure
 */
getJobConfig: (query: {
    name: string,

}, params: RequestParams = {}) =>
    this.request<{
    enabled: boolean,
  /** @format double */
    intervalMs: number,
    name: string,

} | null, ErrorResponse>({
        path: `/jobs/defs/one`,
        method: 'GET',
        query: query,                secure: true,                format: "json",        ...params,
    }),            /**
 * @description Apply one job config by name
 *
 * @tags Jobs
 * @name ApplyJobConfig
 * @request POST:/jobs/defs/apply
 * @secure
 */
applyJobConfig: (data: {
    name: string,

}, params: RequestParams = {}) =>
    this.request<{
    ok: boolean,

}, ErrorResponse>({
        path: `/jobs/defs/apply`,
        method: 'POST',
                body: data,        secure: true,        type: ContentType.Json,        format: "json",        ...params,
    }),    }
