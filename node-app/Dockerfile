FROM node:8.8

RUN useradd --create-home --shell /bin/false app

ADD . /var/www/html

ENV HOME=/var/www/html

RUN cd $HOME && chown -R app:app $HOME

USER app

WORKDIR $HOME

RUN npm install --silent && npm cache clear --force

EXPOSE 3000

COPY start.sh /var/www/html/start.sh

CMD ["/var/www/html/start.sh"]
 