# Utiliser une image PHP officielle avec Composer et CLI
FROM php:8.2.12-cli

# Installer les dépendances système nécessaires
RUN apt-get update -y && apt-get install -y libzip-dev zlib1g-dev git curl npm unzip \
    && docker-php-ext-install pdo pdo_mysql sockets zip

# Installer Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Configurer le répertoire de travail
WORKDIR /app

# Copier le projet dans le conteneur
COPY . .

#Variables d'environnement et URL des services:
# ENV APP_URL=https://bdc-front.advanced-software.ma
ENV APP_URL=http://localhost:5174
ENV DB_CONNECTION=mysql
ENV DB_HOST=178.18.250.209
ENV DB_PORT=3306
ENV DB_DATABASE=anapec_bdc
ENV DB_USERNAME=root
# ENV DB_PASSWORD=12345@aA

# Installer les dépendances PHP
RUN composer install --no-dev --optimize-autoloader

# Exposer le port 8055 pour Laravel
EXPOSE 8058
# Exposer le port 80 pour Nginx
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8058"]


