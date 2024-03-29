# Local-Community-Backend-V2 [![CircleCI](https://dl.circleci.com/status-badge/img/gh/YeongT/local-community-backend-v2/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/YeongT/local-community-backend-v2/tree/master)
This repository is a **spring-boot project** refactored version of the **local-community-backend** project that was previously written in Node.JS. The goal of this project is to capture many of the flaws found in existing JavaScript through powerful system design of Spring-Boot.

# Server Address List
| BRANCH     | ADDRESS                         | LOCATION    | STATUS                                                                                                                                                                                                      |
|------------|---------------------------------|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| production | `https://api.kanduit.live/`     | KR - AZURE  | ![Website](https://img.shields.io/website?down_color=red&down_message=OFFLINE&label=RELEASE%20API&style=for-the-badge&up_color=lightgreen&up_message=ONLINE&url=https%3A%2F%2Fapi.kanduit.live%2Fstatus)    |
| master     | `https://api-bak.kanduit.live/` | US - HEROKU | ![Website](https://img.shields.io/website?down_color=red&down_message=OFFLINE&label=BACKUP%20API&style=for-the-badge&up_color=lightgreen&up_message=ONLINE&url=https%3A%2F%2Fapi-bak.kanduit.live%2Fstatus) |

# API Documentation
You can find `swagger` api document page [Here](https://api.kanduit.live/docs).

# Dependencies
- JDK : `JDK 17`
- BuildTool : `Gradle(Kotlin) v7.6.1`

| ESSENTIAL | DEPENDENCY NAME                   | VERSION |
|-----------|-----------------------------------|---------|
| *         | `org.springframework.boot`        | `3.0.4` |
| *         | `io.spring.dependency-management` | `1.1.0` |
 
