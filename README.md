# To use this starter project

git clone --bare git@github.com:adinfinity/ai-starter-typescript-web
cd ai-starter-typescript-web
git push --mirror git@github.com:adinfinity/new-project.git
git clone git@github.com:adinfinity/new-project.git new-project
cd new-project
typings install dt~node --global --save
typings install dt~jasmine --global --save
typings install npm~assertion-error --save
npm update --save