const {MoleculerClientError} = require("moleculer").Errors;
const dbConnection = require("../mysql.config");

const services = {
    name: "auth",
    actions: {
        register: {
            async handler(ctx) {
                //
            },
        },
        login: {
            async handler(ctx) {
                const { email, password } = ctx.params;

                try {
                    const [rows] = await dbConnection.query(
                        "SELECT * FROM users where email = ?",
                        [email]
                    )

                    if (rows.length < 1) {
                        throw new MoleculerClientErrorl("Not Found!", 404, "NOT_FOUND")
                    } else {
                        return 
                    }
                } catch (error) {
                    
                }
            },
        },
    },
};
