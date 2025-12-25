import { z } from "zod";

const htmlTagRegex = /<\/?[a-z][\w:-]*(?:\s+[^<>]*)?>/i;

const allowedCharsRegex = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9\s.,!?:;\-"']+$/;

const meaningfulContentRegex = /[a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9]/;

export const rejectionReasonSchema = z
  .string()
  .trim()
  .min(10, "Мінімум 10 символів")
  .max(500, "Максимальна довжина — 500 символів")
  .refine((val) => !htmlTagRegex.test(val), {
    message: "HTML-теги заборонені",
  })
  .refine((val) => allowedCharsRegex.test(val), {
    message:
      'Текст містить недозволені символи (дозволено лише літери, цифри та .,!?:;-")',
  })
  .refine((val) => meaningfulContentRegex.test(val), {
    message: "Текст не може складатися лише зі спецсимволів або пробілів",
  });
