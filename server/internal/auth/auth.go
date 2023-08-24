package auth

import (
	"encoding/json"
	"net/http"

	"golang.org/x/crypto/bcrypt"

	"github.com/darthsalad/univboard/internal/logger"
	"github.com/darthsalad/univboard/pkg/database"
	"github.com/darthsalad/univboard/pkg/models"
	"github.com/darthsalad/univboard/internal/utils"
)

func RegisterUser(db *database.Database, w http.ResponseWriter, r *http.Request) error {
	user := models.User{}

	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		logger.Fatalf("err decoding: %v", err)
		return err
	}

	hashedPass, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		logger.Fatalf("err hashing password: %v", err)
		return err
	}
	user = *models.NewUser(user.Username, user.Email, string(hashedPass))

	if err = db.Register(&user); err != nil {
		logger.Logf("err registering: %v", err)
		utils.JsonResp(w, http.StatusInternalServerError, map[string]any{
			"error": map[string]any{
				"message": err.Error(),
				"status_code": http.StatusInternalServerError,
			},
		})
		return nil
	}

	err = utils.JsonResp(w, http.StatusOK, map[string]any{
		"message": "Successfully created account", 
		"user": map[string]string{
			"username": user.Username,
			"email": user.Email,
			"created_at": user.CreatedAt,
		},
	})
	if err != nil {
		logger.Logf("err responding: %v", err)
		return err
	}
	
	return nil
}
