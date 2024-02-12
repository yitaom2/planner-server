var file = require("fs")
var parseString = require('xml2js').parseString;

const txt = file.readFileSync("data/export.xml", "utf-8")
var xmlObj = null
parseString(txt, (err, result) => {
    if (err) {
        console.log(err)
    } else {
        xmlObj = result
    }
})

var dailyCal = []
for (idx in xmlObj?.HealthData?.ActivitySummary) {
    var dailySummary = xmlObj?.HealthData?.ActivitySummary[idx]
    console.log(`date: ${dailySummary?.$?.dateComponents}, cal: ${dailySummary?.$?.activeEnergyBurned}`)
    dailyCal.push(parseInt(dailySummary?.$?.activeEnergyBurned))
}

console.log(dailyCal)
var idolDailyCal = dailyCal.filter((cal) => {
    return cal < 400
})
console.log(idolDailyCal)
var avgCal = idolDailyCal.reduce((acc, cur) => acc + cur, 0) / idolDailyCal.length
console.log(avgCal)

var totalCalLost = dailyCal.reduce((acc, cur) => acc + cur, 0) - avgCal * dailyCal.length
console.log(totalCalLost)