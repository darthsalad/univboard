package database

import (
	"database/sql"
	"errors"

	"github.com/darthsalad/univboard/internal/logger"
	"github.com/darthsalad/univboard/pkg/models"
	_ "github.com/go-sql-driver/mysql"
)

type Database struct {
	*sql.DB
}

func (db *Database) Init() error {
	_, err := db.Exec(
		`CREATE TABLE IF NOT EXISTS users (
			id CHAR(36) NOT NULL DEFAULT (UUID()) PRIMARY KEY,
			username VARCHAR(255) NOT NULL UNIQUE,
			password VARCHAR(255) NOT NULL,
			email VARCHAR(255) NOT NULL UNIQUE,
			created_at DATETIME NOT NULL DEFAULT (NOW()),
			updated_at DATETIME NOT NULL DEFAULT (NOW())
		)`,
	)
	if err != nil {
		logger.Logf("err creating table: %v", err)
		return err
	}

	return nil
}

func Connect(uriString string) (*Database, error) {
	db, err := sql.Open("mysql", uriString)
	if err != nil {
			logger.Fatalf("failed to connect: %v", err)
			return nil, err
	}

	if err := db.Ping(); err != nil {
			logger.Fatalf("failed to ping: %v", err)
			return nil, err
	}

	logger.Logln("Successfully connected to PlanetScale DB!")

	return &Database{db}, nil
}

func (db *Database) Register(user *models.User) error {
	exists, err := db.Query("SELECT * FROM users WHERE email = ?", user.Email)
	if err != nil {
		logger.Logf("err querying: %v", err)
		return err
	}
	defer exists.Close()

	if exists.Next() {
		logger.Logf("err querying: %v", err)
		err = errors.New("err: Email already exists")
		return err
	}

	exists, err = db.Query(
		"SELECT * FROM users WHERE username = ?", user.Username,
	)
	if err != nil {
		logger.Logf("err querying: %v", err)
		return err
	}
	defer exists.Close()

	if exists.Next() {
		logger.Logf("err querying: %v", err)
		err = errors.New("err: Username already exists")
		return err
	}
	
	_, err = db.Exec(
		"INSERT INTO users (username, password, email, created_at, updated_at) VALUES (?, ?, ?, ?, ?)",
		user.Username, user.Password, user.Email, user.CreatedAt, user.UpdatedAt,
	)

	if err != nil {
		logger.Logf("err inserting: %v", err)
		err = errors.New("err: Error inserting into database")
		return err
	}

	return nil
}