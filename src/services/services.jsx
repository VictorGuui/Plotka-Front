import axios from "axios";

class Services {
    async sendMessage(message) {
        console.log(message)
        return await axios.post('http://localhost:5000/send-message', message, {
            headers: {
                'Accept': 'application/json',
            },
        })
    }
}

const services = new Services();
export default services;