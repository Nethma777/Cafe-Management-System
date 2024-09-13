const express = require('express');
const connection = require('../connection');
const router = express.Router();
const auth = require('../services/authentication');
const checkRole = require('../services/checkRole');

router.post('/add',auth.authenticateToken,checkRole.checkRole, (req,res)=>{
    let product = req.body;
    var query = "insert into product(name,categoryId,description,price,status) values(?,?,?,?,'true')";
    connection.query(query,[product.name,product.categoryId,product.description,product.price],(err,result)=>{
        if(!err){
            return res.status(200).json({message:"Product added successfully"});
        }else{
            return res.status(500).json(err);
        }
    })
})

router.get('/get',auth.authenticateToken,(req,res,next)=>{
    var query = "select p.id,p.name,p.description,p.price,p.status,c.id as categoryId, c.name as cateoryName from product as p INNER JOIN category as c where p.categoryId = c.id";
    connection.query(query,(err,results)=>{
        if(!err){
        return res.status(200).json(results);
    }else{
        return res.status(500).json(err);
    }
    })
})

router.get('/getByCategory/:id',auth.authenticateToken,(req,res,next)=>{
    const id = req.params.id;
    var query = "select id,name from product where categoryId = ? and status = 'true'";
    connection.query(query,[id],(err,results)=>{
        if(!err){
        return res.status(200).json(results);
    }else{
        return res.status(500).json(err);
    }
    })
})

router.get('/getById/:id',auth.authenticateToken,(req,res,next)=>{
    const id = req.params.id;
    var query = "select id,name,description,price,categoryId from product where id = ?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
        return res.status(200).json(results[0]);
    }else{
        return res.status(500).json(err);
    }
    })
}) 

router.patch('/update',auth.authenticateToken,checkRole.checkRole,(req,res,next)=>{
    let product = req.body;
    var query = "update product set name=?,categoryId=?,description=?,price=? where id=?";
    connection.query(query,[product.name,product.categoryId,product.description,product.price,product.id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message:"Product does not exist"});
            }
            return res.status(200).json({message:"Product updated successfully"});
        }else{
            return res.status(500).json(err);
        }
    })
})

router.delete('/delete/:id',auth.authenticateToken,checkRole.checkRole,(req,res,next)=>{
    const id = req.params.id;
    var query = "delete from product where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message:"Product does not exist"});
            }
            return res.status(200).json({message:"Product deleted successfully"});
        }else{
            return res.status(500).json(err);
        }
    })
})


router.patch('/updateStatus',auth.authenticateToken,checkRole.checkRole,(req,res,next)=>{
    let user = req.body;
    var query = "update product set status=? where id=?";
    connection.query(query,[user.status,user.id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message:"Product does not exist"});
            }
            return res.status(200).json({message:"Product status updated successfully"});
        }else{
            return res.status(500).json(err);
        }
    })
})
module.exports = router;