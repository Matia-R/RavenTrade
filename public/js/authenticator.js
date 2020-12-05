module.exports = {auth}

function auth(req, res, next) {
    console.log("Got to auth()");
	if(!req.session.loggedin){
        console.log("not good");
        return false;
    }
    console.log("all good");
    return true;
}