import { withPayload } from "@payloadcms/next/withPayload";
import { withPayload } from "@payloadcms/next/withPayload";
import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: "placehold.co" },
      { hostname: "localhost" },
      { hostname: "avatar.iran.liara.run" },
      {
        protocol: "https",
        hostname: `rk3noxxioh.ufs.sh`,
        pathname: "/f/*",
      },
    ],
  },
};

export default withPayload(withPayload(withPayload(nextConfig)));
