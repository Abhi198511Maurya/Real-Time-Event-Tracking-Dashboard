import EventModel from "../models/EventModel.js";

export const createEvent = async (req, res) => {
    try {
        console.log(req.body);
        
        const event = new EventModel(req.body);
        await event.save();

        req.io.emit('newEvent', event);
        res.json(event);
    } catch (error) {
        res.json({ error: error.message });
    }
}

export const getStats = async (req, res) => {
    try {
        const count = await EventModel.countDocuments();
        res.json({ totalEvents: count });
    } catch (error) {
        res.json({ error: error.message })
    }
}

export const getUserEngagement = async (req, res) => {
    const engagementStats = await EventModel.aggregate([
        { $match: { eventType: "time_spent" } },
        {
            $group: {
                _id: "$userId",
                totalTimeSpent: { $sum: "$meta.duration" }
            }
        }
    ]);
    res.json(engagementStats);
}

export const getConversionRate = async (req, res) => {
    const totalVisits = await EventModel.countDocuments({ eventType: 'visit' });
    const totalConversions = await EventModel.countDocuments({ eventType: 'conversion' });

    const conversionRate = totalVisits === 0 ? 0 : (totalConversions / totalVisits) * 100;
    res.json({ totalVisits, totalConversions, conversionRate: conversionRate.toFixed(2) + '%' });
};
