package auth

import (
	"encoding/json"
	"log"
	"net/http"

	"golang.org/x/crypto/bcrypt"

	"github.com/darthsalad/univboard/internal/database"
	"github.com/darthsalad/univboard/pkg/models"
	"github.com/darthsalad/univboard/pkg/utils"
)

func RegisterUser(db *database.Database, w http.ResponseWriter, r *http.Request) error {
	var user models.User

	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		log.Fatalf("err decoding: %v", err)
		return err
	}

	exists, err := db.Query("SELECT * FROM users WHERE email = ?", user.Email)
	if err != nil {
		log.Fatalf("err querying: %v", err)
		return err
	}
	defer exists.Close()

	if exists.Next() {
		utils.JsonResp(w, http.StatusBadRequest, map[string]string{
			"error": "Email already exists!",
		})
		return nil
	}

	exists, err = db.Query(
		"SELECT * FROM users WHERE username = ?", user.Username,
	)
	if err != nil {
		log.Fatalf("err querying: %v", err)
		return err
	}
	defer exists.Close()

	if exists.Next() {
		utils.JsonResp(w, http.StatusBadRequest, map[string]string{
			"error": "Username already taken!",
		})
		return nil
	}

	hashedPass, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		log.Fatalf("err hashing password: %v", err)
		return err
	}
	user.Password = string(hashedPass)

	_, err = db.Exec(
		"INSERT INTO users (username, email, password) VALUES (?, ?, ?)", 
		user.Username, user.Email, user.Password,
	)
	if err != nil {
		log.Fatalf("err inserting: %v", err)
		return err
	}

	utils.JsonResp(w, http.StatusOK, map[string]any{
		"message": "Successfully created account", 
		"user": map[string]string{
			"username": user.Username,
			"email": user.Email,
			"created_at": user.CreatedAt.Local().Format("2006-01-02 15:04:05"),
		},
	})
	
	return nil
}
