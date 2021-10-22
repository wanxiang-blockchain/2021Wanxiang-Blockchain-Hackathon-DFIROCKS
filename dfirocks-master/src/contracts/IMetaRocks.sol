// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./interfaces/INFTChallegeCore.sol";

interface IMetaRocks{
    //// events
    event Mint(address indexed item, address indexed applyer, uint256 indexed tokenId);

    

    //// application functions
    function manager() external view returns(address);
    
    function RecordCurrentTokenProps(bytes3) external returns(bool);
    function MintNft(INFTChallegeCore item) external returns(bool);
}