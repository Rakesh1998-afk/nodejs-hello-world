# nodejs-hello-world

A simple Node.js Hello World app with a Jenkins CI/CD pipeline.

## 🚀 Run Locally

```bash
npm start
# → Server running at http://localhost:3000/
```

## 🧪 Run Tests

```bash
npm test
```

## 📤 Push to GitHub

```bash
bash setup-github.sh <your-github-username>
```

## 🔧 Jenkins CI/CD Pipeline

The `Jenkinsfile` defines these stages:

| Stage | Description |
|---|---|
| **Checkout** | Pulls source code from GitHub |
| **Install Dependencies** | Runs `npm install` |
| **Run Tests** | Runs `npm test` |
| **Smoke Test** | Starts the app and hits the endpoint with `curl` |
| **Archive Artifacts** | Saves JS files and `package.json` |

### Jenkins Setup

1. Install the **NodeJS Plugin** in Jenkins
2. Go to **Manage Jenkins → Global Tool Configuration** → Add a NodeJS install named `NodeJS`
3. Create a **Pipeline** job → Pipeline script from SCM → Git
4. Enter your repo URL and set Script Path to `Jenkinsfile`
5. Click **Build Now** 🚀
