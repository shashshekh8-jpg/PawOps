-- Core Operational Tables
CREATE TABLE animals (
    animal_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    species VARCHAR(50),
    breed VARCHAR(100),
    health_status VARCHAR(50),
    rescue_location TEXT,
    image_url TEXT,
    adoption_status VARCHAR(50) DEFAULT 'Available',
    adoption_probability INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE volunteers (
    volunteer_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password_hash TEXT,
    role VARCHAR(50) DEFAULT 'volunteer',
    rescues_handled INT DEFAULT 0
);

CREATE TABLE rescues (
    rescue_id SERIAL PRIMARY KEY,
    animal_id INT REFERENCES animals(animal_id),
    volunteer_id INT REFERENCES volunteers(volunteer_id),
    rescue_location TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Advanced Search Optimization [cite: 2, 3]
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX trgm_idx_animal_name ON animals USING gin (name gin_trgm_ops);
CREATE INDEX trgm_idx_animal_species ON animals USING gin (species gin_trgm_ops);

-- Operational Performance Indexes [cite: 1]
CREATE INDEX idx_rescues_volunteer ON rescues (volunteer_id);

