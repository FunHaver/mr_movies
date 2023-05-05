#!/bin/bash
set -e
INSTALL_DIR=/opt/mr_movies
IS_UPDATE=1

if ! command -v node &> /dev/null
then
    echo "node could not be found"
    exit 2
fi

if ! command -v npm &> /dev/null
then
    echo "npm could not be found"
    exit 2
fi

if [[ $UID != 0 ]]; then
    echo "Please run this script with sudo"
    exit 1
fi

if ! [ -f "$INSTALL_DIR" ] ; then
    mkdir "$INSTALL_DIR"

    else
        IS_UPDATE=0
fi

# Ask user if they want to update or install fresh
if [[ $IS_UPDATE == 0 ]] ; then
    echo "Looks like $INSTALL_DIR already exists."
    read -p "Start update mode? (y/n): " update_mode
    
    if ! [[ $update_mode == [yY] ]]; then
        IS_UPDATE=1
        
        else 
            echo "Starting update"
    fi
fi

if [[ $IS_UPDATE == 0 ]] ; then
    echo "Pulling down latest files..."
    git pull
    
    echo "Copying program files"
    cp *.js "$INSTALL_DIR"/
    cp *.json "$INSTALL_DIR"/
    cp README.md "$INSTALL_DIR"/

    echo "diffing systemd unit file"
    diff mr_movies.service /etc/systemd/system/mr_movies.service
    DIFF_EXIT_CODE=$?
    if [[ $DIFF_EXIT_CODE == 0 ]]; then
        echo "systemd unit files are identical"

        else
            echo "installing new mr_movies.service file"
            cp mr_movies.service /etc/systemd/system/mr_movies.service
            systemctl daemon-reload
            systemctl restart mr_movies.service
    fi

    echo "Updating npm dependenices"
    cd $INSTALL_DIR
    npm i

    echo "Update complete."
fi

if ! [[ $IS_UPDATE == 0 ]]; then
    echo  "--------------------"
    echo "|                    |"
    echo "|     What do you    |"
    echo "|   want? I'm busy!  |"
    echo "|     -Mr. Movies    |"
    echo "|                    |"
    echo  "--------------------"   

    echo "Creating installation directory"
    mkdir "$INSTALL_DIR"

    read -sp "Discord Token: " DISCORD_TOKEN
    read -sp "OpenAI Key: " OPENAI_KEY

    echo "Copying program files"
    cp *.js "$INSTALL_DIR"/
    cp *.json "$INSTALL_DIR"/
    cp README.md "$INSTALL_DIR"/

    echo "Creating .env file"
    touch "$INSTALL_DIR"/.env
    printf "DISCORD_TOKEN=$DISCORD_TOKEN\n" >> "$INSTALL_DIR"/.env
    printf "OPENAI_KEY=$OPENAI_KEY" >> "$INSTALL_DIR"/.env

    echo "Installing systemd unit file"
    cp mr_movies.service /etc/systemd/system/mr_movies.service
    systemctl daemon-reload

    read -p "Start mr_movies.service on startup? (y/n): " STARTUP_PROGRAM

    if [[ $STARTUP_PROGRAM == [yY] ]]; then
        echo "Enabling mr_movies.service on startup"
        systemctl enable mr_movies
    fi

    echo "Installing npm dependenices"
    cd $INSTALL_DIR
    npm i
fi

echo "Starting Mr. Will Movies..."
systemctl start mr_movies.service

exit 0