// Функция отображения корректного времени в комментариях
export const currentDate = (data) => {

    const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

    let day = data.getDate();
    let month = months[data.getMonth()];
    let year = data.getFullYear();
    let hour = data.getHours() < 10 ? '0' + data.getHours() : data.getHours();
    let minuts = data.getMinutes() < 10 ? '0' + data.getMinutes() : data.getMinutes();
    let conclusion = `${day}.${month}.${year} ${hour}:${minuts}`;
    return conclusion;
}