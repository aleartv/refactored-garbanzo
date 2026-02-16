import * as allure from "allure-js-commons";
import { test } from '../fixtures'

type WithTestStepFn = <
  T extends (...args: Parameters<T>) => ReturnType<T>,
>(
  fn: T,
) => (...args: Parameters<T>) => PromiseLike<ReturnType<T>>;

export const withTestStep = (stepname: string): WithTestStepFn => {
  return (fn) => {
    return async (...args) => {
      return await test.step(`Preparation: ${stepname}`, () => {
        const data = fn(...args);
        allure.attachment(
          stepname,
          JSON.stringify(data, null, 2),
          "application/json",
        );
        return data;
      });
    };
  };
};
