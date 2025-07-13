function serverError(res, message, error) {
    console.error(message, error);
    return res.status(500).json({
        success: false,
        error: "server error",
    });
}

module.exports = {serverError};