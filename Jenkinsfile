pipeline {
    agent any

    tools {
        nodejs 'NodeJS' // Must match the name configured in Jenkins > Global Tool Configuration
    }

    environment {
        APP_PORT = '3000'
    }

    stages {

        stage('Checkout') {
            steps {
                echo '📥 Checking out source code...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '📦 Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                echo '🧪 Running tests...'
                sh 'npm test'
            }
        }

        stage('Start App (Smoke Test)') {
            steps {
                echo '🚀 Starting app for smoke test...'
                sh '''
                    node app.js &
                    sleep 3
                    curl -f http://localhost:${APP_PORT}/ || exit 1
                    echo "✅ App responded with Hello, World!"
                    kill $(lsof -t -i:${APP_PORT}) || true
                '''
            }
        }

        stage('Archive Artifacts') {
            steps {
                echo '📦 Archiving project files...'
                archiveArtifacts artifacts: '**/*.js, package.json', fingerprint: true
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed. Check the logs above.'
        }
        always {
            echo '🧹 Cleaning up workspace...'
            cleanWs()
        }
    }
}
