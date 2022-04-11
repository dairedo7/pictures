export const refs = () => {
    return {
        temperature: document.getElementById('temperature'),
        weatherState: document.getElementById('weather'),
        city: document.getElementById('name'),
        icon: document.querySelector('.widget-icon'),
    }
}