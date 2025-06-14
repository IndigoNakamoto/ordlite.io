# NGINX config 

server {
    server_name Litecoin-Ordinals-Explorer www.Litecoin-Ordinals-Explorer;

    location / {
        proxy_pass http://localhost:3000; # Assuming your Next.js app runs on port 3000
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/Litecoin-Ordinals-Explorer/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/Litecoin-Ordinals-Explorer/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot


}
server {
    if ($host = www.Litecoin-Ordinals-Explorer) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    if ($host = Litecoin-Ordinals-Explorer) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen 80;
    server_name Litecoin-Ordinals-Explorer www.Litecoin-Ordinals-Explorer;
    return 404; # managed by Certbot




}
server {
    listen 8080;
    server_name Litecoin-Ordinals-Explorer www.Litecoin-Ordinals-Explorer;

    location / {
        proxy_pass http://localhost:3000; # Your Next.js application
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Your SSL configurations for HTTPS will remain in the server block that listens on 443
}
