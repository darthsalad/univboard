package database

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
	
)

type Database struct {
	*sql.DB
}

func Connect(uriString string) (*Database, error) {
	db, err := sql.Open("mysql", uriString)
	if err != nil {
			log.Fatalf("failed to connect: %v", err)
			return nil, err
	}

	if err := db.Ping(); err != nil {
			log.Fatalf("failed to ping: %v", err)
			return nil, err
	}

	log.Println("Successfully connected to PlanetScale DB!")

	return &Database{db}, nil
}