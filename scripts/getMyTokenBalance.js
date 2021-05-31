const GummyToken = artifacts.require("GummyToken")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (cb) {
    gummyToken = await GummyToken.deployed()
    farmToken = await FarmToken.deployed()
    balance = await gummyToken.balanceOf(farmToken.address)
    console.log(web3.utils.fromWei(balance.toString()))
    cb()
}