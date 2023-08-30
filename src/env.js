import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const env = createEnv({
  client: {
    NEXT_PUBLIC_SITE_URL: z.string().url()
  },
  server: {},
  runtimeEnv: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL
  }
});

export default env;
