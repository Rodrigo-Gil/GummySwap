const GummyToken = artifacts.require("GummyToken")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(GummyToken)
  const gummyToken = await GummyToken.deployed()

  //deploying Farm Tokens
  await deployer.deploy(FarmToken, gummyToken.address)
  const farmToken = await FarmToken.deployed()
}
