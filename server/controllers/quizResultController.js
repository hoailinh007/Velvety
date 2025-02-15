const QuizResult = require("../models/QuizResult");
const Question = require("../models/Question");

// Function to determine skin type based on answer weights
const determineSkinType = (answers) => {
    const totalWeight = answers.reduce((sum, answer) => sum + (answer.weight || 0), 0);
    const minWeight = answers.length * 1; // 17 (if all answers are the lowest weight)
    const maxWeight = answers.length * 4; // 68 (if all answers are the highest weight)
    
    const range = maxWeight - minWeight;
    const normalizedScore = ((totalWeight - minWeight) / range) * 100;

    if (normalizedScore <= 25) return "Dry Skin";
    if (normalizedScore <= 50) return "Combination Skin";
    if (normalizedScore <= 75) return "Normal Skin";
    return "Oily Skin";
};



// Save quiz result
const saveQuizResult = async (req, res) => {
    try {
        const { userId, answers } = req.body;

        // Validate answers exist
        if (!answers || answers.length === 0) {
            return res.status(400).json({ message: "Answers are required." });
        }

        // Compute skin type
        const skinType = determineSkinType(answers);

        // If user is a guest, return result without saving
        if (!userId) {
            return res.status(200).json({ 
                message: "Quiz completed as guest.",
                quizResult: { skinType, answers } 
            });
        }

        // If user is authenticated, save result
        const newQuizResult = new QuizResult({
            userId,
            answers,
            skinType
        });

        await newQuizResult.save();
        res.status(201).json({ message: "Quiz result saved successfully!", quizResult: newQuizResult });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all results (for admin)
const getAllResults = async (req, res) => {
    try {
        const results = await QuizResult.find().populate("userId", "name email");
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get quiz results for a specific user
const getUserResults = async (req, res) => {
    try {
        const { userId } = req.params;
        const results = await QuizResult.find({ userId });

        if (!results || results.length === 0) {
            return res.status(404).json({ message: "No quiz results found for this user." });
        }

        res.json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    saveQuizResult,
    getAllResults,
    getUserResults,
    determineSkinType,
};
