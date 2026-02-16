import { test } from '../fixtures'
import z from 'zod'
import * as allure from 'allure-js-commons'

export const validate = async <T>(data: unknown, schema: z.ZodType) => {
  return await test.step('Response validation', () => {
    allure.attachment('Response data:', JSON.stringify(data, null, 2), 'application/json')
    allure.attachment('Validation schema: ', JSON.stringify(schema.toJSONSchema(), null, 2), 'application/json')
    try {
      const validated = schema.parse(data) as T;
      return validated
    }
    catch (error) {
      console.error('Validation failed:', error);
      throw error;
    }
  })
}