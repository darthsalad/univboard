package main

import (
	"context"
	"time"
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/darthsalad/univboard/internal/database"
	"github.com/darthsalad/univboard/internal/server"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
			log.Fatalf("err loading: %v", err)
	}

	db, err := database.Connect(os.Getenv("DSN"))
	if err != nil {
		log.Fatalf("err connecting: %v", err)
	}

	defer db.Close()

	server := server.CreateServer(db)

	go func() {
		if err := server.Start("localhost:8000"); err != nil {
			log.Fatalf("err starting server: %v", err)
		}
	}()

	log.Println("HTTP Server started on port 8000!")

	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)
	<-c

	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	if err := server.Stop(ctx); err != nil {
		log.Fatalf("err stopping server: %v", err)
	}

	// result, err := db.Query("SELECT * FROM users")
	// if err != nil {
	// 	log.Fatalf("err querying: %v", err)
	// }

	// defer result.Close()

	// for result.Next() {
	// 	var id string
	// 	var username string
	// 	var password string

	// 	err := result.Scan(&id, &username, &password)
	// 	if err != nil {
	// 		log.Fatalf("err scanning: %v", err)
	// 	}

	// 	fmt.Println(id, username, password)
	// }
}