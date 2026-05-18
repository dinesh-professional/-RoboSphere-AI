package models

import "time"

// Robot represents a robotics unit in the PostgreSQL database
type Robot struct {
	ID        string    `json:"id" gorm:"primaryKey"`
	Name      string    `json:"name"`
	Model     string    `json:"model"`
	Status    string    `json:"status"`
	Battery   int       `json:"battery"`
	Location  string    `json:"location"` // E.g., GeoJSON or Lat/Lng string
	CreatedAt time.Time `json:"created_at"`
}

// Telemetry represents a single data point recorded from a robot's sensors
type Telemetry struct {
	ID          string    `json:"id" gorm:"primaryKey"`
	RobotID     string    `json:"robot_id"`
	Temperature float64   `json:"temperature"`
	Speed       float64   `json:"speed"`
	Battery     int       `json:"battery"`
	Timestamp   time.Time `json:"timestamp"`
}
