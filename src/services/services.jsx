import axios from "axios";

class Services {
    async sendMessage(message) {
        return await axios.post('https://localhost:5000/send-message', message, {
            headers: {
                'Accept': 'application/json',
            },
        })
    }
}

const services = new Services();
export default services;