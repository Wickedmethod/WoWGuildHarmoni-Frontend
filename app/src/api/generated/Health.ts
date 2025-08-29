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

export class Health<SecurityDataType = unknown> extends HttpClient<SecurityDataType>  {

            /**
 * @description Liveness and readiness health check
 *
 * @tags Health
 * @name GetHealth
 * @request GET:/health
 */
getHealth: (params: RequestParams = {}) =>
    this.request<HealthCheckResponse, any>({
        path: `/health`,
        method: 'GET',
                                        format: "json",        ...params,
    }),    }
