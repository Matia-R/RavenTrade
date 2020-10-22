/*
Outline of objects that will be used in app 
*/


let user = {
    Balance,
	portfolioValue,
	Stocks : [],
    Orders : [],
    Watchlist : [],
    accountHistory : [],
    Username,
    Password,
    alerts : []   
}

let stock = {
    symbol,
    price,
    bidPrice,
    askPrice,
    highPrice,
    lowPrice,
    numSharesToday,
    numOwned,
    avgPricePaid
}

//extends stock
let currentStock = {
    numShares,
    avgPrice,
    currentValue,
}

let order = {
    symbol,
    typeOrder,
    priceEntered,
    numSharesOrdered,
    expiry,
    notification
}

let watchlist = {
    stocks : [],
    name
}

let alert = {
    state,
    symbol,
    alertConstraint
}

let log = {
    date,
    eventType
}

let event = {
    buy,
    sell,
    deposit,
    withdraw
}


