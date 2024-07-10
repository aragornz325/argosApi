-- Create Database if not exists argos_db;

SELECT 'CREATE DATABASE IF NOT EXISTS argos_db;'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'argos_db')\gexecDOCKER;