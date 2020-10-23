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
        this.filteredAccountHistory = [];
        this.alerts = [];
    }

    //fund methods
    withdraw(amount) {
       this.balance -= Number(amount); 
    }

    deposit(amount) {
        this.balance += Number(amount);
    }

    setPortfolioValue() {
        portVal = 0.0;
        for (s in this.userStocks) {
            portVal += s.price;
        }
        return portVal;
    }

    // watchlist methods
    createWatchlist(name) {
        var w = new watchlist(name);
        this.watchlists.push(w); 
    }

    deleteWatchlist(wlist) {
        this.watchlists.pop(wlist); 
    }

    watchlistsToString() {
        var string = "Watchlists: "
        for (w in this.watchlists) {
            string += "\n\n" + w.name + ":\n" + w.toString();
        }
        return string + "\n\n";
    }

    // alert methods
    createAlert(active, symbol, condition, overUnder) {
        var a = new alert(active, symbol, condition, overUnder);
        this.alerts.push(a);
    }

    deleteAlert(alert) {
        this.alerts.pop(alert);
    }

    alertsToString() {
        var string = "Alerts: \n";
        for (a in this.alerts) {
            string += "\n" + a.toString();
        }
        return string + "\n\n";
    }

    // account history methods
    logEvent(date, event, description) {
        var log = new historyLog(date, event, description);
        this.accounHistory.push(log);
        this.filteredAccountHistory.push(log);
    }

    filterByEvent(event) {
        var filtered = [];
        for (log in this.accounHistory) {
            //set all items of event to display
            // and others not too
            if (log.event === event) {
                filtered.push(log);
            } 
        }
        this.filteredAccounHistory = filtered; 
    }

    filterByDateRange(start, end) {
        var filtered = [];
        for (log in this.accounHistory) {
            //set all items that are in date range to display
            // and others not too
            if (log.date >= start && log.date <= end) {
                filtered.push(log);
            } 
        }
        this.filteredAccounHistory = filtered;  
    }

    clearFilters() {
        this.filteredAccounHistory = this.accounHistory;
    }

    accounHistoryToString() {
        var string = "Account History: \n"
        for (l in this.accounHistory) {
            string += "\n" + l.toString();
        }
        return string + "\n\n";
    }

    filteredAccounHistoryToString() {
        var string = "Filtered Account History: \n"
        for (l in this.filteredAccounHistory) {
            string += "\n" + l.toString();
        }
        return string + "\n\n";
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

    toString() {
        console.log(`Symbol: ${this.symbol}`);
        console.log(`Price: ${this.price}`);
        console.log(`Bid Price: ${this.bidPrice}`);
        console.log(`Ask price: ${this.askPrice}`);
        console.log(`High Price: ${this.highPrice}`);
        console.log(`Low Price: ${this.lowPrice}`);
        console.log(`Number of Shares Traded Today: ${this.numSharesToday}`);
        console.log(`Number of Shares Owned: ${this.numOwned}`);
        console.log(`Average Price Paid: ${this.avgPricePaid}`);
        
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
        this.expireEndDay = expiry;
        // notification
    }

    cancelOrder() {
        user.orders.pop(this);
    }

    toString() {
        if (this.typeOrder) {
            if (this.expireEndDay) {
                return "Stock Ordered: " + this.symbol + " | Order Type: Buy | Number of Shares: " + this.numSharesOrdered + " | Price per Share: " + this.priceEntered + " | Expiry: Expires at the end of the day";              
            }
            else {
                return "Stock Ordered: " + this.symbol + " | Order Type: Buy | Number of Shares: " + this.numSharesOrdered + " | Price per Share: " + this.priceEntered + " | Expiry: Expires upon cancellation";
            }    
        }
        else {
            if (this.expireEndDay) {
                return "Stock Ordered: " + this.symbol + " | Order Type: Sell | Number of Shares: " + this.numSharesOrdered + " | Price per Share: " + this.priceEntered + " | Expiry: Expires at the end of the day";
            }
            else {
                return "Stock Ordered: " + this.symbol + " | Order Type: Sell | Number of Shares: " + this.numSharesOrdered + " | Price per Share: " + this.priceEntered + " | Expiry: Expires upon cancellation";
            }
        }
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

    toString() {
        var string = ""; 
        for (s in this.stocks) {
            string += "\n" + s.toString();
        }
        return string;
    }
}

class alert  {
    constructor(active, symbol, condition, increase) {
        this.active = active;
        this.symbol = symbol;
        this.condition = condition;
        this.increase = increase;
        // notification
    }

    editAlert(condition, increase) {
        this.condition = condition;
        this.increase = increase;
    }

    changeState() {
        if (this.active) {
            this.active = false;
        }
        else {
            this.active = true;
        }
    }

    toString() {
        if (this.increase) {
            if (this.active) {
                return this.symbol + " | Alert Condition: price increases by " + this.condition + "% | ACTIVE";
            }
            else {
                return this.symbol + " | Alert Condition: price increases by " + this.condition + "% | INACTIVE";
            }
            
        }
        else {
            if (this.active) {
                return this.symbol + " | Alert Condition: price decreases by " + this.condition + "% | ACTIVE";
            }
            else {
                return this.symbol + " | Alert Condition: price decreases by " + this.condition + "% | INACTIVE";
            }
        }  
    }
} 

class historyLog {
    constructor(date, event, amount) {
        this.date = date;
        this.eventType = event; //buy = 0, sell = 1, withdraw = 2, deposit = 3
        this.amount = amount;
        this.description = setDescriptionWD();
    }

    constructor(date, event, numShares, price, symbol) {
        this.date = date;
        this.symbol = symbol;
        this.eventType = event; //buy = 0, sell = 1, withdraw = 2, deposit = 3
        this.numShares = numShares;
        this.price = price;
        this.description = setDescriptionBS();
    }

    displayDate() {
        return this.date.subString(0,2) + "-" + this.date.subString(2,4) + "-" + this.date.subString(4,8);
    }

    setDescriptionWD() {
        if (Number(this.eventType) === 2) {
            return "Withdrew " + this.amount + " from account.";
        }
        else {
            return "Deposited " + this.amount + " into account.";
        }
    }

    setDescriptionBS() {
        if (Number(this.eventType) === 0) {
            return "Bought " + this.numShares + " of " + this.symbol + " for " + Number(this.numShares*this.price) + " (" + this.price + " each)";
        }
        else {
            return "Sold " + this.numShares + " of " + this.symbol + " for " + Number(this.numShares*this.price) + " (" + this.price + " each)";
        }
    }

    toString() {
        return this.displayDate() + "\n" +  this.description;  
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

//creates user account, returns user
function createAccount(username, password) {
    let user = new User(username, password);
    users.push(user);
    return user;
}

//verifies user cred, returns true if user cred are valid, false otherwise
function verifyCredentials(username, password) {
    for (u in users) {
        if (username === u.username && password === u.password) {
            return true;
        }
    }
    return false;
}

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








