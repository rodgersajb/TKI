import mongoose from "mongoose";

const holeSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
    },
    par: {
        type: Number,
        required: true,
    },
    handicap: {
        type: Number,
        required: true,
    },
    yardage: {
        type: Number,
        required: true,
    },
    });

const golfCourseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },    
    holes: [holeSchema],
    totalPar: {
        type: Number,
        required: true,
    },
});

const GolfCourse = mongoose.models.GolfCourse || mongoose.model("GolfCourse", golfCourseSchema);

export default GolfCourse