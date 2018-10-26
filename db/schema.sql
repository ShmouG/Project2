DROP TABLE IF EXISTS myBidet;

CREATE TABLE users(
user_id serial primary key,
email text unique,
password_digest text
);

CREATE TABLE myBidet(
  mybidet_id          SERIAL PRIMARY KEY,
  user_id             integer REFERENCES users(user_id),
  Name                VARCHAR NOT NULL,
  Location            VARCHAR,
  Latitude            NUMERIC NOT NULL,
  Longitude           NUMERIC NOT NULL,
  Comments            VARCHAR,
);