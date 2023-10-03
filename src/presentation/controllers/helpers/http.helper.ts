import { Response } from "../protocols/http.interface";

export const badRequest = (error: Error): Response => ({
  statusCode: 400,
  body: error
})

export const created = (body: object | string): Response => ({
  statusCode: 201,
  body: body
})