pipeline {
    agent any
    tools { nodejs 'NodeJS' }
    environment {
        APP_PORT       = '3000'
        DOCKER_IMAGE   = 'raaki1234/nodejs-hello-world'
        DOCKER_TAG     = 'latest'
        CONTAINER_NAME = 'nodejs-hello-world'
    }
    stages {
        stage('Checkout')            { steps { checkout scm } }
        stage('Install')             { steps { sh 'npm install' } }
        stage('Test')                { steps { sh 'npm test' } }
        stage('Build Docker Image')  { steps { sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ." } }
        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
                    sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                    sh 'docker logout'
                }
            }
        }
        stage('Deploy') {
            steps {
                sh "docker stop ${CONTAINER_NAME} || true"
                sh "docker rm   ${CONTAINER_NAME} || true"
                sh "docker run -d --name ${CONTAINER_NAME} -p ${APP_PORT}:3000 --restart unless-stopped ${DOCKER_IMAGE}:${DOCKER_TAG}"
            }
        }
        stage('Smoke Test') {
    steps {
        sh '''
            sleep 5
            WINDOWS_HOST=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2}')
            echo "Testing against Windows host: $WINDOWS_HOST"
            curl -f http://$WINDOWS_HOST:3000/
        '''
    }
}
    post {
        success { echo '✅ App is live at http://localhost:3000' }
        failure { sh "docker stop ${CONTAINER_NAME} || true" }
        always  { sh 'docker image prune -f || true' }
    }
}
