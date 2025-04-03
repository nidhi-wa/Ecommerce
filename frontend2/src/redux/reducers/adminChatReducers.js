import * as actionTypes from "../constants/chatConstants";

const CHAT_INITIAL_STATE = {
    socket: false,
    chatRooms: {}, 
    messageReceived: false,
};

export const adminChatReducer = (state = CHAT_INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.SET_CHATROOMS:
            const { user, message } = action.payload;
            return {
                ...state,
                chatRooms: {
                    ...state.chatRooms, 
                    [user]: [...(state.chatRooms[user] || []), { client: message }]
                }
            };

        case actionTypes.SET_SOCKET:
            return {
                ...state,
                socket: action.payload.socket,
            };

        case actionTypes.MESSAGE_RECEIVED:
            return {
                ...state,
                messageReceived: action.payload.value,
            };

        case actionTypes.REMOVE_CHATROOM:
            const updatedChatRooms = { ...state.chatRooms };
            delete updatedChatRooms[action.payload.socketId];

            return {
                ...state,
                chatRooms: updatedChatRooms,
            };

        default:
            return state;
    }
};