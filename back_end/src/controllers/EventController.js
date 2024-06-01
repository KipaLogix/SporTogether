const { PrismaClient } = require('@prisma/client');
const e = require('express');

const prisma = new PrismaClient();

const event_logger = require('../loggers/Loggers').event_logger;

const createEvent = async (req, res) => {
    try {

        event_logger.info("Creating a new event");
        const { title, description, date, userId, sportId, latitude, longitude } = req.body;
        event_logger.info("Event data: " + JSON.stringify(req.body));

        const event = await prisma.event.create({
            /*
            {
                "title": "Volleyball Match",
                "description": "Join us for a thrilling volleyball match!",
                "date": "2024-04-23T15:00:00.000Z",
                "userId": "aa11a175-1d2c-45ae-b9c5-c857476c00b3",
                "sportId": "UUID....",
                "latitude": 46.756658,
                "longitude": 23.563747
            }
            */

            data: {
                title,
                description,
                date,
                userId,
                latitude,
                longitude,
                sportId,
            },
        });
        event_logger.info("Event created successfully");
        res.status(201).json(event);
    } catch (error) {
        event_logger.error("Error creating event: " + error);
        res.status(500).json({ error: 'Failed to create event' });
    }
};

//http://localhost:3000/api/events/latitude=46.770439/longitude=23.591423/area=150/346985fb-0199-4e96-80e9-dddfad6d9483
const getEventsByLocationAndArea = async (req, res) => {
    console.log("intra");
    try {

        const { latitude, longitude, area, sportId } = req.params;

        event_logger.info("Fetching events by location and area");


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

        if (sportId != null) {
            whereClause.sportId = sportId;
        }

        event_logger.info("Event data: " + JSON.stringify(req.body));
        /*
        {
            "latitude": 46.756658,
            "longitude": 23.563747,
            "area": 10, <-- 10 km
            "sportId": "UUID..." or null to get all sports
        }
        */
        console.log(whereClause)

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

// const addAllSports = async (req, res) => {

//     const sports = [
//         'FOOTBALL', 'BASKETBALL', 'TENNIS', 'VOLLEYBALL', 'HANDBALL', 'RUGBY',
//         'SWIMMING', 'RUNNING', 'CYCLING', 'GOLF', 'BOXING', 'MARTIAL_ARTS',
//         'YOGA', 'DANCE', 'FITNESS', 'GYMNASTICS', 'SKIING', 'SNOWBOARDING',
//         'ICE_SKATING', 'ICE_HOCKEY', 'CURLING', 'SQUASH', 'BADMINTON',
//         'TABLE_TENNIS', 'BILLIARDS', 'DARTS', 'CHESS', 'POKER', 'BRIDGE',
//         'BACKGAMMON', 'VIDEO_GAMES', 'BOARD_GAMES', 'CARD_GAMES', 'OTHER'
//     ];

//     try {
//         for (const sport of sports) {
//             await prisma.sport.create({
//                 data: {
//                     sport: sport,
//                 },
//             });
//         }

//         res.status(201).json(sports);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to create sport' });
//     }
// };

const getSports = async (req, res) => {
    try {
        event_logger.info("Fetching sports");
        event_logger.info("Sports data: " + JSON.stringify(req.body));
        const sports = await prisma.sport.findMany();

        res.status(200).json(sports);
        event_logger.info("Sports fetched successfully");
    } catch (error) {
        event_logger.error("Error fetching sports: " + error);
        res.status(500).json({ error: 'Failed to get sports' });
    }
}

module.exports = { createEvent, getEventsByLocationAndArea, getSports /*addAllSports*/ }
