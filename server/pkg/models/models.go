package models

import "time"

type User struct {
	ID 				string    `json:"id"`					
	Username 	string    `json:"username"`		
	Password 	string    `json:"password"`
	Email 		string    `json:"email"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type Device struct {
	ID 				string    `json:"id"`
	UserID 		string    `json:"user_id"`
	Name 			string    `json:"name"`
	OS 				string    `json:"os"`
	OSVersion string    `json:"os_version"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type Push struct {
	ID 				string    `json:"id"`
	UserID 		string    `json:"user_id"`
	DeviceID 	string    `json:"device_id"`
	Type 			string    `json:"type"`
	Content 	string    `json:"content"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func NewUser(username, email, password string) (user *User) {
	user.Username = username
	user.Email = email
	user.Password = password
	user.CreatedAt = time.Now()
	user.UpdatedAt = time.Now()
	return user
}

func NewDevice(userID, name, os, osVersion string) (d *Device) {
	d.UserID = userID
	d.Name = name
	d.OS = os
	d.OSVersion = osVersion
	d.CreatedAt = time.Now()
	d.UpdatedAt = time.Now()
	return d
}

func NewPush(userID, deviceID, pushType, content string) (p *Push) {
	p.UserID = userID
	p.DeviceID = deviceID
	p.Type = pushType
	p.Content = content
	p.CreatedAt = time.Now()
	p.UpdatedAt = time.Now()
	return p
}