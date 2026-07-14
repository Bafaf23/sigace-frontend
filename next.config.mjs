import { readFileSync } from "fs";
import { join } from "path";

const packageJson = JSON.parse(
  readFileSync(join(process.cwd(), "package.json"), "utf8"),
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  env: {
    NEXT_PUBLIC_APP_VERSION: packageJson.version,
  },
};

export default nextConfig;
