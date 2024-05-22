import ProductSalesModel from "../../models/productSales/index.js";
import ProductsModel from "../../models/produts/index.js";
import SalesModel from "../../models/sales/index.js";

const salesData = [
  {
    id: 1,
    TotalAmount: 400,
  },
];
const SalesController = {
  getAll: async(req, res) => {
    try {
    //   res.status(200).json({ message: "GotAll", data: salesData });
    const sales = await SalesModel.findAll();
    res.status(200).json({message: "FoundAll",data:  sales})
    } catch (error) {
      res.status(500).json({ message: "internal server Error" });
    }
  },
  getSingle: async (req, res) => {
    try {
      const { id } = req.params;
      // const FindSingle = salesData.find((f) => f.id == id);
      // if(!FindSingle){
      //     return res.status(404).json({message : "not found"})
      // }
      // res.status(200).json({message : "GetSingle", data : FindSingle});
      const sales = await SalesModel.findByPk(id, {
        include: [
          {
            model: ProductSalesModel,
            include: [
              {
                model: ProductsModel,
                attributes: ["ProductName"],
              },
            ],
          },
        ],
      });
      if (!sales) {
        return res.status(404).json({ message: "Not found" });
      }
      res.status(200).json({ message: "Got One", data: sales });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  create: async (req, res) => {
    try {
      const payload = req.body;
      // salesData.push(payload);
      // res.status(200).json({message : "Created", data: salesData});
      console.log("payload", payload);
      let TotalAmount = 0;
      //calculating the total amount
      //console.log(TotalAmount)

      //Calcuating Total Amount **********
      payload.productSales.forEach((ele) => {
        TotalAmount = TotalAmount + ele.price * ele.Quantity;
      });
      console.log(TotalAmount);
      const sales = new SalesModel();
      
      sales.totalAmount = TotalAmount;
      await sales.save();
    
      console.log("Total Amount", TotalAmount);
      const salesProduct = [];
     
      for (let index = 0; index < payload.productSales.length; index++) {
        const ele = payload.productSales[index];
        //Find Stock ******
        const product = await ProductsModel.findByPk(ele.ProductId);
        if (ele.Quantity > product.stock) {
          return res.status(400).json({
            message: "The product " + product.name + " has in-sufficient stock",
          });
        }
        salesProduct.push({
          ...ele,
          SaleId: sales.id,
        });
      
      }
      console.log("sales products", salesProduct);
      await ProductSalesModel.bulkCreate(salesProduct);

      res.status(200).json({ message: "sale created", sales, salesProduct });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error " });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const payload = req.body;
    //   const UpdateSales = salesData.findIndex((f) => f.id == id);
    //   if (UpdateSales == -1) {
    //     return res.status(404).json({ message: "Not found" });
    //   }
    //   // for id
    //   if (payload.id) {
    //     salesData[UpdateSales].id = payload.id;
    //   }
    //   //for TotalAmount
    //   if (payload.TotalAmount) {
    //     salesData[UpdateSales].TotalAmount = payload.TotalAmount;
    //   }

    //   res.status(200).json({ message: "Updated!", data: salesData });
    const UpdadateSales = new SalesModel.findByPk(id);
    if(!UpdadateSales == -1){
        res.status(404).json({message: "Not Found"})
    }
    await UpdadateSales.save();
    res.status(200).json({message: "Updated Sales", UpdadateSales})
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error " });
    }
  },
  Delete: async(req, res) => {
    try {
       const { id } = req.params;
    //   const DeleteSales = salesData.findIndex((f) => f.id == id);
    //   if (DeleteSales == -1) {
    //     return res.status(404).json({ message: "Not found" });
    //   }
    //   salesData.splice(DeleteSales, 1);
    //   res
    //     .status(200)
    //     .json({ message: "Deleted Successfully", data: salesData });
   
    const DeleteSales = await SalesModel.destroy({
        where: {
            id : id
        }
    })
    if(DeleteSales == -1){
        res.status(404).json({message: "not found"})
    }
    res.status(200).json({message: "Deleted Successfully"})
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error " });
    }
  },
};

export default SalesController;
