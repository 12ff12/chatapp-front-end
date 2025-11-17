import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import axios from 'axios';

const initializeEcho = () => {

    if (typeof window === 'undefined') {
        return null;
    }

    window.Pusher = Pusher;

    const echoInstance = new Echo({
        broadcaster: 'pusher',
        key: "d783b75b229ce9e96107",  
        cluster: "eu",              
        forceTLS: true,     

        // IMPORTANT: remove wsHost/wsPort (these are only for Reverb or Laravel-WebSockets)
        // Pusher cloud does NOT use your server for websocket endpoints.

        authorizer: (channel, options) => {
            return {
                authorize: (socketId, callback) => {
                    axios.post("https://grey-dotterel-732681.hostingersite.com/api/broadcasting/auth", {
                        socket_id: socketId,
                        channel_name: channel.name,
                    }, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                            Accept: "application/json",
                        },
                    })
                    .then(res => callback(false, res.data))
                    .catch(err => callback(true, err));
                }
            };
        },
    });

    window.Echo = echoInstance;


    return echoInstance;
};

if (typeof window !== 'undefined') {
    initializeEcho();
}

export default initializeEcho;
