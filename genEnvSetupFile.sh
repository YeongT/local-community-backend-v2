#!/bin/bash
chmod +x genEnvSetupFile.sh

cat <<EOF > __generated_environment.js
'use strict';

module.exports = {
    apps: [
        {
            name: "Local-Community-Env",
            script: "./build/",
            watch: true,
            env: {
                "NODE_ENV": "development"
            },
            env_production: {
                "NODE_ENV": "production",
                "DO_NOT_USE_ENV_FILE": "$1",
                "PORT": "$2",
                "DB_HOST": "$3",
                "DB_NAME": "$4",
                "DB_USER_ID": "$5",
                "DB_USER_PW": "$6",
            }
        }
    ]
};
EOF