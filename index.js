// invoices.json
const invoice = {
    "customer": "MDT",
    "performance": [
        {"playId": "Гамлет", "audience": 55, "type": "tragedy"},
        {"playId": "Ромео и Джульетта", "audience": 35, "type": "tragedy"},
        {"playId": "Отелло", "audience": 40, "type": "comedy"},
        {"playId": "Отелло", "audience": 40, "type": "comedy"},
        {"playId": "Отелло", "audience": 40, "type": "comedy"},
        {"playId": "Отелло", "audience": 40, "type": "comedy"},
        {"playId": "Отелло", "audience": 40, "type": "comedy"},
        {"playId": "Отелло", "audience": 40, "type": "comedy"},
        {"playId": "Отелло", "audience": 40, "type": "comedy"},
        {"playId": "Отелло", "audience": 40, "type": "comedy"},
        {"playId": "Отелло", "audience": 40, "type": "comedy"},
        {"playId": "Отелло", "audience": 40, "type": "comedy"},
    ]
}

const plays = {
    'Гамлет': {
        type: 'tragedy',
        name: 'Гамлет'
    },
    'Ромео и Джульетта': {
        type: 'tragedy',
        name: 'Ромео и Джульетта',
    },
    'Отелло': {
        type: 'comedy',
        name: 'Отелло'
    }
}

const format = new Intl.NumberFormat("ru-RU",
    {style: "currency", currency: "RUB", minimumFractionDigits: 2}).format;

function statement(invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let countComedy = 0;
    let result = `Счет для ${invoice.customer} \n`;

    for (let perf of invoice.performance) {
        const play = plays[perf.playId];
        let thisAmount = 0;
        switch (play.type) {
            case "tragedy":
                thisAmount = 40000;
                if (perf.audience > 30) {
                    thisAmount += 1000 * (perf.audience - 30);
                }
                break;
            case "comedy":
                thisAmount = 30000;
                if (perf.audience > 20) {
                    thisAmount += 10000 + 500 * (perf.audience - 20);
                }
                thisAmount += 300 * perf.audience;
                countComedy += 1;
                break;
            default:
                throw new Error(`неизвестный тип: ${perf.type}`);
        }
        // Добавление бонусов
        volumeCredits += Math.max(perf.audience - 30, 0);
        // Дополнительный бонус за каждые 10 комедий
        if (countComedy === 10) {
            volumeCredits += Math.floor(perf.audience / 5);
            countComedy = 0;
        }
        // Вывод строки счета
        result += ` ${play.name}: ${format(thisAmount / 100)}`;
        result += ` (${perf.audience} мест)\n`;
        totalAmount += thisAmount;
    }
    result += `Итого с вас ${format(totalAmount / 100)}\n`;
    result += `Вы заработали ${volumeCredits} бонусов\n`;
    return result;
}

let test = statement(invoice, plays);
console.log(test)
