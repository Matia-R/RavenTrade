//Adding js code to handle events and manage data on website

class user {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.balance = 0;
        this.portfolioValue = 0;
        this.userStocks = [];
        this.orders = [];
        this.watchlists = [];
        this.accounHistory = [];
        this.alerts = [];
    }

    // watchlist methods
    createWatchlist(name) {
        var w = new watchlist(name);
        this.watchlists.push(w); 
    }

    deleteWatchlist(wlist) {
        this.watchlists.pop(wlist); 
    }

    // alert methods
    createAlert(active, symbol, condition, overUnder) {
        var a = new alert(active, symbol, condition, overUnder);
        this.alerts.push(a);
    }

    deleteAlert(alert) {
        this.alerts.pop(alert);
    }

    // account history methods
    logEvent(date, event, description, displaydate) {
        var log = new historyLog(date, event, description, displaydate);
        this.accounHistory.push(log);
    }

    filterByEvent(event) {
        for (log in this.accounHistory) {
            //set all items of event to display
            // and others not too
        } 
    }

    filterByDateRange(start, end) {
        for (log in this.accounHistory) {
            //set all items that are in date range to display
            // and others not too
        } 
    }

    clearFilters() {
        for (log in this.accounHistory) {
            //set all items to display
        }
    }

    // orders methods
    makeOrder(symbol, typeorder, price, numShares, expiry) {
        var o = new order(symbol, typeorder, price, numShares, expiry);
        this.orders.push(o);
    }



}

class stock {
    constructor(symbol, price) {
        this.symbol = symbol;
        this.price = price;
        this.bidPrice = 0.0;
        this.askPrice = 0.0;
        this.highPrice = 0.0;
        this.lowPrice = 0.0;
        this.numSharesToday = 0;
        this.numOwned = 0;
        this.avgPricePaid = 0.0;
    }


}

class ownedStock { 
    constructor(boughtStock, pricePerStock) {
        this.numSharesOwned = boughtStock;
        this.avgPricePaid = pricePerStock;
        this.currentValue = 0;
    }
}

class order {
    constructor(symbol, typeorder, price, numShares, expiry) {
        this.symbol = symbol;
        this.typeOrder = typeorder;
        this.priceEntered = price;
        this.numSharesOrdered = numShares;
        this.expiry = expiry;
        // notification
    } 
}

class watchlist {
    constructor(name) {
        this.stocks = [];
        this.watchlistName = name;
    }

    addStockToWatchlist(symbol) {
        this.stocks.push(findStock(symbol));
    }

    removeStockFromWatchlist(symbol) {
        this.stocks.pop(findStock(symbol));
    }
}

class alert  {
    constructor(active, symbol, condition, overUnder) {
        this.active = active;
        this.symbol = symbol;
        this.condition = condition;
        this.overUnder = overUnder;
        // notification
    }

    editAlert(condition, overUnder) {
        this.condition = condition;
        this.overUnder = overUnder;
    }

    changeState() {
        if (this.active === false ) {
            this.active = true;
        }
        else {
            this.active = false;
        }
    }

} 

class historyLog {
    constructor(date, event, description, displaydate) {
        this.date = date;
        eventType = event; //buy = 0, sell = 1, withdraw = 2, deposit = 3
        this.description = description;
        displayDate = displaydate;
    }
}



/*Event Listeners
document.getElementsByClassName("clsOption").addEventListener("click", displayWatchlist);

displays listof stocks in a selected watch list
function displayWatchlist() {
    var clickedWatchlist = document.getElementsByClassName("clsOption").value;
    var wlist = user.watchlists[clickedWatchlist];
    var list = document.getElementsById("wlist");
    for (var prop in wlist) {
        list.innerHTML += prop;
    }
}

document.getElementsById("delete-watchlist").addEventListener("click", deleteWlist);

function deleteWlist() {
    var clickedWatchlist = document.getElementsByClassName("clsOption").value;
    var wlist = user.watchlists[clickedWatchlist];
    user.watchlists.pop(wlist);
    document.getElementsById(`watchlist${clickedWatchlist}`).remove();
}

*/





// Sample testing code and objects - will be replaced by actual database 
var database = [];

var stock1 = new stock('XYZ', 5.6);
var stock2 = new stock('ABC', 9.8);
var stock3 = new stock('AAA', 12.0);
database.push(stock1);
database.push(stock2);
database.push(stock3);

var users = [];

var user1 = new user("JohnDoe", "password");
var user2 = new user("Ethan", "myPSWD");
var user3 = new user("Matia", "somePSWD");
users.push(user1);
users.push(user2);
users.push(user3);

function findStock(symbol) {
    for (s in database) {
        if (symbol === s.symbol) {
            return s;
        }
    }
}






