// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "./interfaces/IERC721.sol";
import "./interfaces/INFTChallegeCore.sol";
import "./IMetaRocks.sol";

/**
 * Item using NFTChallege platform.
 */
contract MetaRocks is IMetaRocks {

    struct Props{
        bytes3 rock1_color;
        bytes3 rock2_color;
        bytes3 rock3_color;
        bytes3 rock4_color;
        bytes3 rock5_color;
    }

    address public override manager;
    mapping (address => mapping(uint256 => Props)) public TokenProps;

    uint256 public tokenId;
    Props private _TokenProp;


    constructor(address _manager) {
        manager = _manager;
    }

    modifier onlyManager {
        require(msg.sender == manager, 'only manager can call it.');
        _;
    }

    function RecordCurrentTokenProps(bytes3 rock1_color) external override returns(bool){
        _TokenProp.rock1_color = rock1_color;
        return true;
    }

    /// 
    function MintNft(INFTChallegeCore item) public override returns(bool) {
        item.mint(msg.sender, tokenId);
        tokenId++;
        emit Mint(address(item), msg.sender, tokenId);
        return true;
    }

}