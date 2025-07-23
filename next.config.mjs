/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:"https",
                hostname:"randomuser.me"
            }
        ]

        
    },
    experimental:{
        serverAction:{
            bodySizeLimit:"5mb",
        }
    }
};

export default nextConfig;
