// 第一章实例学习
// 1. 分解statement函数
// 原始代码
function statement (invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`; const format = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format; for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;
    switch (play.type) {
    case "tragedy":
    thisAmount = 40000;
    if (perf.audience > 30) { thisAmount += 1000 * (perf.audience - 30); }
    break;
    case "comedy":
    thisAmount = 30000;
    if (perf.audience > 20) { thisAmount += 10000 + 500 * (perf.audience - 20); }
    thisAmount += 300 * perf.audience; break;
    default:
    throw new Error(`unknown type: ${play.type}`);
    }
    // add volume credits
    volumeCredits += Math.max(perf.audience - 30, 0);
    // add extra credit for every ten comedy attendees
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);
    // print line for this order
    result += ` ${play.name}: ${format(thisAmount/100)} (${perf.audience} seats)\n`; totalAmount += thisAmount;
    }
    result += `Amount owed is ${format(totalAmount/100)}\n`;
    result += `You earned ${volumeCredits} credits\n`; 
    return result;
}

//优化后的代码
const plays = {
    "hamlet": {"name": "Hamlet", "type": "tragedy"}, 
    "as-like": {"name": "As You Like It", "type": "comedy"}, 
    "othello": {"name": "Othello", "type": "tragedy"}
}

const invoices = [
    {
        "customer": "BigCo", 
        "performances": [
            { "playID": "hamlet", "audience": 55 },
            { "playID": "as-like", "audience": 35 },
            { "playID": "othello", "audience": 40 }
        ]
    }
];

function newStatement (invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`; 
    const format = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format; 
    for (let perf of invoice.performances) {
        const play = plays[perf.playID];
        const thisAmount =  amountFor(play, perf);
        // add volume credits
        volumeCredits += Math.max(perf.audience - 30, 0);
        // add extra credit for every ten comedy attendees
        if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);
        // print line for this order
        result += ` ${play.name}: ${format(thisAmount/100)} (${perf.audience} seats)\n`; totalAmount += thisAmount;
    }
    result += `Amount owed is ${format(totalAmount/100)}\n`;
    result += `You earned ${volumeCredits} credits\n`; 
    return result;
}

function newStatement2 (invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`; 
    const format = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format; 
    for (let perf of invoice.performances) {
        const play = playFor(perf);
        const thisAmount =  amountFor(play, perf);
        // add volume credits
        volumeCredits += Math.max(perf.audience - 30, 0);
        // add extra credit for every ten comedy attendees
        if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);
        // print line for this order
        result += ` ${play.name}: ${format(thisAmount/100)} (${perf.audience} seats)\n`; totalAmount += thisAmount;
    }
    result += `Amount owed is ${format(totalAmount/100)}\n`;
    result += `You earned ${volumeCredits} credits\n`; 
    return result;
}

function newStatement3 (invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`; 
    const format = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format; 
    for (let perf of invoice.performances) {
        // add volume credits
        volumeCredits += Math.max(perf.audience - 30, 0);
        // add extra credit for every ten comedy attendees
        if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);
        // print line for this order
        result += ` ${playFor(perf).name}: ${format(amountFor(perf)/100)} (${perf.audience} seats)\n`; totalAmount += amountFor(perf);
    }
    result += `Amount owed is ${format(totalAmount/100)}\n`;
    result += `You earned ${volumeCredits} credits\n`; 
    return result;
}

function newStatement4 (invoice) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`; 
    for (let aPerformance of invoice.performances) {
        // add volume credits
        volumeCredits += volumeCreditsFor(aPerformance);
        // print line for this order
        result += ` ${playFor(aPerformance).name}: ${usd(amountFor(aPerformance))} (${aPerformance.audience} seats)\n`; totalAmount += amountFor(aPerformance);
    }
    result += `Amount owed is ${usd(totalAmount)}\n`;
    result += `You earned ${volumeCredits} credits\n`; 
    return result;
}

function renderPlainText (data, plays) {
    let result = `Statement for ${data.customer}\n`; 
    for (let aPerformance of data.performances) {
        // print line for this order
        result += ` ${playFor(aPerformance).name}: ${usd(amountFor(aPerformance))} (${aPerformance.audience} seats)\n`; 
    }


    result += `Amount owed is ${usd(totalAmount())}\n`;
    result += `You earned ${totalVolumeCredits()} credits\n`; 
    return result;

    function usd(aNumber) {
        return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(aNumber / 100);
    }
    
    function playFor(aPerformance) {
        return plays[aPerformance.playID]
    }
    
    function amountFor (aPerformance) {
        let result = 0;
        switch (playFor(aPerformance).type) {
            case "tragedy":
                result = 40000;
                if (aPerformance.audience > 30) { 
                    result += 1000 * (aPerformance.audience - 30); 
                }
            break;
            case "comedy":
                result = 30000;
                if (aPerformance.audience > 20) { 
                    result += 10000 + 500 * (aPerformance.audience - 20);
                }
                result += 300 * aPerformance.audience; 
            break;
            default:
            throw new Error(`unknown type: ${playFor(aPerformance).type}`);
        }
        return result;
    }
    
    function volumeCreditsFor(perf) {
        let result = 0;
        // add volume credits
        result += Math.max(perf.audience - 30, 0);
        // add extra credit for every ten comedy attendees
        if ("comedy" === playFor(perf).type) result += Math.floor(perf.audience / 5);
        return result;
    }
    
    function totalVolumeCredits() {
        let result = 0;
        for (let aPerformance of data.performances) {
            // add volume credits
            result += volumeCreditsFor(aPerformance);
        }
    
        return result;
    }

    function totalAmount() {
        let result = 0;
        for (let aPerformance of data.performances) {
            result += amountFor(aPerformance);
        }
        return result;
    }
}

function newStatement5(invoice, plays) {
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances;
    return renderPlainText(statementData, plays);
}

console.log(newStatement5(invoices[0], plays))