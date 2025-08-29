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

export class Wowaudit<SecurityDataType = unknown> extends HttpClient<SecurityDataType>  {

            /**
 * No description
 *
 * @tags Wowaudit
 * @name Get
 * @request GET:/wowaudit
 */
get: (params: RequestParams = {}) =>
    this.request<WowauditResponse, any>({
        path: `/wowaudit`,
        method: 'GET',
                                        format: "json",        ...params,
    }),    }
