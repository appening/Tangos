"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//dont remove last argument
function errorHandlerMiddleware(error, request, response, next) {
    const opStatus = error.opStatus || 500;
    const message = error.message || 'Something went wrong';
    const result = error.result || 0;
    response.json({
        opStatus: opStatus,
        message: message,
        result: result
    });
}
exports.errorHandlerMiddleware = errorHandlerMiddleware;
