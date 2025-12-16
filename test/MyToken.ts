import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers, upgrades } from "hardhat";

describe("MyToken", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploy() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const myTokenFactory = await ethers.getContractFactory("MyToken");
    const myToken = await upgrades.deployProxy(myTokenFactory, [owner.address], { kind: 'uups' });

    return { myToken, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should deploy", async function () {
      const { myToken } = await loadFixture(deploy);

      expect(await myToken.name()).to.equal("MyToken");
    });
  });
});
