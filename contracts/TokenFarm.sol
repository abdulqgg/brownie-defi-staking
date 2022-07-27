// stakeTokens 
// unStakeTokens
// issueTokens
// addAllowedTokens
// getEthValue

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenFarm is Ownable{
    
    // mapping token address to staker address to amount
    mapping(address => mapping(address => uint256)) public stakingBalance;
    mapping(address => uint256) public uniqueTokenStaked;
    // mapping token to price feed
    mapping(address => address) public tokenPriceFeedMapping;

    address[] public stakers;
    address[] public allowedTokens;

    IERC20 public dappToken;

    constructor(address _dappTokenAddress) public {
        dappToken = IERC20(_dappTokenAddress);
    }

    function setPriceFeedContract(address _token, address _priceFeed) public onlyOwner {
        tokenPriceFeedMapping[_token] = _priceFeed
    }

    function issueTokens(address _user) public onlyOwner {
        for(uint256 stakersIndex=0; stakersIndex < stakers.length; stakersIndex ++){
            address recipient = staker[stakersIndex];
            uint256 userTotalValue = getUserTotalValue(recipient);
            //dappToken.transfer(recipient, );
        }

    }

    function getUserTotalValue(address _user) public view returns(uint256) {
        uint256 totalValue = 0;
        require(uniqueTokenStaked[_user] > 0, "No token staked!");
        for(uint256 allowedTokensIndex = 0; allowedTokenIndex < allowedToken.length, allowedTokenIndex ++){
            totalValue = totalValue + getUserSignleTokenValue(_user, allowedTokens[allowedTokenIndex]);
        }
    }

    function getUserSignleTokenValue(address _user, address _token) public view returns(uint256){
        if (uniqueTokenStaked[_user] <= 0) {
            return 0;
        }
        getTokenValue(_token);
    }

    function getTokenValue(address _token) public view returns(uint256) {
        // priceFeedAddress
    }

    function stakeTokens(uint256 _amount, address _token) public {
        require(_amount > 0, "Amount must be more than 0");
        require(tokenIsAllowed(_token), "Token is not allowed");
        IERC20(_token).transferFrom(msg.sender, address(this), _amount);
        updateUniqueTokenStaked(msg.sender, _token);
        stakingBalance[_token][msg.sender] = stakingBalance[_token][msg.sender] + _amount;
        if (uniqueTokenStaked[msg.sender] == 1) {
            stakers.push(msg.sender);
        }
    }

    function updateUniqueTokenStaked(address _user, address _token) internal {
        if (stakingBalance[_token][_user] <= 0){
            uniqueTokenStaked[_user] = uniqueTokenStaked[_user] +1;
        }
    }

    function addAllowedTokens(address _token) public onlyOwner {
        allowedTokens.push(_token);
    }

    function tokenIsAllowed(address _token) public returns(bool) {
        for(uint256 allowedTokensIndex=0; allowedTokensIndex < allowedTokens.length; allowedTokensIndex ++){
            if (allowedTokens[allowedTokensIndex] == _token) {
                return true;
            }
        }
        return false;
    }

}