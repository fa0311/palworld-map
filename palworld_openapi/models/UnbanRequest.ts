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

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface UnbanRequest
 */
export interface UnbanRequest {
    /**
     * 
     * @type {string}
     * @memberof UnbanRequest
     */
    userId: string;
}

/**
 * Check if a given object implements the UnbanRequest interface.
 */
export function instanceOfUnbanRequest(value: object): boolean {
    if (!('userId' in value)) return false;
    return true;
}

export function UnbanRequestFromJSON(json: any): UnbanRequest {
    return UnbanRequestFromJSONTyped(json, false);
}

export function UnbanRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): UnbanRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'userId': json['userId'],
    };
}

export function UnbanRequestToJSON(value?: UnbanRequest | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'userId': value['userId'],
    };
}
