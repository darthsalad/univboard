package routes

import (
	"net/http"

	"github.com/gorilla/mux"
)

func CreateRoutes(s *mux.Router) {
	s.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Welcome to UnivBoard! Check out the API docs for more info."))
	}).Methods("GET")

	s.HandleFunc("/test", func(w http.ResponseWriter, r *http.Request) { 
		w.Write([]byte("Hello, World!"))
	}).Methods("GET")
}
