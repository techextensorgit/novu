/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { NovuCore } from "../core.js";
import { encodeFormQuery, encodeSimple } from "../lib/encodings.js";
import * as M from "../lib/matchers.js";
import { compactMap } from "../lib/primitives.js";
import { safeParse } from "../lib/schemas.js";
import { RequestOptions } from "../lib/sdks.js";
import { extractSecurity, resolveGlobalSecurity } from "../lib/security.js";
import { pathToFunc } from "../lib/url.js";
import {
  ConnectionError,
  InvalidRequestError,
  RequestAbortedError,
  RequestTimeoutError,
  UnexpectedClientError,
} from "../models/errors/httpclienterrors.js";
import * as errors from "../models/errors/index.js";
import { SDKError } from "../models/errors/sdkerror.js";
import { SDKValidationError } from "../models/errors/sdkvalidationerror.js";
import * as operations from "../models/operations/index.js";
import { APICall, APIPromise } from "../types/async.js";
import { Result } from "../types/fp.js";

/**
 * Delete messages by transactionId
 *
 * @remarks
 * Deletes messages entity from the Novu platform using TransactionId of message
 */
export function messagesDeleteByTransactionId(
  client: NovuCore,
  transactionId: string,
  channel?: operations.Channel | undefined,
  idempotencyKey?: string | undefined,
  options?: RequestOptions,
): APIPromise<
  Result<
    | operations.MessagesControllerDeleteMessagesByTransactionIdResponse
    | undefined,
    | errors.ErrorDto
    | errors.ErrorDto
    | errors.ValidationErrorDto
    | errors.ErrorDto
    | SDKError
    | SDKValidationError
    | UnexpectedClientError
    | InvalidRequestError
    | RequestAbortedError
    | RequestTimeoutError
    | ConnectionError
  >
> {
  return new APIPromise($do(
    client,
    transactionId,
    channel,
    idempotencyKey,
    options,
  ));
}

async function $do(
  client: NovuCore,
  transactionId: string,
  channel?: operations.Channel | undefined,
  idempotencyKey?: string | undefined,
  options?: RequestOptions,
): Promise<
  [
    Result<
      | operations.MessagesControllerDeleteMessagesByTransactionIdResponse
      | undefined,
      | errors.ErrorDto
      | errors.ErrorDto
      | errors.ValidationErrorDto
      | errors.ErrorDto
      | SDKError
      | SDKValidationError
      | UnexpectedClientError
      | InvalidRequestError
      | RequestAbortedError
      | RequestTimeoutError
      | ConnectionError
    >,
    APICall,
  ]
> {
  const input:
    operations.MessagesControllerDeleteMessagesByTransactionIdRequest = {
      transactionId: transactionId,
      channel: channel,
      idempotencyKey: idempotencyKey,
    };

  const parsed = safeParse(
    input,
    (value) =>
      operations
        .MessagesControllerDeleteMessagesByTransactionIdRequest$outboundSchema
        .parse(value),
    "Input validation failed",
  );
  if (!parsed.ok) {
    return [parsed, { status: "invalid" }];
  }
  const payload = parsed.value;
  const body = null;

  const pathParams = {
    transactionId: encodeSimple("transactionId", payload.transactionId, {
      explode: false,
      charEncoding: "percent",
    }),
  };

  const path = pathToFunc("/v1/messages/transaction/{transactionId}")(
    pathParams,
  );

  const query = encodeFormQuery({
    "channel": payload.channel,
  });

  const headers = new Headers(compactMap({
    Accept: "application/json",
    "idempotency-key": encodeSimple(
      "idempotency-key",
      payload["idempotency-key"],
      { explode: false, charEncoding: "none" },
    ),
  }));

  const securityInput = await extractSecurity(client._options.security);
  const requestSecurity = resolveGlobalSecurity(securityInput);

  const context = {
    baseURL: options?.serverURL ?? client._baseURL ?? "",
    operationID: "MessagesController_deleteMessagesByTransactionId",
    oAuth2Scopes: [],

    resolvedSecurity: requestSecurity,

    securitySource: client._options.security,
    retryConfig: options?.retries
      || client._options.retryConfig
      || {
        strategy: "backoff",
        backoff: {
          initialInterval: 1000,
          maxInterval: 30000,
          exponent: 1.5,
          maxElapsedTime: 3600000,
        },
        retryConnectionErrors: true,
      }
      || { strategy: "none" },
    retryCodes: options?.retryCodes || ["408", "409", "429", "5XX"],
  };

  const requestRes = client._createRequest(context, {
    security: requestSecurity,
    method: "DELETE",
    baseURL: options?.serverURL,
    path: path,
    headers: headers,
    query: query,
    body: body,
    timeoutMs: options?.timeoutMs || client._options.timeoutMs || -1,
  }, options);
  if (!requestRes.ok) {
    return [requestRes, { status: "invalid" }];
  }
  const req = requestRes.value;

  const doResult = await client._do(req, {
    context,
    errorCodes: [
      "400",
      "401",
      "403",
      "404",
      "405",
      "409",
      "413",
      "414",
      "415",
      "422",
      "429",
      "4XX",
      "500",
      "503",
      "5XX",
    ],
    retryConfig: context.retryConfig,
    retryCodes: context.retryCodes,
  });
  if (!doResult.ok) {
    return [doResult, { status: "request-error", request: req }];
  }
  const response = doResult.value;

  const responseFields = {
    HttpMeta: { Response: response, Request: req },
  };

  const [result] = await M.match<
    | operations.MessagesControllerDeleteMessagesByTransactionIdResponse
    | undefined,
    | errors.ErrorDto
    | errors.ErrorDto
    | errors.ValidationErrorDto
    | errors.ErrorDto
    | SDKError
    | SDKValidationError
    | UnexpectedClientError
    | InvalidRequestError
    | RequestAbortedError
    | RequestTimeoutError
    | ConnectionError
  >(
    M.nil(
      204,
      operations
        .MessagesControllerDeleteMessagesByTransactionIdResponse$inboundSchema
        .optional(),
      { hdrs: true },
    ),
    M.jsonErr(414, errors.ErrorDto$inboundSchema),
    M.jsonErr(
      [400, 401, 403, 404, 405, 409, 413, 415],
      errors.ErrorDto$inboundSchema,
      { hdrs: true },
    ),
    M.jsonErr(422, errors.ValidationErrorDto$inboundSchema, { hdrs: true }),
    M.fail(429),
    M.jsonErr(500, errors.ErrorDto$inboundSchema, { hdrs: true }),
    M.fail(503),
    M.fail("4XX"),
    M.fail("5XX"),
  )(response, { extraFields: responseFields });
  if (!result.ok) {
    return [result, { status: "complete", request: req, response }];
  }

  return [result, { status: "complete", request: req, response }];
}
