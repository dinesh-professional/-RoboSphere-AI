package handlers

import (
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true // Allow all origins for development
	},
}

// ServeWSTelemetry upgrades the HTTP connection to a WebSocket and streams telemetry data
func ServeWSTelemetry(c *gin.Context) {
	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Println("WebSocket Upgrade Error:", err)
		return
	}
	defer conn.Close()

	log.Println("Client connected to telemetry stream")

	for {
		// Mock telemetry payload representing a live robot sensor reading
		telemetry := map[string]interface{}{
			"unit_id":     "UNIT_X99",
			"battery":     89,
			"temperature": 42.5,
			"status":      "Active",
			"timestamp":   time.Now().Unix(),
		}

		// Push the data to the client
		err := conn.WriteJSON(telemetry)
		if err != nil {
			log.Println("Client disconnected:", err)
			break
		}

		time.Sleep(2 * time.Second) // Broadcast every 2 seconds
	}
}
