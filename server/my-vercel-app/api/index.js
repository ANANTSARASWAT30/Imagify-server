exports.handler = async (req, res) => {
    try {
        // Process the request here
        const data = { message: "Hello from the serverless function!" };

        // Send the response
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "An error occurred" });
    }
};