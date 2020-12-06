//Adding js code to handle events and manage data on website

const { PreconditionFailed } = require("http-errors");

module.exports = {
    createAccount,
    verifyCredentials,
    getCurrUser,
    getStocks,
    toString,
    getCurrDate
}

class User {
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
        if (currUser.balance >= 100) {
            this.balance -= Number(amount);
        }
        else {
            alert('Not Enough money to withdraw!');
        }     
    }

    deposit(amount) {
        this.balance += Number(amount);
    }

    setPortfolioValue() {
        var portVal = 0.0;
        for (var s in this.userStocks) {
            portVal += Number(s.price);
        }
        return portVal;
    }

    // watchlist methods
    createWatchlist(name) {
        var w = new Watchlist(name);
        this.watchlists.push(w); 
    }

    deleteWatchlist(wlist) {
        this.watchlists.pop(wlist); 
    }

    watchlistsToString() {
        var str = "Watchlists: "
        for (var w in this.watchlists) {
            str += "\n\n" + w.name + ":\n" + w.toString();
        }
        return str + "\n\n";
    }

    // alert methods
    createAlert(active, symbol, condition, overUnder) {
        var a = new Alert(active, symbol, condition, overUnder);
        this.alerts.push(a);
    }

    deleteAlert(alert) {
        this.alerts.pop(alert);
    }

    alertsToString() {
        var str = "Alerts: \n";
        for (var a in this.alerts) {
            str += "\n" + a.toString();
        }
        return str + "\n\n";
    }

    // account history methods
    logEventDW(date, event, amount) {
        var log = new HistoryLogWD(date, event, amount);
        log.setDescription();
        this.accounHistory.push(log);
        this.filteredAccountHistory.push(log);
        
    }

    logEventBS(date, event, numShares, price, symbol) {
        var log = new HistoryLogBS(date, event, numShares, price, symbol);
        log.setDescription();
        this.accounHistory.push(log);
        this.filteredAccountHistory.push(log);
    }

    filterByEvent(event) {
        var filtered = [];
        for (var log in this.accounHistory) {
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
        for (var log in this.accounHistory) {
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
        var str = "Account History: \n"
        for (var l in this.accounHistory) {
            str += "\n" + l.toString();
        }
        return str + "\n\n";
    }

    filteredAccounHistoryToString() {
        var str = "Filtered Account History: \n"
        for (var l in this.filteredAccounHistory) {
            str += "\n" + l.toString();
        }
        return str + "\n\n";
    }

    // orders methods
    makeOrder(symbol, typeorder, price, numShares, expiry, stock) {
        var o = new Order(symbol, typeorder, price, numShares, expiry, stock);
        this.orders.push(o);
    }

    orderCompleted(order) {
        order.stock.numSharesOrdered = order.numShares;
        order.stock.avgPricePaid = order.priceEntered;
        this.userStocks.push(order.stock);
        if (order.typeOrder) {
            this.balance -= Number(this.price*this.numShares);
            this.setPortfolioValue();
        }
        else {
            this.balance -= Number(this.price*this.numShares);
            this.setPortfolioValue();
        }
        this.orders.pop(order);
    }

    ordersToString() {
        var str = "Orders: \n";
        for (var o in this.orders) {
            str += "\n" + o.toString();
        }
        return str;
    }

    // logsToString() {
    //     var logs = [];
    //     for (var log in this.accounHistory) {
    //         logs.push(log.toString());
    //     }
    //     return logs;
    // }

    logsToString() {
        var logs = [];
        this.accounHistory.forEach((value) => {
            logs.push(value.toString());
        });
        return logs;
    }

}

class Stock {
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
        return `Symbol: ${this.symbol} `
                + `Price: ${this.price} `
                + `Bid Price: ${this.bidPrice} `
                + `Ask price: ${this.askPrice} `
                + `High Price: ${this.highPrice} `
                + `Low Price: ${this.lowPrice} `
                + `Number of Shares Traded Today: ${this.numSharesToday} `
                + `Number of Shares Owned: ${this.numOwned} `
                + `Average Price Paid: ${this.avgPricePaid} `;
        
    }
}

class OwnedStock { 
    constructor(boughtStock, pricePerStock) {
        this.numSharesOwned = boughtStock;
        this.avgPricePaid = pricePerStock;
        this.currentValue = 0;
    }

    toString() {
        return `Number of Shares Owned: ${this.numSharesOwned}`
                + `Average Price Paid: ${this.avgPricePaid}`
                + `Current Value: ${this.currentValue}`; 
    }
}

