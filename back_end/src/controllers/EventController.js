const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const event_logger = require('../loggers/Loggers').event_logger;

const createEvent = async (req, res) => {
    try {
        event_logger.info("Creating a new event");
        const { title, description, date, userId, sport, latitude, longitude } = req.body;
        event_logger.info("Event data: " + JSON.stringify(req.body));
        const event = await prisma.event.create({
            /*
            {
                "title": "Volleyball Match",
                "description": "Join us for a thrilling volleyball match!",
                "date": "2024-04-23T15:00:00.000Z",
                "userId": "aa11a175-1d2c-45ae-b9c5-c857476c00b3",
                "sport": ["VOLLEYBALL"],
                "latitude": 46.756658,
                "longitude": 23.563747
            }
            */

            data: {
                title,
                description,
                date,
                userId,
                sport,
                latitude,
                longitude,
            },
        });
        event_logger.info("Event created successfully");
        res.status(201).json(event);
    } catch (error) {
        event_logger.error("Error creating event: " + error);
        res.status(500).json({ error: 'Failed to create event' });
    }
};

const getEventsByLocationAndArea = async (req, res) => {
    try {
        event_logger.info("Fetching events by location and area");
        const { latitude, longitude, area, sport } = req.body;

        // Calculate the area in degrees based on the given area in kilometers
        const areaInDegrees = 0.0144927536231884 * parseFloat(area);

        // Calculate the bounding box coordinates based on the given latitude, longitude, and area
        const minLatitude = parseFloat(latitude) - parseFloat(areaInDegrees);
        const maxLatitude = parseFloat(latitude) + parseFloat(areaInDegrees);
        const minLongitude = parseFloat(longitude) - parseFloat(areaInDegrees);
        const maxLongitude = parseFloat(longitude) + parseFloat(areaInDegrees);

        let whereClause = {
            latitude: {
                gte: minLatitude,
                lte: maxLatitude,
            },
            longitude: {
                gte: minLongitude,
                lte: maxLongitude,
            },
        };

        if (sport != null) {
            whereClause.sport = {
                has: sport,
            };
        }

        event_logger.info("Event data: " + JSON.stringify(req.body));
        /*
        {
            "latitude": 46.756658,
            "longitude": 23.563747,
            "area": 10, <-- 10 km
            "sport": "VOLLEYBALL" or null to get all sports
        }
        */

        const events = await prisma.event.findMany({
            where: whereClause,
        });

        event_logger.info("Events fetched successfully");
        res.status(200).json(events);
    } catch (error) {
        event_logger.error("Error fetching events: " + error);
        res.status(500).json({ error: 'Failed to get events by location and area' });
    }
};

module.exports = { createEvent, getEventsByLocationAndArea }