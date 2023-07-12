#!/bin/bash
set -euxo pipefail

CA_DIR="ca"
CERTS_DIR="ca/certs"

if [ -f "$CERTS_DIR/ca_root.pem" ]; then
  echo "Root CA already exists."
else

  mkdir -p $CERTS_DIR

  # generate self-signed root ca
  cfssl genkey -initca $CA_DIR/ca_root.json | cfssljson -bare $CERTS_DIR/ca_root

  # generate intermediate ca
  cfssl genkey $CA_DIR/ca_basic.json | cfssljson -bare $CERTS_DIR/ca_basic
  cfssl sign -config $CA_DIR/config.json -profile ca -ca $CERTS_DIR/ca_root.pem -ca-key $CERTS_DIR/ca_root-key.pem $CERTS_DIR/ca_basic.csr | cfssljson -bare $CERTS_DIR/ca_basic

  # generate SSL Certificate
  cfssl genkey $CA_DIR/ssl.json | cfssljson -bare $CERTS_DIR/ssl
  cfssl sign -config $CA_DIR/config.json -profile server -ca $CERTS_DIR/ca_basic.pem -ca-key $CERTS_DIR/ca_basic-key.pem $CERTS_DIR/ssl.csr | cfssljson -bare $CERTS_DIR/ssl
fi

echo "Copying certs..."
# copy certificates to services
# nginx
cp $CERTS_DIR/ssl.pem apps/elb/ssl/ssl.crt.pem
cat $CERTS_DIR/ca_basic.pem >> apps/elb/ssl/ssl.crt.pem
cp $CERTS_DIR/ssl-key.pem apps/elb/ssl/ssl.key.pem
cp $CERTS_DIR/ca_root.pem apps/elb/ssl/ssl.client.pem
cat $CERTS_DIR/ca_basic.pem >> apps/elb/ssl/ssl.client.pem
chmod 644 apps/elb/ssl/*.pem
