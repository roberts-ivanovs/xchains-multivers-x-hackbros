import { Command } from "commander";
import { envChain, World } from "xsuite";
import data from "./data.json";

const world = World.new({
  proxyUrl: envChain.publicProxyUrl(),
  chainId: envChain.id(),
  gasPrice: 1000000000,
});

const loadWallet = () => world.newWalletFromFile("wallet.json");

const program = new Command();

program.command("deploy").action(async () => {
  const wallet = await loadWallet();
  const result = await wallet.deployContract({
    code: data.code,
    codeMetadata: ["upgradeable", "readable", "payable", "payableBySc"],
    gasLimit: 20_000_0000,
  });
  console.log("Result:", result);
});

program.command("upgrade").action(async () => {
  const wallet = await loadWallet();
  const result = await wallet.upgradeContract({
    callee: envChain.select(data.address),
    code: data.code,
    codeMetadata: ["upgradeable"],
    gasLimit: 20_000_0000,
  });
  console.log("Result:", result);
});

program.command("issue").action(async () => {
  const wallet = await loadWallet();
  const result = await wallet.callContract({
    callee: envChain.select(data.address),
    funcName: "issueToken1",
    gasLimit: 20_000_0000,
    value: 50_000_000_000_000_000,
  });
  console.log("Result:", result);
});

program.command("getToken").action(async () => {
  const wallet = await loadWallet();
  const result = await wallet.callContract({
    callee: envChain.select(data.address),
    funcName: "getToken1",
    gasLimit: 20_000_0000,
  });
  console.log("Result:", result);
});

program.command("ClaimDeveloperRewards").action(async () => {
  const wallet = await loadWallet();
  const result = await wallet.callContract({
    callee: envChain.select(data.address),
    funcName: "ClaimDeveloperRewards",
    gasLimit: 10_000_000,
  });
  console.log("Result:", result);
});

program.parse(process.argv);
