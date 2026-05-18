FROM golang:1.21-alpine

WORKDIR /app
# Download dependencies
COPY go.mod ./
RUN go mod tidy

# Build the application
COPY . .
RUN go build -o main .

EXPOSE 8080
CMD ["./main"]
