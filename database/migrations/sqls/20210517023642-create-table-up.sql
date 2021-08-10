CREATE TABLE vehicals.user (
    id text primary key,
    username text UNIQUE NOT NULL,
    email text UNIQUE NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    createAt date,
    updateAt date
);

CREATE TABLE vehicals.vehicle (
    id uuid DEFAULT uuid_generate_v4() primary key,
    v_id text, 
    first_Name text NOT NULL,
    last_Name text NOT NULL,
    email text NOT NULL,
    car_make text,
    car_model text,
    vin_number text,
    manufactured_date date,
    age_of_vehicle text,
    created_at date,
    updated_at date

);