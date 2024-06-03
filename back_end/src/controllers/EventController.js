const { PrismaClient } = require('@prisma/client');
const { create } = require('domain');

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
                Participants: {
                    connect: {
                        id: userId
                    }
                }
            },
        });
        event_logger.info("Event created successfully");
        res.status(201).json(event);
    } catch (error) {
        event_logger.error("Error creating event: " + error);
        res.status(500).json({ error: 'Failed to create event' });
    }
};

//http://localhost:3000/api/events?latitude=46.770439&longitude=23.591423&area=150&sportId=346985fb-0199-4e96-80e9-dddfad6d9483
const getEventsByLocationAndArea = async (req, res) => {
    console.log("intra");
    try {

        const { latitude, longitude, area, sportId } = req.query;

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
            date: {
                gte: new Date(),
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
            include: {
                createdBy: true,
                Sport: true,
            },
        });

        const eventsWithoutPasswords = events.map(event => {
            event.createdBy.password = null;
            return event;
        });

        event_logger.info("Events fetched successfully");
        res.status(200).json(eventsWithoutPasswords);
    } catch (error) {
        event_logger.error("Error fetching events: " + error);
        res.status(500).json({ error: 'Failed to get events by location and area' });
    }
};

const getEventById = async (req, res) => {
    try {
        const { id } = req.params;

        event_logger.info("Fetching event by id");

        const event = await prisma.event.findFirstOrThrow({
            where: {
                id: id
            },
            include: {
                createdBy: true,
                Participants: true,
                Sport: true,
            },
        });

        event.createdBy.password = null;
        event.Participants.forEach(participant => {
            participant.password = null;
        });

        event_logger.info("Event fetched successfully");
        res.status(200).json(event);
    } catch (error) {
        event_logger.error("Error fetching event: " + error);
        res.status(500).json({ error: 'Failed to get event by id' });
    }
};

async function getMyEvents(req, res) {
    event_logger.info("Getting user events");
    try {

        const { userId } = req.params;

        const currentDate = new Date();

        const createdEvents = await prisma.event.findMany({
            where: {
                createdBy: {
                    id: userId,
                },
                date: {
                    gte: currentDate,
                },
            },
            include: {
                Participants: true,
                createdBy: true,
                Sport: true,
            },
        });

        const joinedEvents = await prisma.event.findMany({
            where: {
                Participants: {
                    some: {
                        id: userId,
                    },
                },
                date: {
                    gte: currentDate,
                },
            },
            include: {
                Participants: true,
                createdBy: true,
                Sport: true,
            },
        });

        const eventIds = new Set();
        const allEvents = [...createdEvents, ...joinedEvents].filter(event => {
            if (eventIds.has(event.id)) {
                return false;
            }
            eventIds.add(event.id);
            return true;
        });

        const eventsWithoutPasswords = allEvents.map(event => {
            event.createdBy.password = null;
            event.Participants.forEach(participant => {
                participant.password = null;
            });
            return event;
        });


        res.status(200).json(allEvents);
        event_logger.info("User events fetched successfully");
    } catch (error) {
        event_logger.error("Error getting user events: " + error);
        res.status(500).json({ error: 'Error getting user events' });
    }
}

