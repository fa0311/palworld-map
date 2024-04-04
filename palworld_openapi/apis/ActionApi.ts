/* tslint:disable */
/* eslint-disable */
/**
 * PalWorld OpenAPI
 * PalWorld OpenAPI(Swagger) specification
 *
 * The version of the OpenAPI document: 0.0.1
 * Contact: yuki@yuki0311.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  AnnounceRequest,
  BanRequest,
  KickRequest,
  ShutdownRequest,
  UnbanRequest,
} from '../models/index';
import {
    AnnounceRequestFromJSON,
    AnnounceRequestToJSON,
    BanRequestFromJSON,
    BanRequestToJSON,
    KickRequestFromJSON,
    KickRequestToJSON,
    ShutdownRequestFromJSON,
    ShutdownRequestToJSON,
    UnbanRequestFromJSON,
    UnbanRequestToJSON,
} from '../models/index';

export interface PostAnnounceRequest {
    announceRequest?: AnnounceRequest;
}

export interface PostBanRequest {
    banRequest?: BanRequest;
}

export interface PostKickRequest {
    kickRequest?: KickRequest;
}

export interface PostShutdownRequest {
    shutdownRequest?: ShutdownRequest;
}

export interface PostUnbanRequest {
    unbanRequest?: UnbanRequest;
}

/**
 * 
 */
export class ActionApi extends runtime.BaseAPI {

    /**
     * Announce message to all players
     */
    async postAnnounceRaw(requestParameters: PostAnnounceRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/v1/api/announce`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AnnounceRequestToJSON(requestParameters['announceRequest']),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Announce message to all players
     */
    async postAnnounce(requestParameters: PostAnnounceRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.postAnnounceRaw(requestParameters, initOverrides);
    }

    /**
     * Ban player
     */
    async postBanRaw(requestParameters: PostBanRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/v1/api/ban`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: BanRequestToJSON(requestParameters['banRequest']),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Ban player
     */
    async postBan(requestParameters: PostBanRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.postBanRaw(requestParameters, initOverrides);
    }

    /**
     * Kick player
     */
    async postKickRaw(requestParameters: PostKickRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/v1/api/kick`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: KickRequestToJSON(requestParameters['kickRequest']),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Kick player
     */
    async postKick(requestParameters: PostKickRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.postKickRaw(requestParameters, initOverrides);
    }

    /**
     * Save the world
     */
    async postSaveRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/v1/api/save`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Save the world
     */
    async postSave(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.postSaveRaw(initOverrides);
    }

    /**
     * Shutdown the server
     */
    async postShutdownRaw(requestParameters: PostShutdownRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/v1/api/shutdown`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ShutdownRequestToJSON(requestParameters['shutdownRequest']),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Shutdown the server
     */
    async postShutdown(requestParameters: PostShutdownRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.postShutdownRaw(requestParameters, initOverrides);
    }

    /**
     * Force stop the server
     */
    async postStopRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/v1/api/stop`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Force stop the server
     */
    async postStop(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.postStopRaw(initOverrides);
    }

    /**
     * Unban player
     */
    async postUnbanRaw(requestParameters: PostUnbanRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/v1/api/unban`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: UnbanRequestToJSON(requestParameters['unbanRequest']),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Unban player
     */
    async postUnban(requestParameters: PostUnbanRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.postUnbanRaw(requestParameters, initOverrides);
    }

}
