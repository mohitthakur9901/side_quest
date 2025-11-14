https://dashboard.doppler.com/

# services 
- auth 
- database
- media_handler
- user 
- root 
# uitlities 

- config 
- utils
## User Authentication 

### Auth

- Login
- Register
- Logout

### User

- update profile 
- update profile image
- get profile image
- delete profile image
- get all users // admin only
- delete user // admin only
- get user by id // admin only


# Notification Service

- add queue to send notification
- BullMQ

# Quest Functionalty Polling to every seeker 

- redis and websocket

## Problem 

- how to notifiy seeker about new quest

### challenges

- how to create a polling 
- how to push a quest inside a polling 
- fillter seeker by location
- fillter quest by location 
- first come first serve
- time limit

### User

- update profile 
- update profile image
- get profile image
- delete profile image
- get all users // admin only
- delete user // admin only
- get user by id // admin only


### add-ons features later

- time limit -- add time to polling a job ex (2 hours)
- price limit -- add price increment to polling a job (10)

### ways to do

✅ NestJS + WebSockets → “Implemented real-time updates between users and job postings.”
✅ Redis → “Used Redis for distributed locking to ensure atomic quest assignment.”
✅ BullMQ → “Used BullMQ for distributed job queueing and processing.”


# high-level architecture


- Seekers connect via Socket.IO and register their location (lat/lon). (given to user to update status)
    define a service inside seeker then pass it to user service with fields (id , lat ,long)
    
- Seeker locations stored in Redis GEO set (seekers:geo) and also sockets saved (seeker:{id}:socketIds). 

- Quest created → stored in Redis (hash + geo index) and queued for dispatch.

- Service finds nearby seekers (Redis GEORADIUS / GEOSEARCH) or determines region buckets (geohash/grid) → 
    send newQuest only to those seekers (Socket.IO rooms or direct socket emit).

- Seekers claimQuest(questId) → server runs an atomic Lua script (or SETNX) to claim + remove quest from pool.

- Background workers (BullMQ) handle expiry, price bumps, and final cleanup.