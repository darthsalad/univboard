package server

import (
	"context"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/darthsalad/univboard/internal/database"
	"github.com/darthsalad/univboard/internal/routes"
)

type Server struct {
	Router *mux.Router
	DB     *database.Database
	server *http.Server
}

func CreateServer(db *database.Database) *Server {
	server := &Server{
		Router: mux.NewRouter(),
		DB:     db,
		server: &http.Server{},
	}
	routes.CreateRoutes(server.Router)
	return server
}

func (s *Server) Start(address string) error {
	s.server.Addr = address
	s.server.Handler = s.Router
	return s.server.ListenAndServe()
}

// Function for defining routes
// func (s *Server) routes() {
// 	s.Router.HandleFunc("/", s.handleIndex()).Methods("GET")
// 	s.Router.HandleFunc("/users", s.handleUsers()).Methods("GET")
// 	s.Router.HandleFunc("/users/{id}", s.handleUser()).Methods("GET")
// 	s.Router.HandleFunc("/users", s.handleCreateUser()).Methods("POST")
// 	s.Router.HandleFunc("/users/{id}", s.handleUpdateUser()).Methods("PUT")
// 	s.Router.HandleFunc("/users/{id}", s.handleDeleteUser()).Methods("DELETE")
// }

// Function for stopping the server
func (s *Server) Stop(ctx context.Context) error {
	s.DB.Close()
	return s.server.Shutdown(ctx)
}
	