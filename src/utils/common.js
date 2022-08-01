import { MAX_PRODUCT_QUANTITY, MIN_PRODUCT_QUANTITY } from "constant";

export function getErrorMessageRHF(form, name) {
  const { errors } = form;
  const hasError = errors[name]; /* && formState.touched[name]; */
  const errorMessage = errors[name]?.message;

  return {
    hasError: !!hasError,
    errorMessage,
  };
}

export const styledBy = (property, mapping) => (props) =>
  mapping[props[property]];

export const clamp = (value, min, max) => Math.max(Math.min(value, max), min);

export const productQuantityClamp = (value) =>
  clamp(value, MIN_PRODUCT_QUANTITY, MAX_PRODUCT_QUANTITY);

export function numberParsePositiveInt(string = "", defaultValue = 1) {
  const parsed = Number.parseInt(string);
  return parsed ? parsed : defaultValue;
}

export const jsonToFormData = (json) => {
  const formData = new FormData();
  for (let key in json) {
    formData.set(key, json[key]);
  }
  return formData;
};

export function truncateText(text, maxLength) {
  if (text.length < maxLength) return text;
  return `${text.slice(0, maxLength - 1)}...`;
}
