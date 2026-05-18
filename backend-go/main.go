package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/username/robosphere/backend/handlers"
)

func main() {
	r := gin.Default()

	// CORS Middleware (allows frontend to connect)
	r.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	// Health Check Route
	r.GET("/api/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status": "System Online", 
			"service": "RoboSphere API",
			"version": "1.0.0",
		})
	})

	// WebSockets for Live Telemetry streaming
	r.GET("/ws/telemetry", handlers.ServeWSTelemetry)

	log.Println("🚀 Starting RoboSphere API on port 8080...")
	if err := r.Run(":8080"); err != nil {
		log.Fatal("Server failed to start:", err)
	}
}
