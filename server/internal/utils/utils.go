package utils

import (
	"encoding/json"
	"errors"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/darthsalad/univboard/pkg/models"
	jwt "github.com/golang-jwt/jwt/v5"
)

func JsonResp(w http.ResponseWriter, status int, data any) error {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	return json.NewEncoder(w).Encode(data)
}

func CreateToken(user *models.User) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)

	claims["exp"] = time.Now().Add(time.Hour * 24 * 15).Unix()
	claims["user_id"] = user.ID
	claims["username"] = user.Username
	claims["email"] = user.Email

	secretKey := os.Getenv("JWT_SECRET")

	signedStr, err := token.SignedString([]byte(secretKey))
	if err != nil {
		return "", err
	}

	return signedStr, nil
}

func VerifyToken(tokenStr string) (*jwt.Token, error) {
	secretKey := os.Getenv("JWT_SECRET")

	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		return []byte(secretKey), nil
	})
	if err != nil {
		return nil, err
	}

	return token, nil
}

func ExtractToken(r *http.Request) (string, error) {
	bearerToken := r.Header.Get("Authorization")
	bearerToken = strings.Split(bearerToken, "Bearer ")[1]
	if bearerToken == "" {
		return "", errors.New("err: No Token Provided")
	}

	return bearerToken, nil
}
