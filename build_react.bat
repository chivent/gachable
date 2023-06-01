
@ECHO OFF

:: Used to push compile react build into the Phoenix's static folder
set priv_path="./priv/static/app"

cd ./frontend

ECHO ===== Installing npm packages =====
call npm install --quiet

ECHO ===== Compiling React Front-End =====
call npm run build 

ECHO ===== Moving build to Phoenix at %priv_path% =====
cd ..
if exist %priv_path% rmdir /q /s %priv_path%
xcopy "./frontend/build" %priv_path% /E/H/I

ECHO ===== React Frontend Ready =====