import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

val queryDslVersion = "4.1.4"
val dotenvKotlinVersion = "6.2.2"

plugins {
    id("org.springframework.boot")
    id("io.spring.dependency-management")
    kotlin("jvm")
    kotlin("kapt")
    kotlin("plugin.spring")
    kotlin("plugin.jpa")
    id("idea")
}

idea {
    module {
        val kaptMain = file("build/generated/source/kapt/main")
        sourceDirs.add(kaptMain)
        generatedSourceDirs.add(kaptMain)
    }
}

group = "com.nbibik"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_11

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("mysql:mysql-connector-java")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("com.querydsl:querydsl-jpa:$queryDslVersion")
    kapt("com.querydsl:querydsl-apt:${queryDslVersion}:jpa")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    developmentOnly("org.springframework.boot:spring-boot-devtools")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    implementation("io.github.cdimascio:dotenv-kotlin:$dotenvKotlinVersion")
}

kapt {
    correctErrorTypes = true

    javacOptions {
        option("SomeJavacOption", "OptionValue")
    }

    arguments {
        arg("SomeKaptArgument", "ArgumentValue")
    }
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs = listOf("-Xjsr305=strict", "-Xjvm-default=enable")
        jvmTarget = "11"
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
}
