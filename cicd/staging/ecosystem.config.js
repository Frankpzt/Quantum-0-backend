module.exports = {
    apps: [
        {
            name: "quantum",
            script: "./src/index.js",
            // instances: 2,
            // exec_mode: "cluster",
            watch: true,
            // increment_var: 'PORT',
            env: {
                "PORT": 4000,
                "CONNECTION_STRING": "mongodb+srv://p3_prod_admin:p3_prod_admin@quantum-prod.avs4i.mongodb.net/test",
                "JWT_KEY": "secret",
                "NODE_ENV": "development"
            }
        }
    ]
}
