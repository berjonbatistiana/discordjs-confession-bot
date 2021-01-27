// check if user argument is valid or not
const isTagUser = (args, req = 1) => {
    const response = {
        success: false
    };

    // Check if it has a user argument or not
    if (args.length < req) {
        response.message = `Bad argument, try again.`;
        return response;
    }

    // check if user argument is valid or not
    const rawUserId = args.shift();

    let userSnowflake = '';
    if (rawUserId.startsWith('<@') && rawUserId.endsWith('>'))
        userSnowflake = rawUserId.substring(2, rawUserId.length - 1);
    else
        return {...response, message: 'Not a valid User'};

    if (isNaN(userSnowflake[0])) {
        if (userSnowflake[0] !== '!')
            return {...response, message: 'Not a valid User'};
        userSnowflake = userSnowflake.substring(1);
    }

    response.snowflake = userSnowflake;
    response.success = true;

    return response;
}

const findPartialMention = (partial) => {

}
module.exports = {
    isTagUser,
    findPartialMention
}