// const ProductData = [{
//     id : 1, 
//     name : "Shampoo",
//     quantity : 5

import ProductsModel from "../../models/produts/index.js";

// }]
const ProductController = {

    getAll : async(req,res)=> {
        try {
            const ProductData = await ProductsModel.findAll();
            res.status(200).json({message : "GotAll", data: ProductData})
        } catch (error) {
            res.status(500).json({message: "internal server Error"});
        }
    },
    getSingle : async (req,res) => {
        try {
            const {id} = req.params;
            // const FindSingle = ProductData.find((f) => f.id == id);
            // if(!FindSingle){
            //     return res.status(404).json({message : "not found"})
            // }
            const FindSingle = ProductsModel.findByPk(id);
            if(!FindSingle){
                return res.status(404).json({message:"Not Found"})
            }
            res.status(200).json({message : "GetSingle", data : FindSingle});
        } catch (error) {
            res.status(500).json({message: "Internal Server Error"})
        }
    },
    create : async(req,res) => {
        try {
            const payload = req.body;
            // ProductData.push(payload);
            // res.status(200).json({message : "Created", data: ProductData});
         const createProducts = new ProductsModel();
         createProducts.ProductName = payload.ProductName;
         createProducts.rate = payload.rate;
         createProducts.stock = payload.stock;
         await createProducts.save();
         res.status(200).json({message: "Created"})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Internal server error "})
        }
    },
    update : async (req,res)=> {
        try {
            const {id} = req.params;
            const payload = req.body
            // const UpdateProducts = ProductData.findIndex((f) => f.id == id);
            // if(UpdateProducts == -1){
            //     return res.status(404).json({message : "Not found"})
            // }
            // // for id 
            // if(payload.id){
            //     ProductData[UpdateProducts].id = payload.id;
            // }
            // //for quantity 
            // if(payload.quantity){
            //     ProductData[UpdateProducts].quantity = payload.quantity;
            // }
            // //for rates
            // if(payload.rate){
            //     ProductData[UpdateProducts].rate = payload.rate;

            const UpdateProduct = await ProductsModel.findByPk(id);
            if(UpdateProduct == -1){
                res.status(404).json({message: "Not Found"})
            }
            //for productName 
            if(payload.ProductName){
                UpdateProduct.ProductName = payload.ProductName;
            }
            //for rate 
            if(payload.rate){
                UpdateProduct.rate = payload.rate
            }
            //for stock 
            if(payload.stock){
                UpdateProduct.stock = payload.stock
            }
            await UpdateProduct.save();
            res.status(200).json({message: "Updated!", data: UpdateProduct});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: "Internal server error "}) 
        }
    },
    Delete : async(req,res)=> {
     try {
        const {id} = req.params;
        // const DeleteProducts = ProductData.findIndex((f) => f.id == id);
        // if(DeleteProducts == -1){
        //     return res.status(404).json({message : "Not found"})
        // }
        // ProductData.splice(DeleteProducts,1);
      const DeleteProduct = await ProductsModel.destroy({
        where : {
            id : id
        }
      });
        if(DeleteProduct == -1){
            return res.status(404).json("Not Found");
        }
        res.status(200).json({message : "Deleted Successfully"});
        
     } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error "}) 
     }
    }

}

export default ProductController;