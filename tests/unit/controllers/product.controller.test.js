const { expect } = require("chai");
const sinon = require("sinon");

const productService = require("../../../src/services/product.service");
const productController = require('../../../src/controllers/product.controller');

const { returnService, mockProducts, newInsertMock } = require("../mockData/mocks");

describe("Testando controller de products", () => {
  describe("Listar todos os produtos", () => {
    it("Deve retornar um array com todos os elementos", async () => {
      const res = {}
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, "serviceGetAll").resolves(returnService);

      await productController.controllerGetAll({}, res);
      expect(res.status.calledWith(200)).to.be.eq(true);
      expect(res.json.calledWith(returnService.message)).to.be.eq(true);

    });

    it("Deve retonar o produto ao passar o ID", async () => {
      const req = { params: { id: 1 }}
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, "serviceGetById").resolves({ type: null, message: mockProducts[0] });
      
      await productController.controllerGetById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(mockProducts[0])).to.be.equal(true);
    });

        it("Deve retonar um erro ao passar um ID inválido", async () => {
          const req = { params: { id: 999 } };
          const res = {};
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();
          sinon.stub(productService, "serviceGetById").resolves({ type: 'error', message: 'Product not found' });

          await productController.controllerGetById(req, res);
          expect(res.status.calledWith(200)).to.be.equal(false);
          expect(res.json.calledWith(mockProducts[0])).to.be.equal(false);
        });

  });
  afterEach(sinon.restore);

  describe('Testa a função inserir', () => {
    it('Testa se ao inserir um novo produto retorna o id e o nome', async () => {
      const res = {};
      const req = { body: 4 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productService, 'serviceInsert').resolves({ type: null, message: 4 });
      await productController.controllerInsert(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
    });
        it("Testa se ao inserir um novo produto faltando dados retorna um erro", async () => {
          const res = {};
          const req = { body: 4 };
          res.status = sinon.stub().returns(res);
          res.json = sinon.stub().returns();

          sinon
            .stub(productService, "serviceInsert")
            .resolves({ type: 'error', message: 4 });
          await productController.controllerInsert(req, res);

          expect(res.status.calledWith(201)).to.be.equal(false);
          expect(res.json.calledWith(newInsertMock[0])).to.be.equal(false);
        });
  });
});