const { expect } = require("chai");
const sinon = require("sinon");
const productModel = require("../../../src/models/product.model");
const connection = require("../../../src/models/db/connection");

const { mockProducts, newInsertMock } = require("../mockData/mocks");
const { beforeEach, afterEach } = require("mocha");

describe("Testando model de products", () => {
  describe("Listar todos os produtos", () => {
    beforeEach(() => {
      sinon.stub(connection, "execute").resolves([mockProducts]);
    });

    it("Deve retornar um array com todos os elementos", async () => {
      const result = await productModel.modelGetAll();

      expect(result).to.be.eq(mockProducts);
    });
    it("Deve retornar um array com 1 elemento", async () => {
      const result = await productModel.modelGetById(1);

      expect(result).to.be.eq(mockProducts[0]);
    });
    afterEach(sinon.restore)
  });

  describe('Insere um novo produto', () => {
    it('Teste se ao inserir um produto retorna o id e o nome do mesmo', async () => {
      sinon.stub(connection, "execute").resolves([{ insertId: 99 }]);
      const result = await productModel.modelInsert(newInsertMock);
      expect(result).to.be.eq(99);
    })
  })
});
