import { app } from "./app";


app.listen({ port: 3000, host: "0.0.0.0" }, () => {
	console.log("Server is running on port 3000")
});

app.get("/", (req, re) => re.send("Hello World"));
