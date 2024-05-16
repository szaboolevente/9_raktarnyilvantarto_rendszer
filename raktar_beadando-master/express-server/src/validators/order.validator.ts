import { validDate, validEmail, validPhoneNumber } from './validators';

export function validOrderRequestBody(req, res, next) {
    if(!req.body.customerName){
        return res.status(400).json({message: "Invalid customer name input!"});
    }

    if(req.body.customerEmail &&
       !validEmail(req.body.customerEmail)){
        return res.status(400).json({message: "Invalid customer email input!"});
    }
    
    if(!req.body.customerPhone ||
       !validPhoneNumber(req.body.customerPhone)){
        return res.status(400).json({message: "Invalid customer phone number input!"});
    }
    
    if(!req.body.orderDate ||
       !validDate(req.body.orderDate)){
        return res.status(400).json({message: "Invalid date input!"});
    }
    
    if(!req.body.product){
        return res.status(400).json({message: "Invalid product input!"});
    }
    
    if(req.body.amount !== undefined && req.body.amount < 1){
        return res.status(400).json({message: "Invalid amount input!"});
    }

    next();
}

