import connect from "@/app/lib/mongoose";

import GolfCourse from "@/app/schema/golfCourseSchema";
import Team from "@/app/schema/teamSchema";

export async function GET() {

    try {
        await connect();

        const courses = await GolfCourse.find().lean();
        const teams = await Team.find().lean();

        return new Response(JSON.stringify(courses, teams), { status: 200 });

    } catch (error) {
        console.error("Error getting courses:", error);
        return new Response(JSON.stringify({ error: "Failed to get courses" }), { status: 500 });
    }
}