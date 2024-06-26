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
import type { Player } from './Player';
import {
    PlayerFromJSON,
    PlayerFromJSONTyped,
    PlayerToJSON,
} from './Player';

/**
 * 
 * @export
 * @interface PlayersResponse
 */
export interface PlayersResponse {
    /**
     * 
     * @type {Array<Player>}
     * @memberof PlayersResponse
     */
    players: Array<Player>;
}

/**
 * Check if a given object implements the PlayersResponse interface.
 */
export function instanceOfPlayersResponse(value: object): boolean {
    if (!('players' in value)) return false;
    return true;
}

export function PlayersResponseFromJSON(json: any): PlayersResponse {
    return PlayersResponseFromJSONTyped(json, false);
}

export function PlayersResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): PlayersResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'players': ((json['players'] as Array<any>).map(PlayerFromJSON)),
    };
}

export function PlayersResponseToJSON(value?: PlayersResponse | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'players': ((value['players'] as Array<any>).map(PlayerToJSON)),
    };
}

