# Stage 1: Build the Spring Boot app using Maven
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean install -DskipTests

# Stage 2: Run the built app
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/gymmanagement-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
CMD java -jar app.jar --server.port=$PORT
