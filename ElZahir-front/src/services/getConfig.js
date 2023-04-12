
export default function getConfig() {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedUser'));
    const token = `Bearer ${loggedUser.token}`;

     return {
        headers: {
            Authorization: token
        }
    };
}