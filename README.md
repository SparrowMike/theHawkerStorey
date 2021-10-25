# Dependencies and Installation Guide

### 1. Back-End

- cd theHawkerStorey
- touch .env (copy everything from .env.example)
- npm i express dotenv nodemon mongoose bcrypt express-session cors
- npm i cloudinary multer path cors
- npm i http-status-codes
- npm i jsonwebtoken

### 2. Front-End

- cd client
- npm install
- npm i react-router react-router-dom
- npm install @material-ui/core @material-ui/icons
- npm install @material-ui/lab
- npm install --save material-ui-dropzone
- npm i react-query
- npm i axios
- npm i cloudinary-react
- npm install react-stack-grid
- npm run start

### 3. GIT commands

#### Must Know GIT

- git branch <== to check branch
- git branch <branchName> <== to create new branch
- git checkout -b <newBranchName> <== simultaneously creates and checks out branch
- git checkout <branchName> <== to switch branch
- git add <fileYouWorkedOn> <== example ==> git add server.js
- git commit -m "you know what to do ^.^"
- git push <== then copy command provided in terminal
  OR
- git push -u origin <branchName>
- go to the link from terminal and create Pull request <==> starts with ==> "Create a pull request for...."

#### Usefull GIT commands

- git status
- git log
- git log --graph --oneline --all <== show tree-view log
- git diff <== show the difference
- git branch -d <branchName> <== delete branch locally

#### GIT merge instead of PULL

- git checkout master
- git merge <branchName>

#### GIT rebase (undo from a current featuer branch and reset to master)

- git checkout <experiment>
- git rebase master

- https://git-scm.com/book/en/v2/Git-Branching-Rebasing
- https://www.youtube.com/watch?v=aJnFGMclhU8

---

# Project Features

### Cloudinary Image Uploader

```
npm i cloudinary multer path
update .env file with your API keys:
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
CLOUDINARY_UPLOAD_PRESET (optional - preset for unsigned uploading)
```
