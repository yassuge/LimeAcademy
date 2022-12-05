// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";


contract BookLibrary is Ownable {
    struct Book {
        string bookId;
    }
    struct User {
        string userId;
    }

    mapping(string => bool) private users;
    mapping(string => uint) private _availableBooks;
    mapping(string => uint) private _borrowedBooks;
    mapping(string => mapping(string => uint)) private _borrowedBooksPerUser; // {userId : {bookId: qty}}
    address[] private allUsers;
    
    function addBook(string memory bookId, uint qty) public onlyOwner {
        _availableBooks[bookId] = _availableBooks[bookId] + qty;
    }

    function removeBook(string memory bookId, uint qty) public onlyOwner {
        require(_availableBooks[bookId] >= qty, "not enough inventory");
        _availableBooks[bookId] -= qty;
    }

    function getInventory(string memory bookId) public view returns (uint) {
        return _availableBooks[bookId];
    }

    function registerUser(string memory userId) private onlyOwner{
        users[userId] = true;
    }

    function removeUser(string memory userId) private onlyOwner{
        require(users[userId] = true, "user not registered");
        users[userId] = false;
    }

    function borrowBook(string memory userId, string memory bookId) external onlyOwner {
        require(_availableBooks[bookId]>0, "not enough inventory");
        
        if (users[userId] != true){
            registerUser(userId);
            allUsers.push(address(msg.sender));
        }
        
        require(_borrowedBooksPerUser[userId][bookId] == 0, "user is already borrowing this book");
        
        // update
        _availableBooks[bookId] -= 1.0;
        _borrowedBooks[bookId] += 1.0;
        _borrowedBooksPerUser[userId][bookId] += 1.0;
    }

    function returnBook(string memory userId, string memory bookId) public onlyOwner{
        require(_borrowedBooksPerUser[userId][bookId] > 0, "user has not borrowed this book");

        // update
        _availableBooks[bookId] -= 1.0;
        _borrowedBooks[bookId] += 1.0;
        _borrowedBooksPerUser[userId][bookId] += 1.0;
    }

    function getAvailableInventory(string memory bookId) public view returns(uint){
        return _availableBooks[bookId];
    }
}