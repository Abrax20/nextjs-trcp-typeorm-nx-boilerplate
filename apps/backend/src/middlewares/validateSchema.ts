import { waitForMiddleware } from '@example/generic';
import express, { RequestHandler } from 'express';
import status from 'http-status';
import { ZodSchema } from 'zod';

const defaultJsonMiddleware = express.json();

type Literal = boolean | null | number | string;
type Json = Literal | { [key: string]: Json } | Json[] | undefined;

export const validateSchema =
  // Generic type argument enables succeeding handlers to have `request.body` being the schema's
  // output type.
  <TZodSchemaOutput extends Json>(
    schema: ZodSchema<TZodSchemaOutput>,
    limit?: string
  ): RequestHandler<Record<string, unknown>, unknown, TZodSchemaOutput> => {
    const jsonMiddleware = limit
      ? express?.json({ limit })
      : defaultJsonMiddleware;

    return async (request, response, next) => {
      await waitForMiddleware(jsonMiddleware, request, response);

      try {
        request.body = await schema.parseAsync(request.body);
        return next();
      } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        response.err = error as Error;
        response.status(status.BAD_REQUEST);
        return response.send(error);
      }
    };
  };

export const validateQuerySchema =
  // Generic type argument enables succeeding handlers to have `request.params` being the schema's
  // output type.


    <TZodSchemaOutput extends Json, TRequestParameters, TRequestBody>(
      schema: ZodSchema<TZodSchemaOutput>
    ): RequestHandler<
      TRequestParameters,
      unknown,
      TRequestBody,
      TZodSchemaOutput
    > =>
    async (request, response, next) => {
      try {
        request.query = schema.parse(request.query);
        return next();
      } catch (error) {
        response.status(status.BAD_REQUEST);
        return response.send(error);
      }
    };

export const validateParametersSchema =
  // Generic type argument enables succeeding handlers to have `request.params` being the schema's
  // output type.


    <TZodSchemaOutput extends Json, TRequestBody>(
      schema: ZodSchema<TZodSchemaOutput>
    ): RequestHandler<TZodSchemaOutput, unknown, TRequestBody> =>
    async (request, response, next) => {
      try {
        request.params = schema.parse(request.params);
        return next();
      } catch (error) {
        response.status(status.BAD_REQUEST);
        return response.send(error);
      }
    };
