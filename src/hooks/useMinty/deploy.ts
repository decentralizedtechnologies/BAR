const CONTRACT_NAME = "Minty";

export async function deployContract(name, symbol) {
  const hardhat = require("hardhat");
  const network = hardhat.network.name;

  console.log(`deploying contract for token ${name} (${symbol}) to network "${network}"...`);
  const Minty = await hardhat.ethers.getContractFactory(CONTRACT_NAME);
  const minty = await Minty.deploy(name, symbol);

  await minty.deployed();
  console.log(
    `deployed contract for token ${name} (${symbol}) to ${minty.address} (network: ${network})`
  );

  return deploymentInfo(hardhat, minty);
}

export async function loadDeploymentInfo() {
  const hardhat = require("hardhat");
  const Minty = await hardhat.ethers.getContractAt(CONTRACT_NAME, "address");
  const minty = await Minty.deploy("name", "symbol"); // @TODO get contract from address

  return deploymentInfo(hardhat, minty);
}

function deploymentInfo(hardhat, minty) {
  return {
    network: hardhat.network.name,
    contract: {
      name: CONTRACT_NAME,
      address: minty.address,
      signerAddress: minty.signer.address,
      abi: minty.interface.format(),
    },
  };
}
