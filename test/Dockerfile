FROM php:8.2.12-cli

RUN apt-get update -y && apt-get install -y libzip-dev zlib1g-dev git curl npm unzip \
    && docker-php-ext-install pdo pdo_mysql sockets zip

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /app

COPY . .

ENV APP_URL=http://localhost:5174
ENV DB_CONNECTION=mysql
ENV DB_HOST=178.18.250.209
ENV DB_PORT=3306
ENV DB_DATABASE=anapec_bdc
ENV DB_USERNAME=root
RUN composer install --no-dev --optimize-autoloader

EXPOSE 8058
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8058"]


