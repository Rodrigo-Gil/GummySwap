const GummyToken = artifacts.require("GummyToken")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (cb) {
    const accounts = await new web3.eth.getAccounts()
    const gummyToken = await GummyToken.deployed()
    const farmToken = await FarmToken.deployed()

    //returns the remaining number of tokens that spender will be allowed to spend on behalf of owner through transferFrom
    const allowanceBefore = await gummyToken.allowance(
        accounts[0],
        farmToken.address
    )
    console.log(
        "Amount of GummyToken FarmToken is allowed to transfer on our behalf before: " +
        allowanceBefore.toString()
    )

    //In order to allow the smart contract to transfer to GummyToken (ERC-20) on the accounts[0] behalf,
    //we must explicitly allow it.
    //we allow farmToken to transfer x amount of GummyToken on our behalf
    await gummyToken.approve(farmToken.address, web3.utils.toWei("100", "ether"))

    //validate that the farmToken can now move x amount of GummyToken on our behalf
    const allowanceAfter = await gummyToken.allowance(accounts[0], farmToken.address)
    console.log(
        "Amount of GummyToken FarmToken is allowed to transfer on our behalf after: " +
        allowanceAfter.toString()
    )

    //verify accounts[0] and farmToken balance of GummyToken before and after the transfer
    balanceMyTokenBeforeAccounts0 = await gummyToken.balanceOf(accounts[0])
    balanceMyTokenBeforeFarmToken = await gummyToken.balanceOf(farmToken.address)
    console.log("*** GummyToken ***")
    console.log(
        "Balance GummyToken Before accounts[0] " +
        web3.utils.fromWei(balanceMyTokenBeforeAccounts0.toString())
    )
    console.log(
        "Balance GummyToken Before TokenFarm " +
        web3.utils.fromWei(balanceMyTokenBeforeFarmToken.toString())
    )
    
    console.log("*** Farm Token ***")
    balanceFarmTokenBeforeAccounts0 = await farmToken.balanceOf(accounts[0])
    balanceFarmTokenBeforeFarmToken = await farmToken.balanceOf(farmToken.address)
    console.log(
        "Balance FarmToken Before accounts[0] " +
        web3.utils.fromWei(balanceFarmTokenBeforeAccounts0.toString())
    )
    console.log(
        "Balance FarmToken Before TokenFarm " +
        web3.utils.fromWei(balanceFarmTokenBeforeFarmToken.toString())
    )
    //call deposit function from FarmToken
    console.log("Call deposit function")
    await farmToken.deposit(web3.utils.toWei("100", "ether"))
    console.log("*** GummyToken ***")
    balanceGummyTokenAfterAccounts0 = await gummyToken.balanceOf(accounts[0])
    balanceGummyTokenAfterFarmToken = await gummyToken.balanceOf(farmToken.address)
    console.log(
        "Balance GummyToken after accounts[0] " +
        web3.utils.fromWei(balanceGummyTokenAfterAccounts0.toString())
    )
    console.log(
        "Balance GummyToken after FarmToken " +
        web3.utils.fromWei(balanceGummyTokenAfterFarmToken.toString())
    )

    console.log("*** Farm Token ***")
    balanceFarmTokenAfterAccounts0 = await farmToken.balanceOf(accounts[0])
    balanceFarmTokenAfterFarmToken = await farmToken.balanceOf(farmToken.address)
    console.log(
        "Balance FarmToken After accounts[0] " +
        web3.utils.fromWei(balanceFarmTokenAfterAccounts0.toString())
    )
    console.log(
        "Balance FarmToken After TokenFarm " +
        web3.utils.fromWei(balanceFarmTokenAfterFarmToken.toString())
    )
    //ending the function
    cb()
}