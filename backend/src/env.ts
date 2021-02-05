import fs from 'fs';
import path from 'path';

import dotenv from 'dotenv';

['.env.local', '.env'].forEach((dotenvFile) => {
  const resolved = path.resolve(dotenvFile);

  if (fs.existsSync(resolved)) {
    dotenv.config({ path: resolved });
  }
});
