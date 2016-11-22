# ai-starter-typescript-web
* * *

###Instructions
####Create a new repository on github
####Replace new-project with repository name
####Run the following commands

    git clone --bare git@github.com:adinfinity/ai-starter-typescript-web
    cd ai-starter-typescript-web
    git push --mirror git@github.com:adinfinity/new-project.git
    cd ..
    git clone git@github.com:adinfinity/new-project.git
    cd new-project
    typings install dt~node --global --save
    typings install dt~jasmine --global --save
    typings install npm~assertion-error --save
    git remote set-url origin git@github.com:adinfinity/new-project.git
    npm install --save