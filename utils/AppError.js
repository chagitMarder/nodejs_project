class AppError extends Error{
    constructor(statusCode, message){
        SpeechRecognitionAlternative(message);
        this.statusCode = statusCode;
    }
};

module.exports = AppError;