class Order {
    constructor(symbol, typeorder, price, numShares, expiry, stock) {
        this.symbol = symbol;
        this.typeOrder = typeorder;
        this.priceEntered = price;
        this.numSharesOrdered = numShares;
        this.expireEndDay = expiry;
        this.stock = stock;
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

class Watchlist {
    constructor(name) {
        this.wStocks = [];
        this.watchlistName = name;
    }

    addStockToWatchlist(stock) {
        this.wStocks.push(stock);
    }

    removeStockFromWatchlist(stock) {
        this.wStocks.pop(stock);
    }

    toString() {
        var str = ""; 
        for (var s in this.wStocks) {
            str += "\n" + s.toString();
        }
        return str;
    }
}

class Alert {
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

class HistoryLogWD {
    constructor(date, event, amount) {
        this.date = date;
        this.eventType = event; //buy = 0, sell = 1, withdraw = 2, deposit = 3
        this.amount = amount;
        this.description = "";
    }

    displayDate() {
        return this.date.substring(0,2) + "-" + this.date.substring(2,4) + "-" + this.date.substring(4,8);
    }

    setDescription() {
        if (Number(this.eventType) === 2) {
            this.description = "Withdrew " + this.amount + " from account.";
        }
        else {
            this.description = "Deposited " + this.amount + " into account.";
        }
    }

    toString() {
        return "\n" +  this.description;
        //this.displayDate() +   
    }
}

class HistoryLogBS {
    constructor(date, event, numShares, price, symbol) {
        this.date = date;
        this.symbol = symbol;
        this.eventType = event; //buy = 0, sell = 1, withdraw = 2, deposit = 3
        this.numShares = numShares;
        this.price = price;
        this.description = "";
    }

    displayDate() {
        return this.date.substring(0,2) + "-" + this.date.substring(2,4) + "-" + this.date.substring(4,8);
    }

    setDescription() {
        if (Number(this.eventType) === 0) {
            this.description = "Bought " + this.numShares + " of " + this.symbol + " for " + Number(this.numShares*this.price) + " (" + this.price + " each)";
        }
        else {
            this.description = "Sold " + this.numShares + " of " + this.symbol + " for " + Number(this.numShares*this.price) + " (" + this.price + " each)";
        }
    }

    toString() {
        console.log("\n this.description" + this.description);
        return "\n" + this.description;
        //this.displayDate() +  
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

var stock1 = new Stock('XYZ', 5.6);
var stock2 = new Stock('ABC', 9.8);
var stock3 = new Stock('AAA', 12.0);
database.push(stock1);
database.push(stock2);
database.push(stock3);

var users = [];
var currUser;

//creates user account, returns user
function createAccount(username, password) {
    var user = new User(username, password);
    users.push(user);
    return user;
}

//verifies user cred, returns true if user cred are valid, false otherwise
function verifyCredentials(username, password) {
    for (i = 0; i < users.length; i++) {
        if (username === users[i].username && password === users[i].password) {
            currUser = users[i];
            return true;
        }
    }
    return false;
}

createAccount("test", "123");
createAccount("JohnDoe", "password");
createAccount("Ethan", "myPSWD");
createAccount("Matia", "somePSWD");

function getCurrUser() { return currUser; }
function getStocks() { return database; }

console.log(verifyCredentials(users[0].username, users[0].password, users));
console.log(verifyCredentials("JohnDenver", "password", users));

users[0].deposit(5000);
console.log("Balance =");
console.log(users[0].balance + "\n");
users[0].logEventDW(10232020, 3, 5000);


users[0].withdraw(2000);
console.log("Balance =");
console.log(users[0].balance + "\n");
users[0].logEventDW(10232020, 2, 2000);


users[0].createWatchlist("Fav Watchlist");
users[0].watchlists[0].addStockToWatchlist(database[0]);
users[0].watchlists[0].addStockToWatchlist(database[2]);
console.log("\n\nFav Watchlist: \n\n" + users[0].watchlists[0].wStocks[0].toString());
console.log("\n\n" + users[0].watchlists[0].wStocks[1].toString());

//users[0].makeOrder("XYZ", true, database[0].price, 10, false, database[0]);
//console.log("\nOrder: \n\n" + users[0].orders[0].toString());
console.log("\nTime passes so order is now completed!\n\n");
//users[0].orderCompleted(users[0].orders[0]);
var event3 = users[0].logEventBS(10232020, 0, 10, database[0].price, "XYZ");
//console.log("Users Stocks: \n\n" + users[0].userStocks[0].toString());

users[0].createAlert(true, "AAA", 12, true);
console.log("\nAlerts: \n\n" + users[0].alerts[0].toString());
//users[0].portfolioValue = 56;

console.log("\nPortfolio Value: \n\n" + users[0].portfolioValue);
console.log("\nPortfolio Balance: \n\n" + currUser.balance)

function getCurrDate() {
    var today = new Date();
    if (today.getDate() < 10) {
        var day = "0"+ today.getDate();
    }
    else {day = today.getDate();}
    
    return today.getFullYear()+""+(today.getMonth()+1)+""+day;
}








