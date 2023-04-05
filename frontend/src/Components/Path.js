// const app_name = 'cerealboxd'
// function buildPath(route, type)
// {
//     if (process.env.NODE_ENV === 'production') 
//     {
//         return 'https://' + app_name +  '.herokuapp.com/' + route;
//     }
//     else
//     {        
//         if (type === 0)
//             return 'http://localhost:5050/' + route;
//         else
//             return 'http://localhost:3000/' + route;
//     }
// }

const app_name = 'cerealboxd'
exports.buildPath =
function buildPath(route)
{
    if (process.env.NODE_ENV === 'production') 
    {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    }
    else
    {        
        return 'http://localhost:5050/' + route;
    }
}