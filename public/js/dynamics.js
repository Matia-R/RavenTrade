//Adding js code to handle events and manage data on website

const { PreconditionFailed } = require("http-errors");

module.exports = {
    createAccount,
    verifyCredentials,
    getCurrUser,
    getStocks,
    toString,
    getCurrDate,
    isValidSymbol,
    findStock
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
            portVal += Number(s.avgPricePaid*s.numOwned);
        }
        this.portfolioValue = Number(portVal);
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
        var shouldOrder = 0;
        if (typeorder) {
            var cost = Number(Number(price)*Number(numShares)); 
            if (Number(cost) > Number(this.balance)) {
                //alert("Insufficient Funds!");
                shouldOrder = 1;
                console.log("Insufficient Funds!");      
            }
        }
        else {
            for (var i = 0; i < this.userStocks.length; i++) {
                if (this.userStocks[i] === stock) {
                    if (this.userStocks[i].numOwned < numShares) {
                        shouldOrder = 1;
                    }
                    else {
                        break;
                    }
                }
            }
        }

        if (shouldOrder === 0) {
            var o = new Order(symbol, typeorder, price, numShares, expiry, stock);
            this.orders.push(o);
        }
        return shouldOrder;
    }

    orderCompleted(order) {
        var p = Number(order.priceEntered);
        var s = Number(order.numSharesOrdered);
        if (order.typeOrder) {
            this.balance -= Number(Number(p)*Number(s));
            //this.setPortfolioValue();
            this.portfolioValue += Number(Number(p)*Number(s));

            var alreadyOwn = false;
            var index = 0;
            for (var i = 0; i < this.userStocks.length; i++) {
                if (this.userStocks[i] === order.stock) {
                    alreadyOwn = true;
                    index = i;
                    break;
                }
            }
            if (alreadyOwn) {
                this.userStocks[index].numOwned += Number(order.numSharesOrdered);
            }
            else {
                index = this.userStocks.length;
                this.userStocks.push(order.stock);
                this.userStocks[index].numOwned += Number(order.numSharesOrdered);
            }
        }
        else {
            this.balance += Number(Number(p)*Number(s));
            //this.setPortfolioValue();
            this.portfolioValue -= Number(Number(p)*Number(s));

            var index = 0;
            for (var i = 0; i < this.userStocks.length; i++) {
                if (this.userStocks[i] === order.stock) {
                    index = i;
                    break;
                }
            }
            this.userStocks[index].numOwned -= Number(order.numSharesOrdered);
            if (this.userStocks[index].numOwned === 0) {
                this.userStocks.pop(this.userStocks[index]);
            }
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
        this.typeOrder = typeorder; //true = buy & false = sell
        this.priceEntered = price;
        this.numSharesOrdered = numShares;
        this.expireEndDay = expiry; //true = endday & false = cancel
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
var stock4 = new Stock('AXP', 11.2);
var stock5 = new Stock('AMGN', 34.5);
var stock6 = new Stock('AAPL', 1.4);
var stock7 = new Stock('BA', 48.0);
var stock8 = new Stock('CAT', 9.9);
var stock9 = new Stock('CSCO', 20.2);
var stock10 = new Stock('CVX', 15.7);
var stock11 = new Stock('JNJ', 39.9);
var stock12 = new Stock('MSFT', 27.8);
var stock13 = new Stock('NKE', 31.4);
var stock14 = new Stock('PG', 4.6);
var stock15 = new Stock('TRV', 23.7);
database.push(stock1);
database.push(stock2);
database.push(stock3);
database.push(stock4);
database.push(stock5);
database.push(stock6);
database.push(stock7);
database.push(stock8);
database.push(stock9);
database.push(stock10);
database.push(stock11);
database.push(stock12);
database.push(stock13);
database.push(stock14);
database.push(stock15);

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

function getCurrDate() {
    var today = new Date();
    if (today.getDate() < 10) {
        var day = "0"+ today.getDate();
    }
    else {day = today.getDate();}
    
    return today.getFullYear()+""+(today.getMonth()+1)+""+day;
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


//users[0].createWatchlist("Fav Watchlist");
//users[0].watchlists[0].addStockToWatchlist(database[0]);
//users[0].watchlists[0].addStockToWatchlist(database[2]);
//console.log("\n\nFav Watchlist: \n\n" + users[0].watchlists[0].wStocks[0].toString());
//console.log("\n\n" + users[0].watchlists[0].wStocks[1].toString());

//user places order
users[0].makeOrder(database[0].symbol, true, database[0].price, 10, false, database[0]);
console.log("\nOrder: \n\n" + users[0].orders[0].toString());
console.log("\nTime passes so order is now completed!\n\n");
users[0].orderCompleted(users[0].orders[0]);
var event3 = users[0].logEventBS(10232020, 0, 10, database[0].price, "XYZ");
console.log("Users Stocks: \n\n" + users[0].userStocks[0].toString());

var check3 = users[0].makeOrder(database[11].symbol, true, database[11].price, 60, false, database[11]);
if (check3 === 0) {
    users[0].orderCompleted(users[0].orders[0]);
}
var check2 = users[0].makeOrder(database[6].symbol, true, database[6].price, 50, false, database[6]);
if (check2 === 0) {
    users[0].orderCompleted(users[0].orders[0]);
}
var check = users[0].makeOrder(database[5].symbol, true, database[5].price, 20, false, database[5]);
if (check === 0) {
    users[0].orderCompleted(users[0].orders[0]); 
}

users[0].createAlert(true, "AAA", 12, true);
console.log("\nAlerts: \n\n" + users[0].alerts[0].toString());
//users[0].portfolioValue = 56;

console.log("\nPortfolio Value: \n\n" + users[0].portfolioValue);
console.log("\nPortfolio Balance: \n\n" + users[0].balance)


function isValidSymbol(symbol) {
    console.log("got to isValidSymbol()\n");
    var isValid = false;
    database.forEach((value) => {
      console.log(symbol);
      console.log(value.symbol);
      if (String(symbol) === String(value.symbol)) isValid = true;  
    });
    return isValid; 
}

function findStock(symbol) {
    console.log("got to findStock()\n");
    var stock = null;
    database.forEach((value) => {
      if (String(symbol) === String(value.symbol)) stock = value;  
    });
    console.log("Still working!\n");
    return stock; 
}

