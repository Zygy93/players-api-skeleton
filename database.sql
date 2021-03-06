  CREATE TABLE users ( 
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(300) NOT NULL,
    last_name VARCHAR(300) NOT NULL,
    email VARCHAR(300) NOT NULL,
    password text NOT NULL
  );

  CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(300) NOT NULL,
    last_name VARCHAR(300) NOT NULL,
    rating integer NOT NULL,
    handedness VARCHAR(300) NOT NULL, 
    created_by integer REFERENCES users(id) ON DELETE CASCADE NOT NULL
  );
