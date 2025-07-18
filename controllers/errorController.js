
const e404 = (req, res) => {
    res.status(404).json({code: 404, info: "Resource not found"});
}

const e500 = (req, res) => {
    res.status(500).json({code: 500, info: "Internal server error"});
}

export default {
    e404,
    e500
}