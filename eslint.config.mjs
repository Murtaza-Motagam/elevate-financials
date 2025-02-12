import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // 👇 Add this section to ignore Next.js build & node_modules
  {
    ignores: ['node_modules/', '.next/', 'dist/', 'src/components/ui/', 'tailwind.config.ts'],
  },
];

export default eslintConfig;
