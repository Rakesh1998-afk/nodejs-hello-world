#!/bin/bash
# ============================================================
# setup-github.sh — Initialize and push to GitHub
# Usage: bash setup-github.sh <your-github-username>
# ============================================================

set -e

GITHUB_USERNAME=${1:-"YOUR_GITHUB_USERNAME"}
REPO_NAME="nodejs-hello-world"
REMOTE_URL="https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"

echo ""
echo "🔧 Setting up Git and pushing to GitHub..."
echo "   Repo: ${REMOTE_URL}"
echo ""

# Initialize git
git init
git add .
git commit -m "Initial commit: Node.js Hello World with Jenkinsfile"

# Set branch to main
git branch -M main

# Add remote and push
git remote add origin "${REMOTE_URL}"

echo ""
echo "🔐 You will be prompted for your GitHub credentials."
echo "   Use a Personal Access Token (PAT) as the password."
echo "   Generate one at: https://github.com/settings/tokens"
echo ""

git push -u origin main

echo ""
echo "✅ Successfully pushed to: ${REMOTE_URL}"
echo ""
echo "📋 Next Steps — Set up Jenkins Pipeline:"
echo "   1. Install 'NodeJS Plugin' in Jenkins"
echo "   2. Go to: Manage Jenkins > Global Tool Configuration"
echo "      → Add NodeJS installation named 'NodeJS'"
echo "   3. Create a new Pipeline job in Jenkins"
echo "   4. Under 'Pipeline', select 'Pipeline script from SCM'"
echo "   5. Set SCM to Git and enter your repo URL:"
echo "      ${REMOTE_URL}"
echo "   6. Set Script Path to: Jenkinsfile"
echo "   7. Save and click 'Build Now' 🚀"
