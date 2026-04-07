# Stage 1: Build
FROM eclipse-temurin:17-jdk AS build
WORKDIR /app

COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline

COPY src ./src
RUN ./mvnw clean package -DskipTests

# Stage 2: Run
FROM eclipse-temurin:17-jre
WORKDIR /app

RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

RUN curl -Ls https://cli.doppler.com/install.sh | sh

COPY --from=build /app/target/*SNAPSHOT.jar app.jar
COPY startup.sh /app/startup.sh
RUN chmod +x /app/startup.sh

EXPOSE 8080

ENTRYPOINT ["doppler", "run", "--", "sh", "-c", "./startup.sh"]