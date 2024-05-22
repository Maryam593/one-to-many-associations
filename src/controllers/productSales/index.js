import ProductSalesModel from "../../models/productSales/index.js";

// const ProductSalesData = [{
//     id : 1, 
//     TotalAmount : 400
// }]
const ProductSalesController = {

    getAll : async(req,res)=> {
        try {
            const ProductSalesData = await ProductSalesModel.findAll();
            res.status(200).json({message : "GotAll", data: ProductSalesData})
        } catch (error) {
            res.status(500).json({message: "internal server Error"});
        }
    },
    getSingle : async(req,res) => {
        try {
            const {id} = req.params;
            // const FindSingle = ProductSalesData.find((f) => f.id == id);
            // if(!FindSingle){
            //     return res.status(404).json({message : "not found"})
            // }
            const FindSingle = await ProductSalesData.findByPk(1);
            if(!FindSingle){
                res.status(404).json({message: "not Found"})
            }
            res.status(200).json({message : "GetSingle", data : FindSingle});
        } catch (error) {
            res.status(500).json({message: "Internal Server Error"})
        }
    },
    create : async(req,res) => {
        try {
            const payload = req.body;
            // ProductSalesData.push(payload);
            const createProductSales = new ProductSalesModel();
            createProductSales.ProductName = payload.ProductName;
            createProductSales.price = payload.price;
            createProductSales.Quantity = payload.Quantity;
            await createProductSales.save();
            res.status(200).json({message : "Created", data: createProductSales});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal server error "})
        }
    },
    update : async (req,res)=> {
        try {
            const {id} = req.params;
            const payload = req.body
            // const UpdateProductSales = ProductSalesData.findIndex((f) => f.id == id);
            // if(UpdateProductSales == -1){
            //     return res.status(404).json({message : "Not found"})
            // }
            // // for price
            // if(payload.price){
            //     ProductSalesData[UpdateProductSales].price = payload.price;
            // }
            // //for ProductName
            // if(payload.ProductName){
            //     ProductSalesData[UpdateProductSales].ProductName = payload.ProductName;
            // }
            const UpdateProductSales = new ProductSalesModel.findByPk(id);
            if(UpdateProductSales == -1){
                res.status(404).json({message: "Not found"})
            }
            //for price
            if(payload.price){
                UpdateProductSales.price = payload.price;
            }
            //for quantity
            if(payload.Quantity){
                UpdateProductSales.Quantity = payload.Quantity;
            }
            await UpdateProductSales.save();
            res.status(200).json({message: "Updated!", data: ProductSalesData});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal server error "}) 
        }
    },
    Delete : async(req,res)=> {
     try {
        const {id} = req.params;
        // const DeleteProductSales = ProductSalesData.findIndex((f) => f.id == id);
        // if(DeleteProductSales == -1){
        //     return res.status(404).json({message : "Not found"})
        // }
        // ProductSalesData.splice(DeleteProductSales,1);
        // res.status(200).json({message : "Deleted Successfully", data : ProductSalesData});
        const DeleteProductSales = await ProductSalesModel.destroy({
            where : {
                id : id
            }
        })
        if(DeleteProductSales == -1)
            {
                return res.status(404).json({message: "result not found"})
            }
        res.status(200).json({message: "Deleted Successfully"})
        
     } catch (error) {
        res.status(500).json({message: "Internal server error "}) 
     }
    }

}
export default ProductSalesController;