const addAllSports = async (req, res) => {

    const sportsWithIcons = [
        ['Football', 'Ionicons/football'],
        ['Basketball', 'MaterialCommunityIcons/basketball'],
        ['Tennis', 'MaterialCommunityIcons/tennis-ball'],
        ['Volleyball', 'MaterialCommunityIcons/volleyball'],
        ['Handball', 'MaterialCommunityIcons/handball'],
        ['Rugby', 'MaterialCommunityIcons/rugby'],
        ['Swimming', 'FontAwesome6/person-swimming'],
        ['Running', 'FontAwesome5/running'],
        ['Cycling', 'MaterialCommunityIcons/bicycle'],
        ['Golf', 'Ionicons/golf'],
        ['Boxing', 'MaterialCommunityIcons/boxing-glove'],
        ['Martial Arts', 'MaterialIcons/sports-martial-arts'],
        ['Yoga', 'MaterialCommunityIcons/yoga'],
        ['Dance', 'MaterialCommunityIcons/dance-ballroom'],
        ['Gymnastics', 'MaterialIcons/sports-gymnastics'],
        ['Skiing', 'FontAwesome5/skiing'],
        ['Snowboarding', 'FontAwesome5/snowboarding'],
        ['Ice Skating', 'FontAwesome5/skating'],
        ['Ice Hockey', 'MaterialCommunityIcons/hockey-puck'],
        ['Badminton', 'MaterialCommunityIcons/badminton'],
        ['Table Tennis', 'FontAwesome5/table-tennis'],
        ['Billiards', 'MaterialCommunityIcons/billiards'],
        ['Chess', 'FontAwesome5/chess'],
        ['Poker', 'MaterialCommunityIcons/poker-chip'],
        ['Board Games', 'FontAwesome5/fantasy-flight-games']
    ];

    try {
        for (const sport of sportsWithIcons) {
            await prisma.sport.create({
                data: {
                    sport: sport[0],
                    icon: sport[1]
                },
            });
        }

        res.status(201).json(sportsWithIcons);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create sport' });
    }
};

//http://localhost:3001/api/events/join?userId=0df3d28a-8b9a-4870-b69f-d92d10215662&eventId=d2803666-73b0-46b8-ab40-07fba894c1c2
async function joinEvent(req, res) {
    try {
        event_logger.info("Joining event");
        const { userId, eventId } = req.body;
        console.log("Joining event: " + eventId + " " + userId);

        const event = await prisma.event.findFirstOrThrow({
            where: {
                id: eventId
            },
            include: {
                Participants: true
            }
        });

        if (event.Participants.find(participant => participant.id === userId)) {
            return res.status(400).json({ error: 'User already joined event' });
        }

        if (event.date < new Date()) {
            return res.status(400).json({ error: 'Event already passed' });
        }

        await prisma.event.update({
            where: {
                id: eventId
            },
            data: {
                Participants: {
                    connect: {
                        id: userId
                    }
                }
            }
        });

        res.status(200).json({ message: 'User joined event successfully' });
        event_logger.info("Joined successfully");
    } catch (error) {
        event_logger.error("Error joining event: " + error);
        res.status(500).json({ error: 'Failed to join event' });
    }
}

async function leaveEvent(req, res) {
    try {
        event_logger.info("Leaving event");
        const { userId, eventId } = req.body;
        console.log("Leaving event: " + eventId + " " + userId);

        const event = await prisma.event.findFirstOrThrow({
            where: {
                id: eventId
            },
            include: {
                Participants: true
            }
        });

        if (!event.Participants.find(participant => participant.id === userId)) {
            return res.status(400).json({ error: 'User not joined event' });
        }

        if (event.date < new Date()) {
            return res.status(400).json({ error: 'Event already passed' });
        }

        await prisma.event.update({
            where: {
                id: eventId
            },
            data: {
                Participants: {
                    disconnect: {
                        id: userId
                    }
                }
            }
        });

        res.status(200).json({ message: 'User left event successfully' });
        event_logger.info("Left successfully");
    } catch (error) {
        event_logger.error("Error leaving event: " + error);
        res.status(500).json({ error: 'Failed to leave event' });
    }
}

async function cancelEvent(req, res) {
    try {
        const { userId, eventId } = req.query;
        console.log("Canceling event: " + eventId + " " + userId);

        event_logger.info("Canceling event: " + eventId + " " + userId);

        const event = await prisma.event.findFirstOrThrow({
            where: {
                id: eventId
            },
            include: {
                createdBy: true
            }
        });

        const response = await prisma.event.delete({
            where: {
                id: eventId
            }
        });

        console.log(response);

        if (event.createdBy.id !== userId || event.date < new Date()) {
            return res.status(400).json({ error: 'User not authorized to cancel event' });
        }

        res.status(200).json({ message: 'Event canceled successfully' });
        event_logger.info("Canceled successfully");

    } catch (error) {
        event_logger.error("Error canceling event: " + error);
        res.status(500).json({ error: 'Failed to cancel event' });
    }
}

module.exports = { createEvent, getEventsByLocationAndArea, getEventById, getMyEvents, addAllSports, joinEvent, leaveEvent, cancelEvent }



