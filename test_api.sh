#!/bin/bash

# Replace these values
API_URL="https://three81project-group9.onrender.com/api"
SESSION="connect.sid=s%3AheyjxsoALxl2iNxYgedf2pT6vS4UjPUi.4uXxmYUftvWUur04bpw0P1W%2Fk6j%2Bte9U06%2FHJXL4oBY"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

# Function to make API calls
call_api() {
    curl -s -b "$SESSION" "$@"
}

echo -e "${GREEN}Starting API Tests...${NC}\n"

# 1. Test GET /api/notes (Read all notes)
echo -e "${GREEN}1. Testing GET all notes:${NC}"
call_api "$API_URL/notes"
echo -e "\n"

# 2. Test POST /api/notes (Create note)
echo -e "${GREEN}2. Testing CREATE note:${NC}"
RESPONSE=$(call_api -X POST \
    -H "Content-Type: application/json" \
    -d '{
        "title": "Test Note",
        "body": "This is a test note created via API"
    }' \
    "$API_URL/notes")
echo "$RESPONSE"
# Extract note ID from response for later use
NOTE_ID=$(echo $RESPONSE | grep -o '"_id":"[^"]*' | cut -d'"' -f4)
echo -e "\nCreated note ID: $NOTE_ID\n"

# 3. Test GET /api/notes/:id (Read specific note)
echo -e "${GREEN}3. Testing GET specific note:${NC}"
call_api "$API_URL/notes/$NOTE_ID"
echo -e "\n"

# 4. Test PUT /api/notes/:id (Update note)
echo -e "${GREEN}4. Testing UPDATE note:${NC}"
call_api -X PUT \
    -H "Content-Type: application/json" \
    -d '{
        "title": "Updated Test Note",
        "body": "This note was updated via API"
    }' \
    "$API_URL/notes/$NOTE_ID"
echo -e "\n"

# 5. Test Search
echo -e "${GREEN}5. Testing SEARCH notes:${NC}"
call_api -X POST \
    -H "Content-Type: application/json" \
    -d '{
        "searchTerm": "test"
    }' \
    "$API_URL/notes/search"
echo -e "\n"

# 6. Test DELETE /api/notes/:id (Delete note)
echo -e "${GREEN}6. Testing DELETE note:${NC}"
call_api -X DELETE "$API_URL/notes/$NOTE_ID"
echo -e "\n"

# 7. Verify deletion
echo -e "${GREEN}7. Verifying deletion:${NC}"
call_api "$API_URL/notes/$NOTE_ID"
echo -e "\n"

echo -e "${GREEN}API Tests Complete!${NC}"
