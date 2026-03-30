pipeline {
    agent any
    tools {
        nodejs 'NodeJS'
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t raaki1234/nodejs-hello-world:latest .'
            }
        }
        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker push raaki1234/nodejs-hello-world:latest
                        docker logout
                    '''
                }
            }
        }
        stage('Deploy') {
            steps {
                sh '''
                    docker stop nodejs-hello-world || true
                    docker rm nodejs-hello-world || true
                    docker run -d --name nodejs-hello-world -p 3000:3000 --restart unless-stopped raaki1234/nodejs-hello-world:latest
                '''
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
    }
    post {
        always {
            sh 'docker image prune -f'
            sh 'docker stop nodejs-hello-world || true'
        }
    }
}
