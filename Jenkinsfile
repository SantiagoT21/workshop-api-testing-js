pipeline {
  agent any

  tools { nodejs 'NodeJS' }
  stages{
    stage("Install dependencies") {
       steps {
          sh 'npm i'
       }
    }
    stage("Run API test") {
       steps {
          sh 'APP_BASE_URL=$APP_URL npm test'
       }
    }
    stage("Report in html") {
       steps {
          publishHTML([
                  allowMissing: false,
                  alwaysLinkToLastBuild: true,
                  keepAll: true,
                  reportDir: 'reports',
                  reportFiles: 'report.html',
                  reportName: 'API testing Report',
                  reportTitles: ''])
       }
    }
  }
}