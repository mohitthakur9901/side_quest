https://dashboard.doppler.com/


# Notification Service

- add queue to send notification
- BullMQ


### add-ons features later

- time limit -- add time to polling a job ex (2 hours)
- price limit -- add price increment to polling a job (10)
- calling for giver and seeker or chat system to communicate each other 

## where are you now 
- auth service working 
- notification service working
- media handler service working
- user service working
- quest service working
- pool service working


## what to do next


- wrap nest server in socket.io server  - done 
- define events for seekers to view quests 
- connect seeker to pool (with socket.io server)
- listion continously on server as a seeker based on status 
- match quest's location and seeker's  location (lat, long)
- assign quest to seeker remove from redis 



Quest Created (Quest Service)
        ↓
Push to Redis Stream (xadd)
        ↓
Pool Service Stream Consumer
        ↓
Find Nearby Seekers (GEOSEARCH)
        ↓
Emit "newQuest" via WebSocket
        ↓
Seeker Accepts
        ↓
Lock Quest → First Come First Serve
        ↓
Notify Assigned Seeker
        ↓
Remove Quest from Pool
