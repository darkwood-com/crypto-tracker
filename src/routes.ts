/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AppController } from './controller/app-controller';
import { expressAuthentication } from './security/authentication';
// @ts-ignore - no great way to install types from subpackage
const promiseAny = require('promise.any');
import { iocContainer } from './container';
import { IocContainer, IocContainerFactory } from '@tsoa/runtime';
import * as express from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "Assertion": {
        "dataType": "refObject",
        "properties": {
            "to": {"ref":"Assertion","required":true},
            "be": {"ref":"Assertion","required":true},
            "been": {"ref":"Assertion","required":true},
            "is": {"ref":"Assertion","required":true},
            "that": {"ref":"Assertion","required":true},
            "which": {"ref":"Assertion","required":true},
            "and": {"ref":"Assertion","required":true},
            "has": {"ref":"Assertion","required":true},
            "have": {"ref":"Assertion","required":true},
            "with": {"ref":"Assertion","required":true},
            "at": {"ref":"Assertion","required":true},
            "of": {"ref":"Assertion","required":true},
            "same": {"ref":"Assertion","required":true},
            "but": {"ref":"Assertion","required":true},
            "does": {"ref":"Assertion","required":true},
            "above": {"ref":"NumberComparer","required":true},
            "gt": {"ref":"NumberComparer","required":true},
            "greaterThan": {"ref":"NumberComparer","required":true},
            "least": {"ref":"NumberComparer","required":true},
            "gte": {"ref":"NumberComparer","required":true},
            "greaterThanOrEqual": {"ref":"NumberComparer","required":true},
            "below": {"ref":"NumberComparer","required":true},
            "lt": {"ref":"NumberComparer","required":true},
            "lessThan": {"ref":"NumberComparer","required":true},
            "most": {"ref":"NumberComparer","required":true},
            "lte": {"ref":"NumberComparer","required":true},
            "lessThanOrEqual": {"ref":"NumberComparer","required":true},
            "instanceof": {"ref":"InstanceOf","required":true},
            "instanceOf": {"ref":"InstanceOf","required":true},
            "not": {"ref":"Assertion","required":true},
            "deep": {"ref":"Deep","required":true},
            "ordered": {"ref":"Ordered","required":true},
            "nested": {"ref":"Nested","required":true},
            "own": {"ref":"Own","required":true},
            "any": {"ref":"KeyFilter","required":true},
            "all": {"ref":"KeyFilter","required":true},
            "a": {"ref":"Assertion","required":true},
            "an": {"ref":"Assertion","required":true},
            "include": {"ref":"Include","required":true},
            "includes": {"ref":"Include","required":true},
            "contain": {"ref":"Include","required":true},
            "contains": {"ref":"Include","required":true},
            "ok": {"ref":"Assertion","required":true},
            "true": {"ref":"Assertion","required":true},
            "false": {"ref":"Assertion","required":true},
            "null": {"ref":"Assertion","required":true},
            "undefined": {"ref":"Assertion","required":true},
            "NaN": {"ref":"Assertion","required":true},
            "exist": {"ref":"Assertion","required":true},
            "empty": {"ref":"Assertion","required":true},
            "arguments": {"ref":"Assertion","required":true},
            "Arguments": {"ref":"Assertion","required":true},
            "finite": {"ref":"Assertion","required":true},
            "equal": {"ref":"Equal","required":true},
            "equals": {"ref":"Equal","required":true},
            "eq": {"ref":"Equal","required":true},
            "eql": {"ref":"Equal","required":true},
            "eqls": {"ref":"Equal","required":true},
            "property": {"ref":"Property","required":true},
            "ownProperty": {"ref":"Property","required":true},
            "haveOwnProperty": {"ref":"Property","required":true},
            "ownPropertyDescriptor": {"ref":"OwnPropertyDescriptor","required":true},
            "haveOwnPropertyDescriptor": {"ref":"OwnPropertyDescriptor","required":true},
            "length": {"ref":"Length","required":true},
            "lengthOf": {"ref":"Length","required":true},
            "match": {"ref":"Match","required":true},
            "matches": {"ref":"Match","required":true},
            "keys": {"ref":"Keys","required":true},
            "throw": {"ref":"Throw","required":true},
            "throws": {"ref":"Throw","required":true},
            "Throw": {"ref":"Throw","required":true},
            "respondTo": {"ref":"RespondTo","required":true},
            "respondsTo": {"ref":"RespondTo","required":true},
            "itself": {"ref":"Assertion","required":true},
            "satisfy": {"ref":"Satisfy","required":true},
            "satisfies": {"ref":"Satisfy","required":true},
            "closeTo": {"ref":"CloseTo","required":true},
            "approximately": {"ref":"CloseTo","required":true},
            "members": {"ref":"Members","required":true},
            "increase": {"ref":"PropertyChange","required":true},
            "increases": {"ref":"PropertyChange","required":true},
            "decrease": {"ref":"PropertyChange","required":true},
            "decreases": {"ref":"PropertyChange","required":true},
            "change": {"ref":"PropertyChange","required":true},
            "changes": {"ref":"PropertyChange","required":true},
            "extensible": {"ref":"Assertion","required":true},
            "sealed": {"ref":"Assertion","required":true},
            "frozen": {"ref":"Assertion","required":true},
            "oneOf": {"ref":"OneOf","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Equal": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Keys": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Deep": {
        "dataType": "refObject",
        "properties": {
            "keys": {"ref":"Keys","required":true},
            "members": {"ref":"Members","required":true},
            "be": {"ref":"Assertion","required":true},
            "equal": {"ref":"Equal","required":true},
            "equals": {"ref":"Equal","required":true},
            "eq": {"ref":"Equal","required":true},
            "include": {"ref":"Include","required":true},
            "includes": {"ref":"Include","required":true},
            "contain": {"ref":"Include","required":true},
            "contains": {"ref":"Include","required":true},
            "property": {"ref":"Property","required":true},
            "ordered": {"ref":"Ordered","required":true},
            "nested": {"ref":"Nested","required":true},
            "oneOf": {"ref":"OneOf","required":true},
            "own": {"ref":"Own","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Members": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Ordered": {
        "dataType": "refObject",
        "properties": {
            "members": {"ref":"Members","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "KeyFilter": {
        "dataType": "refObject",
        "properties": {
            "keys": {"ref":"Keys","required":true},
            "members": {"ref":"Members","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OneOf": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Include": {
        "dataType": "refObject",
        "properties": {
            "keys": {"ref":"Keys","required":true},
            "deep": {"ref":"Deep","required":true},
            "ordered": {"ref":"Ordered","required":true},
            "members": {"ref":"Members","required":true},
            "any": {"ref":"KeyFilter","required":true},
            "all": {"ref":"KeyFilter","required":true},
            "oneOf": {"ref":"OneOf","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Property": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Nested": {
        "dataType": "refObject",
        "properties": {
            "include": {"ref":"Include","required":true},
            "includes": {"ref":"Include","required":true},
            "contain": {"ref":"Include","required":true},
            "contains": {"ref":"Include","required":true},
            "property": {"ref":"Property","required":true},
            "members": {"ref":"Members","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Own": {
        "dataType": "refObject",
        "properties": {
            "include": {"ref":"Include","required":true},
            "includes": {"ref":"Include","required":true},
            "contain": {"ref":"Include","required":true},
            "contains": {"ref":"Include","required":true},
            "property": {"ref":"Property","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OwnPropertyDescriptor": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NumberComparer": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Length": {
        "dataType": "refObject",
        "properties": {
            "to": {"ref":"Assertion","required":true},
            "be": {"ref":"Assertion","required":true},
            "been": {"ref":"Assertion","required":true},
            "is": {"ref":"Assertion","required":true},
            "that": {"ref":"Assertion","required":true},
            "which": {"ref":"Assertion","required":true},
            "and": {"ref":"Assertion","required":true},
            "has": {"ref":"Assertion","required":true},
            "have": {"ref":"Assertion","required":true},
            "with": {"ref":"Assertion","required":true},
            "at": {"ref":"Assertion","required":true},
            "of": {"ref":"Assertion","required":true},
            "same": {"ref":"Assertion","required":true},
            "but": {"ref":"Assertion","required":true},
            "does": {"ref":"Assertion","required":true},
            "above": {"ref":"NumberComparer","required":true},
            "gt": {"ref":"NumberComparer","required":true},
            "greaterThan": {"ref":"NumberComparer","required":true},
            "least": {"ref":"NumberComparer","required":true},
            "gte": {"ref":"NumberComparer","required":true},
            "greaterThanOrEqual": {"ref":"NumberComparer","required":true},
            "below": {"ref":"NumberComparer","required":true},
            "lt": {"ref":"NumberComparer","required":true},
            "lessThan": {"ref":"NumberComparer","required":true},
            "most": {"ref":"NumberComparer","required":true},
            "lte": {"ref":"NumberComparer","required":true},
            "lessThanOrEqual": {"ref":"NumberComparer","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Match": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Throw": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RespondTo": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Satisfy": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CloseTo": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PropertyChange": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "InstanceOf": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Chai.Assertion": {
        "dataType": "refObject",
        "properties": {
            "to": {"ref":"Assertion","required":true},
            "be": {"ref":"Assertion","required":true},
            "been": {"ref":"Assertion","required":true},
            "is": {"ref":"Assertion","required":true},
            "that": {"ref":"Assertion","required":true},
            "which": {"ref":"Assertion","required":true},
            "and": {"ref":"Assertion","required":true},
            "has": {"ref":"Assertion","required":true},
            "have": {"ref":"Assertion","required":true},
            "with": {"ref":"Assertion","required":true},
            "at": {"ref":"Assertion","required":true},
            "of": {"ref":"Assertion","required":true},
            "same": {"ref":"Assertion","required":true},
            "but": {"ref":"Assertion","required":true},
            "does": {"ref":"Assertion","required":true},
            "above": {"ref":"NumberComparer","required":true},
            "gt": {"ref":"NumberComparer","required":true},
            "greaterThan": {"ref":"NumberComparer","required":true},
            "least": {"ref":"NumberComparer","required":true},
            "gte": {"ref":"NumberComparer","required":true},
            "greaterThanOrEqual": {"ref":"NumberComparer","required":true},
            "below": {"ref":"NumberComparer","required":true},
            "lt": {"ref":"NumberComparer","required":true},
            "lessThan": {"ref":"NumberComparer","required":true},
            "most": {"ref":"NumberComparer","required":true},
            "lte": {"ref":"NumberComparer","required":true},
            "lessThanOrEqual": {"ref":"NumberComparer","required":true},
            "instanceof": {"ref":"InstanceOf","required":true},
            "instanceOf": {"ref":"InstanceOf","required":true},
            "not": {"ref":"Assertion","required":true},
            "deep": {"ref":"Deep","required":true},
            "ordered": {"ref":"Ordered","required":true},
            "nested": {"ref":"Nested","required":true},
            "own": {"ref":"Own","required":true},
            "any": {"ref":"KeyFilter","required":true},
            "all": {"ref":"KeyFilter","required":true},
            "a": {"ref":"Assertion","required":true},
            "an": {"ref":"Assertion","required":true},
            "include": {"ref":"Include","required":true},
            "includes": {"ref":"Include","required":true},
            "contain": {"ref":"Include","required":true},
            "contains": {"ref":"Include","required":true},
            "ok": {"ref":"Assertion","required":true},
            "true": {"ref":"Assertion","required":true},
            "false": {"ref":"Assertion","required":true},
            "null": {"ref":"Assertion","required":true},
            "undefined": {"ref":"Assertion","required":true},
            "NaN": {"ref":"Assertion","required":true},
            "exist": {"ref":"Assertion","required":true},
            "empty": {"ref":"Assertion","required":true},
            "arguments": {"ref":"Assertion","required":true},
            "Arguments": {"ref":"Assertion","required":true},
            "finite": {"ref":"Assertion","required":true},
            "equal": {"ref":"Equal","required":true},
            "equals": {"ref":"Equal","required":true},
            "eq": {"ref":"Equal","required":true},
            "eql": {"ref":"Equal","required":true},
            "eqls": {"ref":"Equal","required":true},
            "property": {"ref":"Property","required":true},
            "ownProperty": {"ref":"Property","required":true},
            "haveOwnProperty": {"ref":"Property","required":true},
            "ownPropertyDescriptor": {"ref":"OwnPropertyDescriptor","required":true},
            "haveOwnPropertyDescriptor": {"ref":"OwnPropertyDescriptor","required":true},
            "length": {"ref":"Length","required":true},
            "lengthOf": {"ref":"Length","required":true},
            "match": {"ref":"Match","required":true},
            "matches": {"ref":"Match","required":true},
            "keys": {"ref":"Keys","required":true},
            "throw": {"ref":"Throw","required":true},
            "throws": {"ref":"Throw","required":true},
            "Throw": {"ref":"Throw","required":true},
            "respondTo": {"ref":"RespondTo","required":true},
            "respondsTo": {"ref":"RespondTo","required":true},
            "itself": {"ref":"Assertion","required":true},
            "satisfy": {"ref":"Satisfy","required":true},
            "satisfies": {"ref":"Satisfy","required":true},
            "closeTo": {"ref":"CloseTo","required":true},
            "approximately": {"ref":"CloseTo","required":true},
            "members": {"ref":"Members","required":true},
            "increase": {"ref":"PropertyChange","required":true},
            "increases": {"ref":"PropertyChange","required":true},
            "decrease": {"ref":"PropertyChange","required":true},
            "decreases": {"ref":"PropertyChange","required":true},
            "change": {"ref":"PropertyChange","required":true},
            "changes": {"ref":"PropertyChange","required":true},
            "extensible": {"ref":"Assertion","required":true},
            "sealed": {"ref":"Assertion","required":true},
            "frozen": {"ref":"Assertion","required":true},
            "oneOf": {"ref":"OneOf","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Object": {
        "dataType": "refObject",
        "properties": {
            "should": {"ref":"Chai.Assertion","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.get('/api/app/import',

            async function AppController_import(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<AppController>(AppController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.import.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/app/wallets',

            async function AppController_wallets(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<AppController>(AppController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.wallets.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/app/ballance',

            async function AppController_ballance(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<AppController>(AppController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.ballance.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/app/version',

            async function AppController_version(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<AppController>(AppController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.version.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus() || statusCode;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            data.pipe(response);
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors  = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    }
                case 'res':
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
