package server

import (
	"net/http"

	"github.com/darthsalad/univboard/internal/auth"
	"github.com/darthsalad/univboard/internal/utils"
	"github.com/darthsalad/univboard/pkg/database"
	"github.com/gorilla/mux"
)

type apiFunc func(w http.ResponseWriter, r *http.Request) error
type apiDBFunc func(db *database.Database, w http.ResponseWriter, r *http.Request) error

func wrapperDB(f apiDBFunc, db *database.Database) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if err := f(db, w, r); err != nil {
			utils.JsonResp(w, http.StatusInternalServerError, map[string]any{
				"error": err.Error(),
			})
		}
	}
}

func wrapper(f apiFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if err := f(w, r); err != nil {
			utils.JsonResp(w, http.StatusInternalServerError, map[string]any{
				"error": err.Error(),
			})
		}
	}
}

func CreateRoutes(s *mux.Router, db *database.Database) {
	s.HandleFunc("/", wrapper(func(w http.ResponseWriter, r *http.Request) error {
		w.Write([]byte("Welcome to UnivBoard! Check out the API docs for more info."))
		return nil
	})).Methods("GET")

	s.HandleFunc("/test", wrapper(func(w http.ResponseWriter, r *http.Request) error {
		w.Write([]byte("Test"))
		return nil
	})).Methods("GET")

	s.HandleFunc("/register", wrapperDB(auth.RegisterUser, db)).Methods("POST")
	s.HandleFunc("/login", wrapperDB(auth.LoginUser, db)).Methods("POST")
}
