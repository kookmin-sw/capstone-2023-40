FROM adoptopenjdk/openjdk11 AS builder

WORKDIR /usr/src/api
COPY . ./
RUN chmod +x gradlew && \
    ./gradlew clean build -Pprofile=local -x test

FROM adoptopenjdk/openjdk11 AS runner

WORKDIR /usr/src/api
COPY --from=builder /usr/src/api/build/libs/*.jar app.jar
CMD java -jar -Dspring.profiles.active=local app.jar
