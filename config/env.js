const env = process.env.NODE_ENV || "development";

let port;

if (env === "production") {
	port = "27020";
} else {
	port = "27017";
}

module.exports = {
	env: env,
	port: port,
};
