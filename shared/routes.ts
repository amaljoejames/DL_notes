import { z } from 'zod';
import { insertUnitSchema, insertTopicSchema, units, topics } from './schema';

export const errorSchemas = {
  notFound: z.object({
    message: z.string(),
  }),
};

export const api = {
  units: {
    list: {
      method: 'GET' as const,
      path: '/api/units',
      responses: {
        200: z.array(z.custom<typeof units.$inferSelect & { topics: typeof topics.$inferSelect[] }>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/units/:id',
      responses: {
        200: z.custom<typeof units.$inferSelect & { topics: typeof topics.$inferSelect[] }>(),
        404: errorSchemas.notFound,
      },
    },
  },
  topics: {
    get: {
      method: 'GET' as const,
      path: '/api/topics/:id',
      responses: {
        200: z.custom<typeof topics.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
