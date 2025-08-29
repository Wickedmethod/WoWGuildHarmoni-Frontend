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

export class Auth<SecurityDataType = unknown> extends HttpClient<SecurityDataType>  {

            /**
 * @description Register a new user
 *
 * @tags Authentication
 * @name Register
 * @request POST:/auth/register
 */
register: (data: RegisterRequestBody, params: RequestParams = {}) =>
    this.request<AuthResponseBody, any>({
        path: `/auth/register`,
        method: 'POST',
                body: data,                type: ContentType.Json,        format: "json",        ...params,
    }),            /**
 * @description Login with email and password
 *
 * @tags Authentication
 * @name Login
 * @request POST:/auth/login
 */
login: (data: LoginRequestBody, params: RequestParams = {}) =>
    this.request<AuthResponseBody, any>({
        path: `/auth/login`,
        method: 'POST',
                body: data,                type: ContentType.Json,        format: "json",        ...params,
    }),            /**
 * No description
 *
 * @tags Authentication
 * @name Refresh
 * @request POST:/auth/refresh
 */
refresh: (data: {
    token: string,

}, params: RequestParams = {}) =>
    this.request<AuthResponseBody, any>({
        path: `/auth/refresh`,
        method: 'POST',
                body: data,                type: ContentType.Json,        format: "json",        ...params,
    }),    }
