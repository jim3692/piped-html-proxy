
> [!WARNING]
> # This repository will no longer receive any updates. Please use one of the following solutions:
> - https://github.com/JuniorJPDJ/piped-html-proxy
> - https://github.com/yurbash/piped-html-proxy-go
> - https://github.com/TeamPiped/piped-opengraph

This is an Express.js proxy for [TeamPiped/Piped](https://github.com/TeamPiped/Piped) that injects OpenGraph meta to the HTML body.

Twitter meta tags are also planned.

# Installation

## Docker

1. Build the image with `docker build -t piped-html-proxy .`

2. Start the container with
```
docker run -d \
    -e "API_HOST=https://pipedapi.kavin.rocks" \
    -e "FRONTEND_HOST=https://piped.kavin.rocks" \
    -p "3000:3000" \
    piped-html-proxy
```

3. Configure your reverse proxy to forward `/watch` URLs (ex. https://piped.kavin.rocks/watch?v=dQw4w9WgXcQ) to the `/watch` endpoint of this proxy.
