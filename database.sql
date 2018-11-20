  CREATE TABLE users ( 
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password text NOT NULL
  );

  CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    rating integer NOT NULL,
    handedness VARCHAR(100) NOT NULL, 
    created_by integer REFERENCES ping_pong_players.users(id) ON DELETE CASCADE NOT NULL
  );
