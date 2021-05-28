const GummyToken = artifacts.require("GummyToken")

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(GummyToken)
  const gummyToken = await GummyToken.deployed()
}
