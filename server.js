const express = require("express");
const bodyParser = require("body-parser");
const { Blockchain, Block } = require("./blockchain");

const app = express();
app.use(bodyParser.json());

const digitalIDChain = new Blockchain();

app.post("/register", (req, res) => {
	const { name, email, aadhar } = req.body;
	const newBlock = new Block(
		digitalIDChain.chain.length,
		Date.now(),
		{ name, email, aadhar }
	);
	digitalIDChain.addBlock(newBlock);

    res.json({ message: "Digital ID registered", chain: digitalIDChain });
});

app.get("/chain", (req, res) => {
    res.json(digitalIDChain);
});

app.listen(3000, () => console.log("🚀 Blockchain Digital ID running on port 3000"));
