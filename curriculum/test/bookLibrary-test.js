const { expect } = require("chai");

describe("BookLibrary", function () {   
    let bookLibraryFactory;

    let bookLibrary;

    before(async () => {

        bookLibraryFactory = await ethers.getContractFactory("BookLibrary");

        bookLibrary = await bookLibraryFactory.deploy();

        await bookLibrary.deployed();

    });

    it("should return the current available inventory of a specific book", async function () {

        expect(await bookLibrary.getAvailableInventory("no_book")).to.equal(0); // No avaialble book

    });

    it("Should add/remove new book to library", async function () {

        await bookLibrary.addBook("Graffulo", 10)
        expect(await bookLibrary.getAvailableInventory("Graffulo")).to.equal(10); // No avaialble book

        await bookLibrary.removeBook("Graffulo", 2)
        expect(await bookLibrary.getAvailableInventory("Graffulo")).to.equal(8); // No avaialble book

    });



});