import validator from 'validator';
import { z } from 'zod';

const NO_FTP_REGEX = /^((?!ftp).)*$/i;
const NO_HTTP_REGEX = /^((?!http).)*$/i;
const SAFE_CHARACTERS_REGEX =
  /^[\w !&()+,./:@`|£À-ÿāăąćĉċčđēėęěĝğģĥħĩīįİıĵķĸĺļłńņōőœŗřśŝşšţŦũūŭůűųŵŷźżžơưếệ–-]*$/i;

export const zod = {
  ...z,

  dateString: () =>
    zod.string().refine((value) => !Number.isNaN(Date.parse(value))),

  safeString: () =>
    zod
      .string()
      .regex(SAFE_CHARACTERS_REGEX)
      .regex(NO_HTTP_REGEX)
      .regex(NO_FTP_REGEX),

  safeText: () => zod.string().regex(NO_HTTP_REGEX).regex(NO_FTP_REGEX),

  uuid: () =>
    zod
      .string()
      .length(36)
      .refine((value) => validator.isUUID(value, 'all')),

  uuidv4: () =>
    zod
      .string()
      .length(36)
      .refine((value) => validator.isUUID(value, '4')),

  email: () =>
    zod
      .string()
      .email()
      .max(255)
      .refine((value) =>
        validator.isEmail(value, {
          allow_display_name: false,
          require_display_name: false,
          allow_utf8_local_part: true,
          require_tld: true,
          allow_ip_domain: false,
          // @ts-ignore: double escape  as this is passed into new RegExp("[${blacklisted_chars}]")
          blacklisted_chars: "=',\\\\",
        })
      ),

  strongPassword: () => zod.string().min(5),
};
