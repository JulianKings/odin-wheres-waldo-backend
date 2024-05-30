function appendTime(hashDictionary, time)
{
    const timeId = generateId(16);

    const timeObject = {
        id: timeId,
        time: time
    }

    hashDictionary.push(timeObject);

    return timeId;
}

function obtainTime(hashDictionary, id)
{
    return hashDictionary.find((time) => {
        return (time.id === id);
    })
}

function updateTime(hashDictionary, id, time)
{
    const currentTime = hashDictionary.find((time) => {
        return (time.id === id);
    })

    if(currentTime)
    {
        currentTime.finished = time;
        return true;
    } else {
        return false;
    }
}


function generateId(length) {
    let result = '';

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;

    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }

    return result;
}

export { appendTime, obtainTime, updateTime }