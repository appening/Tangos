"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseResponse {
    constructor(result, message, data) {
        this.result = result;
        this.message = message;
        this.data = data;
    }
    static getSuccessResponse(data) {
        return new BaseResponse(1, 'Success', data);
    }
    static getEmptyResponse() {
        return new BaseResponse(1, 'No data found', null);
    }
    static getOAuthFreeEndpointResponse() {
        return new BaseResponse(1, 'OAuth Free called', null);
    }
    static getOAuthVerifiedResponse() {
        return new BaseResponse(1, 'OAuth Verified', null);
    }
    static getOAuthConfigDisabledResponse() {
        return new BaseResponse(1, 'OAuth config disabled', null);
    }
    static getAuthenticationSuccessResponse(user_id) {
        return new BaseResponse(1, user_id + 'Authenticated successfully', user_id);
    }
}
exports.BaseResponse = BaseResponse